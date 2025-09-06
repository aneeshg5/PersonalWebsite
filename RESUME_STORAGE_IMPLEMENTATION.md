# 🔐 Modern Resume Storage Implementation Plan

## 🎯 Recommended Architecture: Next.js API Routes + Cloudflare R2

### Why This Approach?
- ✅ **Cost-effective**: R2 has no egress fees
- ✅ **Performance**: Global CDN with edge locations
- ✅ **Security**: Token-based access with expiration
- ✅ **Analytics**: Built-in download tracking
- ✅ **Modern**: Current industry best practices
- ✅ **Scalable**: Handles traffic spikes automatically

## 📋 Implementation Steps

### 1. Setup Cloudflare R2 Bucket
```bash
# Install Wrangler CLI
npm install -g wrangler

# Create R2 bucket
wrangler r2 bucket create portfolio-documents
```

### 2. Environment Variables (.env.local)
```env
# Cloudflare R2 Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET_NAME=portfolio-documents

# Security
RESUME_ACCESS_SECRET=your_super_secure_secret_key
PASSCODE_HASH=your_bcrypt_hashed_passcode

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your_ga_id
```

### 3. API Route Structure
```
/api/
├── resume/
│   ├── download.ts      # Secure download endpoint
│   ├── upload.ts        # Admin upload endpoint
│   └── analytics.ts     # Download analytics
└── auth/
    └── verify.ts        # Passcode verification
```

### 4. Key Features

#### Secure Download Flow:
1. User enters passcode
2. Server verifies passcode
3. Generate signed URL with 5-minute expiration
4. Track download in analytics
5. Return secure download link

#### Implementation Code Preview:

**API Route: `/api/resume/download.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json()
    
    // Verify passcode
    const isValid = await bcrypt.compare(passcode, process.env.PASSCODE_HASH!)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
    }

    // Generate signed URL (5-minute expiration)
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
      },
    })

    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: 'resume.pdf',
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })

    // Log download attempt
    await logDownload(request)

    return NextResponse.json({ 
      downloadUrl: signedUrl,
      expiresIn: 300 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

### 5. Frontend Integration

**Updated About Component:**
```typescript
const handleResumeDownload = async () => {
  if (!isAuthenticated) {
    setShowPasscodeModal(true)
    return
  }
  
  try {
    setIsDownloading(true)
    const response = await fetch('/api/resume/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: storedPasscode })
    })
    
    if (!response.ok) throw new Error('Download failed')
    
    const { downloadUrl } = await response.json()
    
    // Trigger download
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'Aneesh_Ganti_Resume.pdf'
    link.click()
    
    // Show success toast
    toast.success('Resume downloaded successfully!')
  } catch (error) {
    toast.error('Failed to download resume')
  } finally {
    setIsDownloading(false)
  }
}
```

## 📊 Analytics Dashboard

Track resume downloads with:
- Download count by date
- Geographic distribution
- Referrer sources
- User agents
- Success/failure rates

## 🔒 Security Features

1. **Passcode Protection**: Bcrypt-hashed verification
2. **Signed URLs**: 5-minute expiration
3. **Rate Limiting**: Prevent brute force attacks
4. **IP Logging**: Track download attempts
5. **CORS Protection**: Restrict cross-origin requests

## 💰 Cost Analysis

**Cloudflare R2 Pricing:**
- Storage: $0.015/GB/month
- Class A Operations: $4.50/million
- Class B Operations: $0.36/million
- **Egress**: FREE (major advantage over AWS S3)

**Estimated Monthly Cost for Portfolio:**
- Resume file (~500KB): $0.0000075/month
- ~100 downloads: ~$0.0005
- **Total: < $0.01/month**

## 🚀 Migration Steps

1. **Phase 1**: Set up R2 bucket and credentials
2. **Phase 2**: Implement API routes
3. **Phase 3**: Update frontend components
4. **Phase 4**: Test thoroughly
5. **Phase 5**: Deploy and monitor

## 🔧 Alternative Options

### Option B: Firebase Storage + Functions
- **Pros**: Google infrastructure, easy setup
- **Cons**: Egress costs, vendor lock-in
- **Cost**: ~$0.10-0.50/month

### Option C: AWS S3 + Lambda
- **Pros**: Industry standard, extensive features
- **Cons**: Higher costs, complexity
- **Cost**: ~$0.25-1.00/month

## 📝 Next Steps

Would you like me to:
1. **Implement the full solution** with Cloudflare R2?
2. **Start with a simpler approach** using Firebase?
3. **Create a hybrid solution** keeping local storage but adding security?

Let me know your preference and I'll implement the chosen solution!
