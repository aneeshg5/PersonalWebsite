import { TopNavigation } from "@/components/top-navigation"
import { SpaceBackground } from "@/components/space-background"
import { ScrollFadeWrapper } from "@/components/scroll-fade-wrapper"
import { Home } from "@/components/sections/home"
import { Experience } from "@/components/sections/experience"
import { Research } from "@/components/sections/research"
import { Portfolio } from "@/components/sections/portfolio"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"
import { Leadership } from "@/components/sections/leadership"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen bg-background-dark text-white">
      <SpaceBackground />
      <TopNavigation />

      {/* Hero - no scroll reveal, animates on its own */}
      <Home />

      {/* Main sections */}
      <div className="relative z-20 px-6 max-w-7xl mx-auto w-full pt-24 pb-12 space-y-32">
        <ScrollFadeWrapper>
          <Experience />
        </ScrollFadeWrapper>
        <ScrollFadeWrapper delay={200}>
          <Research />
        </ScrollFadeWrapper>
        <ScrollFadeWrapper>
          <Portfolio />
        </ScrollFadeWrapper>
        <ScrollFadeWrapper>
          <Skills />
        </ScrollFadeWrapper>
        <ScrollFadeWrapper>
          <Education />
        </ScrollFadeWrapper>
        <ScrollFadeWrapper>
          <Leadership />
        </ScrollFadeWrapper>
      </div>

      <ScrollFadeWrapper>
        <Contact />
      </ScrollFadeWrapper>
    </div>
  )
}
