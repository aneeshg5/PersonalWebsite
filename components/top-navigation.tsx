"use client"

import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { label: 'Home',       color: '#06c0f9' },
  { label: 'Experience', color: '#00C9FF' },
  { label: 'Research',   color: '#A78BFA' },
  { label: 'Projects',   color: '#10B981' },
  { label: 'Skills',     color: '#F59E0B' },
  { label: 'Education',  color: '#FBBF24' },
  { label: 'Leadership', color: '#FB7185' },
  { label: 'Contact',    color: '#ffffff' },
]

export function TopNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
          : 'bg-transparent py-8'
      }`}
    >
      <div
        className="h-14 w-14 rounded-full border-2 border-white/20 overflow-hidden cursor-pointer hover:border-primary/60 transition-all hover:shadow-[0_0_12px_rgba(6,192,249,0.4)]"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src="/profile.jpg"
          alt="Aneesh Ganti"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            const t = e.currentTarget
            t.style.display = 'none'
            t.parentElement!.classList.add('bg-primary/20', 'flex', 'items-center', 'justify-center')
            t.parentElement!.innerHTML = '<span class="text-primary font-bold text-sm">AG</span>'
          }}
        />
      </div>

      <nav className="hidden md:flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            className="text-sm font-medium uppercase tracking-widest cursor-pointer transform duration-200 hover:scale-105 font-display transition-colors"
            style={{
              color: hovered === item.label ? item.color : 'rgba(255,255,255,0.7)',
            }}
            href={`#${item.label.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault()
              scrollTo(item.label.toLowerCase())
            }}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
