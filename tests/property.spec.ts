import { test, expect } from '@playwright/test';
import { PARIS_SLUG, BOOK_CHECKIN, BOOK_CHECKOUT } from './helpers';

// PROP-01 · Property detail page renders correctly  [P0]
test('PROP-01: property detail page shows all key sections', async ({ page }) => {
  await page.goto(`/properties/${PARIS_SLUG}`, { waitUntil: 'networkidle' });

  await expect(page.getByTestId('property-hero-image')).toBeVisible();
  await expect(page.getByTestId('property-name')).toBeVisible();
  await expect(page.getByTestId('property-location')).toBeVisible();
  await expect(page.getByTestId('property-description')).toBeVisible();
  await expect(page.getByTestId('amenities-title')).toBeVisible();
  await expect(page.getByTestId('rooms-title')).toBeVisible();
  await expect(page.getByTestId('reviews-title')).toBeVisible();
  // Booking sidebar
  await expect(page.getByTestId('sidebar-checkin')).toBeVisible();
  await expect(page.getByTestId('check-availability')).toBeVisible();
});

// PROP-02 · Booking sidebar shows availability state  [P0]
test('PROP-02: check availability returns room options; Book Now hidden until room selected', async ({ page }) => {
  await page.goto(`/properties/${PARIS_SLUG}`, { waitUntil: 'networkidle' });

  await page.getByTestId('sidebar-checkin').fill(BOOK_CHECKIN);
  await page.getByTestId('sidebar-checkout').fill(BOOK_CHECKOUT);
  await page.getByTestId('sidebar-guests').fill('2');
  await page.getByTestId('check-availability').click();

  await expect(page.getByTestId('availability-results')).toBeVisible();

  // Book Now must not appear before a room is selected
  await expect(page.getByTestId('book-now')).not.toBeVisible();

  // Select the first available room
  const firstAvailable = page
    .locator('[data-testid^="room-option-"]')
    .filter({ hasNot: page.locator('text=Sold out') })
    .first();
  await firstAvailable.click();

  // Now Book Now should appear
  await expect(page.getByTestId('book-now')).toBeVisible();
});
