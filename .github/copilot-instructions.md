# Copilot Instructions for TypeScript-first SaaS on Azure

## 🚨 MUST-FOLLOW Code Quality Rules

### 1. Test-Driven Development (TDD) - MANDATORY
- **Write failing test FIRST** for ANY new feature or changes
- **Implement minimal code** to pass the test
- **Refactor with confidence** knowing tests validate behavior
- **No exceptions** - TDD is required for all features
- **Use comprehensive test structure**: unit tests in `src/__tests__/`, e2e tests in `tests/e2e/`

### 2. TypeScript Strict Mode - ENFORCED
- **No implicit any** - explicit typing required
- **Strict null checks** - handle undefined/null properly
- **Use Zod** for runtime validation and type inference
- **Prefer unknown over any** - cast with type guards
- **Use satisfies operator** for better type inference

### 3. Code Quality & Linting - ZERO TOLERANCE
- **ESLint rules** must pass - no warnings allowed
- **Unescaped entities**: Always use `&apos;`, `&quot;`, etc. in JSX
- **Unused variables**: Remove immediately or prefix with `_`
- **React Hooks**: Include ALL dependencies in useEffect arrays
- **Import organization**: Clean up unused imports promptly

### 4. Documentation - REQUIRED
- **Document ALL new/modified code** with detailed reasoning
- **Explain architectural decisions** and trade-offs
- **Comment complex business logic** and algorithms
- **Update README/docs** when adding features

## 🏗️ Architecture Overview

This is a **multi-tenant SaaS application** with organization-based access control:

**Tech Stack:**
- **Next.js 14** App Router with React Server Components + Turbopack
- **TypeScript strict mode** with comprehensive type safety
- **Tailwind CSS** + shadcn/ui + Magic UI for modern design system
- **Prisma ORM** with PostgreSQL (comprehensive SaaS schema)
- **TanStack Query v5** for client-side state management
- **NextAuth.js** with Azure AD + Prisma adapter
- **Vitest + React Testing Library** for unit/component testing
- **Playwright** for end-to-end testing with 80% coverage threshold
- **Azure App Service** deployment with Application Insights
- **GitHub Actions** CI/CD with automated testing

## 📊 Database Schema Patterns

**SaaS Multi-Tenancy Model:**
```typescript
Organization → OrganizationMember → User
Organization → Subscription (FREE/PRO/ENTERPRISE)
Organization → Project → Task (example business logic)
```

**Key Models:**
- `User` - NextAuth.js compatible with role-based access
- `Organization` - Multi-tenant container with subscription
- `OrganizationMember` - RBAC (OWNER/ADMIN/MEMBER)
- `Subscription` - Billing integration ready (Stripe/Azure)
- `Project/Task` - Example SaaS feature models

## 🛠️ Development Patterns

### Critical Development Workflow
- **Start dev environment**: Use VS Code task "🚀 Full Stack Setup" (Ctrl+Shift+P → "Tasks: Run Task")
- **Database setup**: Docker Compose with PostgreSQL + pgbouncer + Redis on custom ports (5433, 6433, 6379)
- **Hot reloading**: Turbopack for instant feedback during development
- **Task automation**: All common operations available as VS Code tasks with emoji prefixes

### Docker Development Environment
**Use VS Code Tasks (Ctrl+Shift+P → "Tasks: Run Task"):**
- **🗄️ Database: Start Services** - Start all services (PostgreSQL, pgbouncer, Redis)
- **🧹 Clean & Restart** - Reset and restart clean environment
- **🔄 Database: Migrate** - Apply migrations
- **🔄 Database: Generate Client** - Generate Prisma client
- **🌱 Database: Seed** - Seed with sample data
- **🎛️ Database: Studio** - Open Prisma Studio (localhost:5555)

**Manual Commands (if needed):**
```bash
pnpm run docker:up     # Start services
pnpm run docker:down   # Stop services
pnpm run db:migrate    # Apply migrations
pnpm run db:generate   # Generate Prisma client
pnpm run db:seed       # Seed with sample data
pnpm run db:studio     # Open Prisma Studio
```

## 📁 File Organization

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (dashboard)/        # Route groups for layout
│   ├── api/               # API routes (auth, webhooks)
│   └── globals.css        # Tailwind base styles
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── providers/         # Context providers (theme, query)
│   └── [feature]/         # Feature-specific components
├── lib/
│   ├── auth.ts           # NextAuth.js configuration
│   ├── prisma.ts         # Database client
│   ├── utils.ts          # Utility functions
│   └── application-insights.ts
├── types/
│   └── next-auth.d.ts    # Type augmentation
├── __tests__/             # Comprehensive test suite
│   ├── setup.ts          # Global test configuration and mocks
│   ├── components/       # Component tests (UI, auth, magicui)
│   ├── lib/             # Utility function tests
│   └── api/             # API route tests and validation
prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Development data
tests/
└── e2e/                  # Playwright end-to-end tests
```

## 🎯 Code Standards

### TypeScript Best Practices
- **Strict mode enabled** - comprehensive type safety enforced
- **Zod validation** - runtime type checking for API boundaries
- **Type guards** - safe casting from unknown types
- **Satisfies operator** - improved type inference patterns

### React Patterns  
- **Server Components by default** - minimize client-side JavaScript
- **Server Actions** for mutations over API routes
- **Loading states** and error boundaries for all async operations
- **Optimistic updates** with TanStack Query mutations

### Styling Guidelines
- **Tailwind CSS utility-first** approach
- **shadcn/ui components** as base primitives
- **Magic UI** for advanced animations/effects and premium UI components
- **CSS variables** for theme customization
- **Dark mode support** via next-themes

### Magic UI Integration
- **Installation**: Use `pnpm dlx shadcn@latest add "https://magicui.design/r/[component].json"` to add components
- **Component Categories**:
  - **Special Effects**: Border Beam, Magic Card, Particles, Meteors, Shine Border
  - **Animations**: Animated Beam, Blur Fade, Animated Gradient Text
  - **Buttons**: Shimmer Button, Rainbow Button, Pulsating Button
  - **Text Effects**: Hyper Text, Text Reveal, Number Ticker, Typing Animation
  - **Backgrounds**: Animated Grid Pattern, Retro Grid, Dot Pattern
  - **Interactive**: Marquee, Orbiting Circles, Avatar Circles
- **Usage Patterns**: Enhance CTAs with ShimmerButton, add BorderBeam to highlight cards, use Particles for hero backgrounds
- **Performance**: Magic UI components are optimized for production and work with SSR

### Magic UI Implementation Best Practices
- **Import Path Fix**: Magic UI components install with `/lib/utils` imports - must be changed to `@/lib/utils` for proper TypeScript resolution
- **Component Props**: ShimmerButton doesn't accept `size` prop - use className for sizing instead
- **Layering**: Use `relative z-10` for content over Particles backgrounds
- **Glassmorphism**: Combine with `backdrop-blur-sm` and semi-transparent backgrounds for modern effects
- **Animation Timing**: Stagger BorderBeam delays (e.g., `delay={3}`, `delay={9}`) for visual hierarchy
- **Performance**: Particles with `quantity={100}` provides good balance of visual impact vs performance

## 🚨 Common Issues & Troubleshooting

### Magic UI Integration Issues
- **Import Path Errors**: Magic UI components use `/lib/utils` - always change to `@/lib/utils`
- **TypeScript Compilation**: Use Turbopack dev mode for faster iteration, production builds are stricter
- **Component Props**: Check Magic UI docs for correct props - some differ from standard shadcn/ui
- **Z-Index Layering**: Always use `relative z-10` for content over background effects
- **Performance**: Limit Particles quantity to ~100 for optimal performance

### Build & Deployment Issues
- **Type Checking**: Use VS Code task "🔍 Type Check" for cleaner error messages
- **Linting Errors**: Use "🔧 Lint & Fix" task to automatically fix issues
- **Unused Variables**: Remove unused imports promptly to avoid accumulating lint errors
- **Cache Issues**: Restart dev server if TypeScript resolution seems incorrect

### Authentication & Middleware
- **Database Sessions**: This app uses PrismaAdapter which creates database sessions, NOT JWT tokens
- **Middleware Compatibility**: `withAuth` middleware expects JWT tokens but receives `null` with database sessions
- **Session Callbacks**: Use `({ session, user })` parameters, not `({ token, session })` with database adapter
- **Protected Routes**: Always validate session existence before accessing user properties
- **Azure AD Integration**: Ensure proper callback URLs are configured in Azure portal
- **Multi-Provider Support**: Configured for both Azure AD and Google OAuth (see `src/lib/auth.ts`)

## 🔐 Security & Access Control

### Key Principles
- **Multi-tenant isolation** - Always scope queries by organizationId
- **Role-based access control** - Use OrganizationMember for permissions
- **Database sessions** - This app uses PrismaAdapter (NOT JWT tokens)

### Authentication Flow
1. **Azure AD SSO** via NextAuth.js
2. **Database session management** with Prisma adapter
3. **Organization assignment** on first login
4. **Role-based permissions** via OrganizationMember

### Multi-Tenant Query Patterns
```typescript
// ✅ ALWAYS scope by organization
const projects = await prisma.project.findMany({
  where: { organizationId: session.user.organizationId }
})

// ✅ Include organization context in session
async session({ session, user }) {
  const orgMember = await prisma.organizationMember.findFirst({
    where: { userId: user.id },
    include: { organization: true }
  })
  if (orgMember) {
    session.user.organizationId = orgMember.organizationId
    session.user.role = orgMember.role
  }
  return session
}

// ✅ Validate ownership + organization scope
const resource = await prisma.model.findFirst({
  where: { 
    id: params.id,
    organizationId: session.user.organizationId 
  }
})
```

*Detailed authentication patterns in `.github/instructions/api.instructions.md`*

## 🚀 Deployment & DevOps

### Azure Integration
- **App Service** with Node.js runtime
- **Managed Identity** for Key Vault secrets
- **Application Insights** for observability
- **PostgreSQL Flexible Server** for production data

### Environment Variables
```bash
# Required for all environments
NEXTAUTH_URL=
NEXTAUTH_SECRET=
AZURE_AD_CLIENT_ID=
AZURE_AD_CLIENT_SECRET=
DATABASE_URL=
APPLICATIONINSIGHTS_CONNECTION_STRING=
```

### VS Code Development
- **Tasks configured** for fast iteration and testing workflow
- **Launch configs** for debugging both app and tests
- **Extensions recommended** for optimal DX
- **Turbopack dev mode** for instant HMR
- **Integrated test UI** via VS Code tasks (🧪 Test UI, 🎭 E2E Tests UI)
- **Auto-start task**: Dev server starts automatically when VS Code opens workspace
- **Full stack setup**: Use "🚀 Full Stack Setup" task to initialize complete development environment

## 🧪 Testing Strategy

### Testing Infrastructure
- **Vitest** with V8 coverage provider for fast unit/integration tests
- **React Testing Library** for component testing with accessibility focus
- **Playwright** for cross-browser end-to-end testing
- **80% coverage threshold** enforced for branches, functions, lines, statements
- **Global mocks** for Next.js, NextAuth, and TanStack Query dependencies

### Test Categories & Structure
```
src/__tests__/
├── setup.ts                     # Global test configuration and mocks
├── vitest-setup.d.ts            # TypeScript definitions for custom matchers
├── components/
│   ├── ui/button.test.tsx       # shadcn/ui component tests
│   ├── auth/auth-status.test.tsx # Authentication component tests
│   └── magicui/shimmer-button.test.tsx # Magic UI component tests
├── lib/utils.test.ts            # Utility function tests
└── api/
    ├── auth.test.ts             # API authentication tests
    └── validation.test.ts       # Zod schema validation tests

tests/e2e/
└── basic.spec.ts                # Critical user flow tests
```

### Test Scripts & VS Code Integration
**Use VS Code Tasks (Ctrl+Shift+P → "Tasks: Run Task"):**
- **🧪 Run Tests** - Run tests in watch mode
- **🧪 Run Tests (Watch)** - Background watch mode for continuous testing
- **🧪 Test UI** - Interactive test UI
- **🧪 Test Coverage** - Coverage report generation
- **🎭 E2E Tests** - End-to-end tests
- **🎭 E2E Tests (UI)** - E2E tests with UI
- **🔬 Full Test Suite** - Run complete test validation (type-check, lint, unit, e2e)

**Manual Commands (if needed):**
```bash
pnpm test           # Run tests in watch mode
pnpm test:run       # Run tests once (CI mode)
pnpm test:ui        # Interactive test UI
pnpm test:coverage  # Coverage report generation
pnpm test:e2e       # End-to-end tests
pnpm test:e2e:ui    # E2E tests with UI
```

### Testing Patterns & Best Practices

#### Component Testing Pattern
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render with correct accessibility attributes', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })
})
```

#### API Testing with Mocks
```typescript
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { vi } from 'vitest'

vi.mock('next-auth')

describe('API Authentication', () => {
  it('should return 401 when not authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)
    // Test implementation with proper error handling
  })
})
```

#### E2E Testing Critical Flows
```typescript
import { test, expect } from '@playwright/test'

test('Authentication Flow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  // Test complete user journey
})
```

### Mock Strategy
- **next/navigation**: Router hooks (useRouter, usePathname, useSearchParams)
- **next-auth/react**: Authentication hooks (useSession, signIn, signOut)
- **next-themes**: Theme provider and hooks
- **@tanstack/react-query**: Query client and hooks
- **Prisma**: Database operations for API tests

### Coverage Requirements
- **80% minimum** for all metrics (branches, functions, lines, statements)
- **HTML reports** generated in `coverage/` directory
- **Excludes**: Test files, configuration files, build artifacts
- **Includes**: All source code in `src/` directory

### TDD Approach (MANDATORY)
1. **Write failing test first** - Always start with a failing test that defines expected behavior
2. **Implement minimal code** - Write only enough code to make the test pass
3. **Refactor with confidence** - Improve code structure while maintaining test coverage
4. **Validate thoroughly** - Use VS Code tasks: "🔍 Type Check", "🔧 Lint & Fix", and "🔬 Full Test Suite" before commits

### Testing Best Practices
- **Accessibility-first**: Test with screen readers and keyboard navigation in mind
- **User-centric**: Write tests from the user's perspective, not implementation details
- **Error boundaries**: Test error states and edge cases thoroughly
- **Form validation**: Comprehensive testing of Zod schemas and form interactions
- **Async operations**: Proper handling of loading states and race conditions
- **Mobile responsive**: Test responsive behavior and touch interactions

## 🎨 UI/UX Patterns

### Design System
- **shadcn/ui** component library with Radix primitives
- **Magic UI** for advanced interactions, animations, and premium visual effects
- **Consistent spacing** with Tailwind's design tokens
- **Accessible by default** with proper ARIA attributes

*Detailed component patterns in `.github/instructions/frontend.instructions.md`*

## 📈 Performance Optimization

### Next.js Optimizations
- **React Server Components** for reduced client bundles
- **Streaming** with Suspense boundaries
- **Image optimization** with next/image
- **Font optimization** with next/font

*Detailed database performance patterns in `.github/instructions/prisma.instructions.md`*

## 🔧 Development Workflow

1. **Create feature branch** from main
2. **Write tests first** (TDD approach)
3. **Implement feature** with TypeScript strict mode
4. **Run validation** using VS Code tasks: "🔍 Type Check", "🔧 Lint & Fix", "🧪 Run Tests"
5. **Create PR** with automated checks
6. **Deploy to staging** via GitHub Actions
7. **Production deployment** after review

### Magic UI Post-Installation Checklist
1. **Fix Import Paths**: Change all `/lib/utils` imports to `@/lib/utils` in Magic UI components
2. **Remove Unused Imports**: Clean up any unused component imports to pass linting
3. **Fix ESLint Issues**: Address unescaped entities (use `&apos;` for `'`, `&quot;` for `"`)
4. **Update Props**: Remove invalid props (e.g., `size` from ShimmerButton)
5. **Test Dev Server**: Ensure Turbopack compilation succeeds before production build

---

**Remember:** This is a production-ready SaaS template. Follow established patterns, maintain type safety, and prioritize user experience. When in doubt, check existing implementations for guidance.
