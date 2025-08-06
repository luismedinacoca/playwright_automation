# Playwright Automation Framework

This repository hosts a robust and scalable Playwright automation framework designed for end-to-end (E2E) and API testing. It leverages modern testing practices, including the Page Object Model (POM), TypeScript, and Cucumber integration for Behavior-Driven Development (BDD). The framework is built to ensure maintainability, scalability, and seamless integration into software development lifecycles (SDLC).

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Why This Framework Matters](#why-this-framework-matters)
4. [Skills Demonstrated](#skills-demonstrated)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Installation](#installation)
8. [Running Tests](#running-tests)
9. [Page Object Model (POM)](#page-object-model-pom)
10. [Cucumber Integration](#cucumber-integration)
11. [Test Reporting](#test-reporting)
12. [Debugging and Tracing](#debugging-and-tracing)
13. [Parallel and Serial Execution](#parallel-and-serial-execution)
14. [API Testing](#api-testing)
15. [Session Storage Management](#session-storage-management)
16. [Test Tagging and Filtering](#test-tagging-and-filtering)
17. [Future Enhancements](#future-enhancements)
18. [Contributing](#contributing)
19. [License](#license)

## Project Overview
This Playwright automation framework is designed to demonstrate best practices in E2E and API testing. It uses Playwright for browser automation, TypeScript for type safety, and Cucumber for BDD-style test case creation. The framework supports cross-browser testing, parallel execution, and comprehensive reporting, making it suitable for professional testing environments.

Repository: [luismedinacoca/playwright_automation](https://github.com/luismedinacoca/playwright_automation)

## Key Features
- **End-to-End Testing**: Automates complete user flows to validate application functionality.
- **Page Object Model (POM)**: Organizes page interactions for reusability and maintainability.
- **API Testing**: Validates backend endpoints alongside UI tests.
- **Assertions and Validations**: Ensures UI and API responses meet expectations.
- **Locators**: Uses robust selectors (CSS, XPath, getByRole) for reliable element targeting.
- **Test Reporting**: Generates HTML and Allure reports for actionable insights.
- **Test Data Management**: Handles dynamic and static test data.
- **Parallel Execution**: Runs tests concurrently for faster feedback.
- **Cross-Browser Testing**: Supports Chromium, Firefox, Webkit, and Microsoft Edge.
- **Cucumber Integration**: Enables BDD-style test scenarios with Gherkin syntax.
- **Advanced Playwright Features**: Includes network mocking, tracing, and session storage management.

## Why This Framework Matters
- **Quality Assurance**: Catches regressions early to improve product quality.
- **Faster Releases**: Accelerates feedback cycles for rapid delivery.
- **Documentation**: Tests serve as living documentation of application behavior.
- **Maintainability**: Modular design with POM reduces technical debt.
- **Scalability**: Supports growing test suites and team collaboration.

## Skills Demonstrated
- Playwright proficiency
- JavaScript/TypeScript automation
- Design patterns (POM)
- API and UI test integration
- Test reporting and analysis
- Debugging and troubleshooting
- CI/CD pipeline readiness
- Advanced locator strategies

## Project Structure
```
playwright_automation/
├── config/                # Cucumber and other configuration files
├── features/              # Cucumber feature files (Gherkin syntax)
├── Images/                # Screenshots and reference images
├── page-objects/          # Page Object Model classes
├── reports/               # Test reports (HTML, JSON, Allure)
├── src/                   # Source files and test data
├── step-definitions/      # Cucumber step definitions
├── support/               # Cucumber hooks and utilities
├── tests/                 # Test cases organized by section
│   └── POM/               # POM-based test cases
├── utils/                 # Utility scripts and shared logic
├── playwright.config.js   # Playwright configuration
├── cucumber.js            # Cucumber configuration
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── allure-results/        # Allure report data
├── allure-report/         # Generated Allure reports
```

## Getting Started
### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/luismedinacoca/playwright_automation
   cd playwright_automation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright**
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

4. **Install Allure for Reporting (Optional)**
   ```bash
   npm install -D allure-playwright
   ```

5. **Install Cucumber Dependencies (Optional for BDD)**
   ```bash
   npm install --save-dev @cucumber/cucumber cucumber ts-node typescript @types/node
   ```

### Running Tests
1. **Run All Tests (Headless Mode)**
   ```bash
   npx playwright test
   ```

2. **Run Tests with Browser UI**
   ```bash
   npx playwright test --headed
   ```

3. **Run a Specific Test File**
   ```bash
   npx playwright test tests/section03/01_UIBasicsTest.spec.js
   ```

4. **Run Tests with Specific Tags (Cucumber)**
   ```bash
   npm run cucumber --tags "@e2e"
   ```

5. **Run Tests in Parallel (Cucumber)**
   ```bash
   npm run cucumber features/login.feature --parallel 2 --exit
   ```

6. **View Reports**
   - **HTML Report**: Open `playwright-report/index.html`
   - **Allure Report**: 
     ```bash
     npx allure generate allure-results --clean -o allure-report
     npx allure open allure-report
     ```

### Custom Scripts in package.json
```json
{
  "scripts": {
    "regression": "npx playwright test",
    "webtests": "npx playwright test --grep @web",
    "apitest": "npx playwright test --grep @api",
    "firefox-run": "npx playwright test --grep @inProgress --project=firefox",
    "cucumber": "cucumber-js --config ./config/cucumber.js",
    "cucumber:headless": "HEADLESS=true cucumber-js --config ./config/cucumber.js"
  }
}
```

Run custom scripts:
```bash
npm run regression
npm run webtests
npm run apitest
npm run firefox-run
```

## Page Object Model (POM)
The framework implements POM to encapsulate page interactions, improving code reusability and maintainability. Below is an example of a POM class:

```javascript
// page-objects/LoginPage.ts
export class LoginPage {
  private page: Page;
  private selectors = {
    usernameInput: '#username',
    passwordInput: 'input[name="password"]',
    loginButton: '#signInBtn',
  };

  constructor(page: Page) {
    this.page = page;
  }

  getUsernameInput() {
    return this.page.locator(this.selectors.usernameInput);
  }

  getPasswordInput() {
    return this.page.locator(this.selectors.passwordInput);
  }

  getLoginButton() {
    return this.page.locator(this.selectors.loginButton);
  }

  async login(username: string, password: string) {
    await this.getUsernameInput().fill(username);
    await this.getPasswordInput().fill(password);
    await this.getLoginButton().click();
  }
}
```

Usage in tests:
```javascript
// tests/POM/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await loginPage.login('rahulshettyacademy', 'learning');
});
```

## Cucumber Integration
The framework supports Cucumber for BDD-style testing. Feature files are written in Gherkin, with step definitions in TypeScript.

### Example Feature File
```gherkin
// features/login.feature
Feature: Login
  @e2e
  Scenario: Success Login
    Given A web browser is at the saucelabs login page
    When A user enters the username "standard_user", the password "secret_sauce", and clicks on the login button
    Then the url will contains the inventory subdirectory

  @validation
  Scenario Outline: Invalid Login
    Given a login to this App with "<username>" and "<password>"
    Then Verify Error message is displayed
    Examples:
      | username              | password         |
      | user_name_example_001 | user_password_001 |
      | user_name_example_002 | user_password_002 |
```

### Step Definitions
```javascript
// step-definitions/login.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { expect, Page } from '@playwright/test';

let page: Page;
let loginPage: LoginPage;

Given('A web browser is at the saucelabs login page', async () => {
  page = await global.browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('A user enters the username {string}, the password {string}, and clicks on the login button', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('the url will contains the inventory subdirectory', async () => {
  const url = await loginPage.getURL();
  expect(url).toContain('/inventory.html');
});
```

### Hooks
```javascript
// support/hooks.ts
import { After, Before } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

After(async () => {
  await page.close();
  await browser.close();
});
```

### Cucumber Configuration
```javascript
// config/cucumber.js
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

module.exports = {
  default: {
    paths: ['../features/**/*.feature'],
    require: ['../step-definitions/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['pretty'],
  },
};
```

## Test Reporting
- **HTML Reports**: Generated automatically by Playwright (`playwright-report/index.html`).
- **Allure Reports**:
  ```bash
  npx playwright test --reporter=line,allure-playwright
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```
- **Cucumber Reports**:
  ```bash
  npm run cucumber features/login.feature --format html:cucumber-report.html
  ```

## Debugging and Tracing
1. **Debug Mode**:
   ```bash
   npx playwright test tests/section03/01_UIBasicsTest.spec.js --headed --debug
   ```
   Opens the Playwright Inspector for step-by-step debugging.

2. **Trace Viewer**:
   - Traces are saved in `test-results/trace.zip`.
   - View traces at [trace.playwright.dev](https://trace.playwright.dev/).

3. **API Debugging**:
   - Add a debug point in Visual Studio Code.
   - Update `package.json`:
     ```json
     "scripts": {
       "test:api": "npx playwright test tests/section10/lecture051.spec.js --headed"
     }
     ```
   - Run `Debug: Debug npm Script` in VS Code.

## Parallel and Serial Execution
- **Parallel Execution**:
  ```javascript
  test.describe.configure({ mode: 'parallel' });
  test('Test 001', async ({ page }) => { /* ... */ });
  test('Test 002', async ({ page }) => { /* ... */ });
  ```
  Run: `npx playwright test`

- **Serial Execution**:
  ```javascript
  test.describe.configure({ mode: 'serial' });
  test('Test 001', async ({ page }) => { /* ... */ });
  test('Test 002', async ({ page }) => { /* ... */ });
  ```
  If one test fails, subsequent tests are skipped.

- **Cucumber Parallel Execution**:
  ```bash
  npm run cucumber features/login.feature --parallel 2 --exit
  ```

## API Testing
API tests are implemented using Playwright's `request` fixture and a utility class:

```javascript
// utils/APIutils.js
class APIutils {
  async getToken(request, loginPayload) {
    const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: loginPayload,
    });
    const loginResponseJson = await loginResponse.json();
    return loginResponseJson.token;
  }

  async createOrder(request, orderPayload) {
    const orderResponse = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
      data: orderPayload,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    const orderResponseJson = await orderResponse.json();
    return orderResponseJson.orders[0];
  }
}
```

Usage:
```javascript
// tests/api.spec.js
test('Create Order Test', async ({ request, page }) => {
  const apiUtils = new APIutils();
  const orderId = await apiUtils.createOrder(request, orderPayload);
  expect(orderId).toBeDefined();
});
```

## Session Storage Management
Save and reuse session storage for faster test execution:
```javascript
// tests/session.spec.js
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator('#login').click();
  await context.storageState({ path: 'utils/state.json' });
  webContext = await browser.newContext({ storageState: 'utils/state.json' });
});

test.beforeEach(async () => {
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
});
```

## Test Tagging and Filtering
Tag tests for selective execution:
```javascript
test('Mi test importante @regression @fast', async ({ page }) => { /* ... */ });
test('Otro test @e2e @auth @slow', async ({ page }) => { /* ... */ });
```

Run tagged tests:
```bash
npx playwright test --grep @regression
npx playwright test @e2e or @smoke
npx playwright test --exclude @slow
```

## Future Enhancements
- Integrate with CI/CD (e.g., GitHub Actions, Jenkins)
- Add visual regression testing
- Expand API test coverage
- Implement data-driven testing
- Explore mobile web automation
- Enhance reporting with custom dashboards
- Introduce test tagging and filtering for advanced test management

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements. Follow the coding standards and ensure tests pass before submitting.

## License
This project is for educational purposes and is not licensed for commercial use.