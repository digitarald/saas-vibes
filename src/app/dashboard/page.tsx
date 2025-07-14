import { BorderBeam } from '@/components/magicui/border-beam'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { LogOut, Settings, User } from 'lucide-react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard - SaaS Vibes',
  description: 'Your SaaS Vibes dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Welcome to SaaS Vibes</span>
                  </CardTitle>
                  <CardDescription>
                    You have successfully authenticated and can now access protected features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Authentication Status: Active
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Your session is secure and valid.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">User ID:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{session.user?.id || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Email:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{session.user?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Name:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{session.user?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Provider:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 capitalize">
                          {session.user?.provider === 'azure-ad' ? 'Microsoft Azure AD' : 
                           session.user?.provider === 'google' ? 'Google' : 
                           session.user?.provider || 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <BorderBeam size={250} duration={12} delay={9} />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and navigation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Manage your projects and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No projects yet. Create your first project to get started.
                  </p>
                  <ShimmerButton className="mt-4">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                      Create Project
                    </span>
                  </ShimmerButton>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>
                  Manage your organization settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Set up your organization to collaborate with team members.
                  </p>
                  <Button className="mt-4" size="sm" variant="outline">
                    Setup Organization
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-3">
                    Free Plan
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Upgrade to unlock advanced features and increased limits.
                  </p>
                  <Button className="mt-4" size="sm" variant="outline">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
