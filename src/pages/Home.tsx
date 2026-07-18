import { useState, lazy, Suspense } from 'react'
import Header from '../components/Header'
import HeroContent from '../components/HeroContent'
import HeroImage from '../components/HeroImage'
import FooterMarquee from '../components/FooterMarquee'
import InfoDrawer from '../components/InfoDrawer'

const ParticleBackground = lazy(() => import('../components/ParticleBackground'))

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="relative min-h-screen h-screen overflow-hidden flex flex-col bg-[#030014]">
      {/* z-0: Three.js particle canvas */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* z-10: Hero character image */}
      <HeroImage />

      {/* z-20: Hero typography & bio */}
      <HeroContent />

      {/* z-30: Header */}
      <Header onOpenDrawer={() => setDrawerOpen(true)} />

      {/* z-30: Footer marquee */}
      <FooterMarquee />

      {/* z-50: Info drawer */}
      <InfoDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
