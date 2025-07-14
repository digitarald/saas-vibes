'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { getProviders, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DynamicSignInButtons() {
  const [providers, setProviders] = useState<Record<LiteralUnion<string, string>, ClientSafeProvider> | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(providerId)
      await signIn(providerId, {
        callbackUrl,
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'azure-ad':
        return (
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
          </svg>
        )
      case 'google':
        return (
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getProviderStyles = (providerId: string) => {
    switch (providerId) {
      case 'azure-ad':
        return 'bg-[#0078d4] hover:bg-[#106ebe] text-white'
      case 'google':
        return 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
      default:
        return 'bg-slate-600 hover:bg-slate-700 text-white'
    }
  }

  const getProviderLabel = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case 'azure-ad':
        return 'Sign in with Microsoft'
      case 'google':
        return 'Sign in with Google'
      default:
        return `Sign in with ${provider.name}`
    }
  }

  if (!providers) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="ml-2 text-sm">Loading sign-in options...</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.id}
          onClick={() => handleSignIn(provider.id)}
          disabled={isLoading === provider.id}
          className={`w-full h-12 font-medium ${getProviderStyles(provider.id)}`}
          size="lg"
        >
          {isLoading === provider.id ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            getProviderIcon(provider.id)
          )}
          {getProviderLabel(provider)}
        </Button>
      ))}
    </div>
  )
}
