import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import InfoDrawer from '../components/InfoDrawer'
import { useProjects } from '../hooks/useProjects'

const ParticleBackground = lazy(() => import('../components/ParticleBackground'))

export default function Project() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { projects, loading, error } = useProjects()

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 bg-[#030014]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 cursor-pointer select-none">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#CCFF00] flex items-center justify-center text-black text-sm sm:text-base font-bold transition-transform duration-500 group-hover:rotate-180">
              ✦
            </div>
            <span className="font-sans text-lg sm:text-xl tracking-[0.3em] uppercase text-white font-bold">
              PRACHYA
            </span>
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="font-mono text-xs tracking-widest border border-white/20 px-4 py-2 sm:px-6 sm:py-2.5 text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 rounded-none"
          >
            MENU
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-7xl mx-auto mb-16">
          <h1 className="font-display uppercase text-[#CCFF00] text-5xl sm:text-7xl lg:text-9xl mb-6">
            PROJECTS
          </h1>
          <p className="font-sans text-white/50 text-base sm:text-lg max-w-2xl">
            A curated collection of my design work — from UI/UX to brand identity, each project crafted with purpose and impact.
          </p>
        </div>

        {/* Designer Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mb-12 bg-white/[0.02] border border-white/5 rounded-[12px] p-4 sm:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src="https://thumbs2.imgbox.com/f5/b0/edxwODlv_t.png" 
                alt="Prachya Jumpapho" 
                className="w-16 h-16 rounded-full object-cover object-top bg-white/10"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-sans font-bold text-white text-base">Prachya Jumpapho</h3>
                <span className="font-mono text-xs text-[#CCFF00] bg-[#CCFF00]/5 px-2 py-0.5 rounded-full whitespace-nowrap">Portfolio</span>
              </div>
              <p className="font-mono text-xs text-white/50 mt-1">Product Design Manager</p>
              <p className="font-sans text-xs text-white/40 leading-relaxed mt-2 line-clamp-2">
                Curated design projects showcasing expertise in UI/UX design, brand identity, and digital product strategy.
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCFF00]" />
          </div>
        ) : error ? (
          <p className="font-sans text-white/50 text-center py-20">{error}</p>
        ) : projects.length === 0 ? (
          <p className="font-sans text-white/50 text-center py-20">No projects yet.</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-white/5 aspect-[4/3] mb-4 rounded-[12px]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="font-mono text-xs text-white/30 tracking-widest">NO IMAGE</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#CCFF00]/0 group-hover:bg-[#CCFF00]/10 transition-colors duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={20} className="text-[#CCFF00]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="font-mono text-xs text-white/30 text-center">
            © 2026 PRACHYA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      <InfoDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
