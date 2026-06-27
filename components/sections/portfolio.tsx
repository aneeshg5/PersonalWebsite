"use client"

import { useState, useEffect } from "react"
import { SectionHeader } from "@/components/section-header"
import { PROJECTS, SKILL_CATEGORIES } from "@/lib/data"

const EXTRA_ICONS: Record<string, string> = {
  'React Native':   'https://cdn.simpleicons.org/react/61DAFB',
  'Supabase':       'https://cdn.simpleicons.org/supabase/3ECF8E',
  'OpenAI':         'https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff',
  'Next.js':        'https://cdn.simpleicons.org/nextdotjs/ffffff',
  'Rust':           'https://cdn.simpleicons.org/rust/ffffff',
  'WASM':           'https://cdn.simpleicons.org/webassembly/654FF0',
  'WebGL':          'https://cdn.simpleicons.org/webgl/990000',
  'AWS SES':        'https://api.iconify.design/logos:aws.svg',
  'PyTorch Mobile': 'https://cdn.simpleicons.org/pytorch/EE4C2C',
  'GPT-4':          'https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff',
  'Firebase':       'https://cdn.simpleicons.org/firebase/FFCA28',
  'HTML5 Canvas':   'https://cdn.simpleicons.org/html5/E34F26',
  'IndexedDB':      'https://cdn.simpleicons.org/sqlite/003B57',
  'Web Workers':    'https://cdn.simpleicons.org/javascript/F7DF1E',
  'Zod':            'https://cdn.simpleicons.org/zod/3068B7',
  'Vitest':         'https://cdn.simpleicons.org/vitest/6E9F18',
  'Playwright':     'https://api.iconify.design/logos:playwright.svg',
  'pytest':         'https://cdn.simpleicons.org/pytest/0A9EDC',
  'fuzzy-c-means':  'https://api.iconify.design/mdi:scatter-plot.svg?color=%23a78bfa',
  'ANSYS':          'https://cdn.simpleicons.org/ansys/FFB71B',
  'WebAssembly':    'https://cdn.simpleicons.org/webassembly/654FF0',
  'WebGL2':         'https://cdn.simpleicons.org/webgl/990000',
  'Eigen':          'https://api.iconify.design/mdi:matrix.svg?color=%2310B981',
  'Chart.js':       'https://cdn.simpleicons.org/chartdotjs/FF6384',
  'Cloudflare':     'https://cdn.simpleicons.org/cloudflare/F38020',
}

function getSkillIcon(name: string): string | null {
  const normalized = name === 'ReactJS' ? 'React' : name
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.skills.find((s) => s.name.toLowerCase() === normalized.toLowerCase())
    if (found) return found.icon
  }
  return EXTRA_ICONS[name] ?? null
}

const CATEGORIES = ["All", "ML/AI", "Simulation", "Full-Stack", "Mobile", "Graphics"]

function WebCarousel({ images, captions, onClose }: {
  images: string[]
  captions?: string[]
  onClose: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState<'left' | 'right'>('right')
  const n = images.length

  const prev = () => { setDir('left');  setIdx((i) => (i - 1 + n) % n) }
  const next = () => { setDir('right'); setIdx((i) => (i + 1) % n) }

  useEffect(() => {
    const nav = document.querySelector('header') as HTMLElement | null
    if (nav) nav.style.visibility = 'hidden'
    return () => { if (nav) nav.style.visibility = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const slideClass = dir === 'right' ? 'carousel-slide-right' : 'carousel-slide-left'

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-5 w-[78%] max-w-[860px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MacBook frame — screen auto-sizes to screenshot's natural aspect ratio */}
        <div className="w-full flex flex-col" style={{ filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.9))' }}>
          {/* Lid */}
          <div
            className="rounded-t-[7px] overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #222 0%, #181818 40%, #111 100%)',
              padding: '3px 3px 0 3px',
              border: '1px solid rgba(255,255,255,0.13)',
              borderBottom: 'none',
            }}
          >
            <div className="rounded-[2px] overflow-hidden bg-black">
              {/* Top bezel row with camera — no overlap with screenshot */}
              <div className="flex items-center justify-center bg-black" style={{ height: '12px' }}>
                <div className="w-[5px] h-[5px] rounded-full bg-[#1a1a1a] border border-black/60" />
              </div>
              {/* Screenshot fills screen at its natural ratio */}
              <img key={idx} src={images[idx]} alt="" className={`w-full block ${slideClass}`} />
            </div>
          </div>
          {/* Hinge crease */}
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.7) 80%, transparent)' }} />
          {/* Keyboard base */}
          <div
            className="h-[13px] rounded-b-[5px] mx-[-1.5%]"
            style={{
              background: 'linear-gradient(180deg, #1e1e1e 0%, #181818 60%, #111 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: 'none',
            }}
          />
          {/* Foot shadow line */}
          <div className="h-px mx-[3%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />
        </div>

        {/* Caption */}
        {captions?.[idx] && (
          <p key={`cap-${idx}`} className={`text-white/70 text-sm font-inter tracking-wide text-center ${slideClass}`}>
            {captions[idx]}
          </p>
        )}

        {/* Dots */}
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 'right' : 'left'); setIdx(i) }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === idx ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>

      {/* Left arrow */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); prev() }}
      >
        <span className="material-symbols-outlined text-5xl">chevron_left</span>
      </button>

      {/* Right arrow */}
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); next() }}
      >
        <span className="material-symbols-outlined text-5xl">chevron_right</span>
      </button>

      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onClose() }}
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
    </div>
  )
}

function MobileCarousel({ images, captions, onClose }: {
  images: string[]
  captions?: string[]
  onClose: () => void
}) {
  const [idx, setIdx] = useState(1)
  const [dir, setDir] = useState<'left' | 'right'>('right')
  const n = images.length

  const prev = () => { setDir('left');  setIdx((i) => (i - 1 + n) % n) }
  const next = () => { setDir('right'); setIdx((i) => (i + 1) % n) }

  const leftIdx  = (idx - 1 + n) % n
  const rightIdx = (idx + 1) % n

  // Hide navbar while open
  useEffect(() => {
    const nav = document.querySelector('header') as HTMLElement | null
    if (nav) nav.style.visibility = 'hidden'
    return () => { if (nav) nav.style.visibility = '' }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const slideClass = dir === 'right' ? 'carousel-slide-right' : 'carousel-slide-left'

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Phones row */}
      <div
        className="flex items-end justify-center gap-6 w-full px-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left phone */}
        <div
          onClick={prev}
          className="h-[50vh] aspect-[9/19.5] rounded-2xl overflow-hidden border border-white/15 opacity-40 hover:opacity-60 shadow-xl transition-all duration-300 cursor-pointer shrink-0 -rotate-3 mb-8"
        >
          <img src={images[leftIdx]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Center phone + caption */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="h-[70vh] aspect-[9/19.5] rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl">
            <img key={idx} src={images[idx]} alt="" className={`w-full h-full object-cover ${slideClass}`} />
          </div>
          {captions?.[idx] && (
            <p key={`cap-${idx}`} className={`text-white/70 text-sm font-inter tracking-wide ${slideClass}`}>
              {captions[idx]}
            </p>
          )}
          {/* Dots */}
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > idx ? 'right' : 'left'); setIdx(i) }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === idx ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Right phone */}
        <div
          onClick={next}
          className="h-[50vh] aspect-[9/19.5] rounded-2xl overflow-hidden border border-white/15 opacity-40 hover:opacity-60 shadow-xl transition-all duration-300 cursor-pointer shrink-0 rotate-3 mb-8"
        >
          <img src={images[rightIdx]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Left arrow */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); prev() }}
      >
        <span className="material-symbols-outlined text-5xl">chevron_left</span>
      </button>

      {/* Right arrow */}
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); next() }}
      >
        <span className="material-symbols-outlined text-5xl">chevron_right</span>
      </button>

      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onClose() }}
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
    </div>
  )
}

const MONTH: Record<string, number> = {
  Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11,
  January:0,February:1,March:2,April:3,June:5,July:6,August:7,September:8,October:9,November:10,December:11,
}
function parseUpdatedAt(s: string): number {
  const [mon, yr] = s.trim().split(' ')
  return parseInt(yr) * 12 + (MONTH[mon] ?? 0)
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [showAll, setShowAll] = useState(false)
  const [carousel, setCarousel] = useState<{ images: string[]; captions?: string[]; type: 'mobile' | 'web' } | null>(null)

  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  const allFiltered = PROJECTS
    .filter((p) => !p.isHidden)
    .filter((p) => activeCategory === "All" || p.categories.includes(activeCategory))
    .sort((a, b) => parseUpdatedAt(b.updatedAt) - parseUpdatedAt(a.updatedAt))
  const needsMore = allFiltered.length > 3
  const filtered = needsMore && !showAll ? allFiltered.slice(0, 3) : allFiltered

  return (
    <section id="projects" className="w-full">
      <SectionHeader title="Featured Projects" accent="bg-gradient-to-r from-accent-green to-transparent" />

      <div className="flex flex-wrap gap-4 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all rounded ${
              activeCategory === cat
                ? "text-accent-green border-accent-green bg-accent-green/10"
                : "text-white/60 border-white/10 hover:border-accent-green/50 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full max-w-7xl">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="group relative bg-[#151922] border border-[#1F2633] rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-accent-green/50"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-green"></div>
            <div className="relative w-full aspect-video bg-[#0B0F1A] border-b border-[#1F2633] overflow-hidden">
              {/* Category badge — top left */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2 py-1 rounded bg-accent-green text-[#0B0F1A] text-[10px] font-mono font-bold uppercase tracking-wide">
                  {proj.categoryTag}
                </span>
              </div>
              {proj.displayType === 'mobile' ? (
                <>
                  {/* View Screens button — top right, no background */}
                  <button
                    className="absolute top-3 right-3 z-20 text-white/70 hover:text-white transition-colors"
                    onClick={() => setCarousel({ images: proj.images ?? [proj.image], captions: proj.imageCaptions, type: 'mobile' })}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>open_in_full</span>
                  </button>
                  <div className="flex items-center justify-center gap-3 w-full h-full px-6 transition-transform duration-500 group-hover:scale-105 relative">
                    {proj.thumbnailBg ? (
                      <>
                        <img src={proj.thumbnailBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] to-[#0B0F1A]" />
                    )}
                    {(proj.images ?? [proj.image, proj.image, proj.image]).map((src, i) => (
                      <div
                        key={i}
                        className="h-[90%] aspect-[9/19.5] rounded-[10px] border border-white/20 overflow-hidden bg-[#111] shrink-0 shadow-lg relative z-10"
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </>
              ) : proj.displayType === 'web' ? (
                <div className="relative flex items-center justify-center w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  {proj.images && (
                    <button
                      className="absolute top-3 right-3 z-20 text-white/70 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); setCarousel({ images: proj.images!, captions: proj.imageCaptions, type: 'web' }) }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>open_in_full</span>
                    </button>
                  )}
                  {/* Background */}
                  {proj.thumbnailBg ? (
                    <>
                      <img src={proj.thumbnailBg} alt="" className={`absolute inset-0 w-full h-full object-cover blur-[3px] scale-110 ${proj.brightThumbnail ? 'brightness-125' : ''}`} />
                      <div className={`absolute inset-0 bg-gradient-to-b ${proj.brightThumbnail ? 'from-black/35 to-black/60' : 'from-black/65 to-black/85'}`} />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#080c18] to-[#0B0F1A]" />
                  )}
                  {/* MacBook mockup */}
                  <div className="relative z-10 w-[72%] flex flex-col" style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.8))' }}>
                    {/* Lid — space black with ultra-thin bezel */}
                    <div
                      className="rounded-t-[5px] overflow-hidden"
                      style={{
                        background: 'linear-gradient(160deg, #222 0%, #181818 40%, #111 100%)',
                        padding: '3px 3px 0 3px',
                        border: '1px solid rgba(255,255,255,0.13)',
                        borderBottom: 'none',
                      }}
                    >
                      {/* Screen — fills nearly the full lid */}
                      <div className="relative rounded-[2px] overflow-hidden bg-black">
                        {/* Tiny camera dot */}
                        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#1a1a1a] z-10 border border-black/60" />
                        <div className="aspect-[16/10]">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                    {/* Hinge crease */}
                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.7) 80%, transparent)' }} />
                    {/* Keyboard base — slightly wider, tapered */}
                    <div
                      className="h-[11px] rounded-b-[4px] mx-[-1.5%]"
                      style={{
                        background: 'linear-gradient(180deg, #1e1e1e 0%, #181818 60%, #111 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderTop: 'none',
                      }}
                    />
                    {/* Foot shadow */}
                    <div className="h-px mx-[3%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />
                  </div>
                </div>
              ) : (
                <img
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={proj.image}
                />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-accent-green transition-colors">
                {proj.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 font-inter">{proj.description}</p>
              <ul className="space-y-2 mb-6">
                {proj.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="relative pl-4 text-xs text-white/70 font-inter leading-relaxed before:absolute before:left-0 before:top-[1px] before:text-accent-green before:content-['▸']"
                    dangerouslySetInnerHTML={{
                      __html: h.replace(
                        /\*\*(.*?)\*\*/g,
                        '<span class="text-accent-green font-bold">$1</span>'
                      ),
                    }}
                  />
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 mt-auto">
                {proj.tech.map((t) => {
                  const icon = getSkillIcon(t)
                  return (
                    <div key={t} className="flex items-center gap-1 shrink-0">
                      {icon && <img src={icon} alt="" className="w-[14px] h-[14px] object-contain" />}
                      <span className="text-white/60 text-[11px] font-medium font-inter whitespace-nowrap">{t}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                {proj.links ? proj.links.map((link) => (
                  <a
                    key={link.label}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-accent-green transition-colors"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{link.icon}</span>
                    {link.label}{" "}
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
                  </a>
                )) : (
                  <>
                    <a
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-accent-green transition-colors"
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub{" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                    <a
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-accent-green transition-colors"
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo{" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                  </>
                )}
              </div>
              <p className="font-inter text-[11px] text-[#8B949E] text-right mt-3">
                Last Updated: {proj.updatedAt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {needsMore && (
        <div className="flex justify-center mt-12 w-full">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-8 py-3 rounded border border-accent-green bg-transparent text-accent-green text-sm font-bold uppercase tracking-widest hover:bg-accent-green/10 transition-all"
          >
            {showAll ? "Show Less" : "See More Projects"}
          </button>
        </div>
      )}

      {carousel && carousel.type === 'mobile' && (
        <MobileCarousel images={carousel.images} captions={carousel.captions} onClose={() => setCarousel(null)} />
      )}
      {carousel && carousel.type === 'web' && (
        <WebCarousel images={carousel.images} captions={carousel.captions} onClose={() => setCarousel(null)} />
      )}
    </section>
  )
}
