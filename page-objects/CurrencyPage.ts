import { expect, Locator, Page } from '@playwright/test'

export class CurrencyPage {
  readonly page: Page
  readonly currency: Locator
  readonly amount: Locator
  readonly isDolar: Locator
  readonly calculateCosts: Locator
  readonly conversion: Locator
  readonly purchase: Locator
  readonly alert: Locator
  readonly rate: Locator

  constructor(page: Page) {
    this.page = page
    this.currency = page.locator('#pc_currency')
    this.amount = page.locator('#pc_amount')
    this.isDolar = page.locator('#pc_inDollars_true')
    this.calculateCosts = page.locator('#pc_calculate_costs')
    this.conversion = page.locator('#pc_conversion_amount')
    this.purchase = page.locator('#purchase_cash')
    this.alert = page.locator('#alert_content')
    this.rate = page.locator('#sp_sell_rate')
  }

  async makeExchange() {
    await this.currency.selectOption('EUR')
    const rate = this.rate
    await expect(rate).toContainText('1 euro (EUR)')
    await this.amount.type('1000')
    await this.isDolar.click()
    await this.calculateCosts.click()
    const conversionAmount = this.conversion
    await expect(conversionAmount).toContainText('1000.00 U.S. dollar (USD)')
    await this.purchase.click()
  }

  async assertSuccessMessage() {
    await expect(this.alert).toBeVisible()
    await expect(this.alert).toContainText(
      'Foreign currency cash was successfully purchased'
    )
  }
}
