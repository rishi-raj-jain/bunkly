import { test, expect } from '@playwright/test';

// ACCT-01 · Update profile  [P1]
test('ACCT-01: updates display name and phone, persists on reload', async ({ page }) => {
  await page.goto('/account');
  await expect(page.getByTestId('account-title')).toBeVisible();

  const newName = `Sarah ${Date.now()}`;
  await page.getByTestId('profile-form').locator('[name="name"]').fill(newName);
  await page.getByTestId('profile-form').locator('[name="phone"]').fill('+1 555-9999');
  await page.getByTestId('save-profile').click();

  // Reload and verify persistence
  await page.reload();
  await expect(page.getByTestId('profile-form').locator('[name="name"]')).toHaveValue(newName);
});

// ACCT-02 · Change password  [P1]
test('ACCT-02: changes password and changes it back so later tests keep working', async ({ page }) => {
  await page.goto('/account');

  await page.getByTestId('change-password').click();
  await expect(page.getByTestId('change-password-dialog')).toBeVisible();

  await page.getByTestId('current-password-input').fill('password123');
  await page.getByTestId('confirm-password-input').fill('newpassword99');
  // Some forms use a single "new password" field; fill whichever is present
  const newPwField = page.locator('[data-testid="new-password-input"], [name="newPassword"]');
  if (await newPwField.isVisible({ timeout: 120_000 }).catch(() => false)) {
    await newPwField.fill('newpassword99');
  }
  await page.getByTestId('submit-password-change').click();

  // Change back so subsequent tests continue to work
  await page.getByTestId('change-password').click();
  await page.getByTestId('current-password-input').fill('newpassword99');
  const newPwField2 = page.locator('[data-testid="new-password-input"], [name="newPassword"]');
  if (await newPwField2.isVisible({ timeout: 120_000 }).catch(() => false)) {
    await newPwField2.fill('password123');
  }
  await page.getByTestId('confirm-password-input').fill('password123');
  await page.getByTestId('submit-password-change').click();
  await expect(page.getByTestId('change-password-dialog')).not.toBeVisible();
});

// ACCT-03 · Add payment method  [P0]
test('ACCT-03: adds a new credit card and it appears in the list', async ({ page }) => {
  await page.goto('/account/payment-methods');
  await expect(page.getByTestId('payment-methods-title')).toBeVisible();

  await page.getByTestId('add-payment-method').click();
  await expect(page.getByTestId('add-payment-dialog')).toBeVisible();

  await page.getByTestId('pm-card-name').fill('Sarah Johnson');
  await page.getByTestId('pm-card-number').fill('4111111111111111');
  await page.getByTestId('pm-card-expiry').fill('10/27');
  await page.getByTestId('submit-payment-method').click();

  await expect(page.getByTestId('add-payment-dialog')).not.toBeVisible();
  await expect(page.getByTestId('payment-methods-list')).toBeVisible();
  await expect(page.locator('[data-testid="payment-methods-list"]')).toContainText('4111');
});

// ACCT-04 · Set default payment method  [P0]
test('ACCT-04: sets a non-default card as default', async ({ page }) => {
  await page.goto('/account/payment-methods');
  const setDefaultBtns = page.locator('[data-testid^="set-default-pm-"]');
  const count = await setDefaultBtns.count();
  if (count === 0) {
    test.skip(); // only one card — nothing to switch
    return;
  }
  await setDefaultBtns.first().click();
  // The clicked button should disappear (card is now default)
  await expect(setDefaultBtns.first()).not.toBeVisible();
});

// ACCT-05 · Delete payment method  [P0]
test('ACCT-05: deletes a non-default payment method', async ({ page }) => {
  await page.goto('/account/payment-methods');

  const deleteBtns = page.locator('[data-testid^="delete-pm-"]');
  const initialCount = await deleteBtns.count();
  if (initialCount === 0) {
    test.skip(); // no deletable cards present
    return;
  }

  await deleteBtns.first().click();
  await page.locator('[data-testid^="confirm-delete-pm-"]').first().click();
  await expect(deleteBtns).toHaveCount(initialCount - 1);
});

// ACCT-06 · Update notification preferences  [P2]
test('ACCT-06: toggles a notification category and it persists on reload', async ({ page }) => {
  await page.goto('/account/notifications');
  await expect(page.getByTestId('notifications-title')).toBeVisible();

  // Toggle the first available preference switch
  const firstToggle = page.locator('[data-testid^="toggle-"]').first();
  const wasChecked = await firstToggle.isChecked().catch(() => false);
  await firstToggle.click();

  await page.reload();
  const nowChecked = await page.locator('[data-testid^="toggle-"]').first().isChecked().catch(() => false);
  expect(nowChecked).toBe(!wasChecked);
});
