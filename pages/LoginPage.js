import BasePage from './BasePage.js';
import locators from '../locators/LoginPageLocators.js';
import config from '../utils/config.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = locators;
  }

  async open() {
    await this.goto('/');
  }

  async openPracticeLoginPage() {
    await this.page.goto(config.loginPracticeUrl);
  }

  async openGettingStarted() {
    await this.page.getByRole(this.locators.getStartedLink.role, {
      name: this.locators.getStartedLink.name,
    }).click();
  }

  async login(username, password) {
    await this.enterText(this.locators.usernameTextbox, username);
    await this.enterText(this.locators.passwordTextbox, password);
    await this.click(this.locators.loginButton);
  }

  async loginToPracticePage(username, password) {
    await this.enterText(this.locators.practiceUsernameTextbox, username);
    await this.enterText(this.locators.practicePasswordTextbox, password);
    await this.click(this.locators.practiceSignInButton);
  }

  async getPracticeLoginErrorMessage() {
    return this.getText(this.locators.practiceErrorMessage);
  }

  async getFirstProductTitle() {
    return this.locator(this.locators.productTitles).first().textContent();
  }

  async getSecondProductTitle() {
    return this.locator(this.locators.productTitles).nth(1).textContent();
  }

  async getAllProductTitles() {
    return this.locator(this.locators.productTitles).allTextContents();
  }
}

export default LoginPage;
