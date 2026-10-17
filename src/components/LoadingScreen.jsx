import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'

const LOGO_URL = '/images/eliseo-logo.png'

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
// two counter-rotating rings, a mouse-tilted logo); the progress line sits below on a deep brown
// backdrop so the gold-rimmed logo medallion reads like a lit centerpiece.
const LoadingScreen = ({ onFinish }) => {
  const stageRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const reduceMotion = useRef(prefersReducedMotion()).current

  useEffect(() => {
    let raf
    const startTime = performance.now()
    const minDuration = 2400

    const tick = (now) => {
      const pct = Math.min(1, (now - startTime) / minDuration)
      setProgress(pct)
      if (pct < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setExiting(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

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
          className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80"
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] md:h-[340px] md:w-[340px]"
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] md:h-[400px] md:w-[400px]"
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
                className="relative h-56 w-56 overflow-hidden rounded-full border-[3px] border-gold bg-[#19464b] shadow-[0_0_60px_rgba(176,141,87,0.35)] md:h-72 md:w-72"
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
                <img src={LOGO_URL} alt="Eliseo Beauty Lounge" className="h-full w-full object-cover" />
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
          <div className="relative h-[3px] w-56 overflow-hidden rounded-full bg-cream-50/15 md:w-72">
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
