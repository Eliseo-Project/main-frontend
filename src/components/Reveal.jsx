import { motion } from 'framer-motion'

const directions = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  once = true,
}) => {
  const Component = motion[as] || motion.div
  const offset = directions[direction] || directions.up

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

export default Reveal
