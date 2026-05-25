# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loyalty.spec.ts >> LOY-01: enrolls in loyalty program and shows welcome points
- Location: tests/loyalty.spec.ts:4:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('loyalty-title')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('loyalty-title')

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // LOY-01 · Join loyalty program  [P0]
  4  | test('LOY-01: enrolls in loyalty program and shows welcome points', async ({ page }) => {
  5  |   await page.goto('/account/loyalty');
> 6  |   await expect(page.getByTestId('loyalty-title')).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  7  | 
  8  |   const joinBtn = page.getByTestId('join-loyalty');
  9  |   if (await joinBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
  10 |     await joinBtn.click();
  11 |     // After joining, points balance and tier should render
  12 |     await expect(page.getByTestId('points-balance')).toBeVisible();
  13 |     await expect(page.getByTestId('loyalty-tier')).toBeVisible();
  14 |   } else {
  15 |     // Already enrolled — verify the member dashboard renders
  16 |     await expect(page.getByTestId('points-balance')).toBeVisible();
  17 |     await expect(page.getByTestId('loyalty-tier')).toBeVisible();
  18 |   }
  19 | });
  20 | 
  21 | // LOY-02 · View points history  [P0]
  22 | test('LOY-02: points history and tier progress are visible for an enrolled member', async ({ page }) => {
  23 |   await page.goto('/account/loyalty');
  24 | 
  25 |   // Ensure enrolled first
  26 |   const joinBtn = page.getByTestId('join-loyalty');
  27 |   if (await joinBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
  28 |     await joinBtn.click();
  29 |   }
  30 | 
  31 |   await expect(page.getByTestId('points-balance')).toBeVisible();
  32 |   await expect(page.getByTestId('points-history')).toBeVisible();
  33 |   await expect(page.getByTestId('tier-progress')).toBeVisible();
  34 |   await expect(page.getByTestId('tier-benefits')).toBeVisible();
  35 | });
  36 | 
  37 | // LOY-03 · Redeem loyalty points at checkout  [P0]
  38 | // NOTE: Points redemption UI is not yet wired into the checkout form.
  39 | // This test will be implemented once the feature is built.
  40 | test.skip('LOY-03: loyalty points can be applied at checkout (not yet implemented)', async () => {});
  41 | 
```