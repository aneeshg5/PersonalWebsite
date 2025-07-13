"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, Code, Mail, Github, Linkedin, Instagram, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
]

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/aneesh-ganti-ba606326b/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/aneeshg5", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/practicegod13/?hl=en", label: "Instagram" },
]

export function TopNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position with better detection
      const sections = navigationItems.map((item) => item.id)
      let currentSection = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.pageYOffset
          const elementHeight = rect.height
          const scrollPosition = window.pageYOffset + 150

          if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll() // Call once on mount
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">AG</span>
            </div>
            <div className="hidden md:block">
              <h2 className="font-semibold text-white">Aneesh Ganti</h2>
              <p className="text-sm text-slate-400">CS & Math @ UIUC</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`text-slate-300 hover:text-yellow-400 transition-colors ${
                  activeSection === item.id ? "text-yellow-400" : ""
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="text-slate-400 hover:text-yellow-400"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900 border-slate-700">
              <div className="flex flex-col space-y-6 mt-8">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start text-slate-300 hover:text-yellow-400"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                ))}

                <div className="pt-6 border-t border-slate-700">
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social) => (
                      <Button
                        key={social.label}
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-slate-400 hover:text-yellow-400"
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <social.icon className="w-5 h-5" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
