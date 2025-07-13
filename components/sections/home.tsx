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

  // Responsive positioning variables
  const VERTICAL_OFFSET = "pt-8 sm:pt-12 md:pt-16 lg:pt-20"
  const ARROW_BOTTOM_POSITION = "bottom-8 sm:bottom-10 md:bottom-12"
  const ARROW_HORIZONTAL_OFFSET = "left-39/80"

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setShowLine1(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <div className={`min-h-screen flex items-start justify-center relative ${VERTICAL_OFFSET} pb-16 sm:pb-20 px-4`}>
      <div
        className={`text-center space-y-6 sm:space-y-8 transition-all duration-1000 max-w-4xl ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="space-y-3 sm:space-y-4">
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
                <AnimatedLetters
                  text="Aneesh Ganti"
                  className="text-yellow-400"
                  onComplete={() => setShowLine3(true)}
                />
              )}
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl space-y-1 sm:space-y-2 font-bold">
              {showLine3 && (
                <div>
                  <AnimatedLetters
                    text="Full-Stack Developer"
                    className="text-slate-300"
                    onComplete={() => setShowLine4(true)}
                  />
                </div>
              )}
              {showLine4 && (
                <div>
                  <AnimatedLetters
                    text="AI + ML Enthusiast"
                    className="text-yellow-400"
                    onComplete={() => setShowLine5(true)}
                  />
                </div>
              )}
              {showLine5 && (
                <div>
                  <AnimatedLetters
                    text="Data Analyst & Engineer"
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
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Computer Science and Mathematics student at UIUC who enjoys innovating on current technologies to build smart solutions.
          </p>

          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-yellow-400 text-slate-900 font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full modern-button text-base sm:text-lg h-12 sm:h-14 min-w-[160px] touch-manipulation"
          >
            Get In Touch
            <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {}
      <div
        className={`absolute ${ARROW_BOTTOM_POSITION} ${ARROW_HORIZONTAL_OFFSET} transform -translate-x-1/2 animate-bounce`}
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
      </div>
    </div>
  )
}
