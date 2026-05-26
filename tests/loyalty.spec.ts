import { test, expect, type Page } from '@playwright/test';

// Run serially: LOY-01 enrolls Sarah first, LOY-02 can rely on that enrollment.
// This prevents the parallel race where both tests hit /account/loyalty before
// either has joined, causing both to redirect to /account and fight over the join button.
test.describe.configure({ mode: 'serial' });

/**
 * Navigates to /account/loyalty, joining the loyalty program first if needed.
 * Retries up to 3 times so a slow server action commit doesn't cause a redirect loop.
 */
async function goToLoyaltyPage(page: Page) {
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.goto('/account/loyalty', { waitUntil: 'networkidle' });

    // If already on the enrolled dashboard, we're done.
    if (await page.getByTestId('points-balance').isVisible({ timeout: 3_000 }).catch(() => false)) {
      return;
    }

    // Page redirected to /account because not enrolled — click join and wait.
    const joinBtn = page.getByTestId('join-loyalty');
    if (await joinBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await joinBtn.click();
      // Wait for the server action + router.refresh() to settle.
      await page.waitForLoadState('networkidle');
    }
  }

  // Final attempt — if still not on the loyalty page, fail with a clear message.
  await page.goto('/account/loyalty', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('points-balance')).toBeVisible();
}

// LOY-01 · Join loyalty program  [P0]
test('LOY-01: enrolls in loyalty program and shows points balance and tier', async ({ page }) => {
  await goToLoyaltyPage(page);
  await expect(page.getByTestId('points-balance')).toBeVisible();
  await expect(page.getByTestId('loyalty-tier')).toBeVisible();
});

// LOY-02 · View points history  [P0]
// Runs after LOY-01 (serial), so the user is guaranteed to be enrolled.
test('LOY-02: points history and tier progress are visible for an enrolled member', async ({ page }) => {
  await goToLoyaltyPage(page);
  await expect(page.getByTestId('points-balance')).toBeVisible();
  await expect(page.getByTestId('tier-progress')).toBeVisible();
  await expect(page.getByTestId('tier-benefits')).toBeVisible();
  await page.getByTestId('points-history').waitFor({ state: 'visible' });
});

// LOY-03 · Redeem loyalty points at checkout  [P0]
// NOTE: Points redemption UI is not yet wired into the checkout form.
// This test will be implemented once the feature is built.
test.skip('LOY-03: loyalty points can be applied at checkout (not yet implemented)', async () => {});
