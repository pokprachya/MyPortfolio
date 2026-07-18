import { useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Menu, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import InfoDrawer from '../components/InfoDrawer'

const ParticleBackground = lazy(() => import('../components/ParticleBackground'))

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Blog() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [posts, setPosts] = useState<{ id: number, content: string, image: string, date: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://docs.google.com/spreadsheets/d/1nbje7vH-qYclkK0q2WiwDjd-_4mFxYkmX55e4yaQI7U/export?format=csv')
        const text = await res.text()
        
        // Simple CSV parser supporting quotes and newlines
        const rows = []
        let row = []
        let field = ''
        let inQuotes = false
        for (let i = 0; i < text.length; i++) {
          const char = text[i]
          if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
              field += '"'
              i++
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === ',' && !inQuotes) {
            row.push(field.trim())
            field = ''
          } else if (char === '\n' && !inQuotes) {
            row.push(field.trim())
            if (row.length >= 2 && (row[0] || row[1])) {
              rows.push(row)
            }
            row = []
            field = ''
          } else {
            if (char !== '\r') {
              field += char
            }
          }
        }
        if (field) row.push(field.trim())
        if (row.length >= 2 && (row[0] || row[1])) rows.push(row)

        const parsedPosts = rows.map((r, idx) => ({
          id: idx,
          content: r[0] || "",
          image: r[1] || "",
          date: "Recently"
        }))

        setPosts(parsedPosts)
      } catch (err) {
        console.error("Error fetching posts", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden">
      {/* Particle Background */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 bg-[#030014]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3 cursor-pointer select-none">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#CCFF00] flex items-center justify-center text-black text-sm sm:text-base font-bold transition-transform duration-500 group-hover:rotate-180">
            ✦
          </div>
          <span className="font-sans text-lg sm:text-xl tracking-[0.3em] uppercase text-white font-bold">
            PRACHYA
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="hidden sm:block font-mono text-xs tracking-widest border border-white/20 px-4 py-2 sm:px-6 sm:py-2.5 text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 rounded-none"
          >
            MENU
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#CCFF00] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20">
        <section className="px-6 lg:px-12 mb-16">
          <div className="max-w-[800px] mx-auto text-center sm:text-left">
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">Insights & Updates</span>
            <h1 className="font-display uppercase text-[#CCFF00] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6 text-left">
              BLOG
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto sm:mx-0">
              My latest thoughts on design leadership, UX strategies, and digital experiences.
            </p>
            
            <a 
              href="https://www.linkedin.com/in/pokprachy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white font-mono text-sm tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] hover:bg-[#CCFF00]/10 transition-colors duration-300 rounded-full"
            >
              <LinkedinIcon size={18} />
              <span>FOLLOW ON LINKEDIN</span>
            </a>
          </div>
        </section>

        {/* Posts Feed from Google Sheets */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto space-y-8 min-h-[500px]">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCFF00]"></div>
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-xl hover:border-[#CCFF00]/30 transition-colors duration-300"
                >
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://thumbs2.imgbox.com/f5/b0/edxwODlv_t.png" 
                        alt="Prachya Jumpapho" 
                        className="w-12 h-12 rounded-full object-cover object-top bg-white/10"
                      />
                      <div>
                        <h3 className="font-sans font-bold text-white text-base">Prachya Jumpapho</h3>
                        <p className="font-mono text-xs text-white/40">Product Design Manager | UX/UI</p>
                        <p className="font-mono text-xs text-white/30 mt-1 flex items-center gap-1">
                          {post.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                    {post.content.split(' ').map((word, i) => {
                      if (word.startsWith('#')) {
                        return <span key={i} className="text-[#CCFF00]">{word} </span>
                      }
                      return word + ' '
                    })}
                  </div>
                  
                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-6 overflow-hidden rounded-[12px] border border-white/10 bg-black/20">
                      <img src={post.image} alt="Post media" className="w-full h-auto object-cover max-h-[600px]" loading="lazy" />
                    </div>
                  )}

                  {/* Removed social actions for cleaner blog cards */}
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 mt-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="font-mono text-xs text-white/30 text-center">
            © 2026 PRACHYA JUMPAPHO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Info Drawer */}
      <InfoDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
