"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

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
    if (item.type === "profile") {
      return (
        <Card className="w-full h-full bg-slate-800 border-slate-700">
          <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center items-center text-center">
            {}
            <div className="w-20 h-20 sm:w-28 md:w-32 sm:h-28 md:h-32 rounded-full mb-4 sm:mb-6 overflow-hidden border-4 border-yellow-400/20">
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
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{item.title}</h3>
            <div className="space-y-2 mb-4 sm:mb-6">
              {item.badges?.map((badge, badgeIndex) => (
                <Badge
                  key={badgeIndex}
                  variant="secondary"
                  className={`text-xs sm:text-sm ${
                    badgeIndex === 0
                      ? "bg-yellow-400/20 text-yellow-400"
                      : badgeIndex === 1
                        ? "bg-blue-400/20 text-blue-400"
                        : "bg-green-400/20 text-green-400"
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>
            <Button
              onClick={onResumeDownload}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold modern-button text-sm sm:text-base h-10 sm:h-12 touch-manipulation"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Download Resume
            </Button>
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
