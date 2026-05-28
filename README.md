# Playwright JavaScript Automation Framework

This is a beginner-friendly Playwright framework using JavaScript.

It contains examples for:

- UI testing
- API login
- Create cart using API token
- Page Object Model
- Separate locator files
- Environment configuration using `.env`

The project uses modern JavaScript `import/export` syntax.

## Project Structure

```text
DemoPlaywrightFramework/
├── api/
│   └── EcomApiUtils.js
├── fixtures/
│   └── baseFixture.js
├── locators/
│   └── LoginPageLocators.js
├── pages/
│   ├── BasePage.js
│   └── LoginPage.js
├── test-data/
│   └── ecomTestData.js
├── tests/
│   ├── createCart.spec.js
│   ├── loginApi.spec.js
│   └── loginUi.spec.js
├── utils/
│   └── config.js
├── .env
├── .env.example
├── package.json
└── playwright.config.js
```

## Folder Explanation

### `tests/`

This folder contains all test files.

Current tests:

- `loginUi.spec.js` - UI login test
- `loginApi.spec.js` - API login test
- `createCart.spec.js` - creates cart using token from login API

All tests are kept in one folder to make the framework easy to understand.

### `api/`

This folder contains API reusable code.

Current file:

- `EcomApiUtils.js`

It has two methods:

```js
getToken()
createCart(cartPayload)
```

`getToken()` performs login and stores the token.

`createCart()` uses the token and creates cart through API.

### `test-data/`

This folder contains test payloads.

Current file:

- `ecomTestData.js`

It stores:

- login payload
- create cart payload

Keeping test data separate makes tests easier to read.

### `pages/`

This folder contains Page Object classes.

Page objects contain page actions. For example:

- open page
- click button
- enter text
- get text

### `locators/`

This folder contains page locators.

Locators are kept separately so that if a selector changes, we update only one locator file.

### `utils/`

This folder contains common utility files.

Current file:

- `config.js`

It reads values from `.env`.

### `fixtures/`

This folder contains Playwright fixtures.

Fixtures help create reusable objects for tests, similar to common setup in Java/TestNG frameworks.

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create local environment file:

```bash
cp .env.example .env
```

Update `.env` with your values:

```text
ECOM_USER_ID=your-user-id
ECOM_USER_EMAIL=your-email@example.com
ECOM_USER_PASSWORD=your-password
HEADLESS=true
WORKERS=4
RETRIES=1
```

Fixed application URLs are kept in `utils/config.js` because they are constants for this demo framework.

## Run Tests

Run all tests:

```bash
npm test
```

Run only UI tests:

```bash
npm run test:ui
```

Run only API tests:

```bash
npm run test:api
```

Run only integration tests:

```bash
npm run test:integration
```

Run smoke tests:

```bash
npm run test:smoke
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

## Reports

Open Playwright HTML report:

```bash
npm run report
```

Generate Allure report:

```bash
npm run allure:generate
```

Open Allure report:

```bash
npm run allure:open
```

## How API Token Reuse Works

In `tests/createCart.spec.js`, login happens once in `beforeAll`.

```js
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  apiUtils = new EcomApiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
});
```

Then the token is reused in the test:

```js
const response = await apiUtils.createCart(createCartPayload);
```

This avoids logging in again and again for every cart test.

## Java/TestNG Comparison

If you know Java Selenium and TestNG, this mapping will help:

| Java/TestNG | Playwright JavaScript |
| --- | --- |
| `pom.xml` | `package.json` |
| Maven dependencies | npm dependencies |
| TestNG XML | `playwright.config.js` |
| `@Test` | `test()` |
| `@BeforeClass` | `test.beforeAll()` |
| TestNG groups | tags like `@ui`, `@api`, `@smoke` |
| Page Object class | files inside `pages/` |
| Object repository | files inside `locators/` |
| Config properties | `.env` and `utils/config.js` |


## Important Notes

- Do not commit real passwords.
- Keep `.env` local.
- Use `.env.example` as a template.
- Avoid hard waits.
- Prefer Playwright locators and auto-waiting.
- Do not use `test.only` in committed code.
