# SaaS Vibes - Modern TypeScript-First SaaS

A modern, production-ready SaaS application built with Next.js 14, TypeScript,
Prisma, and Azure Web Apps. This project demonstrates current best practices for
building scalable, secure, and maintainable SaaS applications.

## 🚀 Features

### Frontend & UI

- **Next.js 14** with App Router and React Server Components
- **TypeScript** with strict mode for type safety
- **Tailwind CSS** + **shadcn/ui** + **Magic UI** for beautiful, accessible
  components
- **TanStack Query v5** for powerful client-side state management
- **Framer Motion** for smooth animations
- **Dark mode** support with next-themes

### Backend & Data

- **Prisma ORM** with PostgreSQL for type-safe database operations
- **NextAuth.js** with Azure AD provider for authentication
- **Server Actions** and API routes for backend functionality
- **Zod** for runtime type validation
- **React Hook Form** for form handling

### Azure Integration

- **Azure App Service** for hosting
- **Azure Database for PostgreSQL Flexible Server** with built-in PgBouncer
- **Azure Key Vault** for secrets management
- **Azure Managed Identity** for secure access
- **Application Insights** for monitoring and observability

### Development Experience

- **Turbopack** for fast development builds
- **ESLint** + **TypeScript ESLint** for code quality
- **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **Prisma Studio** for database management

## 🏗️ Architecture

```
Frontend (Next.js 14)
├── React Server Components (data fetching)
├── Client Components (interactivity)
├── Server Actions (mutations)
└── TanStack Query (client state)

Backend (API Routes + Server Actions)
├── Prisma Client (database)
├── NextAuth.js (authentication)
└── Zod validation

Azure Services
├── App Service (hosting)
├── PostgreSQL Flexible Server (database)
├── Key Vault (secrets)
├── Application Insights (monitoring)
└── Managed Identity (security)
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker and Docker Compose
- Azure CLI (for deployment)

### Local Development Setup

1. **Clone and install dependencies:**

```bash
git clone <your-repo>
cd saas-vibes
pnpm install
```

2. **Start local services:**

```bash
pnpm run docker:up
```

3. **Set up environment variables:**

```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

4. **Set up the database:**

```bash
pnpm run db:generate
pnpm run db:migrate
```

5. **Start the development server:**

```bash
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── providers/         # Context providers
├── lib/                   # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript definitions

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations

.github/
├── workflows/             # GitHub Actions
└── copilot-instructions.md # Copilot configuration
```

## 🗄️ Database Schema

The application includes a comprehensive SaaS schema with:

- **User management** with roles and permissions
- **Organization/team** support with member roles
- **Subscription management** with different plan types
- **Project and task management** as example business logic
- **NextAuth.js tables** for authentication

See `prisma/schema.prisma` for the complete schema.

## 🔐 Authentication

Authentication is handled by NextAuth.js with Azure AD provider:

- **Single Sign-On (SSO)** with Microsoft 365/Azure AD
- **Secure session management** with Prisma adapter
- **Role-based access control** (RBAC)
- **Organization-level permissions**

## 🌐 Deployment

### Azure App Service

1. **Create Azure resources:**

```bash
# Create resource group
az group create --name rg-saas-vibes --location eastus

# Create App Service plan
az appservice plan create --name asp-saas-vibes --resource-group rg-saas-vibes --sku B1 --is-linux

# Create web app
az webapp create --name saas-vibes --resource-group rg-saas-vibes --plan asp-saas-vibes --runtime "NODE:20-lts"

# Create PostgreSQL server
az postgres flexible-server create --name psql-saas-vibes --resource-group rg-saas-vibes --sku-name Standard_B1ms --storage-size 32 --version 15
```

2. **Configure GitHub Actions secrets:**

- `AZURE_WEBAPP_NAME`: Your App Service name
- `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure portal
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`: Azure AD
  app registration

3. **Deploy:** Push to main branch to trigger the GitHub Actions workflow.

## 📊 Monitoring

Application Insights is integrated for comprehensive monitoring:

- **Real User Monitoring (RUM)** for frontend performance
- **Custom events** and **exception tracking**
- **Dependency tracking** for database and external services
- **Performance metrics** and **availability tests**

## 🧪 Testing

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Database operations
pnpm run db:studio    # Open Prisma Studio
pnpm run db:generate  # Generate Prisma client
pnpm run db:migrate   # Run migrations
```

## 🔧 Environment Variables

Key environment variables:

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/saas_vibes"

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
AZURE_AD_CLIENT_ID="your-client-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
AZURE_AD_TENANT_ID="your-tenant-id"

# Monitoring
APPLICATIONINSIGHTS_CONNECTION_STRING="your-connection-string"

# Azure (production)
AZURE_KEY_VAULT_URI="https://your-kv.vault.azure.net/"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Prisma](https://prisma.io) for the excellent ORM
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [TanStack Query](https://tanstack.com/query) for powerful data fetching
- [Azure](https://azure.microsoft.com) for reliable cloud infrastructure

---

Built with ❤️ using modern TypeScript and Azure services.
