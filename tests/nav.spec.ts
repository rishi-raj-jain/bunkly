import { test, expect } from '@playwright/test';

const STATIC_PAGES = [
  { path: '/about',          testId: 'about-title' },
  { path: '/help',           testId: 'help-title' },
  { path: '/cancellation',   testId: 'cancellation-title' },
  { path: '/privacy',        testId: 'privacy-title' },
  { path: '/terms',          testId: 'terms-title' },
  { path: '/safety',         testId: 'safety-title' },
  { path: '/host',           testId: 'host-title' },
  { path: '/careers',        testId: 'careers-title' },
  { path: '/press',          testId: 'press-title' },
];

// NAV-01 · Static/marketing pages load without error  [P2]
for (const { path, testId } of STATIC_PAGES) {
  test(`NAV-01: ${path} loads with title element and no JS errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(path);
    await expect(page.getByTestId(testId)).toBeVisible();
    expect(errors, `JS errors on ${path}: ${errors.join(', ')}`).toHaveLength(0);
  });
}
