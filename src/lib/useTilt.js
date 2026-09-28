import { useEffect } from 'react'
import { gsap } from './gsap'

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Tracks the pointer position within an element and writes it to --mx/--my
// CSS custom properties (each spring-eased into [-1, 1]). Consumers read
// the variables in their own transform/calc() expressions, so the same
// tracked values can drive several layers at once — e.g. a photo tilting
// less than the decorative frame behind it — for a simple parallax-depth
// illusion with no extra listeners.
export const useTilt = (ref, { enabled = true } = {}) => {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || !canHover()) return

    el.style.setProperty('--mx', '0')
    el.style.setProperty('--my', '0')

    const setX = gsap.quickTo(el, '--mx', { duration: 0.6, ease: 'power3.out' })
    const setY = gsap.quickTo(el, '--my', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      setX(Math.max(-1, Math.min(1, nx)))
      setY(Math.max(-1, Math.min(1, ny)))
    }
    const onLeave = () => {
      setX(0)
      setY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, enabled])
}
