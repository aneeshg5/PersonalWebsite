"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { HeroButton } from "@/components/hero-button"

const ROLES = ["Software Engineer", " MLE @ Brunswick", "CV Researcher @ UIUC", "Building Promo Pigeon", "2025 UIUC HuLC Finalist"]

function useTypewriter(words: string[], typeSpeed = 75, deleteSpeed = 35, pauseDuration = 1800) {
  const [text, setText] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    if (!isDeleting && charIdx === word.length) {
      const t = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(t)
    }
    if (isDeleting && charIdx === 0) {
      setIsDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
      return
    }
    const next = charIdx + (isDeleting ? -1 : 1)
    const t = setTimeout(() => {
      setText(words[wordIdx].slice(0, next))
      setCharIdx(next)
    }, isDeleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(t)
  }, [charIdx, isDeleting, wordIdx, words, typeSpeed, deleteSpeed, pauseDuration])

  return text
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-primary text-3xl font-bold font-mono">{value}</p>
      <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-1 font-mono">{label}</p>
    </div>
  )
}


export function Home() {
  const role = useTypewriter(ROLES)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [anyHovered, setAnyHovered] = useState(false)
  const hoverCount = useRef(0)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const onPillEnter = useCallback(() => {
    clearTimeout(leaveTimer.current)
    hoverCount.current++
    setAnyHovered(true)
  }, [])

  const onPillLeave = useCallback(() => {
    hoverCount.current = Math.max(0, hoverCount.current - 1)
    leaveTimer.current = setTimeout(() => {
      if (hoverCount.current === 0) setAnyHovered(false)
    }, 200)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full min-h-dvh flex flex-col items-center justify-center pt-20 pb-24 px-6 text-center"
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(6,192,249,0.05) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">

        {/* Status badge */}
        <div
          className="flex items-center gap-2.5 mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-white/50 text-[11px] font-mono uppercase tracking-[0.35em]">
            Looking for Summer 2027 Opportunities
          </p>
        </div>

        {/* Name */}
        <h1
          className="font-black leading-none tracking-[-0.04em] mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
        >
          <span className="text-gradient block text-6xl md:text-8xl">ANEESH</span>
          <span className="text-white block text-6xl md:text-8xl">GANTI</span>
        </h1>

        {/* Typewriter */}
        <div
          className="flex items-center justify-center gap-4 mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
        >
          <span className="w-8 h-px bg-primary/40 flex-shrink-0"></span>
          <span className="font-mono text-primary text-sm uppercase tracking-widest min-w-[220px] text-center">
            {role}
            <span className="blinking-cursor text-primary">_</span>
          </span>
          <span className="w-8 h-px bg-primary/40 flex-shrink-0"></span>
        </div>

        {/* Subtitle */}
        <p
          className="text-white/35 text-sm tracking-wide mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          CS &amp; Mathematics · University of Illinois, Urbana-Champaign · Class of 2028
        </p>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "750ms", animationFillMode: "forwards" }}
        >
          <Stat value="3" label="Internships" />
          <div className="w-px h-10 bg-white/10 hidden md:block self-center"></div>
          <Stat value="10+" label="Projects" />
          <div className="w-px h-10 bg-white/10 hidden md:block self-center"></div>
          <Stat value="5k+" label="Users" />
        </div>

        {/* Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "950ms", animationFillMode: "forwards" }}
        >
          <HeroButton
            icon="description"
            label="Resume"
            forceOpen={!anyHovered}
            onEnter={onPillEnter}
            onLeave={onPillLeave}
            onClick={() => {
              const a = document.createElement("a")
              a.href = "/resume.pdf"
              a.download = "Aneesh_Ganti_2027_Resume.pdf"
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }}
          />
          <HeroButton
            icon={
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            label="LinkedIn"
            href="https://www.linkedin.com/in/aneesh-ganti/"
            onEnter={onPillEnter}
            onLeave={onPillLeave}
          />
          <HeroButton
            icon={
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            }
            label="GitHub"
            href="https://github.com/aneeshg5"
            onEnter={onPillEnter}
            onLeave={onPillLeave}
          />
          <HeroButton
            icon="mail"
            label="Email"
            href="mailto:aneeshganti5@gmail.com"
            onEnter={onPillEnter}
            onLeave={onPillLeave}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0 animate-fade-in"
        style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
      >
        <span className="text-white/50 text-[9px] font-mono uppercase tracking-[0.3em]">See my work and experience below!</span>
        <div className="animate-bounce">
          <span className="material-symbols-outlined text-white/50 text-base leading-none">expand_more</span>
        </div>
      </div>
    </section>
  )
}
