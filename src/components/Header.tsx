import { Menu } from 'lucide-react'

interface HeaderProps {
  onOpenDrawer: () => void
}

export default function Header({ onOpenDrawer }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="group flex items-center gap-3 cursor-pointer select-none">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#CCFF00] flex items-center justify-center text-black text-sm sm:text-base font-bold transition-transform duration-500 group-hover:rotate-180">
          ✦
        </div>
        <span className="font-sans text-lg sm:text-xl tracking-[0.3em] uppercase text-white font-bold">
          PRACHYA
        </span>
      </div>

      {/* Nav links – hidden on mobile */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
        <a
          href="mailto:pockprachya@gmail.com"
          className="font-mono text-xs tracking-widest text-white/50 hover:text-[#CCFF00] transition-colors duration-300"
        >
          Email me
        </a>
        <a
          href="https://www.linkedin.com/in/pokprachy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest text-white/50 hover:text-[#CCFF00] transition-colors duration-300"
        >
          Linkedin
        </a>
        <a
          href="tel:+660924949288"
          className="font-mono text-xs tracking-widest text-white/50 hover:text-[#CCFF00] transition-colors duration-300"
        >
          Call
        </a>
      </nav>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenDrawer}
          className="hidden sm:block font-mono text-xs tracking-widest border border-white/20 px-4 py-2 sm:px-6 sm:py-2.5 text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 rounded-none"
          aria-label="Open commission form"
        >
          MENU
        </button>
        <button
          onClick={onOpenDrawer}
          className="sm:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#CCFF00] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  )
}
