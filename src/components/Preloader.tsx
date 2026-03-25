import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/animations'

const WORD = 'Aleson'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    // Total: ~0.1s per char × 6 + 0.5s hold + 0.6s exit = ~1.8s
    const timer = setTimeout(onComplete, 1900)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <motion.div
        className="flex items-end gap-[0.04em] text-5xl md:text-7xl font-bold tracking-tight select-none"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        {WORD.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden:  { opacity: 0, y: 20, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
            }}
            className="text-foreground"
          >
            {char}
          </motion.span>
        ))}
        {/* Accent dot */}
        <motion.span
          variants={{
            hidden:  { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.55, ease: EASE } },
          }}
          className="text-accent leading-none mb-1"
          style={{ fontSize: '1.1em' }}
        >
          .
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
