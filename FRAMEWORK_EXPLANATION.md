# Playwright JavaScript Framework Explanation

This framework is intentionally simple and beginner friendly. It uses modern JavaScript with `import/export`, Playwright Test, Page Object Model, and a small API utility for only two API actions:

- Login
- Create cart

## Java To Playwright Mapping

| Java/TestNG Concept | Playwright JavaScript Concept |
| --- | --- |
| `pom.xml` | `package.json` |
| Maven dependencies | npm dependencies |
| TestNG XML | `playwright.config.js` |
| `@Test` | `test()` |
| TestNG groups | tags like `@smoke`, `@api`, `@integration` |
| `@BeforeClass` | `test.beforeAll()` |
| Base page class | `pages/BasePage.js` |
| Page Object classes | files inside `pages/` |
| Object repository | files inside `locators/` |
| Test data files | files inside `test-data/` |

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
├── playwright.config.js
├── package.json
└── .env
```

## `package.json`

`package.json` is similar to `pom.xml` in Java.

It stores:

- Project dependencies
- Test scripts
- JavaScript module type

This project uses modern ES Modules:

```json
"type": "module"
```

So files use:

```js
import EcomApiUtils from '../../api/EcomApiUtils.js';
export default EcomApiUtils;
```

## `playwright.config.js`

This is the main Playwright configuration file.

It controls:

- Test folder
- Browser project
- Retry count
- Workers
- Screenshots
- Videos
- Traces
- Reports

Interview explanation:

> `playwright.config.js` is the central framework configuration file. It is similar to TestNG XML plus framework-level settings in Java.

## `.env` And `utils/config.js`

`.env` stores environment values:

```text
ECOM_USER_ID=your-user-id
ECOM_USER_EMAIL=your-email@example.com
ECOM_USER_PASSWORD=your-password
```

`utils/config.js` reads these values and also stores constant URLs such as the Rahul Shetty Academy login page and API base URL.

Interview explanation:

> `.env` stores sensitive or user-specific values like email and password. Constant URLs can stay in `config.js` so they are centralized but not unnecessarily treated as environment variables.

## `api/EcomApiUtils.js`

This file contains only the API functionality we need:

- `getToken()`
- `createCart(cartPayload)`

The token is cached inside the class:

```js
if (this.token) {
  return this.token;
}
```

So once login is done, the same token can be reused for cart tests.

Interview explanation:

> I created a simple API utility class for reusable API actions. It logs in once, stores the token, and reuses that token for create-cart calls. This avoids repeated login calls in every test.

## `test.beforeAll()`

In [tests/createCart.spec.js](/Users/sitesh/Desktop/Paywright/DemoPlaywrightFramework/tests/createCart.spec.js), login happens once before the tests:

```js
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  apiUtils = new EcomApiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
});
```

Then the test reuses the same `apiUtils` object:

```js
const response = await apiUtils.createCart(createCartPayload);
```

Interview explanation:

> I use `beforeAll` when setup is common for all tests in the file. For create-cart scenarios, login happens once and all cart tests reuse the token.

## `test-data/ecomTestData.js`

This file stores API payloads:

- `loginPayload`
- `createCartPayload`

Interview explanation:

> Test data is kept separately from test logic. This makes the test readable and makes payload maintenance easier.

## `pages/` And `locators/`

`pages/` contains page actions.

`locators/` contains selectors.

Example:

```js
import locators from '../locators/LoginPageLocators.js';
```

Interview explanation:

> I keep locators separate from page actions. If a selector changes, I update the locator file. The page class still contains actions like open page, click, login, or get text.

## `fixtures/baseFixture.js`

Fixtures provide reusable objects for UI tests:

- `loginPage`

Interview explanation:

> Fixtures are similar to reusable setup in Java. They help inject page objects into tests so we do not create them manually in every test.

## Test Files

Current tests:

- [tests/loginApi.spec.js](/Users/sitesh/Desktop/Paywright/DemoPlaywrightFramework/tests/loginApi.spec.js)
- [tests/createCart.spec.js](/Users/sitesh/Desktop/Paywright/DemoPlaywrightFramework/tests/createCart.spec.js)
- [tests/loginUi.spec.js](/Users/sitesh/Desktop/Paywright/DemoPlaywrightFramework/tests/loginUi.spec.js)

The tests use simple syntax:

```js
test('@api login and get token', async () => {
  // test steps
});
```

## How To Explain In Interview

You can say:

> I created a Playwright JavaScript automation framework using modern ES Modules. The framework follows Page Object Model for UI tests, keeps locators in a separate object repository, stores test data separately, and uses dotenv for environment configuration. For API integration, I kept the design simple with one API utility class that performs login and create-cart operations. In cart tests, I use `beforeAll` to login once, cache the token, and reuse it for multiple create-cart scenarios.

## Useful Commands

```bash
npm test
npm run test:ui
npm run test:api
npm run test:integration
npm run test:smoke
npm run report
```
