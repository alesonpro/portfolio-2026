import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Languages, ArrowUpRight } from 'lucide-react'
import FadeIn from './FadeIn'
import {
  fadeLeft, fadeRight, pillStagger,
  slideUpSmall, scaleIn, blurUp, stagger, viewport,
} from '@/lib/animations'

const AVATAR_URL = '/avatar.png'

const strengths = [
  { label: 'Automation Thinking', emoji: '⚡' },
  { label: 'System Design',       emoji: '🧩' },
  { label: 'Workflow Optimization', emoji: '🔄' },
  { label: 'Attention to Detail', emoji: '🎯' },
  { label: 'UI/UX Sensibility',   emoji: '✦'  },
  { label: 'Fast Learner',        emoji: '🚀' },
]

const facts = [
  { icon: GraduationCap, primary: 'BIT — Web Technologies', secondary: 'Digital Systems track' },
  { icon: Languages,     primary: 'English (fluent) & Italian (B2)', secondary: 'Works with international clients' },
  { icon: MapPin,        primary: 'Based in Europe', secondary: 'Works globally, fully remote' },
]

const bio = [
  "I'm a web technologies graduate (BIT, Web Technologies track) who turned a deep curiosity for efficiency into a freelance practice. Since 2025, I've been designing, automating, and shipping digital systems for small businesses, startups, and university projects.",
  "My work lives at the intersection of automation engineering, UI/UX design, and strategic operations. I don't just hand you a tool — I hand you a system that fits your workflow and keeps running after I'm gone.",
  "I've mentored teams on automation thinking, run process-mapping workshops, and helped businesses recover hundreds of hours from manual work. I'm most energized when a client says \"we had no idea this was possible.\"",
]

export default function About() {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Photo — slides in from left ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* Photo frame */}
            <div className="relative self-center lg:self-start">
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 40% 30%, hsl(221 83% 53% / 0.14) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />

              <div
                className="relative w-[17rem] md:w-[19rem] rounded-2xl overflow-hidden border border-border shadow-card-hover"
                style={{ height: '22rem' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(160deg, hsl(221 83% 53% / 0.12) 0%, hsl(210 40% 96.1% / 1) 55%, hsl(221 83% 53% / 0.06) 100%)',
                  }}
                />
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.18]" />
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, hsl(221 83% 53% / 0.18) 0%, transparent 70%)' }}
                />
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, hsl(221 83% 53% / 0.12) 0%, transparent 70%)' }}
                />
                <img
                  src={AVATAR_URL}
                  alt="Aleson — AI Automation & UI/UX Designer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, hsl(210 40% 96.1% / 0.6) 0%, transparent 100%)' }}
                />
              </div>

              {/* Available badge — springs up after photo */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 -right-4 bg-background border border-border rounded-xl shadow-card px-3.5 py-2.5 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  Available for projects
                </span>
              </motion.div>
            </div>

            {/* Strength pills — stagger scatter */}
            <motion.div
              variants={pillStagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-wrap gap-2 justify-center lg:justify-start max-w-sm"
            >
              {strengths.map((s) => (
                <motion.span
                  key={s.label}
                  variants={slideUpSmall}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-background border border-border rounded-full px-3 py-1.5 hover:border-accent/30 hover:text-foreground transition-colors duration-150"
                >
                  <span className="text-sm leading-none">{s.emoji}</span>
                  {s.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Info — slides in from right ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-7"
          >
            {/* Heading */}
            <div>
              <FadeIn direction="blur" delay={0.05}>
                <span className="section-label">About Me</span>
              </FadeIn>
              <FadeIn direction="blur" delay={0.12}>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mt-3 leading-tight">
                  Hi, I'm Aleson —{' '}
                  <span className="text-accent">builder, solver,</span>{' '}
                  systems thinker.
                </h2>
              </FadeIn>
            </div>

            {/* Bio paragraphs — stagger */}
            <motion.div
              variants={stagger(0.08, 0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-4"
            >
              {bio.map((para, i) => (
                <motion.p key={i} variants={blurUp} className="text-muted-foreground leading-relaxed text-[15px]">
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Quick facts — stagger from right */}
            <motion.div
              variants={stagger(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-3 pt-1"
            >
              {facts.map(({ icon: Icon, primary, secondary }) => (
                <motion.div
                  key={primary}
                  variants={fadeRight}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon size={15} strokeWidth={1.75} className="text-accent" />
                  </div>
                  <span>
                    <span className="text-foreground font-medium">{primary}</span>
                    {' · '}{secondary}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs — scale in */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button onClick={scrollToContact} className="btn-accent">
                Work with me
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </button>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Download CV
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
