import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
    }
    
    // Check if user exists in database
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        accounts: true,
        sessions: true,
        organizations: {
          include: {
            organization: true
          }
        }
      }
    })
    
    // Also check NextAuth tables
    const accounts = await prisma.account.findMany({
      where: {
        user: {
          email
        }
      },
      include: {
        user: true
      }
    })
    
    const sessions = await prisma.session.findMany({
      where: {
        user: {
          email
        }
      },
      include: {
        user: true
      }
    })
    
    return NextResponse.json({
      user,
      accounts,
      sessions,
      userExists: !!user,
      accountsCount: accounts.length,
      sessionsCount: sessions.length,
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Database query failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
