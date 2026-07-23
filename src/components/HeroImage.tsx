export default function HeroImage() {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-auto w-[100vw] sm:w-auto flex justify-center items-end"
      style={{
        height: 'auto',
        maxHeight: '110vh',
      }}
    >
      <img
        src="https://cdn.prod.website-files.com/64b402b532dbf85fa586d5cc/6a621bb3ac716fe0b52d3bd7_Pok.png"
        alt="Prachya — Creative Director portrait"
        className="w-full h-auto object-cover brightness-95 grayscale contrast-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out hover:scale-[1.04] sm:h-full sm:w-auto sm:object-contain sm:object-bottom"
        style={{
          maxHeight: '110vh',
          minHeight: '80vh'
        }}
        draggable={false}
      />
    </div>
  )
}
