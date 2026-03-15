/**
 * BackgroundEffects — fixed, pointer-events-none, z-index 0.
 * Three layers:
 *  1. Animated gradient blobs (framer-motion, slow drift)
 *  2. Floating particle dots (CSS keyframes, pure GPU)
 *  3. Cursor-follow soft glow (useMotionValue + useSpring)
 */
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Blob config ─────────────────────────────────────────────────────────────
const blobs = [
  {
    id: 1, size: 700,
    style: { left: '-8%', top: '-12%' },
    color: '221 83% 53%', opacity: 0.055,
    animate: { x: [0, 80, 25, 0], y: [0, 55, -35, 0] },
    duration: 24,
  },
  {
    id: 2, size: 550,
    style: { left: '68%', top: '2%' },
    color: '250 78% 60%', opacity: 0.042,
    animate: { x: [0, -65, 18, 0], y: [0, 72, -22, 0] },
    duration: 31,
  },
  {
    id: 3, size: 620,
    style: { left: '38%', top: '52%' },
    color: '210 80% 56%', opacity: 0.032,
    animate: { x: [0, 48, -32, 0], y: [0, -62, 28, 0] },
    duration: 40,
  },
  {
    id: 4, size: 430,
    style: { left: '78%', top: '62%' },
    color: '221 83% 53%', opacity: 0.044,
    animate: { x: [0, -52, 22, 0], y: [0, -44, 52, 0] },
    duration: 27,
  },
  {
    id: 5, size: 320,
    style: { left: '12%', top: '72%' },
    color: '265 75% 62%', opacity: 0.038,
    animate: { x: [0, 42, -18, 0], y: [0, -52, 30, 0] },
    duration: 21,
  },
]

// ─── Particle config (deterministic — no Math.random on render) ───────────────
const particles = [
  { id: 0,  left: '7%',  size: 2, dur: 13, delay: 0   },
  { id: 1,  left: '14%', size: 3, dur: 19, delay: 2.5 },
  { id: 2,  left: '22%', size: 2, dur: 15, delay: 5   },
  { id: 3,  left: '30%', size: 2, dur: 22, delay: 1   },
  { id: 4,  left: '41%', size: 3, dur: 17, delay: 7.5 },
  { id: 5,  left: '49%', size: 2, dur: 12, delay: 3   },
  { id: 6,  left: '57%', size: 2, dur: 24, delay: 9   },
  { id: 7,  left: '64%', size: 3, dur: 16, delay: 4   },
  { id: 8,  left: '73%', size: 2, dur: 20, delay: 6   },
  { id: 9,  left: '81%', size: 2, dur: 14, delay: 8.5 },
  { id: 10, left: '89%', size: 3, dur: 18, delay: 1.5 },
  { id: 11, left: '4%',  size: 2, dur: 23, delay: 11  },
  { id: 12, left: '36%', size: 2, dur: 16, delay: 4.5 },
  { id: 13, left: '67%', size: 3, dur: 25, delay: 2   },
  { id: 14, left: '87%', size: 2, dur: 15, delay: 7   },
  { id: 15, left: '54%', size: 2, dur: 19, delay: 10  },
  { id: 16, left: '18%', size: 2, dur: 21, delay: 14  },
  { id: 17, left: '76%', size: 3, dur: 13, delay: 0.5 },
]

// ─── Cursor glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const rawX = useMotionValue(-500)
  const rawY = useMotionValue(-500)

  const x = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 70, damping: 22, mass: 0.6 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX - 200)
      rawY.set(e.clientY - 200)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [rawX, rawY])

  return (
    <motion.div
      className="fixed pointer-events-none rounded-full"
      style={{
        width: 400,
        height: 400,
        x,
        y,
        background:
          'radial-gradient(circle, hsl(221 83% 53% / 0.07) 0%, transparent 65%)',
        filter: 'blur(20px)',
      }}
    />
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Layer 1 — animated gradient blobs */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            ...blob.style,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, hsl(${blob.color} / ${blob.opacity}) 0%, transparent 68%)`,
            filter: 'blur(55px)',
            willChange: 'transform',
          }}
          animate={blob.animate}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: blob.duration,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Layer 2 — floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/25 dark:bg-accent/40"
          style={{
            left: p.left,
            bottom: '-6px',
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.dur}s ${p.delay}s infinite linear`,
          }}
        />
      ))}

      {/* Layer 3 — cursor glow */}
      <CursorGlow />
    </div>
  )
}
