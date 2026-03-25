import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { pillStagger, slideUpSmall, scaleIn, viewport } from '@/lib/animations'

const clients = [
  { name: 'Gym Management System',  icon: '🏋️' },
  { name: 'University Platforms',   icon: '🎓' },
  { name: 'Digital Agencies',       icon: '💼' },
  { name: 'E-Commerce Stores',      icon: '🛒' },
  { name: 'Local Service Biz',      icon: '🔧' },
  { name: 'Content Creators',       icon: '✨' },
]

export default function TrustBar() {
  return (
    <section id="trust" className="py-16 border-y border-border bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Label */}
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Trusted by startups, education platforms, and digital teams
          </p>
        </FadeIn>

        {/* Client badges — stagger in */}
        <motion.div
          variants={pillStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {clients.map((c) => (
            <motion.div
              key={c.name}
              variants={slideUpSmall}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background/70 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 cursor-default"
            >
              <span className="text-base leading-none">{c.icon}</span>
              {c.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line — draws in */}
        <motion.div
          className="h-px bg-border mx-auto mt-10 mb-10 max-w-xs"
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Satisfaction badge — scale in */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-5 py-3 rounded-full bg-background border border-border shadow-soft">
            <span className="flex -space-x-2">
              {['bg-indigo-500', 'bg-violet-500', 'bg-blue-500'].map((c, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full ${c} border-2 border-background flex items-center justify-center text-[9px] text-white font-bold`}
                >
                  {['A', 'M', 'J'][i]}
                </span>
              ))}
            </span>
            <span className="text-sm font-medium text-foreground">
              <span className="text-accent font-bold">98%</span> client satisfaction
            </span>
            <span className="text-xs text-muted-foreground">across all projects</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
