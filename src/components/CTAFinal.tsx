import { motion } from 'framer-motion'
import { Calendar, ArrowUpRight, Mail } from 'lucide-react'
import BlurText from './BlurText'

export default function CTAFinal() {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-black">

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">Let's Work Together</span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading italic tracking-tight leading-[0.88] text-white max-w-4xl">
          <BlurText
            text="Ready to eliminate repetitive work and elevate your digital presence?"
            delay={60}
            startDelay={0.15}
          />
        </h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="font-body font-light text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Book a free 30-min discovery call. No fluff — just real solutions tailored
          to where your business actually is.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <a
            href="mailto:hello@rolfa.dev"
            className="liquid-glass-strong inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-body font-medium text-white hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <Calendar size={16} strokeWidth={1.75} />
            Book a Call
            <ArrowUpRight
              size={14}
              className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </a>

          <a
            href="mailto:hello@rolfa.dev"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-body font-medium text-white/60 hover:text-white border border-white/15 hover:border-white/40 transition-all duration-300"
          >
            <Mail size={14} strokeWidth={1.75} />
            Or email me directly
          </a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mt-8"
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  )
}
