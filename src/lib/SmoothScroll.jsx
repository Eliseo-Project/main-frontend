import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

// Drives inertia/smooth scrolling for the whole app and keeps GSAP's
// ScrollTrigger (used for pinned/scrubbed sections like the Hero) in sync
// with Lenis's virtual scroll position instead of the native one.
const SmoothScroll = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    window.lenis = lenis

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  useEffect(() => {
    window.lenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return children
}

export default SmoothScroll
