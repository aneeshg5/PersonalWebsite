import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export interface CorpusChunk {
  id: string
  text: string
  source: string
  category: string
}

const CATEGORY_MAP: Record<string, string> = {
  'Brunswick_Corporation': 'experience',
  'Tekweld_Manufacturing': 'experience',
  'Promo_Pigeon':          'experience',
  'PhinD_Experts':         'leadership',
  'NASA_Human_Lander':     'leadership',
  'Course_Assistant':      'leadership',
  'Josephson_Junction':    'research',
  'Battery_Degradation':   'research',
  'LeafScan_AI':           'project',
  'Cryogenic_Flow':        'project',
  'ZenGM_Sports':          'project',
  'OrbitForge':            'project',
  'about':                 'about',
}

export function generateCorpus(): CorpusChunk[] {
  const chunks: CorpusChunk[] = []
  const kbDir = join(process.cwd(), 'content', 'kb')
  const files = readdirSync(kbDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    const slug = file.replace('.md', '')
    const category = CATEGORY_MAP[slug] || 'general'
    const content = readFileSync(join(kbDir, file), 'utf-8')

    // Extract H1 title
    const titleMatch = content.match(/^# (.+)$/m)
    const docTitle = titleMatch ? titleMatch[1].trim() : slug

    // Split on H2 headers — each becomes its own chunk
    const rawSections = content.split(/\n(?=## )/)

    for (let i = 0; i < rawSections.length; i++) {
      const section = rawSections[i].trim()
      if (!section || section.split(/\s+/).length < 20) continue

      const sectionTitleMatch = section.match(/^## (.+)$/m)
      const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : 'Overview'
      const source = i === 0 ? docTitle : `${docTitle} — ${sectionTitle}`

      chunks.push({
        id: `${slug}-${i}`,
        source,
        category,
        text: `[${docTitle}]\n\n${section}`,
      })
    }
  }

  return chunks
}
