import { SignInForm } from '@/components/auth/signin-form'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { BorderBeam } from '@/components/magicui/border-beam'
import { Meteors } from '@/components/magicui/meteors'
import { Particles } from '@/components/magicui/particles'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In - SaaS Vibes',
  description: 'Sign in to your SaaS Vibes account',
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  
  // Redirect if already authenticated
  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 relative overflow-hidden">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#3b82f6"
        refresh
      />
      <div className="w-full max-w-md relative z-10">
        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
          <Meteors number={20} />
          
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <AnimatedGradientText className="mb-2">
              <h1 className="text-2xl font-bold">
                Welcome back
              </h1>
            </AnimatedGradientText>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Choose your preferred sign-in method
            </p>
          </div>

          {/* Sign In Form */}
          <div className="px-8 py-6">
            <SignInForm />
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-slate-50/50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Privacy Policy
              </a>
            </p>
          </div>
          
          <BorderBeam size={250} duration={12} delay={9} />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
