import { test as baseTest, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { test, expect };



// This code is creating a custom Playwright fixture.

// It extends Playwright’s default test object and injects a reusable loginPage object into your tests.

//Playwright starts test->Creates browser page-> Creates LoginPage object
// ->Passes it into test->Executes test->Destroys fixture