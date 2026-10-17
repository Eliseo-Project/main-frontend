import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Eyebrow from './Eyebrow'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const PromoSlider = () => {
  const { offers } = useSiteData()
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (e) => {
    const el = trackRef.current
    drag.current = { active: true, moved: false, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    setIsDragging(true)
  }

  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const el = trackRef.current
    const x = e.pageX - el.offsetLeft
    const walk = x - drag.current.startX
    if (Math.abs(walk) > 5) drag.current.moved = true
    el.scrollLeft = drag.current.scrollLeft - walk
  }

  const endDrag = () => {
    drag.current.active = false
    setIsDragging(false)
  }

  if (!offers?.length) return null

  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-20 border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10 text-center">
        <Eyebrow gold center>Special Offers</Eyebrow>
        <h2 className="font-serif text-3xl md:text-5xl text-brown leading-tight">
          Promotions Worth <span className="italic text-gold">Indulging In</span>
        </h2>
        <p className="mt-3 text-brown-faint text-xs tracking-luxe uppercase">Drag to explore</p>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`flex items-start gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-10 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {offers.map((offer, i) => (
            <div
              key={offer.id || i}
              role="link"
              tabIndex={0}
              onClick={() => !drag.current.moved && navigate('/offers')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/offers')}
              className="group w-64 md:w-72 shrink-0 snap-start"
            >
              <div className="relative overflow-hidden bg-blush-light">
                <img
                  src={resolveImage(offer.image)}
                  alt={offer.title}
                  draggable={false}
                  className="block w-full h-auto pointer-events-none transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-2 border border-gold/30 pointer-events-none" />

                <span className="absolute top-4 right-4 bg-gold text-brown text-[10px] font-medium tracking-luxe uppercase px-3 py-1 pointer-events-none">
                  {offer.tag}
                </span>
              </div>

              <div className="pt-4 pointer-events-none">
                <h3 className="font-serif text-lg md:text-xl text-brown mb-1 leading-snug">
                  {offer.title}
                </h3>
                <p className="text-brown-faint text-xs font-light">{offer.validUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoSlider
