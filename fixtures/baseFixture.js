import { test as baseTest, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { test, expect };
