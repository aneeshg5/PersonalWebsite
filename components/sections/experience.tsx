"use client"

import { SectionHeader } from "@/components/section-header"
import { EXPERIENCES, SKILL_CATEGORIES } from "@/lib/data"

const EXTRA_ICONS: Record<string, string> = {
  'Hono':       'https://cdn.simpleicons.org/hono/E36002',
  'Cloudflare': 'https://cdn.simpleicons.org/cloudflare/F38020',
  'Workbox':    'https://cdn.simpleicons.org/pwa/5A0FC8',
  'IndexedDB':  'https://api.iconify.design/mdi:database-cog.svg?color=%23F97316',
  'OpenAI':     'https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff',
  'PyMuPDF':    'https://api.iconify.design/vscode-icons:file-type-pdf2.svg',
  'Playwright': 'https://api.iconify.design/logos:playwright.svg',
  'SocketCAN':  'https://api.iconify.design/mdi:network.svg?color=%2394A3B8',
  'SavvyCAN':   'https://api.iconify.design/mdi:steering.svg?color=%23F59E0B',
}

function getSkillIcon(skillName: string): string | null {
  if (EXTRA_ICONS[skillName]) return EXTRA_ICONS[skillName]
  const normalized = skillName === "ReactJS" ? "React" : skillName
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.skills.find((s) => s.name.toLowerCase() === normalized.toLowerCase())
    if (found) return found.icon
  }
  return null
}

function renderBullet(text: string, accentClass: string) {
  return text.replace(/\*\*(.*?)\*\*/g, `<span class="${accentClass} font-bold">$1</span>`)
}

export function Experience() {
  return (
    <section id="experience" className="w-full">
      <SectionHeader title="Professional Experience" accent="bg-gradient-to-r from-accent-cyan to-transparent" />
      <div className="relative grid grid-cols-1 md:grid-cols-[195px_1fr] gap-x-12 gap-y-16">
        {/* Timeline line — cyan gradient fading down */}
        <div
          className="absolute left-[29px] md:left-[223px] top-4 bottom-0 w-px z-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,201,255,0.7) 0%, rgba(0,201,255,0.3) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)' }}
        />
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="contents">
            <div className="hidden md:flex justify-end pt-[22px] relative z-10 pr-6">
              <span className="font-inter font-bold text-[#E6EDF3] text-sm tracking-wide whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <div className="relative group">
              <div className="md:hidden flex mb-2 pl-12">
                <span className="font-inter font-bold text-[#E6EDF3] text-lg tracking-wide">{exp.period}</span>
              </div>
              {/* Dot — outer glow ring + solid core */}
              <div className="absolute left-6 md:-left-[29px] top-[26px] z-10 flex items-center justify-center w-[18px] h-[18px]">
                <div className="absolute inset-0 rounded-full border border-accent-cyan/30 bg-accent-cyan/10" />
                <div className="w-[10px] h-[10px] rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,201,255,0.8)] ring-[3px] ring-[#0B0F1A] flex items-center justify-center">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/90 shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                </div>
              </div>
              <div className="bg-card-bg border border-line-dark p-6 rounded-r-lg rounded-bl-lg relative ml-14 md:ml-[25px] w-full max-w-4xl transition-all duration-300 hover:border-accent-cyan/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-cyan"></div>
                <div className="flex flex-col md:flex-row gap-5 mb-6 relative z-10">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#1F2633] border border-white/10 flex items-center justify-center overflow-hidden">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-white/50">{exp.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white tracking-wide">{exp.role}</h3>
                    <div className="font-inter text-accent-cyan font-medium text-sm">{exp.company}</div>
                  </div>
                </div>

                {exp.subProjects ? (
                  <div className="flex flex-col gap-4 relative z-10">
                    {exp.subProjects.map((sub, idx) => (
                      <div key={idx} className="bg-[#1F2633] border border-[#2d3748] rounded-lg p-5">
                        <h4 className="text-white/90 font-bold text-sm tracking-widest uppercase mb-3 font-display">
                          {sub.title}
                        </h4>
                        <ul className="space-y-[6px] text-white/70 text-sm leading-relaxed list-none mb-4 font-inter">
                          {sub.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="relative pl-5 before:absolute before:left-0 before:top-[1px] before:text-accent-cyan before:content-['▸']"
                              dangerouslySetInnerHTML={{
                                __html: renderBullet(bullet, "text-accent-cyan"),
                              }}
                            />
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                          {sub.tech.map((t) => {
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
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#1F2633] border border-[#2d3748] rounded-lg p-5 relative z-10">
                    <h4 className="text-white/90 font-bold text-sm tracking-widest uppercase mb-3 font-display">
                      {exp.project}
                    </h4>
                    <ul className="space-y-[6px] text-white/70 text-sm leading-relaxed list-none mb-4 font-inter">
                      {exp.bullets?.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="relative pl-5 before:absolute before:left-0 before:top-[1px] before:text-accent-cyan before:content-['▸']"
                          dangerouslySetInnerHTML={{
                            __html: renderBullet(bullet, "text-accent-cyan"),
                          }}
                        />
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {exp.tech?.map((t) => {
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
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
