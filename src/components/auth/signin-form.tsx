'use client'

import { BorderBeam } from '@/components/magicui/border-beam'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true)
      await signIn(providerId, {
        callbackUrl,
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">
                {error === 'OAuthSignin' && 'Error with the OAuth provider.'}
                {error === 'OAuthCallback' && 'Error in handling the OAuth callback.'}
                {error === 'OAuthCreateAccount' && 'Could not create OAuth account.'}
                {error === 'EmailCreateAccount' && 'Could not create email account.'}
                {error === 'Callback' && 'Error in the OAuth callback handler route.'}
                {error === 'OAuthAccountNotLinked' && 
                  'Email already exists with a different provider.'}
                {error === 'SessionRequired' && 'Please sign in to access this page.'}
                {error === 'Default' && 'Unable to sign in.'}
                {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 
                    'Callback', 'OAuthAccountNotLinked', 'SessionRequired', 'Default'].includes(error) && 
                  'An error occurred during sign in.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {/* Azure AD Sign In */}
        <div className="relative">
          <ShimmerButton
            onClick={() => handleSignIn('azure-ad')}
            disabled={isLoading}
            className="w-full h-12 bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-3 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
            )}
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-sm">
              Sign in with Microsoft
            </span>
          </ShimmerButton>
        </div>

        {/* Google Sign In */}
        <div className="relative overflow-hidden rounded-lg">
          <Button
            onClick={() => handleSignIn('google')}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-3 h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Sign in with Google
          </Button>
          <BorderBeam size={150} duration={8} delay={3} />
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">
              Multiple Authentication Options
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Secure Authentication
                </h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Choose your preferred sign-in method. Both Microsoft Azure AD and Google use 
                  enterprise-grade security with OAuth 2.0 protection.
                </p>
              </div>
            </div>
          </div>
          <BorderBeam size={200} duration={10} delay={5} />
        </div>
      </div>
    </div>
  )
}
