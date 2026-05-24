import { expect } from '@playwright/test';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  locator(selector) {
    return this.page.locator(selector);
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async click(selector) {
    await this.locator(selector).click();
  }

  async enterText(selector, text) {
    await this.locator(selector).fill(text);
  }

  async getText(selector) {
    return this.locator(selector).textContent();
  }

  async waitForVisible(selector) {
    await expect(this.locator(selector)).toBeVisible();
  }
}

export default BasePage;
