"use client"

export function Footer() {
  return (
    <footer className="relative mt-20 sm:mt-24 md:mt-32">
      {}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-8 sm:mb-12"></div>

      {}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="text-center">
          <p className="text-sm text-slate-500 font-medium tracking-wide">© 2025 Aneesh Ganti. All rights reserved.</p>
          {/* Version number */}
          <div className="absolute bottom-0 right-0 text-xs text-slate-600/50 font-mono">
            v1.1.0
          </div>
        </div>
      </div>
    </footer>
  )
}
