import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { passcode, accessToken } = body
    
    // Store these in .env.local
    const correctPasscode = process.env.PORTFOLIO_PASSCODE
    
    // If access token is provided, validate it
    if (accessToken) {
      return NextResponse.json({ 
        success: accessToken === correctPasscode 
      })
    }
    
    // Otherwise validate passcode
    if (passcode) {
      return NextResponse.json({ 
        success: passcode === correctPasscode 
      })
    }
    
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}