export default function HeroImage() {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-auto w-[100vw] sm:w-auto flex justify-center items-end"
      style={{
        height: 'clamp(45vh, 85vh, 110vh)',
        maxHeight: '110%',
      }}
    >
      <img
        src="/src/img/pok.png"
        alt="Prachya — Creative Director portrait"
        className="max-h-full max-w-[100vw] h-auto sm:h-full w-full sm:w-auto object-contain object-bottom brightness-95 grayscale contrast-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out hover:scale-[1.04]"
        draggable={false}
      />
    </div>
  )
}
