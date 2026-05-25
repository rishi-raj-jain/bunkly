# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: messages.spec.ts >> MSG-01: sends a message and it appears in the thread
- Location: tests/messages.spec.ts:24:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/messages\//
Received string:  "http://localhost:3000/messages"

Call log:
  - Expect "toHaveURL" with timeout 120000ms
    3 × unexpected value "http://localhost:3000/bookings/8d21ec96-1ce4-4e2b-b0b8-2d11455f032c"
    112 × unexpected value "http://localhost:3000/messages"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - alert [ref=e2]: Messages — Bunkly
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - link "BUNKLY" [ref=e7] [cursor=pointer]:
            - /url: /
            - generic [ref=e8]: BUNKLY
          - generic [ref=e9]: Established • MMXXVI
        - navigation [ref=e10]:
          - link "The Houses" [active] [ref=e11] [cursor=pointer]:
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
      - generic [ref=e34]:
        - heading "Messages" [level=1] [ref=e35]
        - paragraph [ref=e36]: 0 conversations
      - generic [ref=e38]:
        - img [ref=e39]
        - heading "No messages yet" [level=3] [ref=e42]
        - paragraph [ref=e43]: When you book a property, you can message the host here.
    - contentinfo [ref=e44]:
      - generic [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]: BUNKLY
          - generic [ref=e48]: Travels of distinction • Since MMXIV
          - img [ref=e50]
        - generic [ref=e56]:
          - generic [ref=e57]:
            - heading "The Houses" [level=3] [ref=e58]
            - generic [ref=e59]: ✦
            - list [ref=e60]:
              - listitem [ref=e61]:
                - link "The Collection" [ref=e62] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e63]:
                - link "New Openings" [ref=e64] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e65]:
                - link "About the House" [ref=e66] [cursor=pointer]:
                  - /url: /about
          - generic [ref=e67]:
            - heading "Voyages" [level=3] [ref=e68]
            - generic [ref=e69]: ✦
            - list [ref=e70]:
              - listitem [ref=e71]:
                - link "List Your Property" [ref=e72] [cursor=pointer]:
                  - /url: /host
              - listitem [ref=e73]:
                - link "Host Resources" [ref=e74] [cursor=pointer]:
                  - /url: /host/resources
              - listitem [ref=e75]:
                - link "Community Forum" [ref=e76] [cursor=pointer]:
                  - /url: /host/community
          - generic [ref=e77]:
            - heading "Reception" [level=3] [ref=e78]
            - generic [ref=e79]: ✦
            - list [ref=e80]:
              - listitem [ref=e81]:
                - link "Concierge" [ref=e82] [cursor=pointer]:
                  - /url: /help
              - listitem [ref=e83]:
                - link "Safety & Comfort" [ref=e84] [cursor=pointer]:
                  - /url: /safety
              - listitem [ref=e85]:
                - link "Cancellation Options" [ref=e86] [cursor=pointer]:
                  - /url: /cancellation
          - generic [ref=e87]:
            - heading "The House" [level=3] [ref=e88]
            - generic [ref=e89]: ✦
            - list [ref=e90]:
              - listitem [ref=e91]:
                - link "Privacy" [ref=e92] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e93]:
                - link "Terms of Service" [ref=e94] [cursor=pointer]:
                  - /url: /terms
              - listitem [ref=e95]:
                - link "Accessibility" [ref=e96] [cursor=pointer]:
                  - /url: /accessibility
        - generic [ref=e97]: © MMXXVI • Bunkly & Co. • A small family house of travel • v0.2.0
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // MSG-03 · Messages inbox renders  [P1]
  4  | test('MSG-03: messages inbox loads and shows conversations or empty state', async ({ page }) => {
  5  |   await page.goto('/messages');
  6  |   await expect(page.getByTestId('messages-title')).toBeVisible();
  7  |   const hasList = await page.getByTestId('conversations-list').isVisible({ timeout: 120_000 }).catch(() => false);
  8  |   const hasEmpty = await page.getByTestId('messages-empty').isVisible({ timeout: 120_000 }).catch(() => false);
  9  |   expect(hasList || hasEmpty).toBe(true);
  10 | });
  11 | 
  12 | // MSG-02 · Create new conversation with property host  [P1]
  13 | test('MSG-02: contacts host from booking detail and lands on conversation thread', async ({ page }) => {
  14 |   await page.goto('/bookings');
  15 |   await page.getByTestId('tab-upcoming').click();
  16 |   await page.locator('[data-testid^="booking-card-"]').first().click();
  17 | 
  18 |   await page.getByTestId('contact-property').click();
  19 |   await expect(page).toHaveURL(/\/messages\//);
  20 |   await expect(page.getByTestId('conversation-property-name')).toBeVisible();
  21 | });
  22 | 
  23 | // MSG-01 · Send message in existing conversation  [P1]
  24 | test('MSG-01: sends a message and it appears in the thread', async ({ page }) => {
  25 |   // Navigate to first available conversation
  26 |   await page.goto('/messages');
  27 |   const conv = page.locator('[data-testid^="conversation-"]').first();
  28 |   const hasConv = await conv.isVisible({ timeout: 120_000 }).catch(() => false);
  29 |   if (!hasConv) {
  30 |     // Create one first via booking contact
  31 |     await page.goto('/bookings');
  32 |     await page.getByTestId('tab-upcoming').click();
  33 |     await page.locator('[data-testid^="booking-card-"]').first().click();
  34 |     await page.getByTestId('contact-property').click();
  35 |   } else {
  36 |     await conv.click();
  37 |   }
  38 | 
> 39 |   await expect(page).toHaveURL(/\/messages\//);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  40 |   const msgBody = `Test message ${Date.now()}`;
  41 |   await page.getByTestId('message-input').fill(msgBody);
  42 |   await page.getByTestId('send-message').click();
  43 | 
  44 |   await expect(page.getByTestId('message-list')).toContainText(msgBody);
  45 | });
  46 | 
  47 | // MSG-04 · Archive conversation  [P2]
  48 | // NOTE: Archive button has no data-testid in the current UI. Skipped pending implementation.
  49 | test.skip('MSG-04: archives a conversation and it disappears from inbox', async () => {});
  50 | 
```