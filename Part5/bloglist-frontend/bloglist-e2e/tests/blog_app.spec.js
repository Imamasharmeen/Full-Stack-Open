// ✅ tests/blog_app.spec.js
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  // 🧩 Runs before every test — navigates to frontend
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173') // open frontend
  })

  test('Login form is shown', async ({ page }) => {
    // 🧠 Expect "Log in to application" heading visible
    await expect(page.getByText('Log in to application')).toBeVisible()

    // 🧠 Expect username and password input fields visible
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()

    // 🧠 Expect login button visible
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})
