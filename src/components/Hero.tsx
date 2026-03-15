import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { value: '15+', label: 'Automations shipped' },
  { value: '8+',  label: 'Web & UI projects'   },
  { value: '1000s', label: 'Hours saved for clients' },
]

// Floating geometric shapes — outline only, very subtle
const shapes = [
  { id: 1, size: 52, x: '8%',  y: '22%', rotate: 12,  borderRadius: '30%', dur: 9,  delay: 0   },
  { id: 2, size: 32, x: '88%', y: '18%', rotate: -20, borderRadius: '50%', dur: 12, delay: 1.5 },
  { id: 3, size: 68, x: '4%',  y: '68%', rotate: 35,  borderRadius: '22%', dur: 11, delay: 3   },
  { id: 4, size: 44, x: '91%', y: '62%', rotate: -8,  borderRadius: '50%', dur: 8,  delay: 0.8 },
  { id: 5, size: 24, x: '78%', y: '78%', rotate: 55,  borderRadius: '18%', dur: 14, delay: 2   },
  { id: 6, size: 38, x: '18%', y: '86%', rotate: -40, borderRadius: '50%', dur: 10, delay: 4   },
]

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.35] dark:opacity-[0.15] pointer-events-none" />

      {/* Static accent blobs (hero-specific, slightly stronger than the global ones) */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(221 83% 53% / 0.09) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(221 83% 53% / 0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Floating geometric shapes ── */}
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none border border-accent/20 dark:border-accent/30"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            borderRadius: s.borderRadius,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, rotate: s.rotate }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: [0, -18, -36, -54],
            rotate: [s.rotate, s.rotate + 20, s.rotate + 40, s.rotate + 60],
            scale: [0.9, 1, 1.05, 0.95],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Animated ring behind heading ── */}
      <motion.div
        className="absolute rounded-full border border-accent/8 pointer-events-none"
        style={{ width: 560, height: 560 }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full border border-accent/5 pointer-events-none"
        style={{ width: 760, height: 760 }}
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">

        {/* Badge */}
        <motion.div {...fadeUp(0.05)}>
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
            <Sparkles size={12} strokeWidth={2.5} />
            AI Automation × UI/UX Design
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.05] text-foreground text-balance"
        >
          Build Smarter.{' '}
          <span className="text-accent">Launch Faster.</span>{' '}
          Grow Effortlessly.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.25)}
          className="text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto text-balance"
        >
          I create intelligent automation systems and clean, high-converting digital
          experiences for small businesses, startups, and creators — saving you time
          and boosting your results.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="btn-accent text-base px-8 py-3 group"
          >
            Start a Project
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); scrollTo('#work') }}
            className="btn-ghost text-base px-8 py-3"
          >
            View My Work
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-6 pt-6 border-t border-border w-full"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-foreground tracking-tight">{s.value}</span>
              <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={() => scrollTo('#trust')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  )
}
