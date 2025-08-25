"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AnimatedLetters } from "@/components/animated-letters"

interface Skill {
  name: string
  years: number
}

interface SkillGroup {
  id: string
  name: string
  skills: Skill[]
  showProficiency?: boolean
}

const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    name: "Programming Languages",
    showProficiency: true,
    skills: [
      { name: "Python", years: 6 },
      { name: "C++", years: 5 },
      { name: "Java", years: 4 },
      { name: "JavaScript & TypeScript", years: 3 },
      { name: "SQL", years: 3 },
      { name: "Swift", years: 2 },
    ],
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    showProficiency: true,
    skills: [
      { name: "React.js", years: 5 },
      { name: "Flask", years: 4 },
      { name: "Node.js", years: 3 },
      { name: "Next.js", years: 3 },
      { name: "Angular", years: 2 },
      { name: "Express.js", years: 2 },
    ],
  },
  {
    id: "development",
    name: "Development Tools",
    showProficiency: true,
    skills: [
      { name: "Visual Studio Code", years: 6 },
      { name: "Amazon Web Services (AWS)", years: 4 },
      { name: "Hugging Face", years: 3 },
      { name: "PostgreSQL", years: 3 },
      { name: "Git", years: 4 },
      { name: "Docker", years: 2 },
    ],
  },
  {
    id: "ml",
    name: "Machine Learning Frameworks",
    showProficiency: true,
    skills: [
      { name: "TensorFlow", years: 4 },
      { name: "PyTorch", years: 3 },
      { name: "Scikit-learn", years: 4 },
      { name: "Pandas", years: 5 },
      { name: "NumPy", years: 4 },
      { name: "LangChain", years: 1 },
    ],
  },
]

const getYearsColor = (years: number) => {
  if (years >= 5) {
    return "bg-green-400/20 text-green-400"
  } else if (years >= 3) {
    return "bg-blue-400/20 text-blue-400"
  } else if (years >= 2) {
    return "bg-yellow-400/20 text-yellow-400"
  } else {
    return "bg-red-400/20 text-red-400"
  }
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("programming")

  return (
    <div className="space-y-8 sm:space-y-12 px-4">
      <div className="text-center">
        <AnimatedLetters
          text="Skills"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        />
        <p className="text-lg sm:text-xl text-slate-400">Technologies, tools, and frameworks I have worked with!</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-800/50 border border-slate-700 p-1 gap-1 h-auto">
          {skillGroups.map((group) => (
            <TabsTrigger
              key={group.id}
              value={group.id}
              className="relative z-10 data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900 text-slate-300 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:bg-slate-700/70 hover:text-yellow-300 rounded-md text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[44px] touch-manipulation"
            >
              <span className="text-center leading-tight">{group.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {skillGroups.map((group) => (
          <TabsContent key={group.id} value={group.id} className="mt-6 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {group.skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-slate-800/50 border-slate-700 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate pr-2">{skill.name}</h3>
                      {group.showProficiency && (
                        <Badge className={`${getYearsColor(skill.years)} text-xs flex-shrink-0`}>
                          {skill.years} {skill.years === 1 ? 'year' : 'years'}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
