import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { MainNavbar } from '../../page-objects/components/MainNavbar'
import { OnlineBanking } from '../../page-objects/OnlineBankingPage'

test.describe('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let mainNavbar: MainNavbar
  let onlineBanking: OnlineBanking

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    mainNavbar = new MainNavbar(page)
    onlineBanking = new OnlineBanking(page)

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
  })

  test('Should send new payment', async ({ page }) => {
    await mainNavbar.clickOnTab('Online Banking')
    await onlineBanking.clickOnTab('Pay Bills')
    await mainNavbar.clickOnTab('Online Banking')
    await onlineBanking.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
