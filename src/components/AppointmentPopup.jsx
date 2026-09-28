import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPhoneCall, FiX } from 'react-icons/fi'
import Flourish from './Flourish'

const HOTLINE = '011 200 0000'

const AppointmentPopup = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('appointmentPopupShown')) return
    const timer = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('appointmentPopupShown', '1')
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-brown/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-md bg-cream-50/70 backdrop-blur-xl border border-gold/40 px-8 py-12 text-center shadow-[0_30px_80px_rgba(59,42,34,0.35)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brown/60 hover:text-brown transition-colors"
            >
              <FiX size={18} />
            </button>

            <div className="flex justify-center mb-5">
              <Flourish />
            </div>

            <p className="text-[11px] tracking-luxe uppercase text-mauve mb-3">
              Reserve Your Visit
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-brown leading-tight mb-4">
              Make an <span className="italic text-brown font-semibold">Appointment</span>
            </h3>
            <p className="text-brown-soft font-light text-sm mb-8">
              Call our hotline and let us schedule your next visit to Eliseo Beauty Lounge.
            </p>

            <a
              href={`tel:${HOTLINE.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-3 w-full bg-brown text-cream-50 px-6 py-4 tracking-luxe uppercase text-sm hover:bg-forest transition-colors duration-300"
            >
              <FiPhoneCall size={16} />
              {HOTLINE}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default AppointmentPopup
