# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account.spec.ts >> ACCT-01: updates display name and phone, persists on reload
- Location: tests/account.spec.ts:4:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.fill: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('profile-form').locator('[name="name"]')

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
        - heading "Account" [level=1] [ref=e34]
        - paragraph [ref=e35]: Manage your profile and preferences
      - generic [ref=e37]:
        - generic [ref=e38]:
          - generic [ref=e40]:
            - img [ref=e42]
            - heading "Sarah Chen" [level=2] [ref=e45]
            - paragraph [ref=e46]: sarah@example.com
            - generic [ref=e47]: guest
            - paragraph [ref=e48]: Member since May 25, 2026
          - generic [ref=e50]:
            - img [ref=e51]
            - heading "Bunkly Rewards" [level=3] [ref=e54]
            - paragraph [ref=e55]: Join to earn points on every stay
            - button "Join Now" [ref=e56] [cursor=pointer]
          - generic [ref=e57]:
            - link "Wishlists Saved properties and collections" [ref=e58] [cursor=pointer]:
              - /url: /account/wishlists
              - generic [ref=e60]:
                - img [ref=e61]
                - generic [ref=e63]:
                  - paragraph [ref=e64]: Wishlists
                  - paragraph [ref=e65]: Saved properties and collections
                - img [ref=e66]
            - link "Notifications Manage notification preferences" [ref=e68] [cursor=pointer]:
              - /url: /account/notifications
              - generic [ref=e70]:
                - img [ref=e71]
                - generic [ref=e74]:
                  - paragraph [ref=e75]: Notifications
                  - paragraph [ref=e76]: Manage notification preferences
                - img [ref=e77]
            - link "Payment Methods Manage saved cards" [ref=e79] [cursor=pointer]:
              - /url: /account/payment-methods
              - generic [ref=e81]:
                - img [ref=e82]
                - generic [ref=e84]:
                  - paragraph [ref=e85]: Payment Methods
                  - paragraph [ref=e86]: Manage saved cards
                - img [ref=e87]
            - link "My Reviews Reviews you've written" [ref=e89] [cursor=pointer]:
              - /url: /account/reviews
              - generic [ref=e91]:
                - img [ref=e92]
                - generic [ref=e94]:
                  - paragraph [ref=e95]: My Reviews
                  - paragraph [ref=e96]: Reviews you've written
                - img [ref=e97]
            - link "Price Alerts Monitor price drops" [ref=e99] [cursor=pointer]:
              - /url: /account/price-alerts
              - generic [ref=e101]:
                - img [ref=e102]
                - generic [ref=e105]:
                  - paragraph [ref=e106]: Price Alerts
                  - paragraph [ref=e107]: Monitor price drops
                - img [ref=e108]
        - generic [ref=e110]:
          - generic [ref=e111]:
            - heading "Personal Information" [level=3] [ref=e113]:
              - img [ref=e114]
              - text: Personal Information
            - generic [ref=e117]:
              - generic [ref=e118]:
                - generic [ref=e119]:
                  - text: Full Name
                  - textbox [ref=e120]: Sarah Chen
                - generic [ref=e121]:
                  - text: Phone
                  - textbox [ref=e122]
                - generic [ref=e123]:
                  - text: Date of Birth
                  - textbox [ref=e124]
              - button "Save Changes" [ref=e125] [cursor=pointer]
          - generic [ref=e126]:
            - heading "Preferences" [level=3] [ref=e128]:
              - img [ref=e129]
              - text: Preferences
            - generic [ref=e132]:
              - generic [ref=e133]:
                - generic [ref=e134]:
                  - text: Language
                  - combobox [ref=e135]:
                    - option "English" [selected]
                    - option "Español"
                    - option "Français"
                    - option "Deutsch"
                    - option "日本語"
                - generic [ref=e136]:
                  - text: Currency
                  - combobox [ref=e137]:
                    - option "USD ($)" [selected]
                    - option "EUR (€)"
                    - option "GBP (£)"
                    - option "JPY (¥)"
                    - option "AUD (A$)"
              - button "Save Preferences" [ref=e138] [cursor=pointer]
          - generic [ref=e139]:
            - heading "Security" [level=3] [ref=e141]:
              - img [ref=e142]
              - text: Security
            - generic [ref=e144]:
              - generic [ref=e145]:
                - generic [ref=e146]:
                  - paragraph [ref=e147]: Password
                  - paragraph [ref=e148]: "Last changed: Never"
                - button "Change" [ref=e149] [cursor=pointer]
              - generic [ref=e150]:
                - generic [ref=e151]:
                  - paragraph [ref=e152]: Two-factor authentication
                  - paragraph [ref=e153]: Not enabled
                - button "Enable" [ref=e154] [cursor=pointer]
    - contentinfo [ref=e155]:
      - generic [ref=e156]:
        - generic [ref=e157]:
          - generic [ref=e158]: BUNKLY
          - generic [ref=e159]: Travels of distinction • Since MMXIV
          - img [ref=e161]
        - generic [ref=e167]:
          - generic [ref=e168]:
            - heading "The Houses" [level=3] [ref=e169]
            - generic [ref=e170]: ✦
            - list [ref=e171]:
              - listitem [ref=e172]:
                - link "The Collection" [ref=e173] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e174]:
                - link "New Openings" [ref=e175] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e176]:
                - link "About the House" [ref=e177] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e178]:
            - heading "Voyages" [level=3] [ref=e179]
            - generic [ref=e180]: ✦
            - list [ref=e181]:
              - listitem [ref=e182]:
                - link "List Your Property" [ref=e183] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e184]:
                - link "Host Resources" [ref=e185] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e186]:
                - link "Community Forum" [ref=e187] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e188]:
            - heading "Reception" [level=3] [ref=e189]
            - generic [ref=e190]: ✦
            - list [ref=e191]:
              - listitem [ref=e192]:
                - link "Concierge" [ref=e193] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e194]:
                - link "Safety & Comfort" [ref=e195] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e196]:
                - link "Cancellation Options" [ref=e197] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e198]:
            - heading "The House" [level=3] [ref=e199]
            - generic [ref=e200]: ✦
            - list [ref=e201]:
              - listitem [ref=e202]:
                - link "Privacy" [ref=e203] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e204]:
                - link "Terms of Service" [ref=e205] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e206]:
                - link "Accessibility" [ref=e207] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e208]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e209]
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
> 9   |   await page.getByTestId('profile-form').locator('[name="name"]').fill(newName);
      |                                                                   ^ Error: locator.fill: Test timeout of 120000ms exceeded.
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
  61  |   await expect(page.locator('[data-testid="payment-methods-list"]')).toContainText('4111');
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