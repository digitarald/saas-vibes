import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`

    const debugInfo = {
      connected: true,
      result,
      environment: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
      },
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to connect to database',
        details: error instanceof Error ? error.message : 'Unknown error',
        connected: false,
      },
      { status: 500 }
    )
  }
}
