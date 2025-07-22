"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Sparkles } from "lucide-react"

interface CarouselItem {
  type: "profile" | "image"
  src?: string
  alt?: string
  title?: string
  badges?: string[]
  profileImage?: string // New field for profile image
}

interface ImageCarouselProps {
  items: CarouselItem[]
  onResumeDownload: () => void
}

export function ImageCarousel({ items, onResumeDownload }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextImage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setIsAnimating(false)
    }, 150)
  }

  const prevImage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
      setIsAnimating(false)
    }, 150)
  }

  const getImageStyle = (index: number) => {
    const position = (index - currentIndex + items.length) % items.length
    const totalItems = items.length

    if (position === 0) {
      return {
        transform: "translateX(0%) translateY(0%) scale(1)",
        zIndex: totalItems,
        opacity: 1,
      }
    } else if (position === 1) {
      return {
        transform: "translateX(4%) translateY(2%) scale(0.95)",
        zIndex: totalItems - 1,
        opacity: 0.7,
      }
    } else if (position === totalItems - 1) {
      return {
        transform: "translateX(-4%) translateY(2%) scale(0.95)",
        zIndex: totalItems - 1,
        opacity: 0.7,
      }
    } else {
      return {
        transform: "translateX(0%) translateY(4%) scale(0.9)",
        zIndex: 0,
        opacity: 0,
      }
    }
  }

  const renderCarouselItem = (item: CarouselItem, index: number) => {
    // ... previous imports and code ...

  if (item.type === "profile") {
    return (
      <Card className="w-full h-full overflow-hidden relative">
        <CardContent className="p-0 h-full relative">
          {/* Background with Multiple Layers */}
          <div className="absolute inset-0">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-purple-500/10 to-blue-600/20" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-purple-500/10 animate-pulse" />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform -rotate-12" />
            </div>

            {/* Floating particles/sparkles effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${15 + i * 8}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + i * 0.3}s`,
                  }}
                />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <Sparkles
                  key={`sparkle-${i}`}
                  className="absolute w-3 h-3 text-yellow-400/30 animate-pulse"
                  style={{
                    right: `${10 + i * 12}%`,
                    bottom: `${20 + i * 10}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${3 + i * 0.4}s`,
                  }}
                />
              ))}
            </div>

            {/* Border glow effect */}
            <div className="absolute inset-0 rounded-lg border border-yellow-400/20 shadow-inner" />
            <div className="absolute inset-0 rounded-lg border border-purple-500/10" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-center items-center text-center">
            {/* Simplified Profile Image */}
            <div className="relative mb-4 sm:mb-6">
              <div className="relative w-20 h-20 sm:w-28 md:w-32 sm:h-28 md:h-32 overflow-hidden">
                <img
                  src={item.profileImage || "/images/profile-photo.png"}
                  alt={item.title || "Profile photo"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling!.style.display = "flex"
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">AG</span>
                </div>
              </div>
            </div>

            {/* Enhanced Title with Glow */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 relative">
              <span className="relative z-10">{item.title}</span>
              <div className="absolute inset-0 text-yellow-400/30 blur-sm">{item.title}</div>
            </h3>

            {/* Badges in one line */}
            <div className="flex gap-2 mb-4 sm:mb-6 flex-nowrap justify-center">
              {item.badges?.map((badge, badgeIndex) => (
                <Badge
                  key={badgeIndex}
                  variant="secondary"
                  className={`text-xs sm:text-sm font-medium px-3 py-1 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                    badgeIndex === 0
                      ? "bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 text-yellow-300 border border-yellow-400/40"
                      : badgeIndex === 1
                        ? "bg-gradient-to-r from-blue-400/30 to-blue-500/30 text-blue-300 border border-blue-400/40"
                        : "bg-gradient-to-r from-green-400/30 to-green-500/30 text-green-300 border border-green-400/40"
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Enhanced Download Button */}
            <Button
              onClick={onResumeDownload}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold text-sm sm:text-base h-10 sm:h-12 touch-manipulation transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-yellow-400/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Download Resume
              </div>
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  } else {
      return (
        <Card className="w-full h-full bg-slate-800 border-slate-700 overflow-hidden">
          <CardContent className="p-0 h-full">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <img
                src={item.src || "/placeholder.svg?height=400&width=300"}
                alt={item.alt || "Portfolio image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling!.style.display = "flex"
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 items-center justify-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-500">#{index}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[400px] mx-auto">
      <div className="relative w-full h-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={getImageStyle(index)}
          >
            {renderCarouselItem(item, index)}
          </div>
        ))}
      </div>

      {}
      <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4">
        {}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevImage}
          className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-8 h-8 sm:w-10 sm:h-10 touch-manipulation"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        {}
        <div className="flex space-x-1.5 sm:space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors touch-manipulation ${
                index === currentIndex ? "bg-yellow-400" : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        {}
        <Button
          variant="ghost"
          size="icon"
          onClick={nextImage}
          className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-8 h-8 sm:w-10 sm:h-10 touch-manipulation"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  )
}
