import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiSend } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const bg = (url) => ({
  backgroundImage: `linear-gradient(180deg, rgba(59,42,34,0.45), rgba(59,42,34,0.65)), url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const initialForm = { name: '', email: '', phone: '', service: '', date: '', time: '', message: '' }

const ContactUs = () => {
  const { contact } = useSiteData()
  const infoCards = [
    { icon: FiMapPin, title: 'Visit Us', lines: contact.address.split(', ') },
    { icon: FiPhone, title: 'Call Us', lines: [contact.phone, contact.phone2].filter(Boolean) },
    { icon: FiMail, title: 'Email Us', lines: [contact.email] },
    { icon: FiClock, title: 'Opening Hours', lines: [contact.hoursLine1, contact.hoursLine2].filter(Boolean) },
  ]
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.service) {
      setError('Please fill in your name, email and required service.')
      return
    }
    setError('')
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm(initialForm)
    }, 1200)
  }

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-[50vh] flex items-end pb-28 md:pb-32 px-6 md:px-10 bg-brown"
        style={bg(resolveImage(contact.heroImage))}
      >
        <div className="max-w-7xl mx-auto w-full">
          <Reveal>
            <Eyebrow light>Contact Us</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl text-cream-50">
              Let&apos;s Begin Your <span className="italic text-rose">Journey</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="px-6 md:px-10 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="bg-cream-50 shadow-[0_10px_40px_rgba(59,42,34,0.1)] p-8 h-full border border-blush">
                <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center mb-5">
                  <card.icon size={18} className="text-mauve" />
                </div>
                <h3 className="font-serif text-lg mb-2">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-brown-soft text-sm font-light leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal direction="right">
            <Eyebrow>Send a Message</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Book Your <span className="italic text-mauve">Appointment</span>
            </h2>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blush-light border border-rose p-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-rose/40 text-forest flex items-center justify-center mx-auto mb-5">
                    <FiCheck size={22} />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">Thank You</h3>
                  <p className="text-brown-soft font-light">
                    Your message has been received. Our team will reach out shortly to
                    confirm your appointment.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-xs tracking-luxe uppercase text-mauve underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Required Service
                      </label>
                      <input
                        type="text"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        placeholder="e.g. Hair Colouring"
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Perfect Date <span className="normal-case text-brown-faint/60">(optional)</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors text-brown-soft"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                        Perfect Time <span className="normal-case text-brown-faint/60">(optional)</span>
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors text-brown-soft"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-luxe uppercase text-brown-faint mb-2">
                      Message <span className="normal-case text-brown-faint/60">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us what you're looking for..."
                      className="w-full bg-transparent border-b border-brown/25 py-3 font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-mauve text-sm">{error}</p>}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ letterSpacing: '0.32em' }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-3 bg-brown text-cream-50 px-9 py-4 text-xs tracking-luxe uppercase hover:bg-forest transition-colors disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                    <FiSend size={13} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="h-[420px] md:h-[560px] w-full border border-blush overflow-hidden">
              <iframe
                title="Eliseo Beauty Lounge Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(15%) contrast(1.05)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
