import { FiCheck, FiHome, FiClock, FiHeart } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Flourish from '../components/Flourish'
import ParallaxBg from '../components/ParallaxBg'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const perks = [
  {
    icon: FiHome,
    title: 'At Your Doorstep',
    text: 'Our artists bring the full lounge experience to your home, hotel or venue.',
  },
  {
    icon: FiClock,
    title: 'Flexible Scheduling',
    text: 'Book a time that suits you — mornings, evenings or last-minute events.',
  },
  {
    icon: FiHeart,
    title: 'Bridal & Group Ready',
    text: 'Perfect for bridal parties, celebrations and any occasion worth dressing up for.',
  },
]

const MobileService = () => {
  const { home } = useSiteData()
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end pb-16 px-6 md:px-10 bg-brown overflow-hidden">
        <ParallaxBg src={resolveImage(home.mobileServiceImages[0])} containerClassName="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brown/50 to-brown/70" />
        </ParallaxBg>
        <div className="relative max-w-7xl mx-auto w-full">
          <Reveal>
            <Eyebrow light>Eliseo To You</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl text-cream-50">
              Mobile <span className="italic text-gold">Beauty Service</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow center>At Your Doorstep</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              The Eliseo Experience, <span className="italic text-mauve">Wherever You Are</span>
            </h2>
            <Flourish className="mx-auto mb-6" />
            <p className="text-brown-soft font-light leading-relaxed">{home.mobileServiceSubtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-blush-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-10">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="text-center px-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-brown flex items-center justify-center mb-6">
                  <p.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl mb-3">{p.title}</h3>
                <p className="text-brown-soft font-light text-sm leading-relaxed">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 max-w-2xl mx-auto">
            <ul className="space-y-4">
              {[
                'Hair styling, colour touch-ups and blowouts',
                'Skin treatments and facials',
                'Bridal & event glam',
                'Waxing and grooming services',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-brown font-light">
                  <span className="w-6 h-6 rounded-full bg-brown text-gold flex items-center justify-center shrink-0">
                    <FiCheck size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>In Action</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              Moments From <span className="italic text-mauve">On-Location</span> Visits
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {home.mobileServiceImages.map((src, i) => (
              <Reveal key={src || i} delay={i * 0.08}>
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
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 px-6 text-center bg-brown overflow-hidden">
        <ParallaxBg src={resolveImage(home.ctaImage)} containerClassName="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brown/35 to-brown/55" />
        </ParallaxBg>
        <div className="absolute inset-4 md:inset-10 border border-gold/40 pointer-events-none" />
        <Reveal className="relative max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight mb-6">
            Bring <span className="italic text-gold">Eliseo</span> To You
          </h2>
          <p className="text-cream-50/75 font-light mb-10 max-w-lg mx-auto">
            Tell us your date, location and occasion, and we&apos;ll take care of the rest.
          </p>
          <Button to="/contact" variant="light">Book Mobile Service</Button>
        </Reveal>
      </section>
    </div>
  )
}

export default MobileService
