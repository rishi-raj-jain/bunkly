import { test, expect } from '@playwright/test';

// MSG-03 · Messages inbox renders  [P1]
test('MSG-03: messages inbox loads and shows conversations or empty state', async ({ page }) => {
  await page.goto('/messages');
  await expect(page.getByTestId('messages-title')).toBeVisible();
  const hasList = await page.getByTestId('conversations-list').isVisible({ timeout: 120_000 }).catch(() => false);
  const hasEmpty = await page.getByTestId('messages-empty').isVisible({ timeout: 120_000 }).catch(() => false);
  expect(hasList || hasEmpty).toBe(true);
});

// MSG-02 · Create new conversation with property host  [P1]
test('MSG-02: contacts host from booking detail and lands on conversation thread', async ({ page }) => {
  await page.goto('/bookings');
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();

  await page.getByTestId('contact-property').click();
  await expect(page).toHaveURL(/\/messages\//);
  await expect(page.getByTestId('conversation-property-name')).toBeVisible();
});

// MSG-01 · Send message in existing conversation  [P1]
test('MSG-01: sends a message and it appears in the thread', async ({ page }) => {
  // Navigate to first available conversation
  await page.goto('/messages');
  const conv = page.locator('[data-testid^="conversation-"]').first();
  const hasConv = await conv.isVisible({ timeout: 120_000 }).catch(() => false);
  if (!hasConv) {
    // Create one first via booking contact
    await page.goto('/bookings');
    await page.getByTestId('tab-upcoming').click();
    await page.locator('[data-testid^="booking-card-"]').first().click();
    await page.getByTestId('contact-property').click();
  } else {
    await conv.click();
  }

  await expect(page).toHaveURL(/\/messages\//);
  const msgBody = `Test message ${Date.now()}`;
  await page.getByTestId('message-input').fill(msgBody);
  await page.getByTestId('send-message').click();

  await expect(page.getByTestId('message-list')).toContainText(msgBody);
});

// MSG-04 · Archive conversation  [P2]
// NOTE: Archive button has no data-testid in the current UI. Skipped pending implementation.
test.skip('MSG-04: archives a conversation and it disappears from inbox', async () => {});
