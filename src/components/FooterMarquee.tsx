export default function FooterMarquee() {
  const text = 'PRACHYA JUM \u00A0//\u00A0 CREATIVE DIRECTOR \u00A0//\u00A0 '
  const repeated = text.repeat(8)

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="animate-marquee whitespace-nowrap flex">
        <span
          className="font-display uppercase text-stroke-white-thin inline-block"
          style={{
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 1.1,
          }}
        >
          {repeated}
        </span>
        <span
          className="font-display uppercase text-stroke-white-thin inline-block"
          style={{
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 1.1,
          }}
        >
          {repeated}
        </span>
      </div>
    </div>
  )
}
