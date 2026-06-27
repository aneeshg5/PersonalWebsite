import OpenAI from 'openai'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { generateCorpus } from '../lib/rag-corpus'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function main() {
  const chunks = generateCorpus()
  console.log(`Generated ${chunks.length} corpus chunks`)

  const texts = chunks.map(c => c.text)
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })

  const result = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: response.data[i].embedding,
  }))

  const outputPath = join(process.cwd(), 'lib', 'corpus-embeddings.json')
  writeFileSync(outputPath, JSON.stringify(result))
  console.log(`Saved ${result.length} embeddings to lib/corpus-embeddings.json`)
}

main().catch(console.error)
