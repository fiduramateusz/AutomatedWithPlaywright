import { Locator, Page } from '@playwright/test'

export class PayBillsNavbar {
  readonly page: Page
  readonly payeeTab: Locator
  readonly addNewPayee: Locator
  readonly currencyTab: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeTab = page.locator('#tabs > ul > li:nth-child(1) > a')
    this.addNewPayee = page.locator('#tabs > ul > li:nth-child(2) > a')
    this.currencyTab = page.locator('#tabs > ul > li:nth-child(3) > a')
  }

  async clickOnTab(tabName) {
    switch (tabName) {
      case 'Pay Saved Payee':
        await this.payeeTab.click()
        break
      case 'Add New Payee':
        await this.addNewPayee.click()
        break
      case 'Purchase Foreign Currency':
        await this.currencyTab.click()
        break
      default:
        throw new Error('This tab does not exist..')
    }
  }
  async chooseCurrency() {
    this.currencyTab.click()
  }
}
