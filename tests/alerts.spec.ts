import { test, expect } from '@playwright/test';
import { PARIS_SLUG } from './helpers';

// ALERT-01 · Create price alert  [P2]
// The create-price-alert button lives on the property detail page, not /account/price-alerts
test('ALERT-01: creates a price alert from a property page and shows success', async ({ page }) => {
  await page.goto(`/properties/${PARIS_SLUG}`, { waitUntil: 'networkidle' });

  await page.getByTestId('create-price-alert').click();
  await expect(page.getByTestId('price-alert-form')).toBeVisible();

  await page.getByTestId('price-alert-target').fill('200');
  await page.getByTestId('submit-price-alert').click();

  // Success state replaces the form
  await expect(page.locator('[data-testid="price-alert-form"]')).toContainText(/Alert created/i);
});

// ALERT-02 · Toggle and delete price alert  [P2]
// Alerts created above are listed on /account/price-alerts
test('ALERT-02: disables, re-enables, then deletes a price alert', async ({ page }) => {
  await page.goto('/account/price-alerts', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('price-alerts-title')).toBeVisible();

  const alerts = page.locator('[data-testid^="price-alert-"]');
  if (await alerts.count() === 0) {
    test.skip(); // run ALERT-01 first
    return;
  }

  const testId = await alerts.first().getAttribute('data-testid');
  const alertId = testId!.replace('price-alert-', '');

  // Toggle off
  await page.getByTestId(`toggle-alert-${alertId}`).click();
  await expect(page.locator(`[data-testid="price-alert-${alertId}"]`)).toContainText(/Paused/i);

  // Toggle back on
  await page.getByTestId(`toggle-alert-${alertId}`).click();
  await expect(page.locator(`[data-testid="price-alert-${alertId}"]`)).toContainText(/Active/i);

  // Delete
  const initialCount = await alerts.count();
  await page.getByTestId(`delete-alert-${alertId}`).click();
  await expect(alerts).toHaveCount(initialCount - 1);
});
