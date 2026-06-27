"use client"

import type { ReactNode } from "react"

export function HeroButton({
  icon,
  label,
  href,
  onClick,
  forceOpen = false,
  onEnter,
  onLeave,
}: {
  icon: ReactNode
  label: string
  href?: string
  onClick?: () => void
  forceOpen?: boolean
  onEnter?: () => void
  onLeave?: () => void
}) {
  const cls = [
    "group relative flex items-center h-12 min-w-[48px] rounded-full border border-primary/40 bg-primary/5 text-primary",
    "transition-all duration-500 ease-in-out overflow-hidden glow-hover cursor-pointer",
    forceOpen ? "max-w-[200px]" : "max-w-[48px] hover:max-w-[200px]",
  ].join(" ")

  const content = (
    <div className="flex items-center w-full">
      <div className="flex-none w-[46px] h-12 flex items-center justify-center">
        {typeof icon === "string" ? (
          <span className="material-symbols-outlined text-xl leading-none">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <span
        className="text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity duration-300 whitespace-nowrap pl-1 pr-6"
        style={{ opacity: forceOpen ? 1 : undefined }}
      >
        <span className={forceOpen ? "" : "opacity-0 group-hover:opacity-100"}>{label}</span>
      </span>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {content}
      </a>
    )
  }
  return (
    <button className={cls} onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {content}
    </button>
  )
}
