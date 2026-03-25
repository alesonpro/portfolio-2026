import { motion } from 'framer-motion'
import { EASE } from '@/lib/animations'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  charClassName?: string
  /** When false, holds in hidden state until set to true */
  animate?: boolean
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.022,
  charClassName = '',
  animate = true,
}: SplitTextProps) {
  const chars = text.split('')

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate={animate ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: delay },
        },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 18, filter: 'blur(6px)' },
            visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.45, ease: EASE } },
          }}
          className={`inline-block ${charClassName}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
