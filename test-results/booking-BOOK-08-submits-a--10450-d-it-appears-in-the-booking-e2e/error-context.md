# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.ts >> BOOK-08: submits a service request and it appears in the booking
- Location: tests/booking.spec.ts:148:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('service-section')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('service-section')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]: Bunkly — Find Your Perfect Stay
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - link "BUNKLY" [ref=e7] [cursor=pointer]:
            - /url: /
            - generic [ref=e8]: BUNKLY
          - generic [ref=e9]: Established • MMXXVI
        - navigation [ref=e10]:
          - link "The Houses" [ref=e11] [cursor=pointer]:
            - /url: /search
          - link "Destinations" [ref=e12] [cursor=pointer]:
            - /url: /search
          - link "The House" [ref=e13] [cursor=pointer]:
            - /url: /about
          - link "Concierge" [ref=e14] [cursor=pointer]:
            - /url: /help
          - generic [ref=e15]: ✦
          - link "Messages" [ref=e16] [cursor=pointer]:
            - /url: /messages
            - img [ref=e17]
            - text: Messages
          - link "Wishlists" [ref=e19] [cursor=pointer]:
            - /url: /account/wishlists
            - img [ref=e20]
            - text: Wishlists
          - link "Notices" [ref=e22] [cursor=pointer]:
            - /url: /account/notifications
            - img [ref=e23]
            - text: Notices
          - link "My Voyages" [ref=e26] [cursor=pointer]:
            - /url: /bookings
          - link "Account" [ref=e27] [cursor=pointer]:
            - /url: /account
            - img [ref=e28]
            - text: Account
          - link "Reserve a Suite" [ref=e31] [cursor=pointer]:
            - /url: /login
    - main [ref=e32]:
      - generic [ref=e33]:
        - img "Bunkly Boutique Paris" [ref=e34]
        - generic [ref=e37]:
          - link "Back to My Trips" [ref=e38] [cursor=pointer]:
            - /url: /bookings
            - img [ref=e39]
            - text: Back to My Trips
          - generic [ref=e41]:
            - generic [ref=e42]:
              - heading "Bunkly Boutique Paris" [level=1] [ref=e43]
              - paragraph [ref=e44]:
                - img [ref=e45]
                - text: 12 Rue de Rivoli, Paris, France
            - generic [ref=e48]: Checked In
      - generic [ref=e49]:
        - generic [ref=e51]:
          - generic [ref=e52]:
            - paragraph [ref=e53]: Confirmation Number
            - paragraph [ref=e54]: BC-100006
          - paragraph [ref=e55]: Booked May 25, 2026
        - generic [ref=e56]:
          - generic [ref=e57]:
            - generic [ref=e58]:
              - heading "Stay Details" [level=3] [ref=e60]:
                - img [ref=e61]
                - text: Stay Details
              - generic [ref=e63]:
                - generic [ref=e64]:
                  - generic [ref=e65]:
                    - paragraph [ref=e66]: Check-in
                    - paragraph [ref=e67]: Sep 22, 2026
                    - paragraph [ref=e68]: After 14:00:00
                  - generic [ref=e69]:
                    - paragraph [ref=e70]: Check-out
                    - paragraph [ref=e71]: Sep 25, 2026
                    - paragraph [ref=e72]: Before 12:00:00
                - generic [ref=e73]:
                  - img [ref=e74]
                  - text: 3 nights
            - generic [ref=e77]:
              - heading "Room Details" [level=3] [ref=e79]:
                - img [ref=e80]
                - text: Room Details
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - generic [ref=e84]:
                    - paragraph [ref=e85]: Chambre Classique
                    - paragraph [ref=e86]: standard
                  - generic [ref=e87]: 250 sq ft
                - generic [ref=e89]: 1x queen bed
            - generic [ref=e90]:
              - heading "Guest Information" [level=3] [ref=e92]:
                - img [ref=e93]
                - text: Guest Information
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - img [ref=e99]
                  - generic [ref=e102]: Sarah Chen
                - generic [ref=e103]:
                  - img [ref=e104]
                  - generic [ref=e107]: sarah@example.com
                - generic [ref=e108]:
                  - img [ref=e109]
                  - generic [ref=e111]: +1-555-1052
                - generic [ref=e112]:
                  - img [ref=e113]
                  - generic [ref=e118]: 2 adults, 1 child
            - generic [ref=e119]:
              - heading "Add-ons" [level=3] [ref=e121]:
                - img [ref=e122]
                - text: Add-ons
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - paragraph [ref=e128]: Breakfast Package
                  - paragraph [ref=e129]: "Qty: 1"
                - generic [ref=e130]: $35
          - generic [ref=e131]:
            - generic [ref=e132]:
              - heading "Price Summary" [level=3] [ref=e134]:
                - img [ref=e135]
                - text: Price Summary
              - generic [ref=e138]:
                - generic [ref=e139]:
                  - generic [ref=e140]: Room (3 nights)
                  - generic [ref=e141]: $660
                - generic [ref=e142]:
                  - generic [ref=e143]: Taxes & fees
                  - generic [ref=e144]: $79
                - separator [ref=e145]
                - generic [ref=e146]:
                  - generic [ref=e147]: Total
                  - generic [ref=e148]: $799
            - generic [ref=e149]:
              - heading "Policy" [level=3] [ref=e151]:
                - img [ref=e152]
                - text: Policy
              - generic [ref=e154]:
                - generic [ref=e155]: free cancellation
                - paragraph [ref=e156]: Free cancellation up to 24 hours before check-in.
            - generic [ref=e158]:
              - button "Request Service" [ref=e159] [cursor=pointer]:
                - img [ref=e160]
                - text: Request Service
              - link "View Property" [ref=e163] [cursor=pointer]:
                - /url: /properties/bunkly-boutique-paris
                - button "View Property" [ref=e164]:
                  - img [ref=e165]
                  - text: View Property
              - link "Contact Property" [ref=e169] [cursor=pointer]:
                - /url: /messages
                - button "Contact Property" [ref=e170]:
                  - img [ref=e171]
                  - text: Contact Property
    - contentinfo [ref=e173]:
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e176]: BUNKLY
          - generic [ref=e177]: Travels of distinction • Since MMXIV
          - img [ref=e179]
        - generic [ref=e185]:
          - generic [ref=e186]:
            - heading "The Houses" [level=3] [ref=e187]
            - generic [ref=e188]: ✦
            - list [ref=e189]:
              - listitem [ref=e190]:
                - link "The Collection" [ref=e191] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e192]:
                - link "New Openings" [ref=e193] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e194]:
                - link "About the House" [ref=e195] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e196]:
            - heading "Voyages" [level=3] [ref=e197]
            - generic [ref=e198]: ✦
            - list [ref=e199]:
              - listitem [ref=e200]:
                - link "List Your Property" [ref=e201] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e202]:
                - link "Host Resources" [ref=e203] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e204]:
                - link "Community Forum" [ref=e205] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e206]:
            - heading "Reception" [level=3] [ref=e207]
            - generic [ref=e208]: ✦
            - list [ref=e209]:
              - listitem [ref=e210]:
                - link "Concierge" [ref=e211] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e212]:
                - link "Safety & Comfort" [ref=e213] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e214]:
                - link "Cancellation Options" [ref=e215] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e216]:
            - heading "The House" [level=3] [ref=e217]
            - generic [ref=e218]: ✦
            - list [ref=e219]:
              - listitem [ref=e220]:
                - link "Privacy" [ref=e221] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e222]:
                - link "Terms of Service" [ref=e223] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e224]:
                - link "Accessibility" [ref=e225] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e226]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
```

# Test source

```ts
  53  |   await expect(page.getByTestId('bookings-title')).toBeVisible();
  54  |   // At least one upcoming booking card
  55  |   await page.getByTestId('tab-upcoming').click();
  56  |   await expect(page.locator('[data-testid^="booking-card-"]').first()).toBeVisible();
  57  | });
  58  | 
  59  | // BOOK-03 · Cancel a booking
  60  | test('BOOK-03: cancels an upcoming booking and shows cancelled status', async ({ page }) => {
  61  |   await page.goto('/bookings');
  62  |   await page.getByTestId('tab-upcoming').click();
  63  |   await page.locator('[data-testid^="booking-card-"]').first().click();
  64  |   await expect(page).toHaveURL(/\/bookings\//);
  65  | 
  66  |   await page.getByTestId('cancel-booking').click();
  67  |   await expect(page.getByTestId('confirm-cancel')).toBeVisible();
  68  |   await page.getByTestId('confirm-cancel').click();
  69  | 
  70  |   await expect(page.getByTestId('booking-detail-status')).toContainText(/cancelled/i);
  71  | });
  72  | 
  73  | // ─── P1 ──────────────────────────────────────────────────────────────────────
  74  | 
  75  | // BOOK-04 · View booking detail
  76  | test('BOOK-04: booking detail shows dates, room type, and total', async ({ page }) => {
  77  |   await page.goto('/bookings');
  78  |   await page.getByTestId('tab-upcoming').click();
  79  |   await page.locator('[data-testid^="booking-card-"]').first().click();
  80  | 
  81  |   await expect(page.getByTestId('booking-detail-title')).toBeVisible();
  82  |   await expect(page.getByTestId('booking-detail-status')).toBeVisible();
  83  |   await expect(page.getByTestId('room-type-name')).toBeVisible();
  84  |   await expect(page.getByTestId('booking-detail-total')).toBeVisible();
  85  |   await expect(page.getByTestId('checkin-details')).toBeVisible();
  86  |   await expect(page.getByTestId('checkout-details')).toBeVisible();
  87  | });
  88  | 
  89  | // BOOK-05 · Modify booking dates
  90  | test('BOOK-05: modifies booking dates and shows success', async ({ page }) => {
  91  |   await page.goto('/bookings');
  92  |   await page.getByTestId('tab-upcoming').click();
  93  |   await page.locator('[data-testid^="booking-card-"]').first().click();
  94  | 
  95  |   await page.getByTestId('modify-booking-button').click();
  96  |   await expect(page.getByTestId('modify-booking-dialog')).toBeVisible();
  97  | 
  98  |   const newCheckIn = futureDate(120);
  99  |   const newCheckOut = futureDate(123);
  100 |   await page.getByTestId('modify-checkin').fill(newCheckIn);
  101 |   await page.getByTestId('modify-checkout').fill(newCheckOut);
  102 |   await page.getByTestId('submit-modification').click();
  103 | 
  104 |   await expect(page.getByTestId('modify-success')).toBeVisible();
  105 | });
  106 | 
  107 | // BOOK-06 · Add add-on to booking
  108 | test('BOOK-06: adds breakfast add-on and it appears in booking detail', async ({ page }) => {
  109 |   await page.goto('/bookings');
  110 |   await page.getByTestId('tab-upcoming').click();
  111 |   await page.locator('[data-testid^="booking-card-"]').first().click();
  112 | 
  113 |   await expect(page.getByTestId('addon-selector')).toBeVisible();
  114 |   const addBtn = page.getByTestId('add-addon-breakfast');
  115 |   // Only click if not already added
  116 |   if (await addBtn.isVisible({ timeout: 120_000 }).catch(() => false)) {
  117 |     await addBtn.click();
  118 |     await expect(page.getByTestId('remove-addon-breakfast')).toBeVisible();
  119 |   }
  120 | });
  121 | 
  122 | // BOOK-07 · Online check-in flow
  123 | test('BOOK-07: completes online check-in and shows completion state', async ({ page }) => {
  124 |   await page.goto('/bookings');
  125 |   await page.getByTestId('tab-upcoming').click();
  126 |   await page.locator('[data-testid^="booking-card-"]').first().click();
  127 | 
  128 |   const checkinBtn = page.getByTestId('online-checkin-button');
  129 |   await expect(checkinBtn).toBeVisible();
  130 |   await checkinBtn.click();
  131 | 
  132 |   await expect(page.getByTestId('online-checkin-dialog')).toBeVisible();
  133 | 
  134 |   // Step 1 – preferences
  135 |   await expect(page.getByTestId('checkin-step-preferences')).toBeVisible();
  136 |   await page.getByTestId('checkin-arrival-time').fill('15:00');
  137 |   await page.getByTestId('checkin-continue-verify').click();
  138 | 
  139 |   // Step 2 – verify ID
  140 |   await expect(page.getByTestId('checkin-step-verify')).toBeVisible();
  141 |   await page.getByTestId('checkin-id-verify').click();
  142 |   await page.getByTestId('checkin-submit').click();
  143 | 
  144 |   await expect(page.getByTestId('checkin-complete')).toBeVisible();
  145 | });
  146 | 
  147 | // BOOK-08 · Service request during active booking  [P2]
  148 | test('BOOK-08: submits a service request and it appears in the booking', async ({ page }) => {
  149 |   await page.goto('/bookings');
  150 |   await page.getByTestId('tab-upcoming').click();
  151 |   await page.locator('[data-testid^="booking-card-"]').first().click();
  152 | 
> 153 |   await expect(page.getByTestId('service-section')).toBeVisible();
      |                                                     ^ Error: expect(locator).toBeVisible() failed
  154 |   await page.getByTestId('service-request-button').click();
  155 |   await expect(page.getByTestId('service-request-dialog')).toBeVisible();
  156 | 
  157 |   await page.getByTestId('service-type-select').selectOption({ index: 1 });
  158 |   await page.getByTestId('service-details-input').fill('Please bring extra towels.');
  159 |   await page.getByTestId('submit-service-request').click();
  160 | 
  161 |   await expect(page.getByTestId('service-success')).toBeVisible();
  162 | });
  163 | 
```