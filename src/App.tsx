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

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="bg-background text-foreground min-h-screen font-sans antialiased">
      {/* Custom cursor — above everything, outside stacking contexts */}
      <CustomCursor />

      {/* Fixed background layer — blobs, particles, cursor glow */}
      <BackgroundEffects />

      {/* Page content sits above the background layer */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar theme={theme} toggleTheme={toggle} />
        <main>
          <Hero />
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
