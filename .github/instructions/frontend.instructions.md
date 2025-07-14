---
description: "Frontend component patterns for Next.js 14 with shadcn/ui and Magic UI"
applyTo: "src/components/**,src/app/**/page.tsx,src/app/**/layout.tsx"
---

# Frontend Component Instructions

## Next.js 14 Component Architecture

### Server vs Client Components
```typescript
// Server Components (default) - for data fetching
export default async function ServerPage() {
  const session = await getServerSession(authOptions)
  const data = await prisma.user.findMany({
    where: { organizationId: session.user.organizationId }
  })
  return <ClientComponent data={data} />
}

// Client Components - only when needed for interactivity
'use client'
export function ClientComponent({ data }) {
  const [state, setState] = useState()
  return <InteractiveUI />
}
```

### Authentication Patterns
```typescript
// Server-side auth check (preferred)
export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/api/auth/signin')
  
  return <Dashboard user={session.user} />
}

// Client-side auth for interactive components
'use client'
export function UserMenu() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <Skeleton />
  if (!session) return <SignInButton />
  
  return <UserDropdown user={session.user} />
}
```

### State Management with TanStack Query
```typescript
'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function ProjectList() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json())
  })

  const queryClient = useQueryClient()
  const createProject = useMutation({
    mutationFn: (data) => fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  if (isLoading) return <ProjectSkeleton />
  return <ProjectGrid projects={projects} onCreate={createProject.mutate} />
}
```

## Design System Components

### shadcn/ui Base Components
- Use **shadcn/ui primitives** as foundation (Button, Card, Input, etc.)
- **Customize via CSS variables** in globals.css
- **Maintain accessibility** with proper ARIA attributes
- **Use cn() utility** for conditional classes

### Magic UI Integration
```typescript
// Hero section with effects
import { Particles } from '@/components/magicui/particles'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { ShimmerButton } from '@/components/magicui/shimmer-button'

export function HeroSection() {
  return (
    <section className="relative">
      <Particles className="absolute inset-0" quantity={100} ease={80} color="#3b82f6" refresh />
      <div className="relative z-10 text-center">
        <AnimatedGradientText>🚀 New Feature</AnimatedGradientText>
        <ShimmerButton>Get Started</ShimmerButton>
      </div>
    </section>
  )
}

// Enhanced cards with border beam
import { BorderBeam } from '@/components/magicui/border-beam'

export function FeatureCard({ children }) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Card>{children}</Card>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  )
}
```

### Magic UI Post-Installation Fixes
1. **Fix import paths** - Change `/lib/utils` to `@/lib/utils`
2. **Remove invalid props** - ShimmerButton doesn't accept `size` prop
3. **Use className for sizing** instead of props
4. **Fix ESLint issues** - Use `&apos;` for apostrophes, `&quot;` for quotes

## Styling Best Practices

### Tailwind CSS Patterns
- **Mobile-first responsive design** with breakpoints (sm:, md:, lg:, xl:)
- **Use design tokens** from tailwind.config.ts
- **Consistent spacing** with Tailwind scale (p-4, m-6, gap-8)
- **Dark mode support** via next-themes

### Component Composition
```typescript
// Compound component pattern
export function Card({ children, className, ...props }) {
  return (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  )
}
```

## Common Patterns

### Loading States
```typescript
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
```

### Error Boundaries
```typescript
'use client'
export function ErrorBoundary({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-lg font-semibold">Something went wrong!</h2>
      <Button onClick={reset} className="mt-4">Try again</Button>
    </div>
  )
}
```

### Form Handling
```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ProjectForm() {
  const form = useForm({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: { name: '', description: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </form>
    </Form>
  )
}
```

## Performance Optimization

### React Best Practices
- **Minimize client-side JavaScript** - prefer Server Components
- **Use React.memo** for expensive component re-renders
- **Implement proper key props** for lists
- **Avoid inline object/function creation** in JSX
- **Use useCallback/useMemo** when necessary

### Image and Asset Optimization
- **Use next/image** for automatic optimization
- **Implement proper alt text** for accessibility
- **Use next/font** for font optimization
- **Lazy load non-critical content**
