import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  fadeUp, fadeLeft, fadeRight, fadeDown,
  scaleIn, blurUp, blurIn, viewport,
  type Variants,
} from '@/lib/animations'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'blurIn'

const map: Record<Direction, Variants> = {
  up:     fadeUp,
  down:   fadeDown,
  left:   fadeLeft,
  right:  fadeRight,
  scale:  scaleIn,
  blur:   blurUp,
  blurIn: blurIn,
}

interface Props {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  /** legacy — kept for back-compat, maps to y offset on 'up' */
  y?: number
}

export default function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration,
  y,
}: Props) {
  const base = y !== undefined
    ? { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }
    : map[direction]

  const variants: Variants = duration
    ? {
        hidden:  base.hidden,
        visible: {
          ...(base.visible as object),
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : {
        hidden:  base.hidden,
        visible: {
          ...(base.visible as object),
          transition: {
            ...(((base.visible as Record<string, unknown>).transition as object) ?? {}),
            delay,
          },
        },
      }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
