"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnimatedLetters } from "@/components/animated-letters"
import { ScrollFadeWrapper } from "@/components/scroll-fade-wrapper"
import { ImageCarousel } from "@/components/image-carousel"
import { Plane, ToyBrick, FlaskConical, Rocket } from "lucide-react"
import { PasscodeModal } from "@/components/passcode-modal"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"

export function About() {
  const highlights = [
    { icon: Plane, text: "Travel & Hiking" },
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Auto-generate access token for users who already have portfolio access
  useEffect(() => {
    if (isAuthenticated && !accessToken) {
      const urlParams = new URLSearchParams(window.location.search)
      const portfolioAccessToken = urlParams.get('access')
      
      if (portfolioAccessToken) {
        // User has portfolio access, automatically get resume access token
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: portfolioAccessToken })
        })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            setAccessToken(data.accessToken)
          }
        })
        .catch(error => {
          console.error('Auto-auth failed:', error)
        })
      }
    }
  }, [isAuthenticated, accessToken])

  const handleResumeDownload = async () => {
    if (!isAuthenticated || !accessToken) {
      setShowPasscodeModal(true)
      return
    }
    
    try {
      setIsDownloading(true)
      
      // Request secure download URL
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Download failed')
      }
      
      const { downloadUrl, filename } = await response.json()
      
      // Trigger secure download with proper attributes
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename || "Aneesh_Ganti_Resume.pdf"
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('Resume downloaded successfully')
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePasscodeSuccess = async (passcode: string) => {
    try {
      // Verify passcode and get access token
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Authentication failed')
      }
      
      const { accessToken: token } = await response.json()
      setAccessToken(token)
      authenticate()
      
      // Auto-trigger download after successful auth
      setTimeout(async () => {
        try {
          const downloadResponse = await fetch('/api/resume/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: token })
          })
          
          if (!downloadResponse.ok) {
            throw new Error('Download failed')
          }
          
          const { downloadUrl, filename } = await downloadResponse.json()
          
          const link = document.createElement("a")
          link.href = downloadUrl
          link.download = filename || "Aneesh_Ganti_Resume.pdf"
          link.target = "_blank"
          link.rel = "noopener noreferrer"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error) {
          console.error('Auto-download failed:', error)
        }
      }, 100)
    } catch (error) {
      console.error('Authentication failed:', error)
      alert('Authentication failed. Please check your passcode.')
    }
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
                    Urbana-Champaign, with interests in full stack application development, agentic AI-powered automation, modern networking & infrastructure, and large-scale data extraction for language model engineering. 
                  </p>

                  <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    I thrive on building efficient and scalable solutions for complex problems, and
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
                <ImageCarousel 
                  items={carouselItems} 
                  onResumeDownload={handleResumeDownload}
                  isDownloading={isDownloading}
                />
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
