import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './lib/SmoothScroll'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Offers from './pages/Offers'
import MobileService from './pages/MobileService'
import ContactUs from './pages/ContactUs'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />
  }

  return (
    <SmoothScroll>
      <div className="bg-cream min-h-screen overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutUs />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/offers"
              element={
                <PageTransition>
                  <Offers />
                </PageTransition>
              }
            />
            <Route
              path="/mobile-service"
              element={
                <PageTransition>
                  <MobileService />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactUs />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
