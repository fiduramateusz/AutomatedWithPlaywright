import { test, expect } from '@playwright/test'

test.describe('Filter', () => {
  //Before hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
  })
  //Positive scenario
  test('Correct credentials', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    await page.goto('http://zero.webappsecurity.com/index.html')
  })
  //   test.afterAll(async ({ page })=> {
  //       await page.goto('http://zero.webappsecurity.com/index.html')
  //   })

  test('Verify the account', async ({ page }) => {
    await page.click('#account_activity_link')
    await page.selectOption('#aa_accountId', '2')
    const listOfTransaction = page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(listOfTransaction).toHaveCount(3)
  })
})
