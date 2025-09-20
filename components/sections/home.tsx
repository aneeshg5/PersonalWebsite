"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import { AnimatedLetters } from "@/components/animated-letters"

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)
  const [showLine4, setShowLine4] = useState(false)
  const [showLine5, setShowLine5] = useState(false)
  const [showFinalContent, setShowFinalContent] = useState(false)
  const [showShootingStar, setShowShootingStar] = useState(false)
  const [cometVariation, setCometVariation] = useState(1)

  // Responsive positioning variables
  const VERTICAL_OFFSET = "pt-4 sm:pt-8 md:pt-12 lg:pt-17"

  const BOUNCING_ARROW_BOTTOM_OFFSET = 10 // bottom-20 = 80px from bottom

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setShowLine1(true), 500)
    // Trigger shooting star after content is loaded
    const starTimer = setTimeout(() => setShowShootingStar(true), 3000)
    // Reset shooting star for replay with random trajectory
    const resetTimer = setInterval(() => {
      setShowShootingStar(false)
      setTimeout(() => {
        setCometVariation(Math.floor(Math.random() * 3) + 1) // Random 1, 2, or 3
        setShowShootingStar(true)
      }, 100)
    }, 25000) // Replay every 25 seconds
    
    return () => {
      clearTimeout(timer)
      clearTimeout(starTimer)
      clearInterval(resetTimer)
    }
  }, [])

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  // Realistic Shooting Star Component
  const ShootingStar = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {showShootingStar && (
          <div className="shooting-star-container">
            {/* Simple comet core with trajectory variation */}
            <div className={`comet-core comet-path-${cometVariation}`}>
              <div className="comet-center"></div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Simple Bouncing Arrow Component
  const BouncingArrow = () => {
    return (
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 text-center"
        style={{ bottom: `${BOUNCING_ARROW_BOTTOM_OFFSET * 4}px` }}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Enhanced arrow with glow effect */}
          <div className="relative">
            <ArrowDown className="w-6 h-6 text-yellow-400 animate-bounce drop-shadow-lg" />
            <div className="absolute inset-0 w-6 h-6 text-yellow-400/30 animate-bounce blur-sm">
              <ArrowDown className="w-6 h-6" />
            </div>
          </div>
          
          {/* Styled text with gradient */}
          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-medium tracking-wide">
              EXPLORE MY JOURNEY
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-start justify-center relative ${VERTICAL_OFFSET} pb-16 sm:pb-20 px-4`}>
      <div
        className={`text-center space-y-6 sm:space-y-8 transition-all duration-1000 max-w-4xl relative z-10 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="space-y-3 sm:space-y-3">
          <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 sm:w-5 md:w-6" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Welcome to my portfolio</span>
            <Sparkles className="w-4 h-4 sm:w-5 md:w-6" />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              {showLine1 && (
                <AnimatedLetters text="Hi, I'm" className="text-white" onComplete={() => setShowLine2(true)} />
              )}
              <br />
              {showLine2 && (
                <div className="relative">
                  <AnimatedLetters
                    text="Aneesh Ganti"
                    className="text-yellow-400 relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-black tracking-tight"
                    onComplete={() => setShowLine3(true)}
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 text-yellow-400/20 blur-sm font-black tracking-tight pointer-events-none">
                    Aneesh Ganti
                  </div>
                </div>
              )}
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl space-y-1 sm:space-y-2 font-bold">
              {showLine3 && (
                <div>
                  <AnimatedLetters
                    text="Software Engineer"
                    className="text-slate-300"
                    onComplete={() => setShowLine4(true)}
                  />
                </div>
              )}
              {showLine4 && (
                <div>
                  <AnimatedLetters
                    text="AI & ML Enthusiast"
                    className="text-yellow-400"
                    onComplete={() => setShowLine5(true)}
                  />
                </div>
              )}
              {showLine5 && (
                <div>
                  <AnimatedLetters
                    text="CS + Math @ UIUC"
                    className="text-slate-300"
                    onComplete={() => setShowFinalContent(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${showFinalContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto px-4 leading-relaxed">
            Building scalable systems and AI solutions with <span className="text-yellow-400 font-semibold">7 years of programming experience</span>. 
            Passionate about transforming complex algorithms into production-ready applications.
          </p>

          {/* Achievement highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto px-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span><span className="text-yellow-400 font-semibold">15+</span> Projects Deployed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span><span className="text-yellow-400 font-semibold">5+</span> ML Models in Production</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-yellow-400 text-slate-900 font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full modern-button text-base sm:text-lg h-12 sm:h-14 min-w-[180px] touch-manipulation hover:bg-yellow-300 transition-colors"
            >
              View My Work
              <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Shooting star animation */}
      <ShootingStar />
      
      {/* Simple bouncing arrow */}
      <BouncingArrow />
    </div>
  )
}
