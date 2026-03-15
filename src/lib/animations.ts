/**
 * Shared framer-motion variants.
 * Import what you need — keeps components thin.
 */
import type { Variants } from 'framer-motion'

export type { Variants }

export const EASE = [0.22, 1, 0.36, 1] as const

// ─── Individual item variants ────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE } },
}

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.5,  ease: EASE } },
}

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.6,  ease: EASE } },
}

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.6,  ease: EASE } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.5,  ease: EASE } },
}

export const blurUp: Variants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(8px)'  },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  transition: { duration: 0.6, ease: EASE } },
}

export const blurIn: Variants = {
  hidden:  { opacity: 0, filter: 'blur(10px)', scale: 0.97 },
  visible: { opacity: 1, filter: 'blur(0px)',  scale: 1,    transition: { duration: 0.55, ease: EASE } },
}

export const slideUpSmall: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: EASE } },
}

export const drawLine: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1,             transition: { duration: 0.8, ease: EASE } },
}

// ─── Container variants (stagger children) ──────────────────────────────────

export function stagger(delayChildren = 0.05, staggerChildren = 0.08): Variants {
  return {
    hidden:  {},
    visible: { transition: { delayChildren, staggerChildren } },
  }
}

// Convenience: card stagger (medium spacing)
export const cardStagger: Variants = {
  hidden:  {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
}

// Convenience: pill/badge stagger (tight spacing)
export const pillStagger: Variants = {
  hidden:  {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.055 } },
}

// ─── Common viewport config ──────────────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' } as const
