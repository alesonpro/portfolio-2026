import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import BackgroundEffects from '@/components/BackgroundEffects'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import SkillsBar from '@/components/SkillsBar'
import Services from '@/components/Services'
import Work from '@/components/Work'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import SectionNav from '@/components/SectionNav'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loaded, setLoaded] = useState(false)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis()
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-background text-foreground min-h-screen font-sans antialiased">
      {/* Grain / noise overlay — fixed, above all content */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Preloader */}
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Section dot nav — fixed right side, desktop only */}
      <SectionNav />

      {/* Custom cursor — above everything, outside stacking contexts */}
      <CustomCursor />

      {/* Fixed background layer — blobs, particles, cursor glow */}
      <BackgroundEffects />

      {/* Page content sits above the background layer */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar theme={theme} toggleTheme={toggle} />
        <main>
          <Hero loaded={loaded} />
          <TrustBar />
          <SkillsBar />
          <Services />
          <Work />
          <About />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
