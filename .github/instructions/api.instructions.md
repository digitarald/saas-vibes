---
description: "API routes patterns for Next.js 14 App Router with multi-tenant SaaS"
applyTo: "src/app/api/**"
---

# API Routes Instructions

## Next.js 14 App Router API Patterns

### Authentication Requirements
- **Always validate session** before accessing protected resources
- **Check organization membership** for multi-tenant operations
- **Use proper HTTP status codes** (401 vs 403 vs 404)

### Database Session Configuration
```typescript
// ✅ CORRECT - Works with PrismaAdapter (database sessions)
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async session({ session, user }) {
      // user comes from database, not JWT token
      if (user && session.user) {
        session.user.id = user.id
        // Include organization context
        const orgMember = await prisma.organizationMember.findFirst({
          where: { userId: user.id },
          include: { organization: true }
        })
        if (orgMember) {
          session.user.organizationId = orgMember.organizationId
          session.user.role = orgMember.role
        }
      }
      return session
    }
  }
}
```

### Route Handler Patterns
```typescript
// Standard authenticated API route
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Organization-scoped query
  const data = await prisma.model.findMany({
    where: { organizationId: session.user.organizationId }
  })
  
  return NextResponse.json(data)
}

// With RBAC validation
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check ownership or admin role
  const resource = await prisma.model.findFirst({
    where: { 
      id: params.id,
      organizationId: session.user.organizationId 
    }
  })
  
  if (!resource) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (resource.createdBy !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.model.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
```

### Error Handling
- **Use proper HTTP status codes** - 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- **Return consistent error format** - `{ error: string, details?: any }`
- **Log errors** but don't expose internal details to client
- **Validate input** with Zod schemas

### Input Validation with Zod
```typescript
import { z } from 'zod'

const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreateProjectSchema.parse(body)
    // ... continue with validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    throw error
  }
}
```

### Common Issues
- **Database sessions vs JWT tokens** - PrismaAdapter creates database sessions, token callbacks not needed
- **Organization context** - Always include organizationId in queries for multi-tenancy
- **CORS headers** - Add if needed for external API consumption
- **Rate limiting** - Consider implementing for public endpoints
