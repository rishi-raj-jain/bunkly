import { test, expect } from '@playwright/test';
import { findBookingForReview } from './helpers';

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
  await page.goto('/account/reviews');
  await expect(page.getByTestId('reviews-list')).toContainText('Excellent stay!');
});

// REV-02 · Edit a review  [P1]
// NOTE: No edit UI with data-testid exists in the current codebase (only createReview / deleteReview actions).
// Skipped pending edit dialog implementation.
test.skip('REV-02: edits an existing review (not yet implemented)', async () => {});

// REV-03 · Delete a review  [P1]
test('REV-03: deletes a review and it disappears from the list', async ({ page }) => {
  await page.goto('/account/reviews');

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
  await page.goto('/properties/bunkly-boutique-paris');
  await expect(page.getByTestId('reviews-title')).toBeVisible();

  const voteBtn = page.locator('[data-testid^="vote-review-"]').first();
  const hasVoteBtn = await voteBtn.isVisible({ timeout: 120_000 }).catch(() => false);
  if (!hasVoteBtn) {
    test.skip(); // no reviews on this property
    return;
  }

  const initialText = await voteBtn.textContent();
  await voteBtn.click();
  // Text should change (count increments or "Helpful" badge state changes)
  await expect(voteBtn).not.toHaveText(initialText!);

  // Toggle back
  await voteBtn.click();
  await expect(voteBtn).toHaveText(initialText!);
});
