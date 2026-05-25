import { test, expect } from '@playwright/test';
import { BOOK_CHECKIN, BOOK_CHECKOUT } from './helpers';

// ALERT-01 · Create price alert  [P2]
test('ALERT-01: creates a price alert and it appears in the list', async ({ page }) => {
  await page.goto('/account/price-alerts');
  await expect(page.getByTestId('price-alerts-title')).toBeVisible();

  await page.getByTestId('create-price-alert').click();
  await expect(page.getByTestId('price-alert-form')).toBeVisible();

  // Fill the alert form — destination, dates, and target price
  await page.getByTestId('search-destination').fill('Paris');
  await page.getByTestId('search-checkin').fill(BOOK_CHECKIN);
  await page.getByTestId('search-checkout').fill(BOOK_CHECKOUT);
  await page.getByTestId('price-alert-target').fill('200');
  await page.getByTestId('submit-price-alert').click();

  await expect(page.getByTestId('price-alerts-list')).toBeVisible();
  await expect(page.locator('[data-testid^="alert-"]').first()).toBeVisible();
});

// ALERT-02 · Toggle and delete price alert  [P2]
test('ALERT-02: disables, re-enables, then deletes a price alert', async ({ page }) => {
  await page.goto('/account/price-alerts');

  const alerts = page.locator('[data-testid^="alert-"]');
  if (await alerts.count() === 0) {
    test.skip(); // no alerts — run ALERT-01 first
    return;
  }

  const testId = await alerts.first().getAttribute('data-testid');
  const alertId = testId!.replace('alert-', '');

  // Toggle off
  await page.getByTestId(`toggle-alert-${alertId}`).click();
  await expect(page.getByTestId(`toggle-alert-${alertId}`)).not.toBeChecked();

  // Toggle back on
  await page.getByTestId(`toggle-alert-${alertId}`).click();
  await expect(page.getByTestId(`toggle-alert-${alertId}`)).toBeChecked();

  // Delete
  const initialCount = await alerts.count();
  await page.getByTestId(`delete-alert-${alertId}`).click();
  await expect(alerts).toHaveCount(initialCount - 1);
});
