import { useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scramble = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current)
    const letters = text.split('')
    let locked = 0
    const totalFrames = 8
    const interval = 400 / totalFrames

    function step(frame: number) {
      const next = letters.map((char, i) => {
        if (char === ' ') return ' '
        if (i < locked) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setDisplay(next)
      locked = Math.floor((frame / totalFrames) * letters.length)
      if (frame < totalFrames) {
        frameRef.current = setTimeout(() => step(frame + 1), interval)
      } else {
        setDisplay(text)
      }
    }
    step(0)
  }, [text])

  const reset = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current)
    setDisplay(text)
  }, [text])

  return (
    <span
      className={`inline-block font-[inherit] ${className}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: 'inherit' }}
    >
      {display}
    </span>
  )
}
