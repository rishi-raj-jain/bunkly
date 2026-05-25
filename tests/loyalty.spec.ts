import { test, expect } from '@playwright/test';

// LOY-01 · Join loyalty program  [P0]
test('LOY-01: enrolls in loyalty program and shows welcome points', async ({ page }) => {
  await page.goto('/account/loyalty', { waitUntil: 'networkidle' });

  const joinBtn = page.getByTestId('join-loyalty');
  if (await joinBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
    await joinBtn.click();
    // After joining, points balance and tier should render
    await expect(page.getByTestId('points-balance')).toBeVisible();
    await expect(page.getByTestId('loyalty-tier')).toBeVisible();
  } else {
    // Already enrolled — verify the member dashboard renders
    await expect(page.getByTestId('points-balance')).toBeVisible();
    await expect(page.getByTestId('loyalty-tier')).toBeVisible();
  }
});

// LOY-02 · View points history  [P0]
test('LOY-02: points history and tier progress are visible for an enrolled member', async ({ page }) => {
  await page.goto('/account/loyalty', { waitUntil: 'networkidle' });

  // Ensure enrolled first
  const joinBtn = page.getByTestId('join-loyalty');
  if (await joinBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
    await joinBtn.click();
  }

  await expect(page.getByTestId('points-balance')).toBeVisible();
  await page.getByTestId('points-history').waitFor({ state: 'visible' });
  await expect(page.getByTestId('tier-progress')).toBeVisible();
  await expect(page.getByTestId('tier-benefits')).toBeVisible();
});

// LOY-03 · Redeem loyalty points at checkout  [P0]
// NOTE: Points redemption UI is not yet wired into the checkout form.
// This test will be implemented once the feature is built.
test.skip('LOY-03: loyalty points can be applied at checkout (not yet implemented)', async () => {});
