import { AuthStatus } from '@/components/auth/auth-status'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { MagicCard } from '@/components/magicui/magic-card'
import { Particles } from '@/components/magicui/particles'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">SaaS Vibes</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <div className="ml-6 flex gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <Particles className="absolute inset-0" quantity={80} ease={80} color="#3b82f6" refresh />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
            <AnimatedGradientText>🚀 Introducing SaaS Vibes v2.0</AnimatedGradientText>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Modern TypeScript-First
                <span className="text-primary block mt-2">SaaS Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Built with Next.js 14, Prisma, Azure Web Apps, and the latest TypeScript ecosystem.
                Production-ready with authentication, subscriptions, and observability.
              </p>
            </div>

            {/* Authentication Status - Simplified */}
            <div className="w-full max-w-sm">
              <AuthStatus />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <ShimmerButton className="shadow-2xl">
                <Link href="/dashboard" className="flex items-center px-2">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ShimmerButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section id="features" className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to build your SaaS
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern tooling and best practices out of the box
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <MagicCard className="cursor-pointer p-8 text-center">
              <Zap className="h-12 w-12 mb-4 mx-auto text-primary" />
              <h3 className="text-xl font-semibold mb-3">Next.js 14 App Router</h3>
              <p className="text-muted-foreground">
                React Server Components, streaming UI, and Turbopack for lightning-fast development.
              </p>
            </MagicCard>

            <MagicCard className="cursor-pointer p-8 text-center">
              <Shield className="h-12 w-12 mb-4 mx-auto text-primary" />
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Azure AD authentication, Key Vault integration, and Managed Identity for zero-secret
                deployments.
              </p>
            </MagicCard>

            <MagicCard className="cursor-pointer p-8 text-center">
              <Globe className="h-12 w-12 mb-4 mx-auto text-primary" />
              <h3 className="text-xl font-semibold mb-3">Azure Native</h3>
              <p className="text-muted-foreground">
                Built for Azure App Service with PostgreSQL Flexible Server, Application Insights,
                and auto-scaling.
              </p>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground">
          © 2024 SaaS Vibes. Built with Next.js 14 and Azure.
        </p>
        <nav className="sm:ml-auto flex gap-6">
          <Link className="text-sm hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm hover:text-primary transition-colors" href="/auth/signin">
            Sign In
          </Link>
        </nav>
      </footer>
    </div>
  )
}
