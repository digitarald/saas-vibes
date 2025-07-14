# Testing Setup

This project includes comprehensive testing setup with unit tests, component tests, and end-to-end tests.

## Testing Stack

- **Unit & Component Tests**: [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End Tests**: [Playwright](https://playwright.dev/)
- **Test Coverage**: Built-in with Vitest using V8 provider

## Available Scripts

```bash
# Run all unit and component tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test:ui

# Run tests once (CI mode)
pnpm test:run

# Run tests with coverage report
pnpm test:coverage

# Run end-to-end tests
pnpm test:e2e

# Run e2e tests with UI
pnpm test:e2e:ui
```

## Test Structure

```
src/
├── __tests__/
│   ├── setup.ts              # Test setup and global mocks
│   ├── vitest-setup.d.ts     # TypeScript declarations for matchers
│   ├── components/           # Component tests
│   │   ├── ui/              # UI component tests
│   │   ├── auth/            # Authentication component tests
│   │   └── magicui/         # Magic UI component tests
│   ├── lib/                 # Utility function tests
│   ├── api/                 # API route tests
│   └── e2e/                 # End-to-end tests
│       └── *.spec.ts
```

## Testing Patterns

### Unit Tests
For utility functions and pure logic:

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge classes correctly', () => {
    expect(cn('text-blue-500', 'text-red-500')).toBe('text-red-500')
  })
})
```

### Component Tests
For React components with React Testing Library:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

### API Route Tests
For testing Next.js API routes:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

describe('API Routes', () => {
  it('should return 401 when not authenticated', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null)
    // Test implementation
  })
})
```

### End-to-End Tests
For testing complete user workflows:

```typescript
import { test, expect } from '@playwright/test'

test('should navigate to dashboard', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Dashboard')
  await expect(page).toHaveURL('/dashboard')
})
```

## Mocking Strategy

### Global Mocks
Common dependencies are mocked globally in `setup.ts`:
- `next/navigation` - Router hooks
- `next-auth/react` - Authentication hooks
- `next-themes` - Theme provider
- `@tanstack/react-query` - Query hooks

### Per-Test Mocking
Use `vi.mock()` for specific test needs:

```typescript
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
    },
  },
}))
```

## Coverage Configuration

Coverage thresholds are set to 80% for:
- Branches
- Functions
- Lines
- Statements

Excluded from coverage:
- Test files
- Configuration files
- Layout components (hard to test meaningfully)
- Middleware (requires special setup)

## Best Practices

### Testing Component Props
Always test different prop combinations:

```typescript
it('should render different variants', () => {
  const { rerender } = render(<Button variant="destructive">Delete</Button>)
  expect(screen.getByRole('button')).toHaveClass('bg-destructive')

  rerender(<Button variant="outline">Outline</Button>)
  expect(screen.getByRole('button')).toHaveClass('border')
})
```

### Testing User Interactions
Use `fireEvent` or `userEvent` for user interactions:

```typescript
import { fireEvent } from '@testing-library/react'

it('should handle click events', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledOnce()
})
```

### Testing Async Components
For components with async behavior:

```typescript
import { waitFor } from '@testing-library/react'

it('should load data', async () => {
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Loaded data')).toBeInTheDocument()
  })
})
```

### Testing Forms
For form components:

```typescript
import userEvent from '@testing-library/user-event'

it('should submit form data', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  
  render(<Form onSubmit={onSubmit} />)
  
  await user.type(screen.getByLabelText(/name/i), 'John Doe')
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe' })
})
```

## Debugging Tests

### VS Code Integration
Tests can be run and debugged directly in VS Code with the Vitest extension.

### Test UI
Use `pnpm test:ui` to open the interactive test UI for better debugging experience.

### Coverage Reports
Coverage reports are generated in `coverage/` directory and can be viewed in the browser.

## CI/CD Integration

Tests are configured to run in CI environments with:
- Proper retry strategies for e2e tests
- Headless browser execution
- Coverage reporting
- Parallel execution when possible

## Performance Testing

Consider adding performance tests for:
- Component rendering performance
- API response times
- Bundle size analysis
- Lighthouse scores

## Accessibility Testing

E2E tests include basic accessibility checks:
- Proper heading structure
- Alt text for images
- Keyboard navigation
- Screen reader compatibility
