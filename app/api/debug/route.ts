import { NextResponse } from 'next/server'

export async function GET() {
  const requiredEnvVars = [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_ACCESS_KEY_ID',
    'CLOUDFLARE_SECRET_ACCESS_KEY',
    'CLOUDFLARE_BUCKET_NAME',
    'RESUME_ACCESS_SECRET',
    'PORTFOLIO_PASSCODE'
  ]
  
  const status = {}
  for (const envVar of requiredEnvVars) {
    status[envVar] = process.env[envVar] ? 'SET' : 'MISSING'
  }
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    variables: status,
    timestamp: new Date().toISOString()
  })
}
