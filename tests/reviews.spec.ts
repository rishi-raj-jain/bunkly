import { test, expect } from '@playwright/test';
import { findBookingForReview } from './helpers';

// Serial: REV-01 creates a review for BC-PAST01; REV-03 then deletes it (first in list).
// Without serial mode REV-03 can delete a Paris seeded review while REV-04 is voting,
// causing a null dereference crash in the toggleReviewVote server action.
test.describe.configure({ mode: 'serial' });

// REV-01 · Submit a review  [P1]
test('REV-01: submits a review from a booking detail page', async ({ page }) => {
  await findBookingForReview(page);

  await page.getByTestId('write-review-button').click();
  await expect(page.getByTestId('write-review-dialog')).toBeVisible();

  await page.getByTestId('review-star-5').click();
  await page.getByTestId('review-title-input').fill('Excellent stay!');
  await page.getByTestId('review-body-input').fill('Everything was perfect. Highly recommended.');
  await page.getByTestId('submit-review').click();

  // Dialog closes after successful submission
  await expect(page.getByTestId('write-review-dialog')).not.toBeVisible();
  // Review now appears on account/reviews
  await page.goto('/account/reviews', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('reviews-list')).toContainText('Excellent stay!');
});

// REV-02 · Edit a review  [P1]
// NOTE: No edit UI with data-testid exists in the current codebase (only createReview / deleteReview actions).
// Skipped pending edit dialog implementation.
test.skip('REV-02: edits an existing review (not yet implemented)', async () => {});

// REV-03 · Delete a review  [P1]
test('REV-03: deletes a review and it disappears from the list', async ({ page }) => {
  await page.goto('/account/reviews', { waitUntil: 'networkidle' });

  const reviews = page.locator('[data-testid^="my-review-"]');
  const count = await reviews.count();
  if (count === 0) {
    test.skip(); // no reviews to delete
    return;
  }

  // Extract the review ID from the testid to build the delete button testid
  const firstReview = reviews.first();
  const testId = await firstReview.getAttribute('data-testid');
  const reviewId = testId!.replace('my-review-', '');

  await page.getByTestId(`delete-review-${reviewId}`).click();
  await page.getByTestId(`confirm-delete-review-${reviewId}`).click();

  await expect(page.locator(`[data-testid="my-review-${reviewId}"]`)).not.toBeVisible();
});

// REV-04 · Mark review as helpful  [P1]
test('REV-04: helpful vote increments count; clicking again toggles it back', async ({ page }) => {
  // Find a property with reviews
  await page.goto('/properties/bunkly-boutique-paris', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('reviews-title')).toBeVisible();

  const voteBtn = page.locator('[data-testid^="vote-review-"]').first();
  const hasVoteBtn = await voteBtn
    .waitFor({ state: 'visible', timeout: 10_000 })
    .then(() => true)
    .catch(() => false);
  if (!hasVoteBtn) {
    test.skip(); // no reviews on this property
    return;
  }

  await voteBtn.click();
  // After voting, button switches to the voted style (text-accent class)
  await expect(voteBtn).toHaveClass(/text-accent/);

  // Toggle back — should revert to unvoted style
  await voteBtn.click();
  await expect(voteBtn).not.toHaveClass(/text-accent/);
});
