import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useTilt } from '../lib/useTilt'

// A photograph that wipes into view on scroll and drifts gently as the page
// scrolls past it — for standalone <img> elements (portrait/editorial shots).
// `tilt` adds a cursor-driven 3D tilt on top of the scroll behaviour.
const ParallaxImage = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  parallax = true,
  parallaxAmount = 10,
  tilt = false,
}) => {
  const containerRef = useRef(null)
  const imgRef = useRef(null)

  useTilt(containerRef, { enabled: tilt })

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          },
        },
      )

      if (parallax) {
        gsap.fromTo(
          img,
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
    }, container)

    return () => ctx.revert()
  }, [parallax, parallaxAmount])

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
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute top-[-15%] left-0 h-[130%] w-full object-cover ${className}`}
      />
    </div>
  )
}

export default ParallaxImage
