import { readFileSync } from 'fs'
import { join } from 'path'
import { EXPERIENCES, RESEARCH_PROJECTS, PROJECTS, LEADERSHIP, SKILL_CATEGORIES } from '../lib/data'

const BULLET_BUDGET = 118
const HIGHLIGHT_BUDGET = 60
const PROJECT_DESCRIPTION_BUDGET = 100
const BANNED_PUNCTUATION = /[—;]/

let errors = 0
let warnings = 0

function fail(where: string, msg: string) {
  errors++
  console.log(`✗ ${where}: ${msg}`)
}

function warn(where: string, msg: string) {
  warnings++
  console.log(`! ${where}: ${msg}`)
}

function stripBold(text: string): string {
  return text.replace(/\*\*/g, '')
}

function checkBullet(where: string, bullet: string, budget?: number, budgetSeverity: 'fail' | 'warn' = 'fail') {
  const plain = stripBold(bullet)
  if (budget && plain.length > budget) {
    const msg = `bullet is ${plain.length} chars (${budgetSeverity === 'fail' ? '' : 'soft '}budget ${budget}, renders single-line so going over wraps to 2 lines): "${bullet}"`
    budgetSeverity === 'fail' ? fail(where, msg) : warn(where, msg)
  }
  if (BANNED_PUNCTUATION.test(bullet)) {
    fail(where, `contains em dash or semicolon: "${bullet}"`)
  }
  if (!/\*\*.+?\*\*/.test(bullet)) {
    warn(where, `no bold span (tech/metric should usually be bolded): "${bullet}"`)
  }
}

// Tech tag → icon resolution, mirroring each section component's EXTRA_ICONS map
function extractExtraIcons(componentPath: string): Set<string> {
  const src = readFileSync(join(process.cwd(), componentPath), 'utf-8')
  const block = src.match(/const EXTRA_ICONS:[^{]*\{([^}]*)\}/)
  if (!block) return new Set()
  const keys = [...block[1].matchAll(/['"]([^'"]+)['"]\s*:/g)].map(m => m[1])
  return new Set(keys)
}

const skillNames = new Set(
  SKILL_CATEGORIES.flatMap(cat => cat.skills.map(s => s.name.toLowerCase()))
)

function checkTechIcons(where: string, tech: string[] | undefined, extraIcons: Set<string>) {
  if (!tech) return
  for (const t of tech) {
    const resolved = extraIcons.has(t) || skillNames.has(t.toLowerCase()) || skillNames.has((t === 'ReactJS' ? 'React' : t).toLowerCase())
    if (!resolved) {
      warn(where, `tech tag "${t}" has no icon in SKILL_CATEGORIES or the relevant EXTRA_ICONS map`)
    }
  }
}

// --- Experiences (strict bullet budget — these render single-line) ---
const expIcons = extractExtraIcons('components/sections/experience.tsx')
for (const exp of EXPERIENCES) {
  const where = `EXPERIENCES > ${exp.id}`
  if (exp.subProjects) {
    for (const sub of exp.subProjects) {
      if (!sub.title || !sub.bullets?.length || !sub.tech?.length) {
        fail(`${where} > ${sub.title || '(untitled)'}`, 'subProject missing title/bullets/tech')
      }
      sub.bullets.forEach(b => checkBullet(`${where} > ${sub.title}`, b, BULLET_BUDGET))
      checkTechIcons(`${where} > ${sub.title}`, sub.tech, expIcons)
    }
  } else {
    if (!exp.project || !exp.bullets?.length || !exp.tech?.length) {
      fail(where, 'missing project/bullets/tech (required when no subProjects)')
    }
    exp.bullets?.forEach(b => checkBullet(where, b, BULLET_BUDGET))
    checkTechIcons(where, exp.tech, expIcons)
  }
}

// --- Research (prose description, no bullet budget — light checks only) ---
const researchIcons = extractExtraIcons('components/sections/research.tsx')
for (const res of RESEARCH_PROJECTS) {
  const where = `RESEARCH_PROJECTS > ${res.id}`
  if (!res.title || !res.institution || !res.description || !res.tech?.length) {
    fail(where, 'missing title/institution/description/tech')
  }
  if (BANNED_PUNCTUATION.test(res.description)) {
    fail(where, `description contains em dash or semicolon: "${res.description}"`)
  }
  checkTechIcons(where, res.tech, researchIcons)
}

// --- Projects (highlights render single-line, same as experience bullets but shorter) ---
const projectIcons = extractExtraIcons('components/sections/portfolio.tsx')
for (const proj of PROJECTS) {
  const where = `PROJECTS > ${proj.id}`
  if (!proj.title || !proj.description || !proj.highlights?.length || !proj.tech?.length || !proj.image) {
    fail(where, 'missing title/description/highlights/tech/image')
  }
  if (proj.description.length > PROJECT_DESCRIPTION_BUDGET) {
    warn(where, `description is ${proj.description.length} chars (soft budget ${PROJECT_DESCRIPTION_BUDGET}) — char count is approximate, actual wrap depends on word breaks, so verify visually (rendered <p> should be ~45.5px/2 lines, not ~68px/3): "${proj.description}"`)
  }
  if (BANNED_PUNCTUATION.test(proj.description)) {
    fail(where, `description contains em dash or semicolon: "${proj.description}"`)
  }
  proj.highlights?.forEach(h => checkBullet(where, h, HIGHLIGHT_BUDGET, 'warn'))
  checkTechIcons(where, proj.tech, projectIcons)
}

// --- Leadership (no tech field, just required-field check) ---
for (const lead of LEADERSHIP) {
  const where = `LEADERSHIP > ${lead.title}`
  if (!lead.title || !lead.role || !lead.description || !lead.period) {
    fail(where, 'missing title/role/description/period')
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`)
if (errors > 0) process.exit(1)
