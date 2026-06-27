import { NextResponse } from 'next/server'

// Resume is served as a static file at /resume.pdf — no API needed.
export async function POST() {
  return NextResponse.json({ downloadUrl: '/resume.pdf', filename: 'Aneesh_Ganti_Resume.pdf' })
}
