"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const PROFILE_BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QM7aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIiB4bWxuczpJcHRjNHhtcEV4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiBleGlmOkRhdGVUaW1lT3JpZ2luYWw9IjIwMjYtMDEtMDFUMDE6NTE6NTUrMDA6MDAiIElwdGM0eG1wRXh0OkRpZ2l0YWxTb3VyY2VGaWxlVHlwZT0iaHR0cDovL2N2LmlwdGMub3JnL25ld3Njb2Rlcy9kaWdpdGFsc291cmNldHlwZS9jb21wb3NpdGVXaXRoVHJhaW5lZEFsZ29yaXRobWljTWVkaWEiIElwdGM0eG1wRXh0OkRpZ2l0YWxTb3VyY2VUeXBlPSJodHRwOi8vY3YuaXB0Yy5vcmcvbmV3c2NvZGVzL2RpZ2l0YWxzb3VyY2V0eXBlL2NvbXBvc2l0ZVdpdGhUcmFpbmVkQWxnb3JpdGhtaWNNZWRpYSIgcGhvdG9zaG9wOkNyZWRpdD0iRWRpdGVkIHdpdGggR29vZ2xlIEFJIiBwaG90b3Nob3A6RGF0ZUNyZWF0ZWQ9IjIwMjYtMDEtMDFUMDE6NTE6NTUrMDA6MDAiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgACAAHAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAb/xAAdEAABAgcAAAAAAAAAAAAAAAACBBEAAwUGBxMh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAaEQACAgMAAAAAAAAAAAAAAAAAAgEDBBES/9oADAMBAAIRAxEAPwBtS80W8K818xUOs3bsGuFZ0UTckpo//9k="

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
        <Image
          src="/profile.webp"
          alt="Aneesh Ganti"
          width={112}
          height={112}
          className="w-full h-full object-cover object-top"
          placeholder="blur"
          blurDataURL={PROFILE_BLUR}
          priority
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
