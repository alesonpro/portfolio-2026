import { motion } from 'framer-motion'

const stats = [
  { value: '15+', label: 'Automations Launched', sub: 'across client stacks' },
  { value: '8+', label: 'Web & UI Projects', sub: 'designed & shipped' },
  { value: '1000s', label: 'Manual Hours Saved', sub: 'for clients, cumulatively' },
  { value: '2', label: 'Languages', sub: 'English & Italian (B2)' },
]

export default function Stats() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass-strong rounded-3xl p-8 md:p-12 animate-pulse-glow"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center gap-2"
              >
                {/* Value */}
                <span className="font-heading italic text-5xl md:text-6xl text-white tracking-tight leading-none glow-white">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="font-body font-medium text-white/80 text-sm md:text-base leading-snug">
                  {stat.label}
                </span>

                {/* Sub */}
                <span className="font-body font-light text-white/40 text-xs">
                  {stat.sub}
                </span>

                {/* Divider (mobile: horizontal, lg: vertical) */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
