import { motion } from 'framer-motion'
import { Zap, Layout, Code2, Brain, ArrowRight } from 'lucide-react'
import FadeIn from './FadeIn'
import { cn } from '@/lib/utils'
import { cardStagger, blurUp, viewport } from '@/lib/animations'

const services = [
  {
    icon: Zap,
    title: 'AI Workflow Automation',
    description:
      'Custom pipelines built on Zapier, Make, and n8n. API integrations, webhook orchestration, and AI-augmented flows that eliminate bottlenecks and run 24/7 without you.',
    highlights: ['Zapier / Make / n8n', 'API integrations', 'Auto-reporting'],
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description:
      'High-fidelity Figma prototypes through to fully responsive production interfaces. Clean, conversion-focused, and brand-consistent — from wireframe to shipped.',
    highlights: ['Figma prototypes', 'Design systems', 'UX audits'],
    color: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'React + Tailwind web apps, Webflow sites, and Framer builds — fast, accessible, and optimized. I handle the full stack from design handoff to deployment.',
    highlights: ['React / Tailwind', 'Webflow / Framer', 'Performance-first'],
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
  },
  {
    icon: Brain,
    title: 'Workflow Consulting',
    description:
      'Workshop-style sessions to map your business processes, identify automation opportunities, and build a clear, prioritized roadmap your team can actually execute.',
    highlights: ['Process mapping', 'Team training', 'ROI roadmap'],
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header — blur reveal */}
        <div className="mb-14 max-w-xl">
          <FadeIn direction="blur">
            <span className="section-label">What I Deliver</span>
          </FadeIn>
          <FadeIn direction="blur" delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mt-2">
              Services built around{' '}
              <span className="text-accent">your growth</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.16}>
            <p className="text-muted-foreground leading-relaxed mt-4">
              From automation to design to code — end-to-end solutions that save time,
              increase conversions, and scale with your business.
            </p>
          </FadeIn>

          {/* Accent line draws in beneath the heading */}
          <motion.div
            className="h-0.5 w-16 bg-accent rounded-full mt-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Cards — stagger blur-up */}
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-2 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={blurUp}
                className="portfolio-card p-7 h-full flex flex-col gap-5 group"
              >
                {/* Icon — springs up on card hover */}
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1',
                  service.color,
                )}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA nudge */}
        <FadeIn direction="up" delay={0.1} className="mt-10 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4 group"
          >
            Not sure what you need? Let's figure it out together
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
