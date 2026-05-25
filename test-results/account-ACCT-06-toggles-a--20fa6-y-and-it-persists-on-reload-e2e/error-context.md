# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account.spec.ts >> ACCT-06: toggles a notification category and it persists on reload
- Location: tests/account.spec.ts:95:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
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
      - generic [ref=e35]:
        - link [ref=e36] [cursor=pointer]:
          - /url: /account
          - img [ref=e37]
        - heading "Notifications" [level=1] [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]:
          - heading "Notification Preferences" [level=3] [ref=e43]
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: Category
              - generic [ref=e48]: Email
              - generic [ref=e49]: Push
              - generic [ref=e50]: SMS
            - generic [ref=e51]:
              - generic [ref=e52]:
                - paragraph [ref=e53]: Booking Updates
                - paragraph [ref=e54]: Confirmation, reminders, cancellations
              - switch [checked] [ref=e56] [cursor=pointer]
              - switch [checked] [ref=e59] [cursor=pointer]
              - switch [ref=e62] [cursor=pointer]
            - generic [ref=e64]:
              - generic [ref=e65]:
                - paragraph [ref=e66]: Promotions & Deals
                - paragraph [ref=e67]: Special offers and discounts
              - switch [checked] [ref=e69] [cursor=pointer]
              - switch [checked] [ref=e72] [cursor=pointer]
              - switch [ref=e75] [cursor=pointer]
            - generic [ref=e77]:
              - generic [ref=e78]:
                - paragraph [ref=e79]: Messages
                - paragraph [ref=e80]: New messages from properties
              - switch [checked] [ref=e82] [cursor=pointer]
              - switch [checked] [ref=e85] [cursor=pointer]
              - switch [ref=e88] [cursor=pointer]
            - generic [ref=e90]:
              - generic [ref=e91]:
                - paragraph [ref=e92]: Price Alerts
                - paragraph [ref=e93]: Notifications when prices drop
              - switch [checked] [ref=e95] [cursor=pointer]
              - switch [checked] [ref=e98] [cursor=pointer]
              - switch [ref=e101] [cursor=pointer]
        - generic [ref=e103]:
          - img [ref=e104]
          - heading "No notifications" [level=3] [ref=e109]
          - paragraph [ref=e110]: You're all caught up! Notifications about bookings, messages, and deals will appear here.
    - contentinfo [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]:
          - generic [ref=e114]: BUNKLY
          - generic [ref=e115]: Travels of distinction • Since MMXIV
          - img [ref=e117]
        - generic [ref=e123]:
          - generic [ref=e124]:
            - heading "The Houses" [level=3] [ref=e125]
            - generic [ref=e126]: ✦
            - list [ref=e127]:
              - listitem [ref=e128]:
                - link "The Collection" [ref=e129] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e130]:
                - link "New Openings" [ref=e131] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e132]:
                - link "About the House" [ref=e133] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e134]:
            - heading "Voyages" [level=3] [ref=e135]
            - generic [ref=e136]: ✦
            - list [ref=e137]:
              - listitem [ref=e138]:
                - link "List Your Property" [ref=e139] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e140]:
                - link "Host Resources" [ref=e141] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e142]:
                - link "Community Forum" [ref=e143] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e144]:
            - heading "Reception" [level=3] [ref=e145]
            - generic [ref=e146]: ✦
            - list [ref=e147]:
              - listitem [ref=e148]:
                - link "Concierge" [ref=e149] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e150]:
                - link "Safety & Comfort" [ref=e151] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e152]:
                - link "Cancellation Options" [ref=e153] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e154]:
            - heading "The House" [level=3] [ref=e155]
            - generic [ref=e156]: ✦
            - list [ref=e157]:
              - listitem [ref=e158]:
                - link "Privacy" [ref=e159] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e160]:
                - link "Terms of Service" [ref=e161] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e162]:
                - link "Accessibility" [ref=e163] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e164]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e165]
```

# Test source

```ts
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
> 106 |   expect(nowChecked).toBe(!wasChecked);
      |                      ^ Error: expect(received).toBe(expected) // Object.is equality
  107 | });
  108 | 
```