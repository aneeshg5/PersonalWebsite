"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedLetters } from "@/components/animated-letters"
import { ProjectModal } from "@/components/project-modal"
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react"
import { PasscodeModal } from "@/components/passcode-modal"
import { useAuth } from "@/hooks/use-auth"

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

const projects: Project[] = [
  {
    id: "1",
    title: "Promo Pigeon Automation Platform",
    role: "Backend Software Engineer",
    date: "April 2025 - Present",
    description:
      "A smart sales automation platform for manufacturers seeking new clients for promotional products.",
    longDescription:
      "Promo Pigeon is a full-stack automation service designed to help manufacturers efficiently discover, target, and engage new business clients for promotional products. The platform automates the entire sales pipeline from identifying potential businesses to managing personalized outreach, order processing, and shipment tracking.",
    technologies: ["Python", "AWS", "PostgreSQL", "Flask", "Selenium", "BeautifulSoup", "OpenAI API", "React", "Vite", "TypeScript", "Docker", "Playwright"],
    images: ["/placeholder.svg?height=400&width=600"],
    projectImage: "/images/portfolio/Promo/promo-cover.png",
    modalImages: [
      {
        src: "/images/portfolio/Promo/image2.png",
        caption:
          "Promo Pigeon dashboard: business targeting and product management.",
      },
      {
        src: "/images/portfolio/Promo/scrape.png",
        caption:
          "Automated Google Maps scraping for business discovery.",
      },
      {
        src: "/images/portfolio/Promo/flyer.png",
        caption:
          "Flyer generation with AI-powered recommendations and logo processing.",
      },
    ],
    paragraphs: [
      "Developed robust RESTful APIs using Flask and Flask-OpenAPI3, enabling seamless integration with a modern React frontend and third-party services.",
      "Engineered a scalable data pipeline using Selenium and Playwright to scrape business information from Google Maps using recursive search, followed by BeautifulSoup-based parsing and enrichment.",
      "Implemented asynchronous and parallel scraping strategies to maximize throughput and minimize latency during large-scale business data collection.",
      "Architected and managed a PostgreSQL database with SQLAlchemy ORM to store business, product, and order data, ensuring data integrity and efficient querying.",
      "Integrated OpenAI's API to provide AI-driven product recommendations and intelligent logo extraction from business websites, enhancing personalization and marketing effectiveness.",
    ],
  },
  {
    id: "2",
    title: "Illinois Space Society's Spaceshot Team",
    role: "Software Engineer",
    date: "August 2024 - Present",
    description:
      "Building and testing rocket guidance, navigation, & controls software to reach space.",
    longDescription:
      "The Illinois Space Society's Spaceshot Rocketry Program at UIUC is dedicated to developing a rocket capable of reaching the Karman line. This journey is split into multiple competitions and projects that work together to expand the engineering capabilities of the team.",
    technologies: ["Python", "C++", "PlatformIO", "Docker", "MQTT", "Raspberry Pi", "Arduino"],
    images: ["/placeholder.svg?height=400&width=600"],
    projectImage: "/images/portfolio/Spaceshot/iss_cover_new.png",
    modalImages: [
      {
        src: "/images/portfolio/Spaceshot/image1.png",
        caption:
          "Launched Aether II in Summer 2025 at the Friends of Amateur Rocketry near LA.",
      },
      {
        src: "/images/portfolio/Spaceshot/sammy.jpg",
        caption:
          "Setting up SAM Turret: an autonomous rocket tracker with 6 degrees of freedom.",
      },
      {
        src: "/images/portfolio/Spaceshot/ground.png",
        caption:
          "Ground station operations to monitor telemetry and live video feed from rocket.",
      },
    ],
    paragraphs: [
      "Led guidance, navigation, and control software development by debugging existing infrastructure and implementing new features to ensure active monitoring of our two-stage rocket.",
      "Optimized and debugged SAM autonomous turret control software to track the rocket throughout flight trajectory using a directional Yagi antenna to maintain continuous telemetry communication.",
      "Built and deployed an extended Kalman Filter to estimate our two-stage rocket’s 6-DoF dynamics by mitigating the impact of faulty sensor inputs, with performance validated during a 75,000+ feet altitude launch operation.",
      "Monitored primary telemetry server and dual Feather radio systems for packet transmissions during rocket launches, ensuring real-time data collection and analysis.",
    ],
    links: [{ label: "Kalman Filter", url: "https://www.kalmanfilter.net/default.aspx" }, { label: "GitHub", url: "https://github.com/ISSUIUC/MIDAS-Software" }],
  },
  {
    id: "3",
    title: "NASA's 2025 Human Lander Challenge",
    role: "Software & Simulations Lead",
    date: "September 2024 - Present",
    description:
      "Designed ECLIPSE: a cryogenic propellant transfer protocol for NASA's Artemis Missions.",
    longDescription:
      "In-space cryogenic propellant transfer is necessary to achieve NASA's long-duration space missions. However, propellant boil-off during storage and transfer threatens mission longevity and integrity by depleting available propellant and increasing over-pressurization risks.",
    technologies: ["Python", "Gaussian Process", "Scikit-learn", "Pandas", "Fuzzy C-means", "ANSYS", "Matplotlib"],
    images: ["/placeholder.svg?height=400&width=600"],
    projectImage: "/images/portfolio/HuLC/hulc-cover.png",
    modalImages: [
      {
        src: "/images/portfolio/HuLC/forum-pres.png",
        caption:
          "ECLIPSE Technical Presentation at the 2025 Human Lander Challenge Forum",
      },
      {
        src: "/images/portfolio/HuLC/poster.jpg",
        caption:
          "Answered questions from NASA evaluators about system design during the forum.",
      },
      {
        src: "/images/portfolio/HuLC/award.png",
        caption:
          "Received Best Technical Presentation award and received mentorship from NASA CFM.",
      },
    ],
    paragraphs: [
      "Designed ECLIPSE: a comprehensive spacecraft-agnostic cryogenic propellant transfer protocol that minimizes propellant losses during line chilldown, mitigates over-pressurization during tank chilldown, and monitors two-phase propellant flow regimes with real-time capacitance measurements.",
      "Led cross-functional instrumentation team in developing a production-grade capacitance sensor with automated testing frameworks to monitor ECLIPSE's reliability in mission-critical aerospace applications.",
      "Built a machine learning pipeline using Fuzzy C-means clustering to classify flow regimes in real-time and Gaussian Process Regression to balance sparse simulation datasets from ANSYS fluid models.",
      "Delivered award-winning presentation at Marshall Space Flight Center (Best Technical Presentation Award), with NASA's CFM department currently evaluating our solution for the Human Landing System."
    ],
    links: [{ label: "Technical Paper", url: "https://hulc.nianet.org/wp-content/uploads/2025-HuLC-University-of-Illinois-Urbana-Champaign-Technical-Paper.pdf" }, { label: "Technical Poster", url: "https://hulc.nianet.org/wp-content/uploads/2025-HuLC-University-of-Illinois-Urbana-Champaign-Digital-Poster.pdf" }, { label: "Chart Deck", url: "https://hulc.nianet.org/wp-content/uploads/2025-HuLC-University-of-Illinois-Urbana-Champaign-Chart-Deck.pdf" }, { label: "GitHub", url: "https://github.com/ISSUIUC/HuLC_2025_UIUC" }],
  },
  {
    id: "4",
    title: "Quantum Computing Model Fitting Research",
    role: "Research Assistant",
    date: "October 2024 - Present",
    description:
      "Analysis of symmetry & chaos in random Josephson Junction Arrays using Model-Fitting.",
    longDescription:
      "Josephson Junction Arrays (JJAs) are key components in superconducting quantum computing, where their geometric configuration directly impacts device performance. Instead of relying on invasive experimental methods to generate, evaluate, and refine JJA lattice configurations, advanced model fitting and optimization algorithms can be applied.",
    technologies: ["C++", "Python", "TensorFlow", "PyTorch", "Keras", "NumPy", "Pandas", "SciPy", "Matplotlib"],
    images: ["/placeholder.svg?height=400&width=600"],
    projectImage: "/images/portfolio/Quantum/josephson_cover.png",
    modalImages: [
      {
        src: "/images/portfolio/Quantum/joseph.png",
        caption:
          "An overview of the Josephson Effect between superconductors, the basis of JJAs.",
      },
    ],
    paragraphs: [
      "Leveraged parallel processing to generate, validate, and serialize thousands of unique, high-dimensional Josephson Junction Array initial conditions using combinatorial and permutation algorithms.",
      "Implemented model fitting routines using momentum-based gradient descent with stochastic perturbations and the Adam optimizer, efficiently navigating complex, non-convex loss landscapes.",
      "Reinforcement learning framework to replace brute-force initial condition generation trained on historical optimization outcomes to propose high-quality starting points in large-scale quantum array simulations.",
      "Integrated data visualization and analysis tools to compare simulated and experimental results of the symmetry and chaotic behavior of JJAs relevant to quantum computing research."
    ],
  },
  {
    id: "5",
    title: "Tensor Crop Tracker: HackIllinois 2025",
    role: "Lead Programmer",
    date: "Feb 2025",
    description:
      "TCT AI diagnoses plant diseases within seconds and provides eco-friendly cure recommendations.",
    longDescription:
      "Farmers worldwide have long relied on pesticides and harmful chemicals to treat their crops, leading to damaging effects on human health and the environment. Many farmers are unaware of natural alternatives or haven't considered sustainable treatment options, often resulting in overuse of chemical treatments.",
    technologies: ["Flask", "TensorFlow", "InceptionV3", "Hugging Face", "Python", "Swift", "Google Colab"],
    images: ["/placeholder.svg?height=400&width=600"],
    projectImage: "/images/portfolio/TCT/tct.png",
    modalImages: [
      {
        src: "/images/portfolio/TCT/First-TCT.png",
        caption:
          "Stage One: Image and User Data Collection and Preprocessing.",
      },
      {
        src: "/images/portfolio/TCT/Second_TCT_4.png",
        caption:
          "Stage Two: CNN Model Disease Prediction and Keyword Extraction.",
      },
      {
        src: "/images/portfolio/TCT/Third_TCT_2.png",
        caption:
          "Stage Three: Delivering Diagnosis and Treatment Recommendations.",
      },
    ],
    paragraphs: [
      "Engineered a convolutional neural network using transfer learning with InceptionV3, training on Google Colab with a 10,000+ image dataset of various healthy and unhealthy plants.",
      "Built a SwiftUI iOS application with camera integration that communicates through a Flask API to orchestrate data flow between CNN classification and a Qwen2.5-VL-72B-Instruct model chatbot for sustainable treatment recommendations.",
      "Overcame technical challenges including data scalability, mobile optimization, and LLM prompt engineering to deliver comprehensive responses within token limits while maintaining accuracy.",
    ],
    links: [{ label: "DevPost", url: "https://devpost.com/software/tensor-crop-tracker-tct-ai" }, { label: "GitHub", url: "https://github.com/prahity/plantDiseaseDetection" }],
  },
]

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { isAuthenticated, authenticate } = useAuth()
  const [showPasscodeModal, setShowPasscodeModal] = useState(false)
  const [pendingProject, setPendingProject] = useState<Project | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleProjectClick = (project: Project) => {
    if (!isAuthenticated) {
      setPendingProject(project)
      setShowPasscodeModal(true)
      return
    }
    setSelectedProject(project)
  }
  const handlePasscodeSuccess = () => {
    authenticate()
    if (pendingProject) {
      setSelectedProject(pendingProject)
      setPendingProject(null)
    }
  }

  return (
    <div className="space-y-8 sm:space-y-12 px-4">
      <div className="text-center">
        <AnimatedLetters
          text="Portfolio"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        />
        <p className="text-lg sm:text-xl text-slate-400">My recent work and projects!</p>
      </div>

      <div className="relative">
        {}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-10 h-10 lg:w-12 lg:h-12 rounded-full touch-manipulation"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 w-10 h-10 lg:w-12 lg:h-12 rounded-full touch-manipulation"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>

        {}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 px-2 sm:px-6 md:px-12 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="bg-slate-800/50 border-slate-700 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer flex-shrink-0 touch-manipulation"
              style={{ width: "280px", minWidth: "280px" }}
              onClick={() => handleProjectClick(project)}
            >
              <CardContent className="p-4 sm:p-6">
                {}
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                  <img
                    src={project.projectImage || "/placeholder.svg"}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      e.currentTarget.nextElementSibling!.style.display = "flex"
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 items-center justify-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-500">#{index + 1}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>

                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{project.role}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{project.date}</span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-yellow-400/20 text-yellow-400 text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 bg-transparent text-xs sm:text-sm h-8 sm:h-10 touch-manipulation"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => {
          setShowPasscodeModal(false)
          setPendingProject(null)
        }}
        onSuccess={handlePasscodeSuccess}
        title="Portfolio Access"
        description="Please enter the passcode to view project details."
      />
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
