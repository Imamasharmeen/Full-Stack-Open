// ✅ tests/blog_app.spec.js (updated for 5.18)
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  // 🧩 Reset DB and create user before each test
  beforeEach(async ({ page, request }) => {
    // 🧠 Reset backend database
    await request.post('http://localhost:5173/api/testing/reset')

    // 🧠 Create test user
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    // 🧠 Open frontend after setup
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ✅ Check login form renders correctly
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // ✅ Perform successful login
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      // ✅ Expect logged-in message visible
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ❌ Try invalid login
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      // ✅ Expect error message visible
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')

      // ✅ Expect user not logged in
      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible()
    })
  })
})
