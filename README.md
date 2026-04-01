# SauceDemo Amartha Test

## Introduction

This project is an E2E test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern and **Test-Driven Development (TDD)** principles. It targets the SauceLabs Demo application.

---

## Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| Node.js | v18 or higher | Runtime environment |
| `@playwright/test` | ^1.57.0 | Test runner and browser automation |
| `@types/node` | ^24.10.1 | TypeScript type definitions for Node.js |

---

## Installation and Setup

**Prerequisites:** Node.js v18 or higher

1. Clone this repository (optional if not using zipped file sent to HR)
```bash
git clone https://github.com/wilbertsoenarjo/amartha-test.git
```

2. Navigate to the project directory
```bash
cd amartha-test
```

3. Install dependencies
```bash
npm install
```

4. Install Playwright browsers
```bash
npx playwright install
```

---

## Running Tests

### Run E2E tests (UI mode)
```bash
npm run e2e
```

Playwright UI mode opens an interactive desktop window where you can:
- See all test files and individual test cases listed in the left sidebar
- Click any test to run it individually, or press the **Run all** button (▶) at the top to run everything
- Watch the browser execute each step in real time in the preview panel on the right
- Inspect the timeline, actions, and traces for each step after a run completes
- Filter tests by status (passed, failed, skipped) using the toolbar

**Selecting which browser to run in UI mode:**

By default `npm run e2e` runs tests across all configured browsers (Chromium, Firefox, WebKit). Inside the UI mode window click the **Projects** dropdown in the top toolbar and check or uncheck the browsers you want before running.

---

### Run all E2E tests (headless)
```bash
npx playwright test tests/e2e
```

### View the HTML report after a run
```bash
npx playwright show-report
```

---

## Project Structure

```
├── fixtures/                   # Test data
│   └── data/                   # User and product data fixtures
│
├── pages/                      # Page Object Model (POM) classes
│   ├── login.page.ts
│   ├── product.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── checkout-overview.page.ts
│   └── checkout-complete.page.ts
│
├── tests/
│   └── e2e/                    # E2E test suites
│       ├── complete-order-process.spec.ts
│       ├── complete-order-process-parallel.spec.ts
│       └── product-sorting.spec.ts
│
├── types/                      # Shared TypeScript interfaces & types
│
│
├── playwright.config.ts        # Playwright configuration (browsers, baseURL, tracing)
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lockfile
└── README.md                   # Project documentation
```

---

## Test Coverage

| Spec File | Description |
|---|---|
| `complete-order-process.spec.ts` | Sequential checkout flow for two product combinations using User 1 |
| `complete-order-process-parallel.spec.ts` | Parallel checkout flow simulating User 1 and User 2 checking out simultaneously |
| `product-sorting.spec.ts` | Product list sorting by name (A–Z, Z–A) and price (low–high, high–low) |
