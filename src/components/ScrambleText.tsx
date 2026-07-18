import { useState, useEffect, useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

interface ScrambleTextProps {
  text: string
  className?: string
  /** Total scramble duration in ms before the word is fully revealed */
  duration?: number
}

export default function ScrambleText({ text, className = '', duration = 800 }: ScrambleTextProps) {
  const [display, setDisplay] = useState('')
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  const scramble = useCallback(() => {
    startRef.current = performance.now()
    const len = text.length

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const revealed = Math.floor(progress * len)

      let result = ''
      for (let i = 0; i < len; i++) {
        if (i < revealed) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [text, duration])

  useEffect(() => {
    scramble()
    return () => cancelAnimationFrame(frameRef.current)
  }, [scramble])

  return <span className={className}>{display}</span>
}
