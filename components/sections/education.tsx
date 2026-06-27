"use client"

import { SectionHeader } from "@/components/section-header"
import { EDUCATION } from "@/lib/data"

export function Education() {
  return (
    <section id="education" className="w-full">
      <SectionHeader title="Education" accent="bg-gradient-to-r from-accent-yellow to-transparent" />
      <div className="max-w-5xl mx-auto w-full group relative transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-accent-yellow/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-[#151922] border border-[#1F2633] group-hover:border-accent-yellow rounded-[12px] p-8 flex flex-col transition-colors duration-300 w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-accent-yellow h-full"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg border-4 border-[#1F2633] group-hover:border-accent-yellow/30 transition-colors">
                <img alt="UIUC Logo" className="w-full h-full object-cover" src={EDUCATION.logo} />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left pt-2">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2 gap-4">
                <div>
                  <h3 className="text-[24px] font-display font-bold text-white tracking-tight leading-none mb-2">
                    {EDUCATION.university}
                  </h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="font-inter text-[18px] text-[#E6EDF3] font-semibold">{EDUCATION.degree}</p>
                    <p className="font-inter text-[16px] text-white/60">{EDUCATION.specialization}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-end gap-1">
                  <span className="font-inter text-[15px] font-medium text-white/60 whitespace-nowrap">
                    {EDUCATION.period}
                  </span>
                  <p className="font-inter text-[15px] text-accent-yellow font-bold">GPA: {EDUCATION.gpa}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 w-full">
            <p className="font-inter text-[13px] font-bold uppercase tracking-wider text-white/40 mb-4 text-center md:text-left">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-3 w-full justify-center md:justify-start">
              {EDUCATION.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#1F2633] rounded px-4 py-2 border border-white/5 hover:border-accent-yellow/50 transition-colors group/pill flex items-center gap-2"
                >
                  <span className="text-[11px] font-bold text-accent-yellow whitespace-nowrap">{course.id}</span>
                  <span className="text-[12px] font-inter text-white/80 group-hover/pill:text-white whitespace-nowrap truncate max-w-[200px]">
                    {course.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
