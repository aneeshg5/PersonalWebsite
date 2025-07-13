"use client"

import { useState, useEffect } from "react"

interface AnimatedLettersProps {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
}

export function AnimatedLetters({ text, className = "", delay = 0, onComplete }: AnimatedLettersProps) {
  const [animatedText, setAnimatedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay * 1000)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setAnimatedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && onComplete) {
      const completeTimer = setTimeout(onComplete, 200)
      return () => clearTimeout(completeTimer)
    }
  }, [currentIndex, text, hasStarted, onComplete])

  return (
    <span className={`${className} inline-block`}>
      {animatedText.split("").map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-colors duration-300 hover:text-yellow-400 [&.text-yellow-400]:hover:text-white"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      {hasStarted && currentIndex < text.length && <span className="animate-pulse text-yellow-400">|</span>}
    </span>
  )
}
