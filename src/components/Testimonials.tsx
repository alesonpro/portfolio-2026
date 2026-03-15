import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import FadeIn from './FadeIn'
import { useCountUp } from '@/hooks/useCountUp'
import { viewport, blurUp, scaleIn, stagger } from '@/lib/animations'

const testimonials = [
  {
    quote:
      'Aleson completely transformed how we manage members. What took us hours of paperwork now runs itself. The system is clean, intuitive, and the team adopted it immediately.',
    name: 'Marco R.',
    role: 'Gym Owner',
    project: 'Gym Management System',
    initials: 'MR',
    color: 'bg-indigo-500',
    stars: 5,
    // Each card enters from a different direction for visual rhythm
    direction: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  },
  {
    quote:
      'I was skeptical about automation but Aleson walked me through everything clearly. Within a week my social content was publishing on autopilot and I had my evenings back.',
    name: 'Sofia L.',
    role: 'Content Creator & Coach',
    project: 'Content Automation Pipeline',
    initials: 'SL',
    color: 'bg-violet-500',
    stars: 5,
    direction: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  },
  {
    quote:
      'The UI redesign exceeded expectations. Students immediately noticed the difference and engagement went up significantly. Delivered on time, with great communication throughout.',
    name: 'Prof. Andrea M.',
    role: 'Digital Education Lead',
    project: 'University Platform Redesign',
    initials: 'AM',
    color: 'bg-blue-500',
    stars: 5,
    direction: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  },
]

// ── Animated stat tile with count-up ────────────────────────────────────────
function StatTile({ raw, suffix, label }: { raw: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(raw, 1200, suffix)
  return (
    <div className="flex flex-col items-center gap-1.5 py-6 rounded-xl bg-muted/40 border border-border">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="text-3xl font-bold text-accent tracking-tight"
      >
        {display}
      </span>
      <span className="text-xs text-muted-foreground font-medium text-center px-2">{label}</span>
    </div>
  )
}

const stats = [
  { raw: 15, suffix: '+', label: 'Automations built'  },
  { raw: 8,  suffix: '+', label: 'Web & UI projects'  },
  { raw: 98, suffix: '%', label: 'Satisfaction rate'  },
  { raw: 2,  suffix: '',  label: 'Languages (EN · IT)' },
]

export default function Testimonials() {
  // Stagger ref for cards
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center">
          <FadeIn direction="blur">
            <span className="section-label">Testimonials</span>
          </FadeIn>
          <FadeIn direction="blur" delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mt-2">
              What clients say
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.16}>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-xl mx-auto">
              Real feedback from real projects. Here's what it looks like to work together.
            </p>
          </FadeIn>
        </div>

        {/* Cards — each slides from a different direction */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={{
                hidden:   t.direction.hidden,
                visible:  {
                  ...t.direction.visible,
                  transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              initial="hidden"
              animate={cardsInView ? 'visible' : 'hidden'}
              className="portfolio-card p-7 h-full flex flex-col gap-5"
            >
              {/* Stars + quote icon */}
              <div className="flex items-center justify-between">
                <Quote size={20} className="text-accent/35" strokeWidth={1.5} />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.12 + 0.4 + s * 0.06, duration: 0.25, ease: 'backOut' }}
                    >
                      <Star size={12} className="text-amber-400 fill-amber-400" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </p>

              <span className="text-xs font-medium text-accent bg-accent/8 rounded-full px-3 py-1 self-start">
                {t.project}
              </span>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0 select-none`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-snug">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider line */}
        <motion.div
          className="h-px bg-border mt-10 mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Stat tiles — stagger scale in with count-up */}
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={scaleIn}>
              <StatTile {...s} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
