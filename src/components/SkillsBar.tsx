import { motion } from 'framer-motion'

const tools = [
  'n8n', 'Zapier', 'Make', 'Figma', 'Framer', 'Webflow',
  'React', 'TypeScript', 'Tailwind CSS', 'Notion',
  'Airtable', 'Vercel', 'OpenAI', 'Slack', 'Google Calendar',
]

const marqueeItems = [...tools, ...tools]

export default function SkillsBar() {
  return (
    <section className="py-14 border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="section-label">Tools & Technologies</span>
        </motion.div>
      </div>

      <div className="relative scroll-fade-x overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center gap-12 px-8">
          {marqueeItems.map((tool, i) => (
            <span
              key={i}
              className="text-sm font-medium tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors duration-200 shrink-0 uppercase cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
