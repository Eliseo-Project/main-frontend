import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'

const LOGO_URL =
  'https://res.cloudinary.com/dtscqhcop/image/upload/v1789180808/WhatsApp_Image_2026-09-12_at_08.08.16_wejwal.jpg'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !prefersReducedMotion()

const CORNERS = [
  'top-6 left-6 md:top-10 md:left-10 border-t border-l',
  'top-6 right-6 md:top-10 md:right-10 border-t border-r',
  'bottom-6 left-6 md:bottom-10 md:left-10 border-b border-l',
  'bottom-6 right-6 md:bottom-10 md:right-10 border-b border-r',
]

const SPARKLES = [
  { top: '20%', left: '16%', delay: 0 },
  { top: '32%', left: '82%', delay: 0.7 },
  { top: '74%', left: '18%', delay: 1.3 },
  { top: '80%', left: '80%', delay: 0.3 },
  { top: '14%', left: '58%', delay: 1 },
  { top: '64%', left: '90%', delay: 1.8 },
]

// Full-viewport splash shown once on app boot, before anything else mounts.
// Depth comes from several layers riding shared --mx/--my CSS vars (glow,
// two counter-rotating rings, a mouse-tilted logo); the brand name and
// progress line sit below on a deep forest/brown backdrop so the pale
// logo medallion reads like a lit centerpiece rather than a flat icon.
const LoadingScreen = ({ onFinish }) => {
  const stageRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [exiting, setExiting] = useState(false)
  const reduceMotion = useRef(prefersReducedMotion()).current

  useEffect(() => {
    const img = new Image()
    img.src = LOGO_URL
    img.onload = () => setReady(true)
    img.onerror = () => setReady(true)
  }, [])

  useEffect(() => {
    let raf
    const startTime = performance.now()
    const minDuration = 2400

    const tick = (now) => {
      const pct = Math.min(1, (now - startTime) / minDuration)
      setProgress(pct)
      if (pct < 1 || !ready) {
        raf = requestAnimationFrame(tick)
      } else {
        setExiting(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--mx', '0')
    el.style.setProperty('--my', '0')
    if (!canHover()) return

    const setX = gsap.quickTo(el, '--mx', { duration: 0.8, ease: 'power3.out' })
    const setY = gsap.quickTo(el, '--my', { duration: 0.8, ease: 'power3.out' })

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      setX(Math.max(-1, Math.min(1, nx)))
      setY(Math.max(-1, Math.min(1, ny)))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 100% at 50% 32%, #5a4034 0%, #3b2a22 55%, #201510 100%)',
      }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.45, 0, 0.2, 1], delay: exiting ? 0.7 : 0 }}
      onAnimationComplete={() => {
        if (exiting) onFinish()
      }}
    >
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

      {CORNERS.map((pos) => (
        <motion.div
          key={pos}
          className={`pointer-events-none absolute h-10 w-10 border-gold/30 md:h-14 md:w-14 ${pos}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 1.1, delay: 0.5 }}
        />
      ))}

      {!reduceMotion &&
        SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold"
            style={{ top: s.top, left: s.left }}
            animate={
              exiting
                ? { opacity: 0 }
                : { opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }
            }
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

      <div
        ref={stageRef}
        className="relative flex flex-col items-center px-6"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="relative flex h-52 w-52 items-center justify-center md:h-64 md:w-64"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* far layer — ambient glow, drifts opposite the pointer */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px]"
            style={{
              transform:
                'translate(-50%, -50%) translate(calc(var(--mx, 0) * -24px), calc(var(--my, 0) * -24px))',
            }}
          >
            <motion.div
              className="h-full w-full rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(176,141,87,0.45) 0%, rgba(176,141,87,0) 70%)',
              }}
              animate={
                exiting
                  ? { scale: 1.8, opacity: 0 }
                  : reduceMotion
                    ? { scale: 1, opacity: 1 }
                    : { scale: [1, 1.12, 1], opacity: 1 }
              }
              transition={
                exiting
                  ? { duration: 1, ease: 'easeIn' }
                  : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </div>

          {/* mid layer — two counter-rotating gold rings */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px]"
            style={{
              transform:
                'translate(-50%, -50%) translate(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 16px))',
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border border-gold/50"
              animate={
                exiting
                  ? { scale: 2.2, opacity: 0, rotate: 120 }
                  : { rotate: reduceMotion ? 0 : 360 }
              }
              transition={
                exiting
                  ? { duration: 1, ease: 'easeIn' }
                  : { duration: 20, repeat: Infinity, ease: 'linear' }
              }
            />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px]"
            style={{
              transform:
                'translate(-50%, -50%) translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 10px))',
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border border-dashed border-gold/25"
              animate={
                exiting
                  ? { scale: 2.4, opacity: 0 }
                  : { rotate: reduceMotion ? 0 : -360 }
              }
              transition={
                exiting
                  ? { duration: 1, ease: 'easeIn' }
                  : { duration: 28, repeat: Infinity, ease: 'linear' }
              }
            />
          </div>

          {/* near layer — the logo medallion: idle float, pointer tilt, entrance/exit */}
          <div className={reduceMotion ? '' : 'animate-float'}>
            <div
              style={{
                transform:
                  'translate3d(calc(var(--mx, 0) * 28px), calc(var(--my, 0) * 28px), 0) rotateX(calc(var(--my, 0) * -8deg)) rotateY(calc(var(--mx, 0) * 8deg))',
              }}
            >
              <motion.div
                className="relative h-40 w-40 overflow-hidden rounded-full border-[3px] border-gold shadow-[0_0_60px_rgba(176,141,87,0.35)] md:h-52 md:w-52"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  exiting
                    ? { opacity: 0, scale: 2.6, filter: 'blur(10px)' }
                    : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                }
                transition={
                  exiting
                    ? { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    : { duration: 1.1, ease: 'easeOut' }
                }
              >
                <img
                  src={LOGO_URL}
                  alt="Éliseo Obea Salon"
                  className="h-full w-full scale-[1.15] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 md:mt-14"
          initial={{ opacity: 0, y: 14 }}
          animate={exiting ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-serif text-3xl uppercase tracking-luxe text-cream-50 sm:text-4xl md:text-5xl">
              Eliseo Aesthetics
            </span>
            <span className="font-script text-xl not-italic text-gold md:text-2xl">
              Beauty Lounge
            </span>
          </div>

          <div className="relative mt-4 h-[3px] w-56 overflow-hidden rounded-full bg-cream-50/15 md:w-72">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gold"
              style={{ width: `${pct}%` }}
            />
            <div className="shimmer-gold absolute inset-0 mix-blend-overlay opacity-50" />
          </div>
          <span className="font-sans text-xs tracking-luxe text-cream-50/70">
            {pct}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
