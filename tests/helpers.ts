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
 * Navigates to /bookings and clicks through past-section cards until it finds
 * one whose detail page shows write-review-button (no existing review yet).
 *
 * NOTE: the "tab" buttons on /bookings are scroll anchors, not filters — all
 * three sections (upcoming, past, cancelled) are always in the DOM. We scope
 * the card locator to bookings-section-past so we only iterate past bookings.
 */
export async function findBookingForReview(page: Page): Promise<void> {
  await page.goto('/bookings', { waitUntil: 'networkidle' });

  const pastSection = page.getByTestId('bookings-section-past');
  await pastSection.waitFor({ state: 'visible' });

  const cards = pastSection.locator('[data-testid^="booking-card-"]');
  const count = await cards.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    await cards.nth(i).click();
    await page.waitForLoadState('networkidle');

    const found = await page
      .getByTestId('write-review-button')
      .waitFor({ state: 'visible', timeout: 10_000 })
      .then(() => true)
      .catch(() => false);

    if (found) return;

    await page.goto('/bookings', { waitUntil: 'networkidle' });
  }

  throw new Error('No past booking eligible for review — all checked-out bookings already have reviews');
}
