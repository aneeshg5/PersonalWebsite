"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { SectionHeader } from "@/components/section-header"
import { RESEARCH_PROJECTS, SKILL_CATEGORIES } from "@/lib/data"

const EXTRA_ICONS: Record<string, string> = {
  'Optuna': 'https://api.iconify.design/simple-icons:optuna.svg?color=%23597BC0',
}

function getSkillIcon(name: string): string | null {
  if (EXTRA_ICONS[name]) return EXTRA_ICONS[name]
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.skills.find((s) => s.name.toLowerCase() === name.toLowerCase())
    if (found) return found.icon
  }
  return null
}

export function Research() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [checkScroll])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector(':scope > div') as HTMLElement
    const amount = card ? card.offsetWidth + 24 : el.clientWidth
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="research" className="w-full">
      <SectionHeader title="Research Experience" accent="bg-gradient-to-r from-accent-purple to-transparent" />
      <div className="relative w-full max-w-6xl mx-auto">

        {/* Left fade + arrow */}
        <div className={`absolute left-0 top-0 bottom-2 w-20 bg-gradient-to-r from-[#0B0F1A] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#1F2633] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <span className="material-symbols-outlined text-white/70 text-base leading-none">chevron_left</span>
        </button>

        {/* Right fade + arrow */}
        <div className={`absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-[#0B0F1A] to-transparent z-10 pointer-events-none transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#1F2633] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <span className="material-symbols-outlined text-white/70 text-base leading-none">chevron_right</span>
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-2"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {RESEARCH_PROJECTS.map((res) => (
            <div
              key={res.id}
              className="group relative bg-[#151922] border border-[#1F2633] rounded-lg overflow-hidden transition-all duration-300 hover:border-accent-purple/50 flex flex-col shrink-0"
              style={{ scrollSnapAlign: 'start', width: 'min(560px, calc(100vw - 3rem))' }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple" />
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-xs font-bold text-white/50 tracking-widest uppercase">
                    {res.institution}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple text-accent-purple text-[10px] font-mono font-bold uppercase tracking-wide">
                    {res.period}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 font-display tracking-tight">{res.title}</h2>
                <p
                  className="text-white/60 text-sm leading-relaxed mb-6 font-inter"
                  dangerouslySetInnerHTML={{
                    __html: res.description.replace(
                      /\*\*(.*?)\*\*/g,
                      '<span class="text-accent-purple font-bold">$1</span>'
                    ),
                  }}
                />
                <div className="flex flex-wrap gap-4 mb-8">
                  {res.links.map((link, idx) => (
                    <a
                      key={idx}
                      className="flex items-center gap-2 text-[#E6EDF3] text-xs font-bold uppercase tracking-wider hover:text-accent-purple transition-colors"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-sm text-accent-purple">{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {res.tech.map((t) => {
                      const icon = getSkillIcon(t)
                      return (
                        <div key={t} className="flex items-center gap-1 shrink-0">
                          {icon && <img src={icon} alt="" className="w-[14px] h-[14px] object-contain" />}
                          <span className="text-white/60 text-[11px] font-medium font-inter whitespace-nowrap">{t}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
