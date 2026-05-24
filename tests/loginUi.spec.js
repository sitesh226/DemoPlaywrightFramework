import { test, expect } from '../fixtures/baseFixture.js';

test('@ui validate login error and product titles', async ({ page, loginPage }) => {
  await loginPage.openPracticeLoginPage();
  console.log(await page.title());

  await loginPage.loginToPracticePage('Sitesh', 'password');

  const actualErrorMessage = await loginPage.getPracticeLoginErrorMessage();
  console.log(actualErrorMessage);
  expect(actualErrorMessage).toContain('Incorrect username/password');

  await loginPage.loginToPracticePage('rahulshettyacademy', 'Learning@830$3mK2');

  console.log(await loginPage.getFirstProductTitle());
  console.log(await loginPage.getSecondProductTitle());

  const allTitles = await loginPage.getAllProductTitles();
  console.log(allTitles);

  expect(allTitles.length).toBeGreaterThan(0);
});
