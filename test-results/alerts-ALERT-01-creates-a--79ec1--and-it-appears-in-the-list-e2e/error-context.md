# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: alerts.spec.ts >> ALERT-01: creates a price alert and it appears in the list
- Location: tests/alerts.spec.ts:5:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('create-price-alert')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - link "BUNKLY" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: BUNKLY
          - generic [ref=e8]: Established • MMXXVI
        - navigation [ref=e9]:
          - link "The Houses" [active] [ref=e10] [cursor=pointer]:
            - /url: /search
          - link "Destinations" [ref=e11] [cursor=pointer]:
            - /url: /search
          - link "The House" [ref=e12] [cursor=pointer]:
            - /url: /about
          - link "Concierge" [ref=e13] [cursor=pointer]:
            - /url: /help
          - generic [ref=e14]: ✦
          - link "Messages" [ref=e15] [cursor=pointer]:
            - /url: /messages
            - img [ref=e16]
            - text: Messages
          - link "Wishlists" [ref=e18] [cursor=pointer]:
            - /url: /account/wishlists
            - img [ref=e19]
            - text: Wishlists
          - link "Notices" [ref=e21] [cursor=pointer]:
            - /url: /account/notifications
            - img [ref=e22]
            - text: Notices
          - link "My Voyages" [ref=e25] [cursor=pointer]:
            - /url: /bookings
          - link "Account" [ref=e26] [cursor=pointer]:
            - /url: /account
            - img [ref=e27]
            - text: Account
          - link "Reserve a Suite" [ref=e30] [cursor=pointer]:
            - /url: /login
    - main [ref=e31]:
      - generic [ref=e33]:
        - generic [ref=e34]:
          - link [ref=e35] [cursor=pointer]:
            - /url: /account
            - img [ref=e36]
          - heading "Price Alerts" [level=1] [ref=e38]
        - paragraph [ref=e39]: 0 alerts
      - generic [ref=e41]:
        - img [ref=e42]
        - heading "No price alerts" [level=3] [ref=e45]
        - paragraph [ref=e46]: Set alerts on properties to get notified when prices drop
        - link "Explore Properties" [ref=e47] [cursor=pointer]:
          - /url: /search
          - button "Explore Properties" [ref=e48]
    - contentinfo [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]: BUNKLY
          - generic [ref=e53]: Travels of distinction • Since MMXIV
          - img [ref=e55]
        - generic [ref=e61]:
          - generic [ref=e62]:
            - heading "The Houses" [level=3] [ref=e63]
            - generic [ref=e64]: ✦
            - list [ref=e65]:
              - listitem [ref=e66]:
                - link "The Collection" [ref=e67] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e68]:
                - link "New Openings" [ref=e69] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e70]:
                - link "About the House" [ref=e71] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e72]:
            - heading "Voyages" [level=3] [ref=e73]
            - generic [ref=e74]: ✦
            - list [ref=e75]:
              - listitem [ref=e76]:
                - link "List Your Property" [ref=e77] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e78]:
                - link "Host Resources" [ref=e79] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e80]:
                - link "Community Forum" [ref=e81] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e82]:
            - heading "Reception" [level=3] [ref=e83]
            - generic [ref=e84]: ✦
            - list [ref=e85]:
              - listitem [ref=e86]:
                - link "Concierge" [ref=e87] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e88]:
                - link "Safety & Comfort" [ref=e89] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e90]:
                - link "Cancellation Options" [ref=e91] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e92]:
            - heading "The House" [level=3] [ref=e93]
            - generic [ref=e94]: ✦
            - list [ref=e95]:
              - listitem [ref=e96]:
                - link "Privacy" [ref=e97] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e98]:
                - link "Terms of Service" [ref=e99] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e100]:
                - link "Accessibility" [ref=e101] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e102]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e103]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { BOOK_CHECKIN, BOOK_CHECKOUT } from './helpers';
  3  | 
  4  | // ALERT-01 · Create price alert  [P2]
  5  | test('ALERT-01: creates a price alert and it appears in the list', async ({ page }) => {
  6  |   await page.goto('/account/price-alerts');
  7  |   await expect(page.getByTestId('price-alerts-title')).toBeVisible();
  8  | 
> 9  |   await page.getByTestId('create-price-alert').click();
     |                                                ^ Error: locator.click: Test timeout of 120000ms exceeded.
  10 |   await expect(page.getByTestId('price-alert-form')).toBeVisible();
  11 | 
  12 |   // Fill the alert form — destination, dates, and target price
  13 |   await page.getByTestId('search-destination').fill('Paris');
  14 |   await page.getByTestId('search-checkin').fill(BOOK_CHECKIN);
  15 |   await page.getByTestId('search-checkout').fill(BOOK_CHECKOUT);
  16 |   await page.getByTestId('price-alert-target').fill('200');
  17 |   await page.getByTestId('submit-price-alert').click();
  18 | 
  19 |   await expect(page.getByTestId('price-alerts-list')).toBeVisible();
  20 |   await expect(page.locator('[data-testid^="alert-"]').first()).toBeVisible();
  21 | });
  22 | 
  23 | // ALERT-02 · Toggle and delete price alert  [P2]
  24 | test('ALERT-02: disables, re-enables, then deletes a price alert', async ({ page }) => {
  25 |   await page.goto('/account/price-alerts');
  26 | 
  27 |   const alerts = page.locator('[data-testid^="alert-"]');
  28 |   if (await alerts.count() === 0) {
  29 |     test.skip(); // no alerts — run ALERT-01 first
  30 |     return;
  31 |   }
  32 | 
  33 |   const testId = await alerts.first().getAttribute('data-testid');
  34 |   const alertId = testId!.replace('alert-', '');
  35 | 
  36 |   // Toggle off
  37 |   await page.getByTestId(`toggle-alert-${alertId}`).click();
  38 |   await expect(page.getByTestId(`toggle-alert-${alertId}`)).not.toBeChecked();
  39 | 
  40 |   // Toggle back on
  41 |   await page.getByTestId(`toggle-alert-${alertId}`).click();
  42 |   await expect(page.getByTestId(`toggle-alert-${alertId}`)).toBeChecked();
  43 | 
  44 |   // Delete
  45 |   const initialCount = await alerts.count();
  46 |   await page.getByTestId(`delete-alert-${alertId}`).click();
  47 |   await expect(alerts).toHaveCount(initialCount - 1);
  48 | });
  49 | 
```