import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/offers', label: 'Offers' },
  { to: '/mobile-service', label: 'Mobile Service' },
  { to: '/contact', label: 'Contact Us' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const solid = scrolled || open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-cream-50/95 backdrop-blur-md shadow-[0_2px_20px_rgba(59,42,34,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between py-5">
          <NavLink to="/" className="flex flex-col leading-none">
            <span
              className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors ${
                solid ? 'text-brown' : 'text-cream-50'
              }`}
            >
              Eliseo
            </span>
            <span
              className={`font-sans text-[10px] md:text-xs tracking-luxe mt-1 transition-colors ${
                solid ? 'text-mauve' : 'text-cream-50/80'
              }`}
            >
              Beauty Lounge
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative font-sans text-sm tracking-wider uppercase pb-1 transition-colors group ${
                    solid ? 'text-brown' : 'text-cream-50'
                  } ${isActive ? 'font-medium' : 'font-light'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px bg-current transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button to="/contact" variant={solid ? 'primary' : 'ghost'} className="!py-3 !px-6">
              Book Now
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-end justify-center"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6.5, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className={`h-px block ${solid ? 'bg-brown' : 'bg-cream-50'}`}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={`h-px block w-2/3 ${solid ? 'bg-brown' : 'bg-cream-50'}`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6.5, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className={`h-px block w-1/2 ${solid ? 'bg-brown' : 'bg-cream-50'}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-cream-50 border-t border-blush"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `font-serif text-2xl ${isActive ? 'text-mauve' : 'text-brown'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button to="/contact" variant="primary" className="mt-2 w-fit">
                Book Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
