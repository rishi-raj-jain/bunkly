# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reviews.spec.ts >> REV-01: submits a review from a booking detail page
- Location: tests/reviews.spec.ts:5:5

# Error details

```
Error: No eligible booking found for review
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
        - heading "My Trips" [level=1] [ref=e34]
        - paragraph [ref=e35]: 5 upcoming · 0 past · 1 cancelled
      - generic [ref=e37]:
        - generic [ref=e38]:
          - button "Upcoming 5" [active] [ref=e39] [cursor=pointer]:
            - img [ref=e40]
            - text: Upcoming
            - generic [ref=e42]: "5"
          - button "Past 0" [ref=e43] [cursor=pointer]:
            - img [ref=e44]
            - text: Past
            - generic [ref=e47]: "0"
          - button "Cancelled 1" [ref=e48] [cursor=pointer]:
            - img [ref=e49]
            - text: Cancelled
            - generic [ref=e53]: "1"
        - generic [ref=e54]:
          - link "Checked In Bunkly Boutique Paris Paris, France Chambre Classique · BC-100006 Sep 22, 2026 — Sep 25, 2026 3 nights 2 adults, 1 child $799" [ref=e55] [cursor=pointer]:
            - /url: /bookings/8d21ec96-1ce4-4e2b-b0b8-2d11455f032c
            - generic [ref=e58]:
              - generic [ref=e59]:
                - img [ref=e61]
                - generic [ref=e63]: Checked In
              - generic [ref=e64]:
                - generic [ref=e65]:
                  - generic [ref=e66]:
                    - generic [ref=e67]:
                      - heading "Bunkly Boutique Paris" [level=3] [ref=e68]
                      - paragraph [ref=e69]:
                        - img [ref=e70]
                        - text: Paris, France
                    - img [ref=e73]
                  - paragraph [ref=e75]: Chambre Classique · BC-100006
                - generic [ref=e76]:
                  - generic [ref=e77]:
                    - img [ref=e78]
                    - text: Sep 22, 2026 — Sep 25, 2026
                  - generic [ref=e80]:
                    - img [ref=e81]
                    - text: 3 nights
                  - generic [ref=e84]:
                    - img [ref=e85]
                    - text: 2 adults, 1 child
                  - generic [ref=e90]: $799
          - link "Confirmed The Grand Bunkly NYC New York, United States Standard King · BC-100000 Jul 5, 2026 — Jul 6, 2026 1 night 2 adults $335" [ref=e91] [cursor=pointer]:
            - /url: /bookings/98316e45-2c1b-45c8-8553-ce9a63770bd8
            - generic [ref=e94]:
              - generic [ref=e95]:
                - img [ref=e97]
                - generic [ref=e99]: Confirmed
              - generic [ref=e100]:
                - generic [ref=e101]:
                  - generic [ref=e102]:
                    - generic [ref=e103]:
                      - heading "The Grand Bunkly NYC" [level=3] [ref=e104]
                      - paragraph [ref=e105]:
                        - img [ref=e106]
                        - text: New York, United States
                    - img [ref=e109]
                  - paragraph [ref=e111]: Standard King · BC-100000
                - generic [ref=e112]:
                  - generic [ref=e113]:
                    - img [ref=e114]
                    - text: Jul 5, 2026 — Jul 6, 2026
                  - generic [ref=e116]:
                    - img [ref=e117]
                    - text: 1 night
                  - generic [ref=e120]:
                    - img [ref=e121]
                    - text: 2 adults
                  - generic [ref=e126]: $335
          - link "Pending Bunkly Lodge Tokyo Tokyo, Japan Compact Single · BC-100003 Jun 29, 2026 — Jul 1, 2026 2 nights 2 adults, 1 child $336" [ref=e127] [cursor=pointer]:
            - /url: /bookings/849bdb98-951e-4d8a-b596-7fc23967c398
            - generic [ref=e130]:
              - generic [ref=e131]:
                - img [ref=e133]
                - generic [ref=e135]: Pending
              - generic [ref=e136]:
                - generic [ref=e137]:
                  - generic [ref=e138]:
                    - generic [ref=e139]:
                      - heading "Bunkly Lodge Tokyo" [level=3] [ref=e140]
                      - paragraph [ref=e141]:
                        - img [ref=e142]
                        - text: Tokyo, Japan
                    - img [ref=e145]
                  - paragraph [ref=e147]: Compact Single · BC-100003
                - generic [ref=e148]:
                  - generic [ref=e149]:
                    - img [ref=e150]
                    - text: Jun 29, 2026 — Jul 1, 2026
                  - generic [ref=e152]:
                    - img [ref=e153]
                    - text: 2 nights
                  - generic [ref=e156]:
                    - img [ref=e157]
                    - text: 2 adults, 1 child
                  - generic [ref=e162]: $336
          - link "Confirmed Bunkly Beach House Barcelona Barcelona, Spain Sea View Room · BC-100009 May 30, 2026 — Jun 2, 2026 3 nights 2 adults, 1 child $655" [ref=e163] [cursor=pointer]:
            - /url: /bookings/d8b4bbf8-4366-4118-803c-fcf64a92b342
            - generic [ref=e166]:
              - generic [ref=e167]:
                - img [ref=e169]
                - generic [ref=e171]: Confirmed
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - generic [ref=e174]:
                    - generic [ref=e175]:
                      - heading "Bunkly Beach House Barcelona" [level=3] [ref=e176]
                      - paragraph [ref=e177]:
                        - img [ref=e178]
                        - text: Barcelona, Spain
                    - img [ref=e181]
                  - paragraph [ref=e183]: Sea View Room · BC-100009
                - generic [ref=e184]:
                  - generic [ref=e185]:
                    - img [ref=e186]
                    - text: May 30, 2026 — Jun 2, 2026
                  - generic [ref=e188]:
                    - img [ref=e189]
                    - text: 3 nights
                  - generic [ref=e192]:
                    - img [ref=e193]
                    - text: 2 adults, 1 child
                  - generic [ref=e198]: $655
          - link "Confirmed Bunkly Resort & Spa Bali Ubud, Indonesia Garden Villa · BC-100012 May 26, 2026 — May 31, 2026 5 nights 1 adult $1,960" [ref=e199] [cursor=pointer]:
            - /url: /bookings/65f15516-9bd7-412b-94f0-9edac6cd9476
            - generic [ref=e202]:
              - generic [ref=e203]:
                - img [ref=e205]
                - generic [ref=e207]: Confirmed
              - generic [ref=e208]:
                - generic [ref=e209]:
                  - generic [ref=e210]:
                    - generic [ref=e211]:
                      - heading "Bunkly Resort & Spa Bali" [level=3] [ref=e212]
                      - paragraph [ref=e213]:
                        - img [ref=e214]
                        - text: Ubud, Indonesia
                    - img [ref=e217]
                  - paragraph [ref=e219]: Garden Villa · BC-100012
                - generic [ref=e220]:
                  - generic [ref=e221]:
                    - img [ref=e222]
                    - text: May 26, 2026 — May 31, 2026
                  - generic [ref=e224]:
                    - img [ref=e225]
                    - text: 5 nights
                  - generic [ref=e228]:
                    - img [ref=e229]
                    - text: 1 adult
                  - generic [ref=e234]: $1,960
    - contentinfo [ref=e235]:
      - generic [ref=e236]:
        - generic [ref=e237]:
          - generic [ref=e238]: BUNKLY
          - generic [ref=e239]: Travels of distinction • Since MMXIV
          - img [ref=e241]
        - generic [ref=e247]:
          - generic [ref=e248]:
            - heading "The Houses" [level=3] [ref=e249]
            - generic [ref=e250]: ✦
            - list [ref=e251]:
              - listitem [ref=e252]:
                - link "The Collection" [ref=e253] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e254]:
                - link "New Openings" [ref=e255] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e256]:
                - link "About the House" [ref=e257] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e258]:
            - heading "Voyages" [level=3] [ref=e259]
            - generic [ref=e260]: ✦
            - list [ref=e261]:
              - listitem [ref=e262]:
                - link "List Your Property" [ref=e263] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e264]:
                - link "Host Resources" [ref=e265] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e266]:
                - link "Community Forum" [ref=e267] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e268]:
            - heading "Reception" [level=3] [ref=e269]
            - generic [ref=e270]: ✦
            - list [ref=e271]:
              - listitem [ref=e272]:
                - link "Concierge" [ref=e273] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e274]:
                - link "Safety & Comfort" [ref=e275] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e276]:
                - link "Cancellation Options" [ref=e277] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e278]:
            - heading "The House" [level=3] [ref=e279]
            - generic [ref=e280]: ✦
            - list [ref=e281]:
              - listitem [ref=e282]:
                - link "Privacy" [ref=e283] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e284]:
                - link "Terms of Service" [ref=e285] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e286]:
                - link "Accessibility" [ref=e287] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e288]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
  - alert [ref=e289]
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export function futureDate(daysFromNow: number): string {
  4  |   const d = new Date();
  5  |   d.setDate(d.getDate() + daysFromNow);
  6  |   return d.toISOString().split('T')[0];
  7  | }
  8  | 
  9  | export const SARAH = { email: 'sarah@example.com', password: 'password123' };
  10 | 
  11 | // Known slugs derived from seed property names via slugify()
  12 | export const PARIS_SLUG = 'bunkly-boutique-paris';
  13 | export const NYC_SLUG = 'the-grand-bunkly-nyc';
  14 | 
  15 | // Dates safely beyond the seeded booking range (1-60 days out) so inventory is free
  16 | export const BOOK_CHECKIN = futureDate(90);
  17 | export const BOOK_CHECKOUT = futureDate(93);
  18 | 
  19 | /**
  20 |  * Navigates through /bookings until it finds a booking detail page where
  21 |  * write-review-button is present. Returns the URL of that page.
  22 |  * Throws if no eligible booking is found among the first 5 cards.
  23 |  */
  24 | export async function findBookingForReview(page: Page): Promise<void> {
  25 |   await page.goto('/bookings');
  26 |   await page.getByTestId('tab-upcoming').click();
  27 |   const cards = page.locator('[data-testid^="booking-card-"]');
  28 |   const count = await cards.count();
  29 |   for (let i = 0; i < Math.min(count, 5); i++) {
  30 |     await cards.nth(i).click();
  31 |     const btn = page.getByTestId('write-review-button');
  32 |     if (await btn.isVisible({ timeout: 120_000 }).catch(() => false)) return;
  33 |     await page.goto('/bookings');
  34 |     await page.getByTestId('tab-upcoming').click();
  35 |   }
> 36 |   throw new Error('No eligible booking found for review');
     |         ^ Error: No eligible booking found for review
  37 | }
  38 | 
```