import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-background/80 backdrop-blur-md border-b',
          scrolled ? 'border-border shadow-soft' : 'border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="font-heading font-bold text-xl text-foreground tracking-tight shrink-0 select-none"
          >
            Aleson
          </a>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent rounded-full group-hover:w-full transition-all duration-250" />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
                'border border-border text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {theme === 'dark'
                ? <Sun size={15} strokeWidth={2} />
                : <Moon size={15} strokeWidth={2} />
              }
            </button>

            {/* CTA — desktop */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="hidden md:inline-flex items-center gap-1.5 btn-accent"
            >
              Let's Talk
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[72px] z-40 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-card-hover p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                className="btn-accent w-full justify-center"
              >
                Let's Talk <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
