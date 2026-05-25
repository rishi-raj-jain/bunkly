# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loyalty.spec.ts >> LOY-02: points history and tier progress are visible for an enrolled member
- Location: tests/loyalty.spec.ts:22:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('points-history')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('points-history')

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
          - 'link "Bunkly Rewards base 500 Points 0 Stays Member #BC-MPL75LJQ" [ref=e49] [cursor=pointer]':
            - /url: /account/loyalty
            - generic [ref=e51]:
              - generic [ref=e52]:
                - img [ref=e53]
                - heading "Bunkly Rewards" [level=3] [ref=e56]
              - generic [ref=e57]: base
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - paragraph [ref=e60]: "500"
                  - paragraph [ref=e61]: Points
                - generic [ref=e62]:
                  - paragraph [ref=e63]: "0"
                  - paragraph [ref=e64]: Stays
              - paragraph [ref=e65]: "Member #BC-MPL75LJQ"
          - generic [ref=e66]:
            - link "Wishlists Saved properties and collections" [ref=e67] [cursor=pointer]:
              - /url: /account/wishlists
              - generic [ref=e69]:
                - img [ref=e70]
                - generic [ref=e72]:
                  - paragraph [ref=e73]: Wishlists
                  - paragraph [ref=e74]: Saved properties and collections
                - img [ref=e75]
            - link "Notifications Manage notification preferences" [ref=e77] [cursor=pointer]:
              - /url: /account/notifications
              - generic [ref=e79]:
                - img [ref=e80]
                - generic [ref=e83]:
                  - paragraph [ref=e84]: Notifications
                  - paragraph [ref=e85]: Manage notification preferences
                - img [ref=e86]
            - link "Payment Methods Manage saved cards" [ref=e88] [cursor=pointer]:
              - /url: /account/payment-methods
              - generic [ref=e90]:
                - img [ref=e91]
                - generic [ref=e93]:
                  - paragraph [ref=e94]: Payment Methods
                  - paragraph [ref=e95]: Manage saved cards
                - img [ref=e96]
            - link "My Reviews Reviews you've written" [ref=e98] [cursor=pointer]:
              - /url: /account/reviews
              - generic [ref=e100]:
                - img [ref=e101]
                - generic [ref=e103]:
                  - paragraph [ref=e104]: My Reviews
                  - paragraph [ref=e105]: Reviews you've written
                - img [ref=e106]
            - link "Price Alerts Monitor price drops" [ref=e108] [cursor=pointer]:
              - /url: /account/price-alerts
              - generic [ref=e110]:
                - img [ref=e111]
                - generic [ref=e114]:
                  - paragraph [ref=e115]: Price Alerts
                  - paragraph [ref=e116]: Monitor price drops
                - img [ref=e117]
            - link "Bunkly Rewards 500 points" [ref=e119] [cursor=pointer]:
              - /url: /account/loyalty
              - generic [ref=e121]:
                - img [ref=e122]
                - generic [ref=e125]:
                  - paragraph [ref=e126]: Bunkly Rewards
                  - paragraph [ref=e127]: 500 points
                - img [ref=e128]
        - generic [ref=e130]:
          - generic [ref=e131]:
            - heading "Personal Information" [level=3] [ref=e133]:
              - img [ref=e134]
              - text: Personal Information
            - generic [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e139]:
                  - text: Full Name
                  - textbox [ref=e140]: Sarah Chen
                - generic [ref=e141]:
                  - text: Phone
                  - textbox [ref=e142]
                - generic [ref=e143]:
                  - text: Date of Birth
                  - textbox [ref=e144]
              - button "Save Changes" [ref=e145] [cursor=pointer]
          - generic [ref=e146]:
            - heading "Preferences" [level=3] [ref=e148]:
              - img [ref=e149]
              - text: Preferences
            - generic [ref=e152]:
              - generic [ref=e153]:
                - generic [ref=e154]:
                  - text: Language
                  - combobox [ref=e155]:
                    - option "English" [selected]
                    - option "Español"
                    - option "Français"
                    - option "Deutsch"
                    - option "日本語"
                - generic [ref=e156]:
                  - text: Currency
                  - combobox [ref=e157]:
                    - option "USD ($)" [selected]
                    - option "EUR (€)"
                    - option "GBP (£)"
                    - option "JPY (¥)"
                    - option "AUD (A$)"
              - button "Save Preferences" [ref=e158] [cursor=pointer]
          - generic [ref=e159]:
            - heading "Security" [level=3] [ref=e161]:
              - img [ref=e162]
              - text: Security
            - generic [ref=e164]:
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - paragraph [ref=e167]: Password
                  - paragraph [ref=e168]: "Last changed: Never"
                - button "Change" [ref=e169] [cursor=pointer]
              - generic [ref=e170]:
                - generic [ref=e171]:
                  - paragraph [ref=e172]: Two-factor authentication
                  - paragraph [ref=e173]: Not enabled
                - button "Enable" [ref=e174] [cursor=pointer]
    - contentinfo [ref=e175]:
      - generic [ref=e176]:
        - generic [ref=e177]:
          - generic [ref=e178]: BUNKLY
          - generic [ref=e179]: Travels of distinction • Since MMXIV
          - img [ref=e181]
        - generic [ref=e187]:
          - generic [ref=e188]:
            - heading "The Houses" [level=3] [ref=e189]
            - generic [ref=e190]: ✦
            - list [ref=e191]:
              - listitem [ref=e192]:
                - link "The Collection" [ref=e193] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e194]:
                - link "New Openings" [ref=e195] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e196]:
                - link "About the House" [ref=e197] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e198]:
            - heading "Voyages" [level=3] [ref=e199]
            - generic [ref=e200]: ✦
            - list [ref=e201]:
              - listitem [ref=e202]:
                - link "List Your Property" [ref=e203] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e204]:
                - link "Host Resources" [ref=e205] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e206]:
                - link "Community Forum" [ref=e207] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e208]:
            - heading "Reception" [level=3] [ref=e209]
            - generic [ref=e210]: ✦
            - list [ref=e211]:
              - listitem [ref=e212]:
                - link "Concierge" [ref=e213] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e214]:
                - link "Safety & Comfort" [ref=e215] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e216]:
                - link "Cancellation Options" [ref=e217] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e218]:
            - heading "The House" [level=3] [ref=e219]
            - generic [ref=e220]: ✦
            - list [ref=e221]:
              - listitem [ref=e222]:
                - link "Privacy" [ref=e223] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e224]:
                - link "Terms of Service" [ref=e225] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e226]:
                - link "Accessibility" [ref=e227] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e228]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e229]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // LOY-01 · Join loyalty program  [P0]
  4  | test('LOY-01: enrolls in loyalty program and shows welcome points', async ({ page }) => {
  5  |   await page.goto('/account/loyalty');
  6  |   await expect(page.getByTestId('loyalty-title')).toBeVisible();
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
> 32 |   await expect(page.getByTestId('points-history')).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
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