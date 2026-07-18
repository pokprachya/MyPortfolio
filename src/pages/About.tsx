import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import InfoDrawer from '../components/InfoDrawer'
import { parseCsv } from '../utils/parseCsv'

const ParticleBackground = lazy(() => import('../components/ParticleBackground'))

// Simple Counter Animation Component
function StatItem({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep))
      } else {
        setCount(value)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div>
      <div className="font-display text-6xl lg:text-7xl xl:text-8xl text-[#CCFF00] mb-2 leading-none">
        {count}+
      </div>
      <div className="font-mono text-sm text-white/50 uppercase tracking-wider">{label}</div>
    </div>
  )
}

// Stretched Type Repeater Component for Numbers
function StretchedNumber({ number }: { number: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width: '80px', height: '80px' }}>
      {/* Main number */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { 
          scale: 1,
          opacity: 1
        } : {}}
        transition={{ 
          duration: 0.6,
          delay: 0.4,
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
      >
        <span className="font-display text-5xl text-[#CCFF00]">
          {number}
        </span>
      </motion.div>
    </div>
  )
}
// Fade Slide Up Text Animation Component
function FadeSlideUpText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ 
        opacity: 0,
        y: 40
      }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        display: 'inline-block'
      }}
    >
      {text}
    </motion.span>
  )
}

// Fade Slide Up on Scroll Component
function FadeSlideUpOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

const skills = [
  'UI/UX Design',
  'Web Design',
  'UX Research',
  'Usability Testing',
  'UX Strategy',
  'Business Strategy',
  'Design System',
  'Design Research',
  'Customer Journeys',
  'Agile Methodologies',
  'Copywriting',
  'Project Management',
  'Team Management',
  'Data Analysis',
  'Prototyping',
  'Visual Design',
  'Marketing',
  'Branding',
]

const expertise = [
  {
    number: '01',
    title: 'Strategic Leadership',
    description: 'Successfully led UX/UI initiatives across fintech, automotive, e-commerce, and blockchain industries, aligning design vision with business goals.',
  },
  {
    number: '02',
    title: 'User-Centered Innovation',
    description: 'Deep expertise in user research, usability testing, and data-driven design decisions that enhance user engagement and retention.',
  },
  {
    number: '03',
    title: 'Team Building',
    description: 'Built and managed multidisciplinary design teams, improving collaboration, efficiency, and creative output.',
  },
  {
    number: '04',
    title: 'Business Impact',
    description: 'Designs and strategies have consistently increased user satisfaction, conversion rates, and operational efficiency.',
  },
]

interface ExperienceItem {
  period: string
  logo: string
  title: string
  company: string
  type: string
}

const defaultExperience: ExperienceItem[] = [
  {
    period: 'May 2025 - Present',
    logo: '',
    title: 'Product Design Manager',
    company: 'Ascend Group',
    type: 'Full-time',
  },
  {
    period: 'Feb 2023 - Apr 2025',
    logo: '',
    title: 'Lead of UX (Assistant Vice President)',
    company: 'Krungsri Auto',
    type: 'Full-time',
  },
  {
    period: 'Feb 2020 - Jan 2023',
    logo: '',
    title: 'Lead of UX UI Designer',
    company: 'Looloo Technology',
    type: 'Full-time',
  },
  {
    period: 'Apr 2017 - Feb 2020',
    logo: '',
    title: 'Senior & Lead of UX UI Designer',
    company: 'Solunic Technology',
    type: 'Full-time',
  },
]

const EXPERIENCE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1Rx3mfHe0i49OhMFSqWvVLPXj11miS3n2EahVTb7HpzI/export?format=csv&gid=0'

const education = [
  {
    degree: "Master's Degree",
    school: 'Ramkhamhaeng University',
    details: 'MBA Innovation Management, Ramkhamhaeng University — GPA 3.43',
    period: 'Apr 2012 - Apr 2014',
    logo: 'https://framerusercontent.com/images/ZKEjp5lkgb4qDOOaGKCv2fe6avk.jpeg?width=222&height=227',
  },
  {
    degree: 'Mini MBA Class Data Analyst',
    school: 'Chulalongkorn University',
    details: 'Mini MBA Data Science',
    period: 'Apr 2024 - Sep 2024',
    logo: 'https://framerusercontent.com/images/lEc0VxQ8dRWfiWKaJyE2rGxoQg.png?width=570&height=498',
  },
  {
    degree: "Bachelor's Degree",
    school: 'Ramkhamhaeng University',
    details: 'Communication Art/Advertising, Ramkhamhaeng University — GPA 3.44',
    period: 'Sep 2000 - Aug 2004',
    logo: 'https://framerusercontent.com/images/ZKEjp5lkgb4qDOOaGKCv2fe6avk.jpeg?width=222&height=227',
  },
]

const PROJECT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1yocKWGuxaLoyj7jrkEO1Q7g1-CvULOjAeNi4wSerSTY/export?format=csv'

interface AboutProject {
  image: string
  name: string
  description: string
  link: string
}

const recognition = [
  { title: 'UX Design Certificate', org: 'Coursera', year: '2023' },
  { title: 'BIZ CUBE Chula Certificate', org: 'Chulalongkorn University', year: '2023' },
  { title: 'Global Startup Acceleration Program', org: 'Thailand X Sweden Startup', year: '2023' },
  { title: 'UX Design Certificate', org: 'Google', year: '2022' },
  { title: 'Hackathon Digital Infrastructure', org: 'Startup Thailand', year: '2021' },
  { title: 'Brand Experience Certificate', org: 'Creative Design Association', year: '2020' },
  { title: 'Thailand Designer Community', org: 'Industrial Designers Society Thailand', year: '2020' },
  { title: 'The Power of Customer Experience', org: 'MarTech', year: '2020' },
]

const recommendations = [
  {
    name: 'Jonathan Carter',
    title: 'TechStarter CTO',
    text: "Prachya's ability to combine creativity with strategic thinking has transformed the way our team approaches challenges. He is good in his domain.",
  },
  {
    name: 'Michael Johnson',
    title: 'Head of Product, NexaCorp',
    text: "Prachya's leadership and vision have set a new standard for excellence, making a lasting impact on every project they lead. Highly recommended to work with him.",
  },
  {
    name: 'Samantha Lee',
    title: 'COO, InnovateX',
    text: 'Alex consistently brings a fresh perspective to every project, fostering a collaborative environment that elevates the entire team.',
  },
]

export default function About() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [experience, setExperience] = useState<ExperienceItem[]>(defaultExperience)
  const [projects, setProjects] = useState<AboutProject[]>([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await fetch(EXPERIENCE_SHEET_URL)
        const text = await res.text()
        const rows = parseCsv(text)

        const parsed = rows
          .filter((row) => row[0]?.trim())
          .map((row) => ({
            period: row[0] || '',
            logo: (row[1] || '').trim(),
            title: row[2] || '',
            company: row[3] || '',
            type: row[4] || '',
          }))
          .filter((item) => item.title || item.company)

        if (parsed.length > 0) {
          setExperience(parsed)
        }
      } catch (error) {
        console.error('Failed to load experience', error)
      }
    }

    fetchExperience()
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(PROJECT_SHEET_URL)
        const text = await res.text()
        const rows = parseCsv(text)

        const parsed = rows
          .filter((row) => row[0]?.trim())
          .map((row) => ({
            image: row[0] || '',
            name: row[1] || '',
            description: row[2] || '',
            link: row[3] || '',
          }))

        setProjects(parsed)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsProjectsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden">
      {/* Particle Background */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Hero Background Image - Fixed Position */}
      <div
        className="fixed bottom-0 right-0 z-[5] pointer-events-none"
        style={{
          height: 'clamp(60vh, 90vh, 120vh)',
          width: 'auto',
          maxHeight: '120%',
        }}
      >
        <img
          src="/src/img/Profile2.png"
          alt="Prachya Jumpapho"
          className="h-full w-auto object-contain brightness-95 grayscale contrast-125 opacity-80"
          draggable={false}
        />
      </div>

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
        {/* Hero Section - Modern Layout */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Text Content */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-full">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#CCFF00]"></span>
                  </span>
                  <span className="font-mono text-xs tracking-widest text-[#CCFF00] uppercase">
                    Available for work
                  </span>
                </div>

                <h1 className="font-display uppercase text-[#CCFF00] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none">
                  <FadeSlideUpText text="PRACHYA" delay={0.2} />
                  <br />
                  <FadeSlideUpText text="JUMPAPHO" delay={0.5} />
                </h1>

                <div className="space-y-4 max-w-2xl">
                  <p className="font-sans text-2xl sm:text-3xl text-white leading-relaxed">
                    Product Design Manager crafting bold digital experiences
                  </p>
                  <p className="font-mono text-sm text-white/50 leading-relaxed">
                    10+ years of experience driving digital innovation and product excellence across complex web and mobile ecosystems
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  <StatItem value={10} label="Years" />
                  <StatItem value={50} label="Projects" />
                  <StatItem value={20} label="Clients" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section - Modern Cards */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="mb-16">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">What I Do</span>
                <h2 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl">
                  EXPERTISE
                </h2>
              </div>
            </FadeSlideUpOnScroll>

            <div className="grid md:grid-cols-2 gap-8">
              {expertise.map((item) => (
                <div
                  key={item.number}
                  className="group rounded-[24px] p-8 lg:p-10 border border-white/10 hover:border-[#CCFF00]/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <StretchedNumber number={item.number} />
                    <div className="flex-1">
                      <h3 className="font-sans text-xl font-bold text-white mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section - Minimal Pills */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="mb-12">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">Skills & Tools</span>
                <h2 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl">
                  CAPABILITIES
                </h2>
              </div>
            </FadeSlideUpOnScroll>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full font-mono text-xs tracking-wider text-white/70 hover:border-[#CCFF00] hover:text-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section - Timeline Style */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="mb-16">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">Career Journey</span>
                <h2 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl">
                  EXPERIENCE
                </h2>
              </div>
            </FadeSlideUpOnScroll>

            <div className="space-y-12">
              {experience.map((job, i) => (
                <div
                  key={i}
                  className="group grid lg:grid-cols-12 gap-8 pb-12 border-b border-white/5 last:border-0"
                >
                  <div className="lg:col-span-3">
                    <span className="font-mono text-sm text-white/40">{job.period}</span>
                  </div>
                  <div className="lg:col-span-9 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {job.logo ? (
                          <div className="w-14 h-14 rounded-[12px] overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                            <img
                              src={job.logo}
                              alt={`${job.company} logo`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : null}
                        <div>
                          <h3 className="font-sans text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors duration-300">
                            {job.title}
                          </h3>
                          <p className="font-mono text-base text-white/60">{job.company}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">{job.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="mb-16">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">Education</span>
                <h2 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl">
                  ACADEMIC BACKGROUND
                </h2>
              </div>
            </FadeSlideUpOnScroll>

            <div className="space-y-4">
              {education.map((item, index) => (
                <article
                  key={index}
                  className="group flex items-center justify-between gap-6 rounded-[24px] border border-white/10 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-[#CCFF00]/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="w-20 h-20 rounded-[18px] overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                      <img
                        src={item.logo}
                        alt={`${item.school} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans text-2xl text-white font-semibold leading-tight truncate">
                        {item.degree}
                      </h3>
                      <p className="font-mono text-base text-white/60 truncate">
                        {item.school}
                      </p>
                      {item.details && (
                        <p className="font-sans text-sm text-white/60 mt-1 truncate">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right text-white/40">
                    <p className="font-mono text-sm uppercase tracking-[0.3em]">
                      {item.period}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            
          </div>
        </section>

        {/* Featured Projects - Large Cards */}
        <section className="px-6 lg:px-12 mb-32">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="mb-16 flex items-end justify-between">
                <div>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-4">Selected Work</span>
                  <h2 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl">
                    PROJECTS
                  </h2>
                </div>
                <Link
                  to="/project"
                  className="group flex items-center gap-2 font-mono text-xs tracking-wider text-white/60 hover:text-[#CCFF00] transition-colors duration-300"
                >
                  <span>VIEW ALL</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </FadeSlideUpOnScroll>

            <div className="grid md:grid-cols-2 gap-8">
              {isProjectsLoading ? (
                <p className="text-white/60">Loading projects...</p>
              ) : (
                projects.map((project, i) => (
                  <a
                    key={i}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-6 rounded-[24px] border border-white/10 hover:border-[#CCFF00]/50 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all duration-500"
                  >
                    {project.image && (
                      <div className="w-20 h-20 flex-shrink-0 rounded-[16px] overflow-hidden border border-white/10 bg-white/5">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#CCFF00] transition-colors duration-300 line-clamp-2">
                          {project.name}
                        </h3>
                        <ArrowUpRight size={20} className="text-white/40 group-hover:text-[#CCFF00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
                      </div>
                      <p className="font-sans text-sm text-white/60 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA - Large & Bold */}
        <section className="px-6 lg:px-12 mb-20">
          <div className="max-w-[1600px] mx-auto">
            <FadeSlideUpOnScroll>
              <div className="border border-white/10 rounded-[24px] p-12 lg:p-20 text-center bg-white/[0.02]">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-6">Get In Touch</span>
                <h2 className="font-display uppercase text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-8">
                  LET'S WORK<br />TOGETHER
                </h2>
                <p className="font-sans text-lg text-white/60 mb-12 max-w-2xl mx-auto">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:pockprachya@gmail.com"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-mono text-sm tracking-wider hover:bg-[#b8e600] transition-colors duration-300"
                  >
                    <Mail size={18} />
                    <span>EMAIL ME</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pokprachy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-mono text-sm tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-300"
                  >
                    <ArrowUpRight size={18} />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href="tel:+66924949288"
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-mono text-sm tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors duration-300"
                  >
                    <Phone size={18} />
                    <span>CALL</span>
                  </a>
                </div>
              </div>
            </FadeSlideUpOnScroll>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
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
