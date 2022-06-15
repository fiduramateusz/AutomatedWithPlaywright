import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test.skip('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test.skip('Clicking on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')
  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

// test('Selectors', async ({page})=>{
//     //text
//     await page.click('text=some text')
//     //css Selectors
//     await page.click('button')
//     await page.click('#id')
//     await page.click('.class')
//     // only visible css selector
//     await page.click('.submit-button:visible')
//     //combinations
//     await page.click('#username .first')

//     //xpath
//     await page.click('//button')

// })

test.describe('My first tests suite', () => {
  test('Working with wrong inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'wrong login')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Working with inputs @myTag', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
  test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.example.com')
    })

    test('Screentshots', async ({ page }) => {
      await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })
    test('Single element Screenshot', async ({ page }) => {
      const element = await page.$('h1')
      await element.screenshot({ path: 'single_element_screenshot.png' })
    })
  })
})

test('Custom Helpers', async ({ page }) => {
  await loadHomepage(page)
  await assertTitle(page)
})
