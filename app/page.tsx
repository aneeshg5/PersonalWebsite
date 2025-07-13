import { TopNavigation } from "@/components/top-navigation"
import { Home } from "@/components/sections/home"
import { About } from "@/components/sections/about"
import { Portfolio } from "@/components/sections/portfolio"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { ScrollFadeWrapper } from "@/components/scroll-fade-wrapper"
import { SpaceBackground } from "@/components/space-background"

export default function Page() {
  // Adjustable bottom spacing variable - reduced since we now have a footer
  const BOTTOM_SPACING = "pb-0" // Removed bottom padding since footer handles spacing

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Space background that fades out on scroll - creates gradient transition to original background */}
      <SpaceBackground />

      <TopNavigation />
      <main className="pt-20 relative z-10">
        <div className={`container mx-auto px-4 py-8 space-y-20 ${BOTTOM_SPACING}`}>
          <section id="home">
            <Home />
          </section>
          <ScrollFadeWrapper>
            <section id="about">
              <About />
            </section>
          </ScrollFadeWrapper>
          <ScrollFadeWrapper>
            <section id="portfolio">
              <Portfolio />
            </section>
          </ScrollFadeWrapper>
          <ScrollFadeWrapper>
            <section id="skills">
              <Skills />
            </section>
          </ScrollFadeWrapper>
          <ScrollFadeWrapper>
            <section id="contact">
              <Contact />
            </section>
          </ScrollFadeWrapper>
        </div>

        {/* Footer outside of main container for full-width styling */}
        <Footer />
      </main>
    </div>
  )
}
