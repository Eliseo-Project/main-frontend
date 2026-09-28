import { createContext, useContext, useEffect, useState } from 'react'
import { fetchSiteData } from '../lib/api'
import { categories as staticCategories } from '../data/services'
import { offers as staticOffers } from '../data/offers'
import { team as staticTeam } from '../data/team'
import { testimonials as staticTestimonials } from '../data/testimonials'

// These mirror the admin panel's seed data — used until (or unless) the
// salon-admin backend responds, so the site always renders something sensible.
const defaultAbout = {
  heroImage: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=1800&q=80',
  storyImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
  storyHeading: 'Born From a Love of Quiet Luxury',
  storyParagraph1:
    'Eliseo Beauty Lounge began with a simple frustration — that true, unhurried luxury was becoming hard to find. Our founder envisioned a lounge where every client is treated as the only client; where hair, skin and self-care treatments are performed with the patience of an artisan, not the pace of an assembly line.',
  storyParagraph2:
    'Today, that vision lives on across every treatment room — from our signature hair studio to our private waxing suites — each designed to let you exhale the moment you walk in.',
  values: [
    { icon: 'feather', title: 'Artistry', text: 'Every service is treated as a craft — precise, intentional, and personal to you.' },
    { icon: 'heart', title: 'Care', text: 'We listen first. Your comfort and confidence guide every treatment we perform.' },
    { icon: 'shield', title: 'Integrity', text: 'Honest advice, premium products, and hygiene standards you can always trust.' },
  ],
  missionQuote:
    'Our mission is to give every guest an unhurried hour of beauty, calm and confidence — in a space as considered as the care we give.',
}

const defaultHome = {
  heroTitleLine1: 'Eliseo',
  heroTitleLine2: 'Beauty Lounge',
  heroSubtitle:
    'A warm and welcoming space where quiet luxury meets genuine care — pairing expert beauty with personal attention to make every visit feel meaningful.',
  heroBackgroundImage: '',
  welcomeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80',
  ctaImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=80',
  galleryImages: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  ],
  mobileServiceSubtitle:
    "Can't make it to the lounge? Bring the Eliseo experience home. Our mobile beauty team brings premium hair, skin and glam services directly to your doorstep — perfect for bridal parties, events, or a pampering session without leaving home.",
  mobileServiceImages: [
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
  ],
}

const defaultContact = {
  address: '24 Rosewood Avenue, Colombo 07, Sri Lanka',
  phone: '+94 77 123 4567',
  phone2: '+94 11 234 5678',
  email: 'hello@eliseobeautylounge.com',
  hoursLine1: 'Mon – Sat: 9.00 am to 6.00 pm',
  hoursLine2: 'Sunday: Closed',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  mapQuery: 'Colombo 07, Sri Lanka',
  heroImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1800&q=80',
}

const defaultData = {
  categories: staticCategories,
  offers: staticOffers,
  team: staticTeam,
  testimonials: staticTestimonials,
  about: defaultAbout,
  home: defaultHome,
  contact: defaultContact,
}

const SiteDataContext = createContext(defaultData)

export const SiteDataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    let cancelled = false
    fetchSiteData()
      .then((fetched) => {
        if (cancelled) return
        setData((prev) => ({ ...prev, ...fetched }))
      })
      .catch(() => {
        // Admin backend not running — keep the static defaults.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
}

export const useSiteData = () => useContext(SiteDataContext)
