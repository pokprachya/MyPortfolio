import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface InfoDrawerProps {
  isOpen: boolean
  onClose: () => void
}

type DrawerView = 'menu' | 'contact'

const MENU_ITEMS = ['PROJECTS', 'BLOG', 'ABOUT', 'RESUME', "LET'S WORK"] as const

/* -------------------------------------------------------------------------- */
/*  Contact Form                                                              */
/* -------------------------------------------------------------------------- */
function ContactForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          budget: formData.budget,
          message: formData.message,
          subject: `New Project Inquiry from ${formData.name}`,
          from_name: 'Portfolio Website',
          to_email: 'pockprachya@gmail.com',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          budget: '',
          message: '',
        })
        // Close drawer and redirect after 3 seconds
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setSubmitStatus('error')
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message
  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center"
        >
          <svg
            className="w-10 h-10 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h3 className="font-display text-3xl sm:text-4xl text-[#CCFF00] mb-3">
            SUCCESS!
          </h3>
          <p className="font-sans text-base sm:text-lg text-white/80 mb-2">
            Thank you! Your message has been sent successfully.
          </p>
          <p className="font-mono text-xs text-white/50">
            I'll get back to you soon
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-xs text-white/40"
        >
          Redirecting to home...
        </motion.div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#CCFF00] tracking-wide">
        LET'S WORK
      </h2>
      <p className="font-sans text-sm text-white/50 -mt-2">
        Tell me about your project and I'll get back to you within 24 hours.
      </p>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="bg-transparent border-b border-white/20 pb-3 text-white font-sans text-sm focus:border-[#CCFF00] transition-colors duration-300 placeholder:text-white/20"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="bg-transparent border-b border-white/20 pb-3 text-white font-sans text-sm focus:border-[#CCFF00] transition-colors duration-300 placeholder:text-white/20"
        />
      </div>

      {/* Budget select */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-budget" className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Project Budget
        </label>
        <select
          id="contact-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="bg-transparent border-b border-white/20 pb-3 text-white font-sans text-sm focus:border-[#CCFF00] transition-colors duration-300 appearance-none cursor-pointer"
          style={{ backgroundColor: '#333333' }}
        >
          <option value="" disabled className="bg-[#333333] text-white">
            Select a range
          </option>
          <option value="5k-10k" className="bg-[#333333] text-white">$5,000 – $10,000</option>
          <option value="10k-25k" className="bg-[#333333] text-white">$10,000 – $25,000</option>
          <option value="25k-50k" className="bg-[#333333] text-white">$25,000 – $50,000</option>
          <option value="50k+" className="bg-[#333333] text-white">$50,000+</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Project Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your vision..."
          rows={4}
          className="bg-transparent border-b border-white/20 pb-3 text-white font-sans text-sm focus:border-[#CCFF00] transition-colors duration-300 resize-none placeholder:text-white/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-[#CCFF00] text-black font-mono text-xs tracking-[0.2em] uppercase py-4 px-8 hover:bg-[#b8e600] transition-colors duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
        {!isSubmitting && <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/*  InfoDrawer                                                                */
/* -------------------------------------------------------------------------- */
export default function InfoDrawer({ isOpen, onClose }: InfoDrawerProps) {
  const [view, setView] = useState<DrawerView>('menu')
  const navigate = useNavigate()

  const handleMenuClick = (item: string) => {
    if (item === "LET'S WORK") {
      setView('contact')
    } else if (item === 'PROJECTS') {
      onClose()
      navigate('/project')
    } else if (item === 'ABOUT') {
      onClose()
      navigate('/about')
    } else if (item === 'BLOG') {
      onClose()
      navigate('/blog')
    } else if (item === 'RESUME') {
      window.open('https://drive.google.com/file/d/1mOTM0psF4sYOeAPA8whvHx0XCG0dxfD1/view', '_blank')
      onClose()
    } else {
      // Future: navigate to sections
      onClose()
    }
  }

  const handleBack = () => {
    setView('menu')
  }

  const handleClose = () => {
    setView('menu')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-xl md:max-w-2xl bg-[#333333] border-l border-white/5 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Navigation drawer"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-[#333333]/90 backdrop-blur-md flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                {view === 'contact' && (
                  <button
                    onClick={handleBack}
                    className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    aria-label="Go back to menu"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  {view === 'menu' ? 'MENU' : 'CONTACT'}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#CCFF00] transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 sm:py-12">
              <AnimatePresence mode="wait">
                {view === 'menu' ? (
                  <motion.nav
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Drawer navigation"
                  >
                    <ul className="flex flex-col gap-1">
                      {MENU_ITEMS.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                        >
                          <button
                            onClick={() => handleMenuClick(item)}
                            className="w-full text-left font-display text-4xl sm:text-5xl md:text-6xl text-white/80 hover:text-[#CCFF00] transition-colors duration-300 py-3 sm:py-4 tracking-wide group flex items-center gap-4"
                          >
                            <span className="font-mono text-[10px] text-white/20 group-hover:text-[#CCFF00]/50 transition-colors">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {item}
                          </button>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Contact links at bottom */}
                    <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5">
                      <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">
                        Connect
                      </p>
                      <div className="flex gap-6">
                        <a
                          href="mailto:pockprachya@gmail.com"
                          className="font-mono text-[10px] tracking-widest text-white/40 hover:text-[#CCFF00] transition-colors duration-300"
                        >
                          Email me
                        </a>
                        <a
                          href="https://www.linkedin.com/in/pokprachy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] tracking-widest text-white/40 hover:text-[#CCFF00] transition-colors duration-300"
                        >
                          Linkedin
                        </a>
                        <a
                          href="tel:+660924949288"
                          className="font-mono text-[10px] tracking-widest text-white/40 hover:text-[#CCFF00] transition-colors duration-300"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </motion.nav>
                ) : (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactForm onClose={handleClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
