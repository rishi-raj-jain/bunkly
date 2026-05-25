import { Page } from '@playwright/test';

export function futureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

export const SARAH = { email: 'sarah@example.com', password: 'password123' };

// Known slugs derived from seed property names via slugify()
export const PARIS_SLUG = 'bunkly-boutique-paris';
export const NYC_SLUG = 'the-grand-bunkly-nyc';

// Dates safely beyond the seeded booking range (1-60 days out) so inventory is free
export const BOOK_CHECKIN = futureDate(90);
export const BOOK_CHECKOUT = futureDate(93);

/**
 * Navigates through /bookings until it finds a booking detail page where
 * write-review-button is present. Returns the URL of that page.
 * Throws if no eligible booking is found among the first 5 cards.
 */
export async function findBookingForReview(page: Page): Promise<void> {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-past').click();
  const cards = page.locator('[data-testid^="booking-card-"]');
  const count = await cards.count();
  for (let i = 0; i < Math.min(count, 5); i++) {
    await cards.nth(i).click();
    await page.waitForLoadState('networkidle');
    const btn = page.getByTestId('write-review-button');
    if (await btn.isVisible({ timeout: 120_000 }).catch(() => false)) return;
    await page.goto('/bookings', { waitUntil: 'networkidle' });
    await page.getByTestId('tab-past').click();
  }
  throw new Error('No eligible booking found for review — needs a checked_out or past booking');
}
