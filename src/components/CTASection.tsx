import { motion } from 'framer-motion'
import { Calendar, ArrowUpRight, Mail, Clock } from 'lucide-react'
import { viewport, blurUp, fadeUp, scaleIn, pillStagger, slideUpSmall } from '@/lib/animations'

const perks = ['Free 30-min call', 'No commitment required', 'Response within 24h']

export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-32 px-6 bg-gradient-to-br from-accent/5 via-background to-background relative overflow-hidden"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(221 83% 53% / 0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Pulsing rings behind the section */}
      {[1, 1.6, 2.2].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 pointer-events-none"
          style={{ width: 300, height: 300 }}
          animate={{ scale: [scale, scale + 0.15, scale], opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: 3.5,
            delay: i * 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">

        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="section-label">Let's Work Together</span>
        </motion.div>

        {/* Heading — blur reveal */}
        <motion.h2
          variants={blurUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground mt-2 text-balance"
        >
          Ready to automate and elevate your{' '}
          <span className="text-accent">digital presence?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          variants={{ ...fadeUp, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-xl mx-auto"
        >
          Book a free 30-min discovery call to map your workflows or discuss your
          next site. No pitch, no pressure — just real solutions.
        </motion.p>

        {/* Perks — stagger slide in */}
        <motion.div
          variants={pillStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground"
        >
          {perks.map((perk) => (
            <motion.span key={perk} variants={slideUpSmall} className="flex items-center gap-1.5">
              <Clock size={13} className="text-accent" strokeWidth={2} />
              {perk}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons — scale in */}
        <motion.div
          variants={{ ...scaleIn, visible: { opacity: 1, scale: 1, transition: { duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a href="mailto:hello@aleson.dev" className="btn-accent text-base px-10 py-4 group">
            <Calendar size={16} strokeWidth={1.75} />
            Book a Call
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-70"
            />
          </a>
          <a href="mailto:hello@aleson.dev" className="btn-ghost text-base px-8 py-4">
            <Mail size={15} strokeWidth={1.75} />
            Email me directly
          </a>
        </motion.div>

        {/* Email — fade in last */}
        <motion.p
          variants={{ ...fadeUp, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.46, ease: [0.22, 1, 0.36, 1] } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-6 text-xs text-muted-foreground"
        >
          Or reach out at{' '}
          <a href="mailto:hello@aleson.dev" className="text-accent hover:underline underline-offset-4 font-medium">
            hello@aleson.dev
          </a>
        </motion.p>
      </div>
    </section>
  )
}
