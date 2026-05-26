import { test, expect } from '../fixtures/baseFixture.js';

test('@ui Screenshot demo', async ({ page, loginPage }) => {
  await loginPage.openPracticeLoginPage();
  console.log(await page.title());

  const timestamp=new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotFile = `screenshot-${timestamp}.png`;
  await page.screenshot({
    path: `test-results/screenshots/${screenshotFile}`
  });

  // For particular locator :
  // page.locator('#displaye-text').screenshot({path: 'screenshot.png'});

});


test('@ui Visual testing demo', async ({ page, loginPage }) => {
  await loginPage.openPracticeLoginPage();
  console.log(await page.title());

  expect(await page.screenshot()).toMatchSnapshot('login_page.png');

});




// Notes :
// Playwright visual testing works by storing baseline screenshots and comparing them automatically on future runs.

// Key points:

// toHaveScreenshot() and toMatchSnapshot() only work with Playwright-managed snapshot folders.
// They do not support arbitrary filesystem paths for expected images.
// First run creates baseline snapshots using:
// npx playwright test --update-snapshots
// Baselines are stored automatically like:
// tests/
//    login.spec.js-snapshots/
//       login_page-chromium-darwin.png
// On future runs, Playwright:
// captures a new screenshot
// compares with baseline
// generates diff images if mismatch occurs

// Recommended usage:

// await expect(page).toHaveScreenshot('login_page.png');

// You can still store manual screenshots anywhere:

// await page.screenshot({
//    path: 'visualdebug/login_page.png'
// });

// But Playwright visual assertions only compare against Playwright-managed snapshots.