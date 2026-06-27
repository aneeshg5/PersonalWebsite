"use client"

import { SectionHeader } from "@/components/section-header"
import { SKILL_CATEGORIES } from "@/lib/data"

export function Skills() {
  return (
    <section id="skills" className="w-full">
      <SectionHeader
        title="Technologies & Tools"
        accent="bg-gradient-to-r from-accent-orange to-transparent"
      />
      <div className="flex flex-col gap-10">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx}>
            <h3 className="text-white/50 font-mono text-[12px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-orange shrink-0" />
              {cat.title}
              <span className="flex-1 h-px bg-white/5" />
            </h3>
            <div className="px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-1.5 shrink-0">
                    <img src={skill.icon} alt="" className="w-[16px] h-[16px] object-contain shrink-0" />
                    <span className="text-white/80 text-[12px] font-medium font-inter whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
