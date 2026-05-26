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
 * Navigates to the BC-PAST01 booking detail page (seeded checked_out booking for sarah).
 * This booking has no seeded review, so write-review-button will be present.
 */
export async function findBookingForReview(page: Page): Promise<void> {
  await page.goto('/bookings', { waitUntil: 'networkidle' });
  await page.getByTestId('tab-past').click();
  const pastCard = page.locator('[data-testid="booking-card-BC-PAST01"]');
  await pastCard.waitFor({ state: 'visible' });
  await pastCard.click();
  await page.waitForLoadState('networkidle');
}
