"use client"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { EXPERIENCES, RESEARCH_PROJECTS, PROJECTS, LEADERSHIP } from "@/lib/data"
import { HeroButton } from "@/components/hero-button"

type HistoryEntry = { type: "command" | "output"; content: ReactNode; path?: string }

const formatDir = (str: string) => {
  const slug = str.replace(/[^a-zA-Z0-9_-]/g, "_")
  if (slug.length <= 22) return slug
  const truncated = slug.slice(0, 22)
  const lastUnderscore = truncated.lastIndexOf("_")
  return lastUnderscore > 8 ? truncated.slice(0, lastUnderscore) : truncated.slice(0, 21) + "~"
}

function getDirContents(path: string[]): string[] {
  if (path.length === 0) {
    return ["experience/", "research/", "projects/", "leadership/"]
  }
  const root = path[0]
  if (path.length === 1) {
    let items: string[] = []
    switch (root) {
      case "experience": items = EXPERIENCES.map((e) => formatDir(e.company.split('·')[0].trim())); break
      case "research": items = RESEARCH_PROJECTS.map((r) => formatDir(r.title)); break
      case "projects": items = PROJECTS.filter((p) => !p.isHidden).map((p) => formatDir(p.title)); break
      case "leadership": items = LEADERSHIP.map((l) => formatDir(l.title)); break
    }
    return items.map((i) => i + "/")
  }
  return []
}

const ASCII_ART = [
  "    ___                         __       ______            __  _ ",
  "   /   |  ____  ___  ___  _____/ /_     / ____/___ _____  / /_(_)",
  "  / /| | / __ `/ _ \\/ _ \\/ ___/ __ \\   / / __/ __ `/ __ \\/ __/ / ",
  " / ___ |/ / / /  __/  __(__  ) / / /  / /_/ / /_/ / / / / /_/ /  ",
  "/_/  |_/_/ /_/\\___/\\___/____/_/ /_/   \\____/\\__,_/_/ /_/\\__/_/   ",
]

const INITIAL_OUTPUT: HistoryEntry = {
  type: "output",
  content: (
    <>
      <div className="font-mono text-[8px] text-accent-green/60 leading-tight select-none mb-3 whitespace-pre overflow-hidden">
        {ASCII_ART.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div className="text-white/50 text-[10px] font-mono">
        Type <span className="text-accent-cyan">'help'</span> to see available commands.
      </div>
    </>
  ),
}

function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([INITIAL_OUTPUT])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingText, setStreamingText] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([])
  const [inputVal, setInputVal] = useState("")
  const [cursorPos, setCursorPos] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const syncCursor = () => {
    if (inputRef.current != null) setCursorPos(inputRef.current.selectionStart ?? 0)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, isLoading, streamingText])

  const isChatMode = currentPath.length === 2
  const promptPath = currentPath.length === 0 ? "~" : "~/" + currentPath.join("/") + (isChatMode ? "/assistant" : "")

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || isLoading) return
    const cmd = inputVal.trim()
    const lower = cmd.toLowerCase()
    const newHistory: HistoryEntry[] = [...history, { type: "command", content: cmd, path: promptPath }]
    const isStdCmd = ["help", "ls", "clear"].includes(lower) || lower.startsWith("cd")

    if (isChatMode && !isStdCmd && cmd !== "") {
      setHistory(newHistory)
      setInputVal("")
      setCursorPos(0)
      setIsLoading(true)
      setStreamingText("")

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: cmd, chatHistory, activePath: currentPath[1] }),
        })

        if (!res.ok || !res.body) throw new Error("API error")

        setIsLoading(false)
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += decoder.decode(value, { stream: true })
          setStreamingText(fullText)
        }

        const finalEntry: HistoryEntry = {
          type: "output",
          content: (
            <div className="font-mono text-[10px] border border-[#D97757]/20 bg-[#D97757]/5 rounded">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[#D97757]/10">
                <span className="text-[#D97757] leading-none">✦</span>
              </div>
              <div className="px-3 py-2 text-white/80 leading-relaxed text-[11px] font-inter whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: fullText.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#D97757] font-bold">$1</span>')
                }}
              />
            </div>
          ),
        }
        setChatHistory(prev => [
          ...prev,
          { role: "user", content: cmd },
          { role: "assistant", content: fullText },
        ])
        setHistory(prev => [...prev, finalEntry])
      } catch {
        setHistory(prev => [...prev, {
          type: "output",
          content: <span className="text-red-400">{">> CONNECTION_ERROR: Failed to reach AI kernel"}</span>,
        }])
      } finally {
        setStreamingText(null)
        setIsLoading(false)
      }
      return
    }

    let response: ReactNode = null

    if (lower === "help") {
      response = (
        <div className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-1 text-white/80 text-xs font-mono">
          <span className="text-accent-yellow">ls</span>        <span className="text-white/60">list directory contents</span>
          <span className="text-accent-yellow">cd [dir]</span>  <span className="text-white/60">enter section / start chat</span>
          <span className="text-accent-yellow">cd ..</span>     <span className="text-white/60">go back / exit chat</span>
          <span className="text-accent-yellow">clear</span>     <span className="text-white/60">clear terminal</span>
        </div>
      )
    } else if (lower === "ls") {
      const contents = getDirContents(currentPath)
      response = (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-accent-cyan text-xs font-mono">
          {contents.map((item) => (
            <span key={item} className="truncate min-w-0 block">{item}</span>
          ))}
        </div>
      )
    } else if (lower === "clear") {
      setHistory([INITIAL_OUTPUT])
      setInputVal("")
      setCursorPos(0)
      return
    } else if (lower.startsWith("cd")) {
      const target = cmd.split(" ").slice(1)[0]
      if (!target || target === "~" || target === "/") {
        setCurrentPath([])
      } else if (target === "..") {
        setCurrentPath((prev) => prev.slice(0, -1))
      } else {
        const available = getDirContents(currentPath).map((d) => d.replace("/", ""))
        const clean = target.replace(/\/$/, "")
        if (available.includes(clean)) {
          setCurrentPath((prev) => [...prev, clean])
          const newPath = [...currentPath, clean]
          if (newPath.length === 2) {
            const label = clean.replace(/_/g, " ")
            response = (
              <div className="my-1 w-full font-mono text-[10px] border border-[#D97757]/25 bg-[#D97757]/5 rounded">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#D97757]/15">
                  <span className="text-[#D97757] leading-none">✦</span>
                  <span className="text-white/60 truncate">{label}</span>
                </div>
                <div className="px-3 py-2 text-white/40 leading-relaxed">
                  Context loaded. Ask me anything about this.{" "}
                  <span className="text-[#D97757]/70">cd ..</span> to exit.
                </div>
              </div>
            )
          }
        } else {
          response = <span className="text-red-400">cd: no such file or directory: {target}</span>
        }
      }
    } else if (lower !== "") {
      response = <span className="text-red-400">Command not found: {cmd}</span>
    }

    if (cmd !== "") {
      if (response) newHistory.push({ type: "output", content: response })
      setHistory(newHistory)
    }
    setInputVal("")
    setCursorPos(0)
  }

  return (
    <div
      className="w-full max-w-[600px] shrink-0"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-[#0B0F1A] rounded-lg border border-line-dark shadow-2xl overflow-hidden flex flex-col h-[380px] text-left relative">
        <div className="bg-[#1F2633] px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase">zsh — interactive</div>
          <div className="w-8"></div>
        </div>
        <div className="p-5 font-mono text-[11px] leading-relaxed overflow-y-auto flex-1 scrollbar-none" ref={scrollRef}>
          {history.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "command" ? (
                <div>
                  <span className="text-accent-green font-bold">aneesh</span>
                  <span className="text-white/40">@</span>
                  <span className="text-accent-cyan">portfolio</span>
                  <span className="text-accent-purple"> {line.path || "~"}</span>
                  <span className="text-white/40"> % </span>
                  <span className="text-white">{line.content}</span>
                </div>
              ) : (
                line.content
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#D97757] leading-none">✦</span>
              <span className="text-[#D97757]/60 animate-pulse">Thinking...</span>
            </div>
          )}

          {streamingText !== null && (
            <div className="mb-1 border border-[#D97757]/20 bg-[#D97757]/5 rounded">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[#D97757]/10">
                <span className="text-[#D97757] leading-none">✦</span>
              </div>
              <div className="px-3 py-2 text-white/80 leading-relaxed text-[11px] font-inter whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: streamingText.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#D97757] font-bold">$1</span>')
                }}
              />
              <span className="inline-block w-[7px] h-[11px] bg-[#D97757]/70 animate-blink ml-3 mb-2 align-middle" />
            </div>
          )}

          {!isLoading && (
            <div className="relative cursor-text">
              <span className="text-accent-green font-bold">aneesh</span>
              <span className="text-white/40">@</span>
              <span className="text-accent-cyan">portfolio</span>
              <span className="text-accent-purple"> {promptPath}</span>
              <span className="text-white/40"> % </span>
              <span className="text-white whitespace-pre-wrap break-all">{inputVal.slice(0, cursorPos)}</span>
              <span className={`font-mono text-[11px] whitespace-pre ${isFocused ? 'animate-cursor-blink' : 'bg-white/25 text-white'}`}>
                {inputVal[cursorPos] ?? ' '}
              </span>
              <span className="text-white whitespace-pre-wrap break-all">{inputVal.slice(cursorPos + 1)}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => { setInputVal(e.target.value); setCursorPos(e.target.selectionStart ?? e.target.value.length) }}
                onKeyDown={handleKeyDown}
                onKeyUp={syncCursor}
                onClick={syncCursor}
                onSelect={syncCursor}
                onFocus={() => { setIsFocused(true); syncCursor() }}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 opacity-0 w-full bg-transparent border-none outline-none p-0 cursor-text"
                style={{ caretColor: 'transparent' }}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  const [anyHovered, setAnyHovered] = useState(false)
  const hoverCount = useRef(0)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const onPillEnter = useCallback(() => {
    clearTimeout(leaveTimer.current)
    hoverCount.current++
    setAnyHovered(true)
  }, [])

  const onPillLeave = useCallback(() => {
    hoverCount.current = Math.max(0, hoverCount.current - 1)
    leaveTimer.current = setTimeout(() => {
      if (hoverCount.current === 0) setAnyHovered(false)
    }, 200)
  }, [])

  return (
    <footer id="contact" className="bg-[#151922] border-t border-line-dark pt-8 pb-6 relative overflow-hidden mt-20 z-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Let&apos;s Build Something Together
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center mb-10 w-full">
          <Terminal />
          <div className="flex flex-col items-start text-left justify-between h-[380px] w-full max-w-[400px]">
            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-white font-display">Get in Touch</h3>
              <p className="text-[#9bb3bb] text-base font-inter leading-relaxed">
                I tackle high-scale challenges with a{" "}
                <span className="text-white underline decoration-accent-cyan decoration-2 underline-offset-2">company-first mindset</span>
                {" "}and a{" "}
                <span className="text-white underline decoration-accent-cyan decoration-2 underline-offset-2">first-principles approach</span>
                . I prioritize efficiency at every step to build meaningful solutions from the ground up and deliver impactful results.
              </p>
              <div className="flex flex-wrap gap-3">
                <HeroButton
                  icon="description"
                  label="Resume"
                  forceOpen={!anyHovered}
                  onEnter={onPillEnter}
                  onLeave={onPillLeave}
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = "/resume.pdf"
                    a.download = "Aneesh_Ganti_Resume.pdf"
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  }}
                />
                <HeroButton
                  icon={
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/aneesh-ganti/"
                  onEnter={onPillEnter}
                  onLeave={onPillLeave}
                />
                <HeroButton
                  icon={
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  }
                  label="GitHub"
                  href="https://github.com/aneeshg5"
                  onEnter={onPillEnter}
                  onLeave={onPillLeave}
                />
                <HeroButton
                  icon="mail"
                  label="Email"
                  href="mailto:aneeshganti5@gmail.com"
                  onEnter={onPillEnter}
                  onLeave={onPillLeave}
                />
              </div>
            </div>
            <div className="pb-6">
              <h4 className="font-inter text-[14px] text-[#8B949E] font-bold mb-3">Exploring Opportunities in:</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  "ML Systems Engineering",
                  "Distributed Systems",
                  "LLM Orchestration & Agents",
                  "Full-Stack Development",
                  "Computer Vision & Robotics",
                  "Scientific Computing",
                ].map((opt) => (
                  <li key={opt} className="font-inter text-[13px] text-[#8B949E] flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[#00C9FF] leading-none shrink-0">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
        <div className="w-full pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-[10px] font-inter uppercase tracking-widest font-medium">
            © 2026 Aneesh Ganti. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
