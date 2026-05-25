import BasePage from './BasePage.js';
import locators from '../locators/ClientLoginPageLocators.js';
import config from '../utils/config.js';

class ClientLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async open() {
    await this.goto('/');
  }

  async openClientLoginPage() {
    await this.page.goto(config.ecomClientUrl);
  }


  async clientPagelogin(username, password) {
      await this.page
        .locator(this.locators.clientUsernameTextbox)
        .fill(username);

      await this.page
        .locator(this.locators.clientPasswordTextbox)
        .fill(password);

      await this.page
        .locator(this.locators.clientlogInButton)
        .click();

      await this.page.waitForLoadState('networkidle');
  }

}

export default ClientLoginPage;
