import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          if (window.lenis) window.lenis.scrollTo(el, { offset: -100 })
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
        return
      }
    }
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
