interface SectionHeaderProps {
  title: string
  accent: string
}

export function SectionHeader({ title, accent }: SectionHeaderProps) {
  return (
    <div className="mb-16 md:ml-12 lg:ml-20">
      <h2 className="font-display text-[42px] font-bold text-white leading-tight mb-6">{title}</h2>
      <div className={`w-full max-w-5xl h-[2px] ${accent}`}></div>
    </div>
  )
}
