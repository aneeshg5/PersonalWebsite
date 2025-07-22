"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnimatedLetters } from "@/components/animated-letters"
import { ScrollFadeWrapper } from "@/components/scroll-fade-wrapper"
import { ImageCarousel } from "@/components/image-carousel"
import { Plane, ToyBrick, FlaskConical, Rocket } from "lucide-react"
import { PasscodeModal } from "@/components/passcode-modal"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

export function About() {
  const highlights = [
    { icon: Plane, text: "Travel & Food" },
    { icon: ToyBrick, text: "Designing LEGO Sets" },
    { icon: FlaskConical, text: "Research & Projects" },
    { icon: Rocket, text: "Rocketry & Aerospace" },
  ]

  const carouselItems = [
    {
      type: "profile" as const,
      title: "Aneesh Ganti",
      badges: ["Developer", "Researcher", "Student"],
      profileImage: "/images/about/circled-headshot.png",
    },
    {
      type: "image" as const,
      src: "/images/about/taj-mahal.png",
      alt: "Aneesh at NASA Challenge",
    },
    {
      type: "image" as const,
      src: "/images/about/lego-shelf.png",
      alt: "Aneesh coding",
    },
    {
      type: "image" as const,
      src: "/images/about/talk.png",
      alt: "Aneesh at UIUC",
    },
    {
      type: "image" as const,
      src: "/images/about/iss-cover.png",
      alt: "Aneesh at home",
    },
    
  ]


  const { isAuthenticated, authenticate } = useAuth()
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  const handleResumeDownload = () => {
    if (!isAuthenticated) {
      setShowPasscodeModal(true)
      return
    }
    
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Aneesh_Ganti_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePasscodeSuccess = () => {
    authenticate()
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/resume.pdf"
      link.download = "Aneesh_Ganti_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 100)
  }

  return (
    <ScrollFadeWrapper>
      <div className="space-y-8 sm:space-y-12 px-4">
        <div className="text-center">
          <AnimatedLetters
            text="About Me"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
          />
          <p className="text-lg sm:text-xl text-slate-400">Get to know me better!</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center lg:items-start justify-items-center">
            {}
            <ScrollFadeWrapper className="w-full max-w-lg order-2 lg:order-1">
              <Card className="bg-slate-800/50 border-slate-700 min-h-[350px] sm:h-[400px]">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
                  <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    I am a Computer Science and Mathematics student at the University of Illinois at
                    Urbana-Champaign, with an interest in AI-powered automation, full-stack development, and large language model applications. 
                  </p>

                  <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    I thrive on solving complex problems with efficient and scalable solutions, and
                    staying up-to-date with industry practices and technologies.
                  </p>

                  <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Some of my cool hobbies include:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {highlights.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-yellow-400">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollFadeWrapper>

            {}
            <ScrollFadeWrapper className="w-full flex justify-center order-1 lg:order-2">
              <div className="flex flex-col items-center pb-8 sm:pb-12">
                <ImageCarousel items={carouselItems} onResumeDownload={handleResumeDownload} />
              </div>
            </ScrollFadeWrapper>
          </div>
        </div>
      </div>
      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onSuccess={handlePasscodeSuccess}
        title="Resume Access"
        description="Please enter the passcode to download the resume."
      />
    </ScrollFadeWrapper>
  )
}
