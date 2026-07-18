import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

const WORDS = ['PURPOSE', 'IMPACT', 'INTENT']
const BIO_TEXT =
  "I'm Prachya — a Product Design Manager / UX/UI Manager / Lead of UX/UI Designer crafting bold, high-contrast digital experiences that are intuitive, impactful, and built to stand out."

/* -------------------------------------------------------------------------- */
/*  Typewriter Bio                                                            */
/* -------------------------------------------------------------------------- */
function TypewriterBio({ resetKey }: { resetKey: number }) {
  const chars = useMemo(() => BIO_TEXT.split(''), [])

  return (
    <p className="font-sans text-xs sm:text-sm md:text-base text-white/50 max-w-xs sm:max-w-sm md:max-w-md leading-relaxed">
      {chars.map((char, i) => (
        <motion.span
          key={`${resetKey}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.02, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  )
}

/* -------------------------------------------------------------------------- */
/*  HeroContent                                                               */
/* -------------------------------------------------------------------------- */
export default function HeroContent() {
  const [wordIndex, setWordIndex] = useState(0)
  const [bioKey, setBioKey] = useState(0)

  // Rotate words every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Re-mount bio every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBioKey((prev) => prev + 1)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none" style={{ paddingTop: '200px' }}>
      {/* Mammoth headline */}
      <h1 className="flex flex-col items-center gap-0 leading-none">
        {/* Top line: "DESIGN WITH" – stroked */}
        <span
          className="font-display uppercase text-stroke-white md:text-stroke-1 lg:text-stroke-1"
          style={{
            fontSize: 'clamp(17px, 5vw, 70px)',
            letterSpacing: '0.15em',
          }}
        >
          DESIGN WITH
        </span>

        {/* Bottom line: rotating word – solid acid lime */}
        <span
          className="font-display uppercase text-[#CCFF00] block mt-1 sm:mt-2"
          style={{
            fontSize: 'clamp(50px, 14vw, 180px)',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          <ScrambleText
            key={wordIndex}
            text={WORDS[wordIndex]}
            duration={600}
          />
        </span>
      </h1>

      {/* Typewriter bio */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        <TypewriterBio resetKey={bioKey} />
      </div>
    </main>
  )
}
