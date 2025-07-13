"use client"

import { useEffect, useState, useMemo } from "react"

export function SpaceBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [spaceOpacity, setSpaceOpacity] = useState(1)
  const [largeStars, setLargeStars] = useState<any[]>([])
  const [mediumStars, setMediumStars] = useState<any[]>([])
  const [smallStars, setSmallStars] = useState<any[]>([])

  const TRANSITION_START_OFFSET = 0


      useEffect(() => {
        setLargeStars(
          Array.from({ length: 50 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 2,
          }))
        )
        setMediumStars(
          Array.from({ length: 30 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 3 + Math.random() * 2,
          }))
        )
        setSmallStars(
          Array.from({ length: 100 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 3,
          }))
        )
      }, [])
  
    useEffect(() => {
      const handleScroll = () => {
        const homeSection = document.getElementById("home")
        const aboutSection = document.getElementById("about")
        let opacity = 1

        if (homeSection && aboutSection) {
          const homeBottom = homeSection.offsetTop + homeSection.offsetHeight
          const aboutTop = aboutSection.offsetTop
          const transitionStart = aboutTop + TRANSITION_START_OFFSET
          const transitionEnd = aboutTop + 200
          const transitionDistance = transitionEnd - transitionStart

          const currentScrollY = window.scrollY

          if (currentScrollY >= transitionStart && currentScrollY <= transitionEnd) {
            const progress = (currentScrollY - transitionStart) / transitionDistance
            opacity = 1 - progress
          } else if (currentScrollY > transitionEnd) {
            opacity = 0
          }
        }

        setScrollY(window.scrollY)
        setSpaceOpacity(opacity)
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

  if (largeStars.length === 0 || mediumStars.length === 0 || smallStars.length === 0) {
    return null
  }
  
  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        opacity: spaceOpacity,
        zIndex: 1,
      }}
    >
      {}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
        {}
        <div className="absolute inset-0">
          {}
          {largeStars.map((star, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {}
          {mediumStars.map((star, i) => (
            <div
              key={`star-med-${i}`}
              className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {}
          {smallStars.map((star, i) => (
            <div
              key={`star-small-${i}`}
              className="absolute w-px h-px bg-blue-200 rounded-full animate-ping"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        {}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/5 via-transparent to-cyan-900/5" />

        {}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 animate-pulse"
            style={{
              background: `radial-gradient(ellipse 800px 200px at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
              animation: "float 20s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  )
}
