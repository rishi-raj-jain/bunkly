# Bunkly E2E Test Matrix

Playwright project layout: `setup` seeds the DB and saves `tests/.auth/user.json`; `e2e` reuses that state; `auth` runs unauthenticated. Base URL: `http://localhost:3000`.

**Seeded credentials**

| User | Email | Password | Role |
|------|-------|----------|------|
| Sarah | `sarah@example.com` | `password123` | Guest |
| Marcus | `marcus@example.com` | `password123` | Guest |
| Emily | `emily@example.com` | `password123` | Guest |
| Admin | `admin@example.com` | `admin123` | Admin |
| Host | `host@example.com` | `host123` | Host |

Booking confirmation numbers follow the pattern `BC-1xxxxx` (seed generates 5 bookings, offset from 100 000).

---

## Priority Definitions

| Level | Meaning |
|-------|---------|
| **P0** | Business-critical. Broken = booking revenue blocked or users locked out. Must pass before any deploy. |
| **P1** | Core UX. Broken = significant feature degradation. Must pass before releasing the affected area. |
| **P2** | Secondary features and edge cases. Should pass but a broken P2 does not block a deploy. |

---

## P0 — Critical Path

These cover the end-to-end booking funnel and authentication. A single failure here blocks revenue.

### AUTH-01 · Register new account
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Precondition** | Unauthenticated, unique email not already in DB |
| **Steps** | 1. `GET /register` → fill `[data-testid="register-name"]`, `[data-testid="register-email"]`, `[data-testid="register-password"]` → submit `[data-testid="register-submit"]` |
| **Expected** | Redirected to home (or `/account`); session cookie present |
| **Edge cases** | Duplicate email shows inline error; password too short shows validation message |

### AUTH-02 · Login with valid credentials
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Precondition** | `sarah@example.com` seeded |
| **Steps** | 1. `GET /login` → fill `[data-testid="login-email"]` = `sarah@example.com`, `[data-testid="login-password"]` = `password123` → submit |
| **Expected** | Redirect to `/`; nav shows authenticated state |
| **Edge cases** | Wrong password shows error; empty fields blocked by HTML validation |

### AUTH-06 · Register with duplicate email
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Steps** | Attempt to register with `sarah@example.com` |
| **Expected** | Inline error "email already in use" (or equivalent); no new account created |

### AUTH-03 · Login with invalid credentials
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Steps** | Submit `sarah@example.com` + `wrongpassword` |
| **Expected** | Error message visible; user remains on `/login` |

### AUTH-05 · Forgot password flow
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Steps** | `GET /forgot-password` → submit known email |
| **Expected** | Success message displayed (email sending is stubbed; no real email expected) |

### AUTH-04 · Redirect unauthenticated user from protected route
| Field | Value |
|-------|-------|
| **Project** | `auth` |
| **Steps** | `GET /account` without a session |
| **Expected** | Redirected to `/login` (or 401) |

### SEARCH-01 · Search returns results for a valid city
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | 1. `GET /search?location=Paris&checkIn=2026-07-01&checkOut=2026-07-05&guests=2` |
| **Expected** | At least one property card rendered; cards contain name, price, and image |
| **Data note** | Seed includes properties across 5 cities — use one of those cities |

### SEARCH-02 · Empty search shows no-results state
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | Search for `location=Atlantis` with future dates |
| **Expected** | Empty state / "no results" message; no JS error in console |

### SEARCH-03 · Filter and sort search results
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | Apply price/amenity filters on `/search`; change sort order |
| **Expected** | Results update without full page reload; filter state reflected in URL params |

### PROP-01 · Property detail page renders correctly
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | `GET /properties/[slug]` for a seeded property |
| **Expected** | Name, images, description, amenities, reviews section, and booking sidebar all visible |

### PROP-02 · Booking sidebar shows unavailable dates
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | Select dates that overlap an existing seeded booking |
| **Expected** | Those dates marked unavailable or "Book now" disabled |

### LOY-01 · Join loyalty program
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | User not yet enrolled |
| **Steps** | `GET /account/loyalty` → `[data-testid="join-loyalty-btn"]` → confirm |
| **Expected** | Welcome bonus points shown; join button replaced by points balance |

### LOY-02 · View points history
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | Enrolled loyalty member with at least one transaction |
| **Steps** | `/account/loyalty` |
| **Expected** | Points balance and transaction history rendered |

### LOY-03 · Redeem loyalty points at checkout
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | Enrolled with enough points |
| **Steps** | Reach checkout → apply points redemption → confirm discount applied |
| **Expected** | Total price reduced by redeemed value; points balance decremented post-booking |

### ACCT-03 · Add payment method
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | `GET /account/payment-methods` → `[data-testid="add-payment-btn"]` → fill card details → save |
| **Expected** | Card appears in list with last-four digits |

### ACCT-04 · Set default payment method
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | At least two saved payment methods |
| **Steps** | Click "Set default" on a non-default card |
| **Expected** | That card marked as default; previous default unmarked |

### ACCT-05 · Delete payment method
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | Click delete on a non-default card → confirm |
| **Expected** | Card removed from list |

### BOOK-01 · Full booking funnel: search → property → checkout → confirmation
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | Authenticated as `sarah@example.com`; inventory seeded for the chosen dates |
| **Steps** | 1. Search for an available city and dates 2. Click a property card → `/properties/[slug]` 3. Select dates in booking sidebar 4. Click "Book now" → `/checkout` 5. Fill/confirm payment details 6. Submit → `/bookings/[id]/confirmation` |
| **Expected** | Confirmation page shows a `BC-` confirmation number; `[data-testid="confirmation-number"]` is visible |

### BOOK-02 · Booking appears in bookings list
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Precondition** | BOOK-01 completed, or seeded booking exists |
| **Steps** | `GET /bookings` |
| **Expected** | At least one booking card with correct dates and property name |

### BOOK-03 · Cancel a booking
| Field | Value |
|-------|-------|
| **Project** | `e2e` |
| **Steps** | 1. `GET /bookings/[id]` for a future booking 2. Click `[data-testid="cancel-booking-btn"]` 3. Confirm in dialog |
| **Expected** | Booking status changes to "Cancelled"; refund note visible |

---

## P1 — Core User Flows

These cover logged-in features that significantly affect user trust and retention.

### BOOK-04 · View booking detail
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | `GET /bookings/[id]` for a seeded booking |
| **Expected** | Check-in/out dates, property name, room type, and total price all rendered |

### BOOK-05 · Modify booking dates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | 1. Open modify-booking dialog (`[data-testid="modify-booking-btn"]`) 2. Change dates to a different available range 3. Submit |
| **Expected** | Updated dates reflected on booking detail; pricing updated |

### BOOK-06 · Add add-on to booking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | 1. `/bookings/[id]` 2. Select an add-on via `[data-testid="addon-selector"]` 3. Confirm |
| **Expected** | Add-on listed in booking detail; total price increases |

### BOOK-07 · Online check-in flow
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | 1. Open online check-in dialog on booking detail 2. Fill arrival time and preferences 3. Submit `[data-testid="checkin-submit"]` |
| **Expected** | Success toast/message; check-in status updated |

### ACCT-01 · Update profile
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | `GET /account` → edit name/phone via `[data-testid="profile-form"]` → save |
| **Expected** | Success feedback; updated values visible on reload |

### ACCT-02 · Change password
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | 1. Open change-password dialog 2. Enter current password `password123` 3. Enter new password 4. Submit |
| **Expected** | Success; login with new password works; old password rejected |

### MSG-01 · Send message in existing conversation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | `GET /messages/[id]` → type in `[data-testid="message-input"]` → submit |
| **Expected** | New message appears at bottom of thread with correct body and timestamp |

### MSG-02 · Create new conversation with property host
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | Property detail page → "Contact host" → fill initial message → send |
| **Expected** | Redirected to `/messages/[id]` for the new conversation; message visible |

### MSG-03 · Messages inbox renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | `GET /messages` |
| **Expected** | At least one conversation listed (seeded); no console errors |

### REV-01 · Submit a review
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Precondition** | Completed booking that has not been reviewed |
| **Steps** | 1. `GET /account/reviews` → "Write review" 2. Select rating, fill text → submit |
| **Expected** | Review appears in list under `/account/reviews` |

### REV-02 · Edit a review
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | Find an existing review → click edit → change rating/text → save |
| **Expected** | Updated content visible; timestamp shows edit |

### REV-04 · Mark review as helpful
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | On a property detail page, click "Helpful" on an existing review |
| **Expected** | Vote count increments; clicking again decrements (toggle) |

### REV-03 · Delete a review
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Steps** | Delete an existing review → confirm dialog |
| **Expected** | Review removed from list |


---

## P2 — Secondary Features & Edge Cases

These cover supporting features and boundary conditions. Failures here do not block a deploy.

### SEARCH-04 · Search history saved and cleared
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Perform two searches; navigate to search with empty query; verify recent searches shown; clear history |
| **Expected** | Recents appear; after clear, list is empty |

### BOOK-08 · Service request during active booking
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Open service request dialog on an active booking → fill type and description → submit |
| **Expected** | Request created; visible on booking detail |

### ACCT-06 · Update notification preferences
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | `GET /account/notifications` → toggle a category → save |
| **Expected** | Toggle persists on page reload |

### ALERT-01 · Create price alert
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | `GET /account/price-alerts` → fill property/date/price threshold → save |
| **Expected** | Alert appears in list with correct values |

### ALERT-02 · Toggle and delete price alert
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Disable an alert; re-enable it; then delete it |
| **Expected** | Status toggles correctly; deleted alert removed from list |

### WISH-01 · Create wishlist and add property
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | 1. `GET /account/wishlists` → create wishlist "Test List" 2. Navigate to a property → "Save" → choose "Test List" |
| **Expected** | Property appears inside wishlist on `/account/wishlists` |

### WISH-02 · Remove property from wishlist
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Remove saved property from wishlist |
| **Expected** | Property no longer shown; wishlist may show empty state |

### WISH-03 · Share wishlist
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Enable sharing on a wishlist → copy link |
| **Expected** | Shared link accessible without login; shows wishlist properties read-only |

### WISH-04 · Rename and delete wishlist
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Rename a wishlist → verify new name; delete it → verify removed |
| **Expected** | Name change persists; deleted wishlist absent from list |



### MSG-04 · Archive conversation
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | Archive a conversation from the inbox; confirm it disappears from main list |
| **Expected** | Conversation no longer in active inbox; can optionally confirm it appears in an archived view |

### NAV-01 · Static/marketing pages load without error
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Steps** | `GET` each of: `/about`, `/help`, `/cancellation`, `/privacy`, `/terms`, `/safety`, `/host`, `/careers`, `/press` |
| **Expected** | HTTP 200; no console JS errors; page title present |

---

## Execution Notes

1. **Setup project** (`auth.setup.ts`) must run `npm run db:seed` before asserting any seeded data.
2. **Isolation** — each test that mutates data (cancellation, review deletion, etc.) should either use a dedicated seeded fixture or clean up after itself to avoid ordering dependencies.
3. **`data-testid` coverage** — the CLAUDE.md spec says every interactive element has one; use `[data-testid="..."]` selectors exclusively over CSS classes.
4. **Payment stubs** — Stripe calls are stubbed; no real card numbers needed. Use any syntactically valid test card (e.g. `4242 4242 4242 4242`).
5. **Date arithmetic** — always compute future dates at runtime (`new Date()` + offset) rather than hardcoding, since inventory is seeded relative to the current date.
6. **P0 smoke gate** — a single Playwright tag (`@p0`) on P0 specs enables a fast `--grep @p0` run in CI before the full suite.
