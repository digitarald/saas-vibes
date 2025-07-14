---
description: "Database schema and Prisma ORM patterns for multi-tenant SaaS"
applyTo: "prisma/**"
---

# Prisma Database Instructions

## Multi-Tenant SaaS Schema Patterns

### Core Models Hierarchy
```typescript
Organization → OrganizationMember → User
Organization → Subscription (FREE/PRO/ENTERPRISE)
Organization → Project → Task (example business logic)
```

### Required Models
- `User` - NextAuth.js compatible with role-based access
- `Organization` - Multi-tenant container with subscription
- `OrganizationMember` - RBAC (OWNER/ADMIN/MEMBER)
- `Subscription` - Billing integration ready
- `Account`, `Session`, `VerificationToken` - NextAuth.js database adapter

### Schema Best Practices
- **Always include organizationId** for tenant isolation
- **Use composite indexes** for organization-scoped queries
- **Cascade deletions carefully** - preserve audit trails
- **Use enums** for subscription tiers and roles
- **Include timestamps** (createdAt, updatedAt) on all models

### Query Patterns
```typescript
// Organization-scoped queries (REQUIRED for multi-tenancy)
const projects = await prisma.project.findMany({
  where: { organizationId: session.user.organizationId },
  include: { tasks: true }
})

// Include organization member for RBAC
const user = await prisma.user.findUnique({
  where: { id },
  include: { organizations: true }
})
```

### Migration Safety
- **Never remove columns** without proper migration strategy
- **Use optional fields** for new columns with existing data
- **Test migrations** against production-like data volumes
- **Backup before schema changes** in production

### Performance Considerations
- **Index organization + frequently queried fields** together
- **Use select/include judiciously** to avoid N+1 queries
- **Consider connection pooling** for production workloads
- **Monitor slow queries** via Application Insights
