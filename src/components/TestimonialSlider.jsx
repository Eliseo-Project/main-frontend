import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useSiteData } from '../context/SiteDataContext'

const TestimonialSlider = () => {
  const { testimonials } = useSiteData()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [paused, testimonials.length])

  const go = (dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]
  if (!current) return null

  return (
    <div
      className="relative max-w-3xl mx-auto text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-7xl font-serif text-gold leading-none select-none">&ldquo;</div>

      <div className="min-h-[180px] md:min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <p className="font-script italic text-xl md:text-2xl text-brown leading-relaxed px-4">
              {current.quote}
            </p>
            <p className="mt-6 font-sans text-sm tracking-luxe uppercase text-mauve">
              {current.name}
            </p>
            <p className="text-xs text-brown-faint font-light mt-1">{current.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-brown/30 flex items-center justify-center hover:bg-brown hover:text-cream-50 transition-colors"
        >
          <FiChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-gold' : 'w-1.5 bg-rose/50'
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-brown/30 flex items-center justify-center hover:bg-brown hover:text-cream-50 transition-colors"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default TestimonialSlider
