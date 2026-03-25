import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'home',         label: 'Home'         },
  { id: 'services',     label: 'Services'     },
  { id: 'work',         label: 'Work'         },
  { id: 'about',        label: 'About'        },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact'      },
]

export default function SectionNav() {
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-end"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Go to ${label}`}
            className="flex items-center gap-2 group"
          >
            {/* Label — appears on hover */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.15 }}
                  className="text-[11px] font-medium text-muted-foreground bg-background/90 border border-border backdrop-blur-sm rounded-full px-2.5 py-0.5 whitespace-nowrap shadow-sm"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                width:            isActive ? 20 : 6,
                backgroundColor:  isActive ? 'hsl(221 83% 53%)' : 'hsl(215.4 16.3% 46.9% / 0.5)',
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 rounded-full"
            />
          </button>
        )
      })}
    </nav>
  )
}
