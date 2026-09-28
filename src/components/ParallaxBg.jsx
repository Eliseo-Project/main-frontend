import { useEffect, useId, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useTilt } from '../lib/useTilt'

// A CSS background-image panel that wipes into view on scroll, drifts as the
// page scrolls past it, and gently zooms on hover — for card/banner photos
// that carry overlay content (text, badges, gradients) as children.
// `tilt` adds a cursor-driven 3D tilt to the whole card; `ripple` adds an
// SVG-shader liquid-distortion sweep across the photo on hover.
const ParallaxBg = ({
  src,
  containerClassName = '',
  bgClassName = '',
  parallax = true,
  parallaxAmount = 10,
  hoverZoom = false,
  tilt = false,
  ripple = false,
  fallbackColor,
  children,
}) => {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const dispRef = useRef(null)
  const rawFilterId = useId()
  const filterId = `ripple-${rawFilterId.replace(/[^a-zA-Z0-9]/g, '')}`

  useTilt(containerRef, { enabled: tilt })

  useEffect(() => {
    const container = containerRef.current
    const bg = bgRef.current
    if (!container || !bg) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
          },
        },
      )

      if (parallax) {
        gsap.fromTo(
          bg,
          { yPercent: -parallaxAmount },
          {
            yPercent: parallaxAmount,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      if (hoverZoom || ripple) {
        const enter = () => {
          if (hoverZoom) gsap.to(bg, { scale: 1.1, duration: 0.7, ease: 'power3.out' })
          if (ripple && dispRef.current) {
            gsap.to(dispRef.current, { attr: { scale: 42 }, duration: 0.7, ease: 'power3.out' })
          }
        }
        const leave = () => {
          if (hoverZoom) gsap.to(bg, { scale: 1, duration: 0.7, ease: 'power3.out' })
          if (ripple && dispRef.current) {
            gsap.to(dispRef.current, { attr: { scale: 0 }, duration: 0.6, ease: 'power2.out' })
          }
        }
        container.addEventListener('mouseenter', enter)
        container.addEventListener('mouseleave', leave)
        return () => {
          container.removeEventListener('mouseenter', enter)
          container.removeEventListener('mouseleave', leave)
        }
      }
    }, container)

    return () => ctx.revert()
  }, [parallax, parallaxAmount, hoverZoom, ripple])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
      style={
        tilt
          ? {
              transform:
                'perspective(1000px) rotateX(calc(var(--my, 0) * -6deg)) rotateY(calc(var(--mx, 0) * 6deg))',
              willChange: 'transform',
            }
          : undefined
      }
    >
      <div
        ref={bgRef}
        className={`absolute top-[-15%] left-0 h-[130%] w-full ${bgClassName}`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: fallbackColor,
          filter: ripple ? `url(#${filterId})` : undefined,
        }}
      />
      {ripple && (
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      {children}
    </div>
  )
}

export default ParallaxBg
