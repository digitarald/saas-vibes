import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const provider = url.searchParams.get('provider')
    
    // Debug auth configuration
    const debugInfo = {
      providers: authOptions.providers.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
      })),
      pages: authOptions.pages,
      callbacks: {
        hasJwt: !!authOptions.callbacks?.jwt,
        hasSession: !!authOptions.callbacks?.session,
      },
      environment: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        DATABASE_URL: !!process.env.DATABASE_URL,
      },
      adapter: !!authOptions.adapter,
    }
    
    return NextResponse.json(debugInfo)
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to debug auth',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
