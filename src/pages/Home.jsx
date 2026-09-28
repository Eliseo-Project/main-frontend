import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiAward, FiHeart, FiUsers, FiStar, FiCheck, FiPlus } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Hero from '../components/Hero'
import PromoSlider from '../components/PromoSlider'
import TestimonialSlider from '../components/TestimonialSlider'
import AppointmentPopup from '../components/AppointmentPopup'
import ParallaxBg from '../components/ParallaxBg'
import ScrollStoryImage from '../components/ScrollStoryImage'
import DepthFrame from '../components/DepthFrame'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const marqueeWords = [
  'Hair Services',
  'Grooming',
  'Glam-Up',
  'Relax & Rejuvenate',
  'Waxing',
  'Luxury Redefined',
]

const features = [
  {
    icon: FiAward,
    title: 'Certified Experts',
    text: 'Our stylists and therapists are internationally trained in the latest techniques.',
  },
  {
    icon: FiHeart,
    title: 'Premium Products',
    text: 'Only the finest, cruelty-free formulations touch your hair and skin.',
  },
  {
    icon: FiUsers,
    title: 'Tranquil Ambience',
    text: 'A private, softly-lit sanctuary designed for complete relaxation.',
  },
  {
    icon: FiStar,
    title: 'Personalised Care',
    text: 'Every treatment is tailored to you — never a one-size-fits-all experience.',
  },
]

const Home = () => {
  const { categories, home } = useSiteData()
  return (
    <div>
      <AppointmentPopup />

      {/* HERO */}
      <Hero
        titleLine1={home.heroTitleLine1}
        titleLine2={home.heroTitleLine2}
        subtitle={home.heroSubtitle}
        backgroundImage={home.heroBackgroundImage}
      />

      {/* PROMOTIONS */}
      <PromoSlider />

      {/* MARQUEE */}
      <div className="relative bg-brown overflow-hidden py-5 border-y border-gold/30">
        <div className="flex w-max animate-marquee">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="flex items-center font-script italic text-2xl md:text-3xl text-gold mx-8 whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* WELCOME / ABOUT PREVIEW */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <DepthFrame frameClassName="absolute -top-6 -left-6 w-full h-full border border-gold hidden md:block">
            <ScrollStoryImage
              src={resolveImage(home.welcomeImage)}
              alt="Stylist at work inside Eliseo Beauty Lounge"
              containerClassName="w-full h-[420px] md:h-[520px] bg-blush"
              captionClassName="hidden md:flex absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-brown text-cream-50 flex-col items-center justify-center text-center border border-gold/40 shadow-[0_20px_50px_rgba(59,42,34,0.35)]"
              caption={
                <>
                  <span className="font-serif text-3xl text-gold">8+</span>
                  <span className="text-[10px] tracking-luxe uppercase mt-1 text-cream-50/70 leading-tight px-4">
                    Years of Artistry
                  </span>
                </>
              }
              tilt
            />
          </DepthFrame>

          <Reveal direction="left" delay={0.1}>
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              Where Beauty Meets <span className="italic text-mauve">Warmth</span>
            </h2>
            <p className="text-brown-soft font-light leading-relaxed mb-8 max-w-lg">
              Eliseo Beauty Lounge was founded on a simple belief — that true luxury lies
              in stillness, precision and care. Every treatment here is unhurried,
              performed by artists devoted to their craft, in a space designed to
              quiet the mind as much as it transforms the look.
            </p>
            <ul className="space-y-4 mb-10">
              {['Internationally certified specialists', 'Curated premium product houses', 'Private, softly-lit treatment suites'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-brown font-light">
                    <span className="w-6 h-6 rounded-full bg-brown text-gold flex items-center justify-center shrink-0">
                      <FiCheck size={13} />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Button to="/about" variant="outline">Discover Our Story</Button>
          </Reveal>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-cream-50">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow center>What We Care For</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Nurtured From <span className="italic text-mauve">Root To Tip</span>
          </h2>
        </Reveal>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 md:gap-12">
          {['Hair', 'Skin', 'Nails'].map((label, i) => (
            <Reveal key={label} delay={i * 0.1} className="flex flex-col items-center text-center group">
              <motion.img
                src="/images/leaf-outline.png"
                alt=""
                className="w-16 md:w-20 mb-4"
                animate={{ rotate: [0, -8, 0, 8, 0], y: [0, -6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.3 } }}
              />
              <span className="font-serif text-lg md:text-xl text-brown mb-2">{label}</span>
              <span className="h-[3px] w-8 bg-gold rounded-full transition-all duration-300 group-hover:w-14" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SIGNATURE SERVICES */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-blush-light">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>What We Offer</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              Our Signature <span className="italic text-mauve">Services</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.08}>
                <Link
                  to={`/services#${cat.slug}`}
                  className="group relative block h-96"
                >
                  <ParallaxBg
                    src={resolveImage(cat.image)}
                    fallbackColor="#907275"
                    hoverZoom
                    tilt
                    containerClassName="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/95 via-brown/40 to-brown/5" />
                  </ParallaxBg>
                  <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/70 transition-all duration-500 pointer-events-none" />
                  <span className="absolute top-5 left-5 font-serif italic text-gold/90 text-sm tracking-wide">
                    0{i + 1}
                  </span>
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <span className="h-px w-8 bg-gold mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <h3 className="font-serif text-xl text-cream-50 mb-1">{cat.name}</h3>
                    <p className="text-cream-50/70 text-xs font-light mb-3 leading-relaxed">
                      {cat.tagline}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-xs tracking-luxe uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View services <FiArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>Why Eliseo</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              The <span className="italic text-mauve">Difference</span> You Feel
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className="text-center px-2 group">
                <div className="relative w-16 h-16 mx-auto rounded-full bg-brown flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-gold/50 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-500" />
                  <f.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl mb-3">{f.title}</h3>
                <p className="text-brown-soft font-light text-sm leading-relaxed">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE SERVICE */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-blush-light">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow center>At Your Doorstep</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              Eliseo To You <span className="italic text-mauve">Mobile Service</span>
            </h2>
            <p className="text-brown-soft font-light leading-relaxed max-w-xl mx-auto">
              {home.mobileServiceSubtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {home.mobileServiceImages.slice(0, 3).map((src, i) => (
              <Reveal
                key={src || i}
                delay={i * 0.08}
                className={i === 0 ? 'col-span-2 md:col-span-1' : ''}
              >
                <div className="group relative h-56 md:h-72">
                  <ParallaxBg
                    src={resolveImage(src)}
                    fallbackColor="#D5C6CB"
                    hoverZoom
                    containerClassName="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/30 transition-colors duration-500" />
                  </ParallaxBg>
                  <div className="absolute inset-2.5 border border-gold/0 group-hover:border-gold/70 transition-all duration-500 pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <Button to="/mobile-service" variant="outline">
              <span className="inline-flex items-center gap-2">
                Explore More <FiArrowRight size={14} />
              </span>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>The Gallery</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              Moments of <span className="italic text-mauve">Elegance</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-40 gap-4">
            {home.galleryImages.map((src, i) => (
              <Reveal
                key={src || i}
                delay={i * 0.06}
                className={
                  i === 0
                    ? 'md:col-span-2 md:row-span-2'
                    : i === 3
                    ? 'md:col-span-2'
                    : ''
                }
              >
                <div className="group relative h-72 md:h-full">
                  <ParallaxBg
                    src={resolveImage(src)}
                    fallbackColor="#D5C6CB"
                    hoverZoom
                    containerClassName="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/40 transition-colors duration-500" />
                  </ParallaxBg>
                  <div className="absolute inset-2.5 border border-gold/0 group-hover:border-gold/70 transition-all duration-500 pointer-events-none" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cream-50/70 text-cream-50 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                    <FiPlus size={16} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-blush-light">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>Client Love</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              Loved By Those <span className="italic text-mauve">We Pamper</span>
            </h2>
          </Reveal>
          <Reveal>
            <TestimonialSlider />
          </Reveal>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-28 md:py-36 px-6 text-center bg-brown overflow-hidden">
        <ParallaxBg src={resolveImage(home.ctaImage)} containerClassName="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brown/35 to-brown/55" />
        </ParallaxBg>
        <div className="absolute inset-4 md:inset-10 border border-gold/40 pointer-events-none" />
        <Reveal className="relative max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight mb-6">
            Ready to experience <span className="italic text-gold">Eliseo</span>?
          </h2>
          <p className="text-cream-50/75 font-light mb-10 max-w-lg mx-auto">
            Step into Eliseo Beauty Lounge and let our artists craft an experience made
            entirely for you.
          </p>
          <Button to="/contact" variant="light">Book Appointment</Button>
        </Reveal>
      </section>
    </div>
  )
}

export default Home
