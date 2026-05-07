import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { navItems } from '../data/siteData'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-white/10 bg-[#050816]/72 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/[.06] shadow-[0_0_32px_rgba(124,58,237,.35)] backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-cyan-200 transition-transform group-hover:rotate-12" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-white">First<span className="text-cyan-200">AI</span></span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(6,182,212,.18)] transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-cyan-300/16">
          Get Demo
        </a>
      </nav>
    </motion.header>
  )
}
