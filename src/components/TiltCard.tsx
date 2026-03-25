import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  strength?: number
  glare?: boolean
}

export default function TiltCard({
  children,
  className = '',
  strength = 12,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 200, damping: 20, mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 200, damping: 20, mass: 0.5,
  })

  // Glare position (0–100%)
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 800 }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare highlight */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
            style={{ opacity: 0.06 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${x}% ${y}%, white 0%, transparent 60%)`,
                ),
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
