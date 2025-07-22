import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json()
    
    // Store this in .env.local
    const correctPasscode = process.env.PORTFOLIO_PASSCODE
    
    if (passcode === correctPasscode) {
      // You could also generate and return a JWT token here for better security
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}