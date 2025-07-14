'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, LogOut, Shield, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" data-testid="loader" />
            <span>Loading authentication status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Authentication Required</span>
          </CardTitle>
          <CardDescription>
            You need to sign in to access this application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Welcome back!</span>
        </CardTitle>
        <CardDescription>
          You are successfully authenticated.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">User Information:</p>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
            <p><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {session?.user?.email || 'N/A'}</p>
            <p><strong>Provider:</strong> {
              session?.user?.provider === 'azure-ad' ? 'Microsoft Azure AD' : 
              session?.user?.provider === 'google' ? 'Google' : 
              session?.user?.provider || 'N/A'
            }</p>
            <p><strong>ID:</strong> {session?.user?.id || 'N/A'}</p>
          </div>
        </div>
        
        <Button 
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          variant="outline"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}
