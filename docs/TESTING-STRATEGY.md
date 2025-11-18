# Testing Strategy - WYKILLA Website

## 🎯 Testing Pyramid

```
         /\
        /E2E\     ← Few, Critical User Flows
       /------\
      / Integration \  ← Component Integration
     /--------------\
    /  Unit Tests    \  ← Many, Fast Tests
   /------------------\
```

---

## 1️⃣ Unit Tests (Jest + React Testing Library)

**Was testen:**
- Utility functions (`cn`, `formatTime`, etc.)
- Hooks (`useLenis`, `useGSAP`, `useMediaQuery`)
- Pure components (Buttons, Cards, Input)
- Type guards und Validators

**Setup:**

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

**`jest.config.js`:**
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

**`jest.setup.js`:**
```javascript
import '@testing-library/jest-dom'
```

**Example Test - `src/lib/__tests__/utils.test.ts`:**
```typescript
import { cn } from '../utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })
})
```

**Run Tests:**
```bash
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

---

## 2️⃣ Integration Tests (React Testing Library)

**Was testen:**
- Component interactions
- Form submissions
- Navigation flows
- State management

**Example - `src/components/ui/__tests__/Button.test.tsx`:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('bg-gradient-to-r')
  })

  it('is disabled when prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })
})
```

---

## 3️⃣ E2E Tests (Playwright)

**Was testen:**
- Critical user journeys
- Multi-page flows
- Real browser interactions
- Visual regression

**Setup:**

```bash
npm install --save-dev @playwright/test
npx playwright install
```

**`playwright.config.ts`:**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

**Example - `e2e/homepage.spec.ts`:**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/WYKILLA/)
  })

  test('hero section is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('section#intro')).toBeVisible()
    await expect(page.locator('h1')).toContainText('WYKILLA')
  })

  test('navigation appears on scroll', async ({ page }) => {
    await page.goto('/')

    // Navigation should be hidden initially
    const nav = page.locator('nav')
    await expect(nav).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -100)')

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))

    // Navigation should be visible
    await expect(nav).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  })

  test('chapter navigation works', async ({ page }) => {
    await page.goto('/')

    // Scroll to make navigation visible
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))

    // Click Music chapter
    await page.click('nav >> text=Music')

    // Should scroll to music section
    await expect(page.locator('section#music')).toBeInViewport()
  })
})
```

**Run E2E Tests:**
```bash
npx playwright test                # Run all
npx playwright test --ui           # UI mode
npx playwright test --project=chromium  # Specific browser
npx playwright test --debug        # Debug mode
```

---

## 4️⃣ Visual Regression Tests (Playwright + Percy/Chromatic)

**Was testen:**
- UI-Änderungen
- Responsive Layouts
- Animation States
- Theme Variations

**Example - `e2e/visual.spec.ts`:**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('hero section snapshot', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('section#intro')).toHaveScreenshot('hero.png')
  })

  test('hub thumbnails grid', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))
    await expect(page.locator('section#hub')).toHaveScreenshot('hub-grid.png')
  })

  test('mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page).toHaveScreenshot('mobile-home.png', { fullPage: true })
  })
})
```

---

## 5️⃣ Performance Tests (Lighthouse CI)

**Setup:**

```bash
npm install --save-dev @lhci/cli
```

**`.lighthouserc.json`:**
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 1 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Run:**
```bash
lhci autorun
```

---

## 6️⃣ Accessibility Tests (axe-core + jest-axe)

**Setup:**

```bash
npm install --save-dev @axe-core/react jest-axe
```

**Example - `src/components/__tests__/accessibility.test.tsx`:**
```typescript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Button from '@/components/ui/Button'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('Button has no a11y violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

---

## 7️⃣ API Tests (für Backend - Epic 9)

**Setup:**

```bash
npm install --save-dev supertest
```

**Example - `src/app/api/__tests__/health.test.ts`:**
```typescript
import { createMocks } from 'node-mocks-http'
import { GET } from '../health/route'

describe('/api/health', () => {
  it('returns 200 OK', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await GET(req)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ status: 'ok' })
  })
})
```

---

## 📋 Test Coverage Goals

| Category | Target |
|----------|--------|
| Unit Tests | 80%+ |
| Integration Tests | 70%+ |
| E2E Tests | Critical Paths |
| Accessibility | 0 violations |
| Performance | Lighthouse 90+ |

---

## 🚀 CI/CD Integration

**GitHub Actions - `.github/workflows/test.yml`:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Run E2E tests
        run: npx playwright test

      - name: Run Lighthouse CI
        run: npm run lhci

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 📝 package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test e2e/visual.spec.ts",
    "test:a11y": "jest --testMatch='**/*.a11y.test.tsx'",
    "lhci": "lhci autorun"
  }
}
```

---

## ✅ Testing Checklist (vor jedem Release)

- [ ] Unit Tests: 80%+ Coverage
- [ ] Integration Tests: Alle bestanden
- [ ] E2E Tests: Alle Critical Paths OK
- [ ] Visual Regression: Keine unerwarteten Änderungen
- [ ] Performance: Lighthouse 90+ auf allen Scores
- [ ] Accessibility: 0 axe violations
- [ ] Cross-Browser: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Chrome Android
- [ ] Responsive: 3 Breakpoints getestet
- [ ] API Tests: Alle Endpoints OK (Epic 9)

---

## 🎓 Best Practices

1. **Write tests WHILE developing**, not after
2. **Test behavior**, not implementation
3. **Keep tests simple** and focused
4. **Mock external dependencies** (APIs, Database)
5. **Use data-testid sparingly** - prefer semantic queries
6. **Run tests in CI/CD** - fail the build on test failures
7. **Monitor test performance** - slow tests = bad tests
8. **Keep test coverage high** but don't chase 100%

---

## 🛠️ Tools & Libraries

- **Unit/Integration**: Jest, React Testing Library
- **E2E**: Playwright
- **Visual**: Playwright Screenshots / Percy / Chromatic
- **Performance**: Lighthouse CI
- **Accessibility**: axe-core, jest-axe
- **API**: Supertest
- **Mocking**: MSW (Mock Service Worker)
- **Coverage**: Codecov / Coveralls
