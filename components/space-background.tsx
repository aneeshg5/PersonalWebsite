"use client"

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-30"></div>
      <div className="absolute inset-0 hero-drift-lines"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-[1200px] left-[-200px] w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-[2000px] right-[-200px] w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-[2800px] left-[-200px] w-[600px] h-[600px] bg-accent-green/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-[4000px] right-[-200px] w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-[4800px] left-[-200px] w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-[5400px] right-[-200px] w-[600px] h-[600px] bg-accent-rose/5 rounded-full blur-[100px]"></div>
      <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none"></div>
    </div>
  )
}
