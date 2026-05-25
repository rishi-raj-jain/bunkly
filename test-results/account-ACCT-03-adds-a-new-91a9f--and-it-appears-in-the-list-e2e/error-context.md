# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account.spec.ts >> ACCT-03: adds a new credit card and it appears in the list
- Location: tests/account.spec.ts:47:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-testid="payment-methods-list"]')
Expected substring: "4111"
Received string:    "Visa ••••1111credit cardDefault"

Call log:
  - Expect "toContainText" with timeout 120000ms
  - waiting for locator('[data-testid="payment-methods-list"]')
    119 × locator resolved to <div class="space-y-3" data-testid="payment-methods-list">…</div>
        - unexpected value "Visa ••••1111credit cardDefault"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - link "BUNKLY" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: BUNKLY
          - generic [ref=e8]: Established • MMXXVI
        - navigation [ref=e9]:
          - link "The Houses" [ref=e10] [cursor=pointer]:
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
          - generic [ref=e35]:
            - link [ref=e36] [cursor=pointer]:
              - /url: /account
              - img [ref=e37]
            - heading "Payment Methods" [level=1] [ref=e39]
          - paragraph [ref=e40]: 1 saved card
        - button "Add Card" [ref=e41] [cursor=pointer]:
          - img [ref=e42]
          - text: Add Card
      - generic [ref=e46]:
        - generic [ref=e47]:
          - img [ref=e48]
          - generic [ref=e50]:
            - paragraph [ref=e51]: Visa ••••1111
            - paragraph [ref=e52]: credit card
          - generic [ref=e53]: Default
        - button [ref=e55] [cursor=pointer]:
          - img [ref=e56]
    - contentinfo [ref=e59]:
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: BUNKLY
          - generic [ref=e63]: Travels of distinction • Since MMXIV
          - img [ref=e65]
        - generic [ref=e71]:
          - generic [ref=e72]:
            - heading "The Houses" [level=3] [ref=e73]
            - generic [ref=e74]: ✦
            - list [ref=e75]:
              - listitem [ref=e76]:
                - link "The Collection" [ref=e77] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e78]:
                - link "New Openings" [ref=e79] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e80]:
                - link "About the House" [ref=e81] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e82]:
            - heading "Voyages" [level=3] [ref=e83]
            - generic [ref=e84]: ✦
            - list [ref=e85]:
              - listitem [ref=e86]:
                - link "List Your Property" [ref=e87] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e88]:
                - link "Host Resources" [ref=e89] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e90]:
                - link "Community Forum" [ref=e91] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e92]:
            - heading "Reception" [level=3] [ref=e93]
            - generic [ref=e94]: ✦
            - list [ref=e95]:
              - listitem [ref=e96]:
                - link "Concierge" [ref=e97] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e98]:
                - link "Safety & Comfort" [ref=e99] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e100]:
                - link "Cancellation Options" [ref=e101] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e102]:
            - heading "The House" [level=3] [ref=e103]
            - generic [ref=e104]: ✦
            - list [ref=e105]:
              - listitem [ref=e106]:
                - link "Privacy" [ref=e107] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e108]:
                - link "Terms of Service" [ref=e109] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e110]:
                - link "Accessibility" [ref=e111] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e112]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e113]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | // ACCT-01 · Update profile  [P1]
  4   | test('ACCT-01: updates display name and phone, persists on reload', async ({ page }) => {
  5   |   await page.goto('/account');
  6   |   await expect(page.getByTestId('account-title')).toBeVisible();
  7   | 
  8   |   const newName = `Sarah ${Date.now()}`;
  9   |   await page.getByTestId('profile-form').locator('[name="name"]').fill(newName);
  10  |   await page.getByTestId('profile-form').locator('[name="phone"]').fill('+1 555-9999');
  11  |   await page.getByTestId('save-profile').click();
  12  | 
  13  |   // Reload and verify persistence
  14  |   await page.reload();
  15  |   await expect(page.getByTestId('profile-form').locator('[name="name"]')).toHaveValue(newName);
  16  | });
  17  | 
  18  | // ACCT-02 · Change password  [P1]
  19  | test('ACCT-02: changes password and changes it back so later tests keep working', async ({ page }) => {
  20  |   await page.goto('/account');
  21  | 
  22  |   await page.getByTestId('change-password').click();
  23  |   await expect(page.getByTestId('change-password-dialog')).toBeVisible();
  24  | 
  25  |   await page.getByTestId('current-password-input').fill('password123');
  26  |   await page.getByTestId('confirm-password-input').fill('newpassword99');
  27  |   // Some forms use a single "new password" field; fill whichever is present
  28  |   const newPwField = page.locator('[data-testid="new-password-input"], [name="newPassword"]');
  29  |   if (await newPwField.isVisible({ timeout: 120_000 }).catch(() => false)) {
  30  |     await newPwField.fill('newpassword99');
  31  |   }
  32  |   await page.getByTestId('submit-password-change').click();
  33  | 
  34  |   // Change back so subsequent tests continue to work
  35  |   await page.getByTestId('change-password').click();
  36  |   await page.getByTestId('current-password-input').fill('newpassword99');
  37  |   const newPwField2 = page.locator('[data-testid="new-password-input"], [name="newPassword"]');
  38  |   if (await newPwField2.isVisible({ timeout: 120_000 }).catch(() => false)) {
  39  |     await newPwField2.fill('password123');
  40  |   }
  41  |   await page.getByTestId('confirm-password-input').fill('password123');
  42  |   await page.getByTestId('submit-password-change').click();
  43  |   await expect(page.getByTestId('change-password-dialog')).not.toBeVisible();
  44  | });
  45  | 
  46  | // ACCT-03 · Add payment method  [P0]
  47  | test('ACCT-03: adds a new credit card and it appears in the list', async ({ page }) => {
  48  |   await page.goto('/account/payment-methods');
  49  |   await expect(page.getByTestId('payment-methods-title')).toBeVisible();
  50  | 
  51  |   await page.getByTestId('add-payment-method').click();
  52  |   await expect(page.getByTestId('add-payment-dialog')).toBeVisible();
  53  | 
  54  |   await page.getByTestId('pm-card-name').fill('Sarah Johnson');
  55  |   await page.getByTestId('pm-card-number').fill('4111111111111111');
  56  |   await page.getByTestId('pm-card-expiry').fill('10/27');
  57  |   await page.getByTestId('submit-payment-method').click();
  58  | 
  59  |   await expect(page.getByTestId('add-payment-dialog')).not.toBeVisible();
  60  |   await expect(page.getByTestId('payment-methods-list')).toBeVisible();
> 61  |   await expect(page.locator('[data-testid="payment-methods-list"]')).toContainText('4111');
      |                                                                      ^ Error: expect(locator).toContainText(expected) failed
  62  | });
  63  | 
  64  | // ACCT-04 · Set default payment method  [P0]
  65  | test('ACCT-04: sets a non-default card as default', async ({ page }) => {
  66  |   await page.goto('/account/payment-methods');
  67  |   const setDefaultBtns = page.locator('[data-testid^="set-default-pm-"]');
  68  |   const count = await setDefaultBtns.count();
  69  |   if (count === 0) {
  70  |     test.skip(); // only one card — nothing to switch
  71  |     return;
  72  |   }
  73  |   await setDefaultBtns.first().click();
  74  |   // The clicked button should disappear (card is now default)
  75  |   await expect(setDefaultBtns.first()).not.toBeVisible();
  76  | });
  77  | 
  78  | // ACCT-05 · Delete payment method  [P0]
  79  | test('ACCT-05: deletes a non-default payment method', async ({ page }) => {
  80  |   await page.goto('/account/payment-methods');
  81  | 
  82  |   const deleteBtns = page.locator('[data-testid^="delete-pm-"]');
  83  |   const initialCount = await deleteBtns.count();
  84  |   if (initialCount === 0) {
  85  |     test.skip(); // no deletable cards present
  86  |     return;
  87  |   }
  88  | 
  89  |   await deleteBtns.first().click();
  90  |   await page.locator('[data-testid^="confirm-delete-pm-"]').first().click();
  91  |   await expect(deleteBtns).toHaveCount(initialCount - 1);
  92  | });
  93  | 
  94  | // ACCT-06 · Update notification preferences  [P2]
  95  | test('ACCT-06: toggles a notification category and it persists on reload', async ({ page }) => {
  96  |   await page.goto('/account/notifications');
  97  |   await expect(page.getByTestId('notifications-title')).toBeVisible();
  98  | 
  99  |   // Toggle the first available preference switch
  100 |   const firstToggle = page.locator('[data-testid^="toggle-"]').first();
  101 |   const wasChecked = await firstToggle.isChecked().catch(() => false);
  102 |   await firstToggle.click();
  103 | 
  104 |   await page.reload();
  105 |   const nowChecked = await page.locator('[data-testid^="toggle-"]').first().isChecked().catch(() => false);
  106 |   expect(nowChecked).toBe(!wasChecked);
  107 | });
  108 | 
```