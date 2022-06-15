import { Locator, Page } from '@playwright/test'

export class MainNavbar {
  readonly page: Page
  readonly homeNavPage: Locator
  readonly onlineBanking: Locator
  readonly feedBack: Locator

  constructor(page: Page) {
    this.page = page
    this.homeNavPage = page.locator('#homeMenu')
    this.onlineBanking = page.locator('#onlineBankingMenu')
    this.feedBack = page.locator('#feedback')
  }

  async clickOnTab(tabName) {
    switch (tabName) {
      case 'Home':
        await this.homeNavPage.click()
        break
      case 'Online Banking':
        await this.onlineBanking.click()
        break
      case 'Feedback':
        await this.feedBack.click()
        break
      default:
        throw new Error('This tab does not exist..')
    }
  }
}
