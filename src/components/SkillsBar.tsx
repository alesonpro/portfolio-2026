import { motion } from 'framer-motion'

const skills = [
  'n8n', 'Zapier', 'Make', 'Figma', 'Tailwind CSS',
  'Framer', 'Webflow', 'React', 'TypeScript',
  'Google Workspace', 'Buffer', 'Notion',
]

// Duplicate for seamless infinite marquee
const marqueeItems = [...skills, ...skills]

export default function SkillsBar() {
  return (
    <section className="py-16 border-t border-white/5 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            Skills & Tools I Master
          </span>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative scroll-fade-x">
        <div className="flex animate-marquee whitespace-nowrap gap-10 px-8">
          {marqueeItems.map((skill, i) => (
            <span
              key={i}
              className="
                font-heading italic text-2xl md:text-3xl text-white/60
                opacity-80 grayscale hover:grayscale-0 hover:text-white/90
                transition-all duration-300 cursor-default shrink-0
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
