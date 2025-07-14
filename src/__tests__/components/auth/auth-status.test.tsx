import { AuthStatus } from '@/components/auth/auth-status'
import { fireEvent, render, screen } from '@testing-library/react'
import { signOut, useSession } from 'next-auth/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock next-auth
vi.mock('next-auth/react')

describe('AuthStatus Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'loading',
      update: vi.fn(),
    })

    render(<AuthStatus />)
    
    expect(screen.getByText(/loading authentication status/i)).toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render unauthenticated state', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    })

    render(<AuthStatus />)
    
    expect(screen.getByText(/authentication required/i)).toBeInTheDocument()
    expect(screen.getByText(/you need to sign in/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/auth/signin')
  })

  it('should render authenticated state with user info', () => {
    const mockSession = {
      user: {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        provider: 'azure-ad',
      },
      expires: '2024-01-01',
    }

    vi.mocked(useSession).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: vi.fn(),
    })

    render(<AuthStatus />)
    
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument()
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/microsoft azure ad/i)).toBeInTheDocument()
    expect(screen.getByText(/123/i)).toBeInTheDocument()
  })

  it('should handle sign out correctly', async () => {
    const mockSignOut = vi.fn()
    vi.mocked(signOut).mockImplementation(mockSignOut)
    
    const mockSession = {
      user: {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        provider: 'azure-ad',
      },
      expires: '2024-01-01',
    }

    vi.mocked(useSession).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: vi.fn(),
    })

    render(<AuthStatus />)
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i })
    fireEvent.click(signOutButton)
    
    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/auth/signin' })
  })

  it('should handle missing user information gracefully', () => {
    const mockSession = {
      user: {
        id: '123',
        name: null,
        email: null,
        provider: undefined,
      },
      expires: '2024-01-01',
    }

    vi.mocked(useSession).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: vi.fn(),
    })

    render(<AuthStatus />)
    
    expect(screen.getAllByText(/n\/a/i)).toHaveLength(3) // name, email, provider (id is still present)
  })

  it('should display correct provider names', () => {
    const testCases = [
      { provider: 'azure-ad', expected: 'Microsoft Azure AD' },
      { provider: 'google', expected: 'Google' },
      { provider: 'unknown', expected: 'unknown' },
      { provider: undefined, expected: 'N/A' },
    ]

    testCases.forEach(({ provider, expected }) => {
      const mockSession = {
        user: {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com',
          provider,
        },
        expires: '2024-01-01',
      }

      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })

      const { unmount } = render(<AuthStatus />)
      expect(screen.getByText(expected)).toBeInTheDocument()
      unmount()
    })
  })
})
