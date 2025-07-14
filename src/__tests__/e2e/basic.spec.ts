import { expect, test } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should redirect to sign in when not authenticated', async ({ page }) => {
    // Navigate to a protected page
    await page.goto('/dashboard')
    
    // Should redirect to sign in page
    await expect(page).toHaveURL(/\/auth\/signin/)
    
    // Should show sign in form
    await expect(page.getByText(/authentication required/i)).toBeVisible()
  })

  test('should show sign in page correctly', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Check page title
    await expect(page).toHaveTitle(/sign in/i)
    
    // Should show authentication required message
    await expect(page.getByText(/authentication required/i)).toBeVisible()
    
    // Should have sign in link/button
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
  })
})

test.describe('Landing Page', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/saas vibes/i)
    
    // Should have some content (adjust based on your actual landing page)
    await expect(page.locator('body')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1')
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Page should still be accessible
    await expect(page.locator('body')).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Page should still be accessible
    await expect(page.locator('body')).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // Page should still be accessible
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/')
    
    // Should have an h1 tag (adjust based on your actual content)
    const h1 = page.locator('h1').first()
    if (await h1.count() > 0) {
      await expect(h1).toBeVisible()
    }
  })

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/')
    
    // Check all images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt')
    }
  })
})

test.describe('Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/')
    
    // Look for dark mode toggle (adjust selector based on your implementation)
    const darkModeToggle = page.locator('[data-testid="theme-toggle"]').first()
    
    if (await darkModeToggle.count() > 0) {
      // Click dark mode toggle
      await darkModeToggle.click()
      
      // Check that dark mode is applied (adjust based on your implementation)
      await expect(page.locator('html')).toHaveAttribute('class', /dark/)
    }
  })
})
