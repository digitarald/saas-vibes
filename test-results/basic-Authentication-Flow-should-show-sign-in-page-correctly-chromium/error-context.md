# Page snapshot

```yaml
- img
- heading "Welcome back" [level=1]
- paragraph: Choose your preferred sign-in method
- button "Sign in with Microsoft":
  - img
  - text: Sign in with Microsoft
- button "Sign in with Google":
  - img
  - text: Sign in with Google
- text: Multiple Authentication Options
- img
- heading "Secure Authentication" [level=3]
- paragraph: Choose your preferred sign-in method. Both Microsoft Azure AD and Google use enterprise-grade security with OAuth 2.0 protection.
- paragraph:
  - text: By signing in, you agree to our
  - link "Terms of Service":
    - /url: "#"
  - text: and
  - link "Privacy Policy":
    - /url: "#"
- paragraph:
  - text: Don't have an account?
  - link "Contact your administrator":
    - /url: /auth/signup
- button "Open Tanstack query devtools":
  - img
- alert
- button "Open Next.js Dev Tools":
  - img
```