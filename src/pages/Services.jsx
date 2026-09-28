import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import ParallaxImage from '../components/ParallaxImage'
import ParallaxBg from '../components/ParallaxBg'
import DepthFrame from '../components/DepthFrame'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const Services = () => {
  const { categories } = useSiteData()
  const [active, setActive] = useState(categories[0]?.slug)
  const [query, setQuery] = useState('')
  const sectionRefs = useRef({})

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories

    return categories
      .map((cat) => ({
        ...cat,
        subCategories: cat.subCategories
          .map((sub) => ({
            ...sub,
            items: sub.items.filter((item) => item.name.toLowerCase().includes(q)),
          }))
          .filter((sub) => sub.items.length > 0),
      }))
      .filter((cat) => cat.subCategories.length > 0)
  }, [categories, query])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end pb-16 px-6 md:px-10 bg-brown overflow-hidden">
        <ParallaxBg
          src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1800&q=80"
          containerClassName="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brown/45 to-brown/65" />
        </ParallaxBg>
        <div className="relative max-w-7xl mx-auto w-full">
          <Reveal>
            <Eyebrow light>Our Services</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl text-cream-50">
              A Treatment For <span className="italic text-rose">Every Need</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* STICKY CATEGORY NAV */}
      <div className="sticky top-[72px] md:top-[84px] z-30 bg-cream-50/95 backdrop-blur-md border-b border-blush">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-4">
            <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar">
              {filteredCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className={`whitespace-nowrap text-xs md:text-sm tracking-luxe uppercase pb-1 border-b transition-colors ${
                    active === cat.slug
                      ? 'text-mauve border-mauve'
                      : 'text-brown-faint border-transparent hover:text-brown'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>

            <div className="relative sm:ml-auto w-full sm:w-64 shrink-0">
              <FiSearch size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-brown-faint" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a service..."
                className="w-full bg-transparent border-b border-brown/25 pl-6 pr-6 py-2 text-sm font-light placeholder:text-brown-faint/60 focus:outline-none focus:border-mauve transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-brown-faint hover:text-brown"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NO RESULTS */}
      {query && filteredCategories.length === 0 && (
        <div className="py-24 px-6 text-center">
          <p className="text-brown-soft font-light">
            No services found for &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}

      {/* CATEGORY SECTIONS */}
      {filteredCategories.map((cat, index) => (
        <section
          key={cat.slug}
          id={cat.slug}
          ref={(el) => (sectionRefs.current[cat.slug] = el)}
          className={`py-20 md:py-28 px-6 md:px-10 scroll-mt-40 ${
            index % 2 === 1 ? 'bg-blush-light' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <Reveal
              direction={index % 2 === 1 ? 'left' : 'right'}
              className="lg:col-span-2 lg:sticky lg:top-52"
            >
              <DepthFrame frameClassName="absolute -top-5 -left-5 w-full h-full border border-rose-dark hidden lg:block">
                <ParallaxImage
                  src={resolveImage(cat.image)}
                  alt={cat.name}
                  containerClassName="relative w-full h-64 md:h-80 bg-blush"
                  tilt
                />
              </DepthFrame>

              {cat.images?.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4 mb-6">
                  {cat.images.map((img, i) => (
                    <ParallaxImage
                      key={img || i}
                      src={resolveImage(img)}
                      alt={`${cat.name} ${i + 2}`}
                      containerClassName="relative h-20 md:h-24 bg-blush"
                    />
                  ))}
                </div>
              )}

              <Eyebrow>{`0${index + 1}`}</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">{cat.name}</h2>
              <p className="text-brown-soft font-light leading-relaxed">{cat.tagline}</p>
            </Reveal>

            <div className="lg:col-span-3 space-y-12">
              {cat.subCategories.map((sub, si) => (
                <Reveal key={sub.slug} delay={si * 0.05}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-8 bg-gold" />
                    <h3 className="font-serif text-lg md:text-xl italic text-mauve">
                      {sub.name}
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {sub.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-4 py-3 border-b border-brown/10"
                      >
                        <h4 className="font-serif text-base md:text-lg">{item.name}</h4>
                        <span className="font-serif text-mauve text-base md:text-lg whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-28 md:py-32 px-6 text-center bg-brown overflow-hidden">
        <ParallaxBg
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1800&q=80"
          containerClassName="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brown/45 to-brown/65" />
        </ParallaxBg>
        <Reveal className="relative max-w-2xl mx-auto">
          <Eyebrow light center>Not Sure Where to Start?</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-50 leading-tight mb-6">
            Let Our Artists <span className="italic text-rose">Guide You</span>
          </h2>
          <p className="text-cream-50/75 font-light mb-10 max-w-lg mx-auto">
            Book a complimentary consultation and we&apos;ll design the perfect treatment
            for your needs.
          </p>
          <Button to="/contact" variant="light">Book a Consultation</Button>
        </Reveal>
      </section>
    </div>
  )
}

export default Services
