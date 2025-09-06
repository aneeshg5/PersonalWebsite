import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json()
    
    if (!passcode) {
      return NextResponse.json({ error: 'Passcode required' }, { status: 400 })
    }

    // Get the portfolio passcode from environment (same as your existing system)
    const portfolioPasscode = process.env.PORTFOLIO_PASSCODE
    if (!portfolioPasscode) {
      console.error('PORTFOLIO_PASSCODE not set in environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Verify the passcode (simple string comparison, same as your existing system)
    const isValid = passcode === portfolioPasscode
    
    if (!isValid) {
      // Log failed attempt (you can enhance this with IP tracking)
      console.log('Failed passcode attempt:', {
        timestamp: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      })
      
      return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
    }

    // Generate a temporary access token (valid for 5 minutes)
    const accessToken = Buffer.from(
      JSON.stringify({
        timestamp: Date.now(),
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
        secret: process.env.RESUME_ACCESS_SECRET
      })
    ).toString('base64')

    return NextResponse.json({ 
      success: true,
      accessToken,
      expiresIn: 300 // 5 minutes in seconds
    })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
