import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 })
    }

    // Verify the access token
    try {
      const tokenData = JSON.parse(Buffer.from(accessToken, 'base64').toString())
      
      // Check if token is expired
      if (Date.now() > tokenData.expires) {
        return NextResponse.json({ error: 'Access token expired' }, { status: 401 })
      }
      
      // Verify token secret
      if (tokenData.secret !== process.env.RESUME_ACCESS_SECRET) {
        return NextResponse.json({ error: 'Invalid access token' }, { status: 401 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 401 })
    }

    // Check if all required environment variables are set
    const requiredEnvVars = [
      'CLOUDFLARE_ACCOUNT_ID',
      'CLOUDFLARE_ACCESS_KEY_ID',
      'CLOUDFLARE_SECRET_ACCESS_KEY',
      'CLOUDFLARE_BUCKET_NAME'
    ]
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`)
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
      }
    }

    // Configure S3 client for Cloudflare R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
      },
    })

    // Create the command to get the resume with download headers
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: 'resume.pdf', // The file name in your bucket
      ResponseContentDisposition: 'attachment; filename="Aneesh_Ganti_Resume.pdf"',
      ResponseContentType: 'application/pdf'
    })

    // Generate a signed URL valid for 5 minutes
    const signedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 300 // 5 minutes
    })

    // Log successful download request
    console.log('Resume download requested:', {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    })

    return NextResponse.json({ 
      success: true,
      downloadUrl: signedUrl,
      expiresIn: 300,
      filename: 'Aneesh_Ganti_Resume.pdf'
    })
  } catch (error) {
    console.error('Resume download error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate download link',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}
