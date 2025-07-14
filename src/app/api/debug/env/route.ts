import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasAzureClientId: !!process.env.AZURE_AD_CLIENT_ID,
    hasAzureClientSecret: !!process.env.AZURE_AD_CLIENT_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
  })
}
