// Talks to the salon-admin backend. If it isn't running, callers fall back
// to the static defaults baked into SiteDataContext, so the site keeps working.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const resolveImage = (src) => {
  if (!src) return ''
  return src.startsWith('/uploads') ? `${API_URL}${src}` : src
}

export const fetchSiteData = async () => {
  const res = await fetch(`${API_URL}/api/site-data`)
  if (!res.ok) throw new Error('Failed to load site data')
  return res.json()
}
