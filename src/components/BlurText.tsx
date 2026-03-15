import { motion, Variants } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number          // ms per word
  startDelay?: number     // initial delay in seconds
  once?: boolean
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function BlurText({
  text,
  className = '',
  delay = 100,
  startDelay = 0,
  once = true,
}: BlurTextProps) {
  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: startDelay,
        staggerChildren: delay / 1000,
      },
    },
  }

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
