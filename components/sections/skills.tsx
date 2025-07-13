"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AnimatedLetters } from "@/components/animated-letters"

interface Skill {
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  percentage: number
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
      { name: "Python", level: "expert", percentage: 95 },
      { name: "C++", level: "expert", percentage: 95 },
      { name: "Java", level: "advanced", percentage: 90 },
      { name: "JavaScript & TypeScript", level: "advanced", percentage: 85 },
      { name: "SQL", level: "intermediate", percentage: 75 },
      { name: "Swift", level: "intermediate", percentage: 70 },
    ],
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    showProficiency: true,
    skills: [
      { name: "React.js", level: "expert", percentage: 95 },
      { name: "Flask", level: "advanced", percentage: 90 },
      { name: "Node.js", level: "advanced", percentage: 85 },
      { name: "Next.js", level: "advanced", percentage: 80 },
      { name: "Angular", level: "intermediate", percentage: 70 },
      { name: "Express.js", level: "intermediate", percentage: 70 },
    ],
  },
  {
    id: "development",
    name: "Development Tools",
    showProficiency: true,
    skills: [
      { name: "Visual Studio Code", level: "expert", percentage: 95 },
      { name: "Amazon Web Services (AWS)", level: "advanced", percentage: 90 },
      { name: "Hugging Face", level: "advanced", percentage: 85 },
      { name: "PostgreSQL", level: "advanced", percentage: 85 },
      { name: "Git", level: "advanced", percentage: 85 },
      { name: "Docker", level: "intermediate", percentage: 70 },
    ],
  },
  {
    id: "ml",
    name: "Machine Learning Frameworks",
    showProficiency: true,
    skills: [
      { name: "TensorFlow", level: "advanced", percentage: 90 },
      { name: "PyTorch", level: "advanced", percentage: 85 },
      { name: "Scikit-learn", level: "advanced", percentage: 85 },
      { name: "Pandas", level: "expert", percentage: 95 },
      { name: "NumPy", level: "advanced", percentage: 90 },
      { name: "LangChain", level: "beginner", percentage: 65 },
    ],
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "expert":
      return "bg-green-400/20 text-green-400"
    case "advanced":
      return "bg-blue-400/20 text-blue-400"
    case "intermediate":
      return "bg-yellow-400/20 text-yellow-400"
    case "beginner":
      return "bg-red-400/20 text-red-400"
    default:
      return "bg-slate-400/20 text-slate-400"
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
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate pr-2">{skill.name}</h3>
                      {group.showProficiency && (
                        <Badge className={`${getLevelColor(skill.level)} text-xs flex-shrink-0`}>{skill.level}</Badge>
                      )}
                    </div>

                    {group.showProficiency && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-400">Proficiency</span>
                          <span className="text-yellow-400">{skill.percentage}%</span>
                        </div>
                        <Progress value={skill.percentage} className="h-2 bg-slate-700" />
                      </div>
                    )}
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
