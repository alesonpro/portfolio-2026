/**
 * CustomCursor — dot + ring cursor matching the site's indigo accent.
 * Only mounts on pointer:fine devices (mouse/trackpad, not touch screens).
 *
 * Behaviours:
 *  • Dot   — snaps to exact cursor position, hides when hovering interactive elements
 *  • Ring  — follows with spring lag, expands on hover, shrinks on click
 *  • Glow  — faint accent radial behind the ring on hover
 */
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const DOT_R  = 3.5   // px radius of the dot  → 7px total
const RING_R = 17    // px radius of the ring → 34px total

export default function CustomCursor() {
  // ── Device check (no SSR) ──────────────────────────────────────────────────
  const [isMouse, setIsMouse] = useState(false)
  useEffect(() => {
    setIsMouse(window.matchMedia('(pointer: fine)').matches)
  }, [])

  // ── Motion values (centred by subtracting radius) ─────────────────────────
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const ringX = useSpring(rawX, { stiffness: 145, damping: 18, mass: 0.55 })
  const ringY = useSpring(rawY, { stiffness: 145, damping: 18, mass: 0.55 })

  // ── Interaction state ─────────────────────────────────────────────────────
  const [hover,   setHover]   = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isMouse) return

    // Hide native cursor globally
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX - DOT_R)
      dotY.set(e.clientY - DOT_R)
      rawX.set(e.clientX - RING_R)
      rawY.set(e.clientY - RING_R)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHover(
        !!t.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')
      )
    }

    const onDown = () => setClicked(true)
    const onUp   = () => setClicked(false)
    const onOut  = () => setVisible(false)
    const onIn   = () => setVisible(true)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.documentElement.addEventListener('mouseleave', onOut)
    document.documentElement.addEventListener('mouseenter', onIn)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.documentElement.removeEventListener('mouseleave', onOut)
      document.documentElement.removeEventListener('mouseenter', onIn)
    }
  }, [isMouse, dotX, dotY, rawX, rawY, visible])

  if (!isMouse) return null

  return (
    <>
      {/* ── Dot ── exact position, no lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        style={{ x: dotX, y: dotY, width: DOT_R * 2, height: DOT_R * 2 }}
        animate={{
          opacity : visible ? 1 : 0,
          scale   : clicked ? 0.4 : hover ? 0 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />

      {/* ── Ring ── spring-lagged */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-accent"
        style={{
          x: ringX,
          y: ringY,
          width:  RING_R * 2,
          height: RING_R * 2,
        }}
        animate={{
          opacity : visible ? (hover ? 0.8 : 0.45) : 0,
          scale   : clicked ? 0.72 : hover ? 1.45 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Hover glow ── faint accent fill expands behind ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width:  RING_R * 2,
          height: RING_R * 2,
          background: 'radial-gradient(circle, hsl(221 83% 53% / 0.14) 0%, transparent 75%)',
          filter: 'blur(4px)',
        }}
        animate={{
          opacity : visible && hover ? 1 : 0,
          scale   : hover ? 2.2 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </>
  )
}
