import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Zap, Globe, Palette, Mail } from 'lucide-react'
import FadeIn from './FadeIn'
import { cn } from '@/lib/utils'
import { pillStagger, slideUpSmall, viewport } from '@/lib/animations'

// ─── Filter categories ───────────────────────────────────────────────────────
type Category = 'All' | 'AI Automations' | 'Website Creation' | 'UI/UX Design' | 'Email Design'

const filters: { label: Category; icon: React.ElementType }[] = [
  { label: 'All',             icon: Zap     },
  { label: 'AI Automations',  icon: Zap     },
  { label: 'Website Creation',icon: Globe   },
  { label: 'UI/UX Design',    icon: Palette },
  { label: 'Email Design',    icon: Mail    },
]

// ─── Projects ────────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'Gym Management System',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · Web App',
    description:
      'Replaced a fully paper-based process with a digital member portal. Staff now manage 200+ members, track attendance, and view payment status from a single dashboard.',
    outcomes: ['Zero paper records', '200+ members onboarded', '2-day → 2-hour staff training'],
    accent: 'from-violet-500/10 to-indigo-500/5',
    icon: Globe,
    iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
  },
  {
    id: '02',
    title: 'Multi-Platform Content Pipeline',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · Buffer',
    description:
      'Built a zero-touch content operation: Notion calendar → n8n → Buffer publishes across 4 social channels, then pipes weekly analytics back automatically.',
    outcomes: ['12 hrs/week reclaimed', '4 platforms, 1 workflow', 'Weekly auto-reports'],
    accent: 'from-amber-500/10 to-orange-500/5',
    icon: Zap,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  },
  {
    id: '03',
    title: 'University Platform UX Redesign',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Tailwind',
    description:
      'Redesigned internal platform UX for 1,000+ students. Delivered a full Figma design system + responsive Tailwind prototype, increasing usability scores by 40%.',
    outcomes: ['40% usability uplift', '60-component design system', 'Mobile-first responsive'],
    accent: 'from-blue-500/10 to-cyan-500/5',
    icon: Palette,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
  },
  {
    id: '04',
    title: 'Lead Capture & Nurture Automation',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Make · CRM',
    description:
      'Pipeline that captures leads from ads, forms, and DMs — qualifies via conditional logic — then routes to segmented email sequences automatically.',
    outcomes: ['48h → <5 min response', '300+ leads auto-routed', 'Zero manual input after setup'],
    accent: 'from-emerald-500/10 to-teal-500/5',
    icon: Zap,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    id: '05',
    title: 'E-Commerce Promotional Emails',
    filter: 'Email Design' as Category,
    category: 'Email Design · HTML · Campaign',
    description:
      'Designed and coded a full suite of responsive HTML email templates — welcome series, abandoned cart, and seasonal promotions — optimised for all major clients.',
    outcomes: ['Open rate +28% vs. previous', 'Mobile-first, tested on 20+ clients', 'Reusable template system'],
    accent: 'from-rose-500/10 to-pink-500/5',
    icon: Mail,
    iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
  },
  {
    id: '06',
    title: 'SaaS Landing Page',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'Built a high-conversion landing page for a B2B SaaS tool — hero, features grid, pricing table, and FAQ — from Figma handoff to deployed Vercel production in under a week.',
    outcomes: ['Deployed in 5 days', 'Lighthouse score 98/100', 'Conversion-optimised layout'],
    accent: 'from-indigo-500/10 to-blue-500/5',
    icon: Globe,
    iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10',
  },
]

// ─── Card animation variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, scale: 0.97,
    transition: { duration: 0.2, ease: 'easeIn' } },
}

export default function Work() {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.filter === active)

  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-20 bg-muted/20">
      <div className="max-w-7xl mx-auto">

        {/* Header — slides in from right */}
        <div className="mb-10">
          <FadeIn direction="right">
            <span className="section-label">Selected Work</span>
          </FadeIn>
          <FadeIn direction="right" delay={0.07}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mt-2">
              From idea to{' '}
              <span className="text-accent">launched system</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.14}>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-xl">
              Real projects across automation, web, design, and email — each built to solve a
              specific problem and deliver measurable results.
            </p>
          </FadeIn>
          {/* Accent line */}
          <motion.div
            className="h-0.5 w-16 bg-accent rounded-full mt-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ── Filter tabs — stagger in from left ── */}
        <motion.div
          variants={pillStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map(({ label, icon: Icon }) => {
              const isActive = active === label
              return (
                <motion.div key={label} variants={slideUpSmall}>
                <button
                  onClick={() => setActive(label)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border',
                    isActive
                      ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                      : 'bg-background text-muted-foreground border-border hover:border-accent/40 hover:text-foreground hover:bg-accent/5',
                  )}
                >
                  {/* Only show icon for non-All tabs, since All reuses the Zap icon */}
                  {label !== 'All' && (
                    <Icon size={13} strokeWidth={2} className="shrink-0" />
                  )}
                  {label}
                  {/* Count badge */}
                  <span
                    className={cn(
                      'text-xs rounded-full px-1.5 py-0.5 font-semibold leading-none',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {label === 'All'
                      ? projects.length
                      : projects.filter((p) => p.filter === label).length}
                  </span>
                </button>
              </motion.div>
              )
            })}
        </motion.div>

        {/* ── Projects grid ── */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="portfolio-card flex flex-col"
                >
                  {/* Top strip */}
                  <div className={cn('h-24 bg-gradient-to-br relative flex items-center px-6 gap-4', p.accent)}>
                    {/* Icon */}
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', p.iconColor)}>
                      <Icon size={16} strokeWidth={1.75} />
                    </div>

                    {/* Category label */}
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                      {p.category}
                    </span>

                    {/* Big ghost ID */}
                    <span className="absolute right-5 bottom-1 font-heading font-bold text-6xl leading-none text-foreground/[0.06] select-none">
                      {p.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="flex flex-col gap-2 pt-3 border-t border-border">
                      {p.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle size={13} className="text-accent shrink-0" strokeWidth={2} />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <button className="mt-auto self-start inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4 group pt-2">
                      View Case Study
                      <ArrowUpRight
                        size={13}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground text-sm"
            >
              No projects in this category yet — check back soon.
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
