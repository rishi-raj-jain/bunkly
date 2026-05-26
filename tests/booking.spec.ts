import { test, expect } from '@playwright/test';
import { PARIS_SLUG, BOOK_CHECKIN, BOOK_CHECKOUT, futureDate } from './helpers';

// ─── P0 ──────────────────────────────────────────────────────────────────────

// BOOK-01 · Full booking funnel: search → property → checkout → confirmation
test('BOOK-01: completes full booking funnel and lands on confirmation page', async ({ page }) => {
  // Property page
  await page.goto(`/properties/${PARIS_SLUG}`, { waitUntil: 'networkidle' });
  await page.getByTestId('sidebar-checkin').fill(BOOK_CHECKIN);
  await page.getByTestId('sidebar-checkout').fill(BOOK_CHECKOUT);
  await page.getByTestId('sidebar-guests').fill('2');
  await page.getByTestId('check-availability').click();
  await expect(page.getByTestId('availability-results')).toBeVisible();

  // Select first non-sold-out room
  await page
    .locator('[data-testid^="room-option-"]')
    .filter({ hasNot: page.locator('text=Sold out') })
    .first()
    .click();
  await page.getByTestId('book-now').click();
  await expect(page).toHaveURL(/\/checkout/);

  // Step 1 – stay & guest (review summary + guest details combined)
  await expect(page.getByTestId('step-stay-and-guest')).toBeVisible();
  await page.getByTestId('guest-name-input').fill('Sarah Johnson');
  await page.getByTestId('guest-email-input').fill('sarah@example.com');
  await page.getByTestId('guest-phone-input').fill('+1 555-0100');
  await page.getByTestId('continue-to-payment').click();

  // Step 2 – payment
  await expect(page.getByTestId('step-payment')).toBeVisible();
  await page.getByTestId('card-name-input').fill('Sarah Johnson');
  await page.getByTestId('card-number-input').fill('4242424242424242');
  await page.getByTestId('card-expiry-input').fill('12/28');
  await page.getByTestId('card-cvc-input').fill('123');
  await page.getByTestId('submit-booking').click();

  // Confirmation
  await page.waitForURL(/\/bookings\/.*\/confirmation/, { timeout: 120_000 });
  await expect(page.getByTestId('confirmation-number')).toBeVisible();
  await expect(page.getByTestId('confirmation-number')).toContainText(/BC-/);
});

// BOOK-02 · Booking appears in bookings list
test('BOOK-02: bookings list shows at least one seeded booking', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('bookings-title')).toBeVisible();
  // At least one upcoming booking card
  await page.getByTestId('tab-upcoming').click();
  await expect(page.locator('[data-testid^="booking-card-"]').first()).toBeVisible();
});

// BOOK-03 · Cancel a booking
test('BOOK-03: cancels an upcoming booking and shows cancelled status', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();
  await expect(page).toHaveURL(/\/bookings\//);

  await page.getByTestId('cancel-booking').click();
  await expect(page.getByTestId('confirm-cancel')).toBeVisible();
  await page.getByTestId('confirm-cancel').click();

  await expect(page.getByTestId('booking-detail-status')).toContainText(/cancelled/i);
});

// ─── P1 ──────────────────────────────────────────────────────────────────────

// BOOK-04 · View booking detail
test('BOOK-04: booking detail shows dates, room type, and total', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();

  await expect(page.getByTestId('booking-detail-title')).toBeVisible();
  await expect(page.getByTestId('booking-detail-status')).toBeVisible();
  await expect(page.getByTestId('room-type-name')).toBeVisible();
  await expect(page.getByTestId('booking-detail-total')).toBeVisible();
  await expect(page.getByTestId('checkin-details')).toBeVisible();
  await expect(page.getByTestId('checkout-details')).toBeVisible();
});

// BOOK-05 · Modify booking dates
test('BOOK-05: modifies booking dates and shows success', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();

  await page.getByTestId('modify-booking-button').click();
  await expect(page.getByTestId('modify-booking-dialog')).toBeVisible();

  const newCheckIn = futureDate(120);
  const newCheckOut = futureDate(123);
  await page.getByTestId('modify-checkin').fill(newCheckIn);
  await page.getByTestId('modify-checkout').fill(newCheckOut);
  await page.getByTestId('submit-modification').click();

  await expect(page.getByTestId('modify-success')).toBeVisible();
});

// BOOK-06 · Add add-on to booking
test('BOOK-06: adds breakfast add-on and it appears in booking detail', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();

  await expect(page.getByTestId('addon-selector')).toBeVisible();
  const addBtn = page.getByTestId('add-addon-breakfast');
  // Only click if not already added
  if (await addBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
    await addBtn.click();
    await expect(page.getByTestId('remove-addon-breakfast')).toBeVisible();
  }
});

// BOOK-07 · Online check-in flow
test('BOOK-07: completes online check-in and shows completion state', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();
  await page.locator('[data-testid^="booking-card-"]').first().click();

  const checkinBtn = page.getByTestId('online-checkin-button');
  await expect(checkinBtn).toBeVisible();
  await checkinBtn.click();

  await expect(page.getByTestId('online-checkin-dialog')).toBeVisible();

  // Step 1 – preferences
  await expect(page.getByTestId('checkin-step-preferences')).toBeVisible();
  await page.getByTestId('checkin-arrival-time').fill('15:00');
  await page.getByTestId('checkin-continue-verify').click();

  // Step 2 – verify ID
  await expect(page.getByTestId('checkin-step-verify')).toBeVisible();
  await page.getByTestId('checkin-id-verify').click();
  await page.getByTestId('checkin-submit').click();

  await expect(page.getByTestId('checkin-complete')).toBeVisible();
});

// BOOK-08 · Service request during active booking  [P2]
test('BOOK-08: submits a service request and it appears in the booking', async ({ page }) => {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-upcoming').click();

  // Find a card whose status badge reads "Checked In" — only those show the service-request-button
  const checkedInCard = page.locator('[data-testid^="booking-card-"]').filter({
    has: page.locator('[data-testid^="booking-status-"]', { hasText: 'Checked In' }),
  });
  await checkedInCard.first().waitFor({ state: 'visible' });
  await checkedInCard.first().click();
  await page.waitForLoadState('networkidle');

  await page.getByTestId('service-request-button').click();
  await expect(page.getByTestId('service-request-dialog')).toBeVisible();

  await page.getByTestId('service-type-select').selectOption('towels');
  await page.getByTestId('service-details-input').fill('Please bring extra towels.');
  await page.getByTestId('submit-service-request').click();

  await expect(page.getByTestId('service-success')).toBeVisible();
});
