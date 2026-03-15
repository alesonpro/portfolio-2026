import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="font-heading font-bold text-lg text-foreground">Aleson</span>
            <span className="text-xs text-muted-foreground">
              © 2026 · AI Automation & Digital Design
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
              Privacy
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={() => scrollTo('#home')}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
          >
            <ArrowUpRight size={14} className="-rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[clamp(2.5rem,6vw,5rem)] font-heading font-bold tracking-tight text-foreground/[0.04] mt-10 select-none pointer-events-none leading-none"
        >
          Build smarter.
        </motion.p>
      </div>
    </footer>
  )
}
