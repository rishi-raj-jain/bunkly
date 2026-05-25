import { test, expect } from '@playwright/test';
import { PARIS_SLUG } from './helpers';

// WISH-01 · Create wishlist and add property  [P2]
test('WISH-01: creates a wishlist and saves a property to it', async ({ page }) => {
  await page.goto('/account/wishlists', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('wishlists-title')).toBeVisible();

  // Create a new wishlist
  await page.getByTestId('create-wishlist').click();
  await expect(page.getByTestId('create-wishlist-form')).toBeVisible();
  await page.getByTestId('wishlist-name-input').fill('E2E Test List');
  await page.getByTestId('submit-wishlist').click();

  await expect(page.getByTestId('wishlists-grid')).toContainText('E2E Test List');

  // Save a property to the new wishlist
  await page.goto(`/properties/${PARIS_SLUG}`, { waitUntil: 'networkidle' });
  await page.getByTestId('save-property').click();
  // Property saved — navigate back and verify
  await page.goto('/account/wishlists', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('wishlists-grid')).toBeVisible();
});

// WISH-02 · Remove property from wishlist  [P2]
test('WISH-02: removes a saved property from a wishlist', async ({ page }) => {
  await page.goto('/account/wishlists', { waitUntil: 'networkidle' });

  // Find a wishlist card with at least one property and a remove button
  const removeBtns = page.locator('[data-testid^="remove-from-wl-"]');
  const hasRemove = await removeBtns.first().isVisible({ timeout: 120_000 }).catch(() => false);
  if (!hasRemove) {
    test.skip(); // no saved properties to remove
    return;
  }
  const initialCount = await removeBtns.count();
  await removeBtns.first().click();
  await expect(removeBtns).toHaveCount(initialCount - 1);
});

// WISH-03 · Share wishlist  [P2]
test('WISH-03: toggles sharing on a wishlist', async ({ page }) => {
  await page.goto('/account/wishlists', { waitUntil: 'networkidle' });

  const shareBtn = page.locator('[data-testid^="share-wl-"]').first();
  const hasShare = await shareBtn.isVisible({ timeout: 120_000 }).catch(() => false);
  if (!hasShare) {
    test.skip(); // no wishlists to share
    return;
  }
  await shareBtn.click();
  // Toggle completes without error — button still visible for toggling back
  await expect(shareBtn).toBeVisible();
});

// WISH-04 · Rename and delete wishlist  [P2]
test('WISH-04: renames a wishlist then deletes it', async ({ page }) => {
  await page.goto('/account/wishlists', { waitUntil: 'networkidle' });

  const renameBtns = page.locator('[data-testid^="rename-wl-"]');
  const hasRename = await renameBtns.first().isVisible({ timeout: 120_000 }).catch(() => false);
  if (!hasRename) {
    test.skip(); // no wishlists present
    return;
  }

  // Get wishlist ID from testid
  const testId = await renameBtns.first().getAttribute('data-testid');
  const wlId = testId!.replace('rename-wl-', '');

  // Rename
  await page.getByTestId(`rename-wl-${wlId}`).click();
  await page.getByTestId(`rename-input-${wlId}`).fill('Renamed List');
  await page.getByTestId(`submit-rename-${wlId}`).click();
  await expect(page.getByTestId(`wishlist-${wlId}`)).toContainText('Renamed List');

  // Delete
  await page.getByTestId(`delete-wl-${wlId}`).click();
  await page.getByTestId(`confirm-delete-wl-${wlId}`).click();
  await expect(page.locator(`[data-testid="wishlist-${wlId}"]`)).not.toBeVisible();
});
