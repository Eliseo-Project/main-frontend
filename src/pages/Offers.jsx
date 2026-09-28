import { FiClock } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Flourish from '../components/Flourish'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const bg = (url) => ({
  backgroundImage: `linear-gradient(180deg, rgba(59,42,34,0.45), rgba(59,42,34,0.65)), url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const Offers = () => {
  const { offers } = useSiteData()
  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-[50vh] flex items-end pb-16 px-6 md:px-10 bg-brown"
        style={bg('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=80')}
      >
        <div className="max-w-7xl mx-auto w-full">
          <Reveal>
            <Eyebrow light>Offers</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl text-cream-50">
              Seasonal <span className="italic text-gold">Indulgences</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* OFFERS GRID */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>Limited Time</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              Curated <span className="italic text-mauve">Offers</span> For You
            </h2>
            <Flourish />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <Reveal key={offer.id || offer.title} delay={i * 0.08}>
                <div className="group relative h-full flex flex-col overflow-hidden border border-blush hover:border-gold/70 transition-colors duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${resolveImage(offer.image)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#D5C6CB',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-brown text-gold text-xs tracking-luxe uppercase px-3 py-1.5">
                      {offer.tag}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col p-6 bg-cream-50">
                    <h3 className="font-serif text-xl mb-2">{offer.title}</h3>
                    <p className="text-brown-soft font-light text-sm leading-relaxed mb-5 flex-1">
                      {offer.description}
                    </p>
                    <p className="flex items-center gap-1.5 text-brown-faint text-xs font-light">
                      <FiClock size={12} /> {offer.validUntil}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-28 md:py-32 px-6 text-center bg-brown"
        style={bg('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=80')}
      >
        <div className="absolute inset-4 md:inset-10 border border-gold/40 pointer-events-none" />
        <Reveal className="relative max-w-2xl mx-auto">
          <Eyebrow gold center>Don&apos;t Miss Out</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight mb-6">
            Treat Yourself <span className="italic text-gold">Today</span>
          </h2>
          <p className="text-cream-50/75 font-light mb-10 max-w-lg mx-auto">
            Offers are seasonal and subject to availability — reserve your spot before
            it&apos;s gone.
          </p>
          <Button to="/contact" variant="light">Book Now</Button>
        </Reveal>
      </section>
    </div>
  )
}

export default Offers
