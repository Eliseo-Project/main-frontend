import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

const Counter = ({ to, suffix = '', duration = 2 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(to)
    }
  }, [isInView, motionValue, to])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest).toString() + suffix
        }
      }),
    [springValue, suffix],
  )

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      0{suffix}
    </motion.span>
  )
}

export default Counter
