import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import InfoDrawer from '../components/InfoDrawer'
import { useProjects } from '../hooks/useProjects'

function DetailContent({ content }: { content: string }) {
  return (
    <div className="font-sans text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-line">
      {content.split(/(\s+)/).map((part, i) => {
        if (part.startsWith('#')) {
          return (
            <span key={i} className="text-[#CCFF00]">
              {part}
            </span>
          )
        }
        return part
      })}
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { projects, loading } = useProjects()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const projectId = Number(id)
  const project = projects.find((p) => p.id === projectId)

  if (!loading && (Number.isNaN(projectId) || !project)) {
    return <Navigate to="/project" replace />
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
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

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCFF00]" />
          </div>
        ) : project ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/project"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/50 hover:text-[#CCFF00] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={16} />
              BACK TO PROJECTS
            </Link>

            {project.image && (
              <div className="relative overflow-hidden bg-white/5 aspect-[16/9] mb-10 rounded-[12px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="font-display uppercase text-[#CCFF00] text-3xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {project.title}
            </h1>

            {project.description && (
              <p className="font-sans text-base sm:text-lg text-white/60 leading-relaxed mb-10 border-l-2 border-[#CCFF00]/40 pl-6">
                {project.description}
              </p>
            )}

            {project.inlineImages.length > 0 && (
              <div className="grid gap-6 mb-10">
                {project.inlineImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-[12px] border border-white/10 bg-white/5"
                  >
                    <img
                      src={src}
                      alt={`${project.title} image ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {project.detail && (
              <div className="border-t border-white/10 pt-10 mb-16">
                <DetailContent content={project.detail} />
              </div>
            )}

            {/* Profile Section */}
            <section className="bg-white/[0.03] border border-white/10 rounded-[12px] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src="/src/img/Profile.png" 
                  alt="Prachya Jumpapho" 
                  className="w-20 h-20 rounded-full object-cover object-top bg-white/10 flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-sans font-bold text-white text-lg">Prachya Jumpapho</h3>
                  <p className="font-mono text-sm text-white/60 mt-1">Product Design Manager</p>
                  <p className="font-mono text-xs text-white/40 mt-2 leading-relaxed">
                    Passionate about creating meaningful digital experiences and leading design strategy across multiple platforms.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        ) : null}
      </main>

      <footer className="border-t border-white/10 py-8 mt-16">
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
