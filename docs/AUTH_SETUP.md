# Authentication Setup

This project uses NextAuth.js with multiple OAuth providers for authentication. Follow these steps to set up authentication:

## 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in the following variables:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Azure AD Configuration
AZURE_AD_CLIENT_ID="your-azure-ad-client-id"
AZURE_AD_CLIENT_SECRET="your-azure-ad-client-secret"
AZURE_AD_TENANT_ID="your-azure-ad-tenant-id"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 2. OAuth Provider Setup

### Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: Your app name (e.g., "SaaS Vibes")
   - **Supported account types**: Choose based on your needs
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/azure-ad`
5. After registration, copy the **Application (client) ID** and **Directory (tenant) ID**
6. Go to **Certificates & secrets** → **Client secrets** → **New client secret**
7. Copy the secret value immediately (it won't be shown again)

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Configure the OAuth consent screen:
   - Choose **External** for most use cases
   - Fill in the required fields (App name, User support email, Developer contact)
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if the app is in testing mode
5. Click **Create Credentials** → **OAuth client ID**
6. Select **Web application** as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the **Client ID** and **Client Secret**

**Note**: If your app is in testing mode, only test users can sign in. Publish your app to production or add specific users as test users.

## 3. Authentication Flow

### Sign In Page
- **URL**: `http://localhost:3000/auth/signin`
- Features:
  - Azure AD OAuth integration
  - Google OAuth integration
  - Error handling
  - Modern, responsive UI
  - Security notices
  - Multiple authentication options

### Protected Routes
The following routes are protected and require authentication:
- `/dashboard` - Main dashboard
- `/profile` - User profile
- `/settings` - User settings
- `/admin` - Admin panel

### Public Routes
- `/` - Home page with auth status
- `/auth/signin` - Sign in page
- `/api/auth/*` - NextAuth.js API routes

## 4. Development Testing

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit `http://localhost:3000` to see the auth status

3. Click "Sign In" to test the Azure AD flow

4. Visit `http://localhost:3000/dashboard` to test protected routes

## 5. Features

- **Multiple OAuth Providers**: Azure AD and Google OAuth
- **Enterprise SSO**: Azure AD for enterprise authentication
- **Consumer OAuth**: Google for personal/consumer accounts
- **Session Management**: Secure session handling with Prisma adapter
- **Route Protection**: Middleware-based route protection
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Mobile-friendly auth components
- **Type Safety**: Full TypeScript support

## 6. Database Integration

The authentication system integrates with the Prisma schema:
- **User** model stores user information
- **Account** model handles OAuth accounts
- **Session** model manages user sessions
- **Organization** model for multi-tenant support

## 7. Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Make sure all dependencies are installed
2. **Authentication redirect loops**: Check NEXTAUTH_URL matches your domain
3. **Azure AD errors**: Verify client ID, secret, and tenant ID are correct
4. **Google OAuth errors**: Verify client ID and secret are correct, check authorized redirect URIs
5. **Database errors**: Ensure PostgreSQL is running and migrations are applied
6. **Provider-specific issues**:
   - **Azure AD**: Check tenant restrictions and app permissions
   - **Google**: Verify OAuth consent screen is configured and app is not in testing mode with restrictions

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```bash
NEXTAUTH_DEBUG=true
```

This will provide detailed logs of the authentication process.
