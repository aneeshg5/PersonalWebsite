"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, User, ChevronLeft, ChevronRight, X } from "lucide-react"

interface ProjectImage {
  src: string
  caption: string
}

interface Project {
  id: string
  title: string
  role: string
  date: string
  description: string
  longDescription: string
  technologies: string[]
  images: string[]
  modalImages: ProjectImage[]
  paragraphs: string[]
  links?: { label: string; url: string }[]
  projectImage: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Responsive positioning variables
  const CAROUSEL_VERTICAL_OFFSET = "justify-start pt-4 sm:pt-6 md:pt-8"
  const CAPTION_TOP_MARGIN = "mt-8 sm:mt-10 md:mt-12"
  const MODAL_VERTICAL_OFFSET = "0px"

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setCurrentImageIndex(0)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const modalTop = scrollY + windowHeight * 0.1
      const modalBottom = modalTop + windowHeight * 0.8

      if (modalBottom < scrollY || modalTop > scrollY + windowHeight) {
        onClose()
      }
    }

    const handleResize = () => {
      onClose()
    }

    let scrollTimeout: NodeJS.Timeout
    const throttledScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 100)
    }

    window.addEventListener("scroll", throttledScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      window.removeEventListener("resize", handleResize)
      clearTimeout(scrollTimeout)
    }
  }, [isOpen, onClose])

  if (!project || !shouldRender) return null

  const projectImages =
    project.modalImages && project.modalImages.length > 0
      ? project.modalImages
      : [
          {
            src: "/placeholder.svg?height=400&width=400",
            caption: "Main application interface and dashboard overview",
          },
          {
            src: "/placeholder.svg?height=400&width=400",
            caption: "System architecture and technical implementation",
          },
          {
            src: "/placeholder.svg?height=400&width=400",
            caption: "Results and performance metrics visualization",
          },
        ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {}
      <div
        className={`relative w-full h-full sm:w-[95vw] sm:h-[90vh] md:h-[85vh] lg:h-[80vh] max-w-6xl bg-slate-900 border border-slate-700 rounded-lg overflow-hidden transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{
          transform: `translateY(${MODAL_VERTICAL_OFFSET}) ${isAnimating ? "scale(1)" : "scale(0.95) translateY(4px)"}`,
        }}
      >
        {}
        <div className="flex items-start justify-between p-3 sm:p-4 md:p-6 border-b border-slate-700 min-h-[80px] sm:min-h-[90px] md:min-h-[96px]">
          <div className="flex-1 min-w-0 pr-3 sm:pr-4">
            {}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight break-words">
              {project.title}
            </h2>

            {}
            <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4 md:gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="leading-tight break-words">{project.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="leading-tight">{project.date}</span>
              </div>
            </div>
          </div>

          {}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 touch-manipulation mt-1"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {}
        <div className="h-[calc(100%-80px)] sm:h-[calc(100%-90px)] md:h-[calc(100%-96px)] overflow-y-auto">
          <div className="flex flex-col md:flex-row min-h-full">
            {}
            <div
              className={`w-full md:w-1/3 p-3 sm:p-4 md:p-6 flex flex-col items-center ${CAROUSEL_VERTICAL_OFFSET} bg-slate-800/30`}
            >
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="relative w-full aspect-square">
                  {projectImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        index === currentImageIndex
                          ? "opacity-100 scale-100 z-10"
                          : index === (currentImageIndex + 1) % projectImages.length
                            ? "opacity-30 scale-95 translate-x-1 translate-y-1 z-5"
                            : index === (currentImageIndex - 1 + projectImages.length) % projectImages.length
                              ? "opacity-30 scale-95 -translate-x-1 translate-y-1 z-5"
                              : "opacity-0 scale-90 z-0"
                      }`}
                    >
                      <Card className="w-full h-full bg-slate-800 border-slate-700 overflow-hidden">
                        <CardContent className="p-0 h-full">
                          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                            <img
                              src={image.src || "/placeholder.svg"}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                                e.currentTarget.nextElementSibling!.style.display = "flex"
                              }}
                            />
                            <div className="hidden w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 items-center justify-center">
                              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-500">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {}
                <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200 touch-manipulation"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>

                  <div className="flex space-x-1.5 sm:space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 touch-manipulation ${
                          index === currentImageIndex ? "bg-yellow-400" : "bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200 touch-manipulation"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {}
                <div className={`${CAPTION_TOP_MARGIN} w-full`}>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 sm:p-4 transition-all duration-300">
                    <p className="text-slate-300 text-xs sm:text-sm text-center leading-relaxed">
                      {projectImages[currentImageIndex]?.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="flex-1 p-3 sm:p-4 md:p-6">
              <div className="space-y-4 sm:space-y-6">
                {}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Overview</h3>
                  <p className="text-slate-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                    {project.longDescription}
                  </p>
                  <div className="space-y-2 sm:space-y-3">
                    {project.paragraphs.map((paragraph, index) => (
                      <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{paragraph}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-yellow-400/20 text-yellow-400 text-[0.7rem] sm:text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {}
                {project.links && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Project Links</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.links.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 bg-transparent modern-button text-[0.7rem] sm:text-xs"
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.label}
                            <ExternalLink className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
