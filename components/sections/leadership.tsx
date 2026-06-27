"use client"

import { SectionHeader } from "@/components/section-header"
import { LEADERSHIP } from "@/lib/data"

export function Leadership() {
  return (
    <section id="leadership" className="w-full">
      <SectionHeader title="Leadership & Activities" accent="bg-gradient-to-r from-accent-rose to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
        {LEADERSHIP.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#151922] border border-[#1F2633] rounded-lg p-6 hover:border-accent-rose/50 transition-colors group flex flex-col h-full relative w-full cursor-pointer hover:-translate-y-1 duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-rose" />
            <div className="absolute top-3 right-3">
              <span className="material-symbols-outlined text-white/30 group-hover:text-accent-rose transition-colors text-sm">arrow_outward</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1 font-display">{item.title}</h3>
            <p className="text-accent-rose text-xs font-bold uppercase tracking-widest mb-3">{item.role}</p>
            <p
              className="text-white/60 text-sm leading-relaxed mb-4 font-inter flex-grow"
              dangerouslySetInnerHTML={{
                __html: item.description.replace(
                  /\*\*(.*?)\*\*/g,
                  '<span class="text-accent-rose font-bold">$1</span>'
                ),
              }}
            />
            <div className="mt-auto pt-3 border-t border-white/5 w-full">
              <p className="text-white/40 text-[10px] font-inter font-medium">{item.period}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
