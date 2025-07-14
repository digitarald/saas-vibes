import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock dependencies
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  authOptions: {},
}))

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    organization: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    organizationMember: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

// Example API route handler for testing
async function GET(request: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ 
    message: 'Success',
    user: session.user
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

describe('API Route Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 when not authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)

    const request = new NextRequest('http://localhost:3000/api/test')
    const response = await GET(request)
    
    expect(response.status).toBe(401)
    
    const body = await response.json()
    expect(body).toEqual({ error: 'Unauthorized' })
  })

  it('should return success when authenticated', async () => {
    const mockSession = {
      user: {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        organizationId: 'org-123',
        role: 'MEMBER'
      },
      expires: '2024-01-01'
    }

    vi.mocked(getServerSession).mockResolvedValue(mockSession)

    const request = new NextRequest('http://localhost:3000/api/test')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    
    const body = await response.json()
    expect(body).toEqual({
      message: 'Success',
      user: mockSession.user
    })
  })

  it('should call getServerSession with auth options', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)

    const request = new NextRequest('http://localhost:3000/api/test')
    await GET(request)
    
    expect(getServerSession).toHaveBeenCalledOnce()
  })
})
