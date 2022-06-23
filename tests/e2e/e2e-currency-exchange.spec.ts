import { test, expect } from '@playwright/test'
import { MainNavbar } from '../../page-objects/components/MainNavbar'
import { PayBillsNavbar } from '../../page-objects/components/PayBillsNavbar'
import { CurrencyPage } from '../../page-objects/CurrencyPage'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { OnlineBanking } from '../../page-objects/OnlineBankingPage'

test.describe('Currency Exchange Form', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let payBillsNavbar: PayBillsNavbar
  let onlineBanking: OnlineBanking
  let mainNavbar: MainNavbar
  let currencyPage: CurrencyPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    mainNavbar = new MainNavbar(page)
    onlineBanking = new OnlineBanking(page)
    payBillsNavbar = new PayBillsNavbar(page)
    currencyPage = new CurrencyPage(page)

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
  })

  test('Should make currency exchange', async ({ page }) => {
    await mainNavbar.clickOnTab('Online Banking')
    await onlineBanking.clickOnTab('Pay Bills')
    await mainNavbar.clickOnTab('Online Banking')
    await onlineBanking.clickOnTab('Pay Bills')
    await payBillsNavbar.clickOnTab('Purchase Foreign Currency')

    await currencyPage.makeExchange()
    await currencyPage.assertSuccessMessage()
  })
})
