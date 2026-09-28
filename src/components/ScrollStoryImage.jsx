import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useTilt } from '../lib/useTilt'

// A scroll-staged image reveal, like liquid filling a glass as you scroll:
// 0-70% the image fills into view, 70-85% a soft glow sweeps across it,
// 85-100% the caption (badge/text) arrives. One timeline, scrubbed 1:1 to
// scroll position through the section. `tilt` layers a cursor-driven 3D
// tilt on top, once the reveal has settled.
const ScrollStoryImage = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  caption,
  captionClassName = '',
  tilt = false,
}) => {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const captionRef = useRef(null)

  useTilt(containerRef, { enabled: tilt })

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 15%',
          scrub: 0.6,
        },
      })

      tl.fromTo(
        img,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'none' },
        0,
      ).fromTo(img, { scale: 1.15 }, { scale: 1, duration: 0.7, ease: 'none' }, 0)

      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.15, ease: 'none' },
          0.7,
        )
      }

      if (captionRef.current) {
        tl.fromTo(
          captionRef.current,
          { opacity: 0, y: 24, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: 'none' },
          0.85,
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={
        tilt
          ? {
              transform:
                'perspective(1000px) rotateX(calc(var(--my, 0) * -5deg)) rotateY(calc(var(--mx, 0) * 5deg))',
              willChange: 'transform',
            }
          : undefined
      }
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${className}`}
        />
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background: 'radial-gradient(circle at 50% 15%, rgba(255,255,255,0.4), transparent 60%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
      {caption && (
        <div ref={captionRef} className={captionClassName} style={{ opacity: 0 }}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default ScrollStoryImage
