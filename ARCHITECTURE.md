# Bunkly — Architecture & Implementation Plan


## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | Server components, server actions, streaming, middleware |
| Language | TypeScript 5 (strict) | End-to-end type safety |
| Styling | Tailwind CSS v4 + Radix UI + CVA | Modern utility-first with accessible primitives |
| Database | PostgreSQL 16 on Neon | Serverless, branching for preview deploys, scales to zero |
| ORM | Drizzle ORM | Type-safe, SQL-like, zero runtime overhead, great migrations |
| Auth | Auth.js (NextAuth v5) | Credentials + OAuth, built for App Router |
| Payments | Stripe | Payment intents, 3DS, subscriptions, invoicing, split pay |
| State | Zustand (client) + URL params (server) | Minimal client state, bookmarkable search |
| Data Fetching | TanStack Query | Client-side caching, optimistic updates (messaging, notifications) |
| Email | Resend + React Email | Transactional email as React components |
| Icons | Lucide React | Same set as Linear/shadcn |
| Maps | Mapbox GL JS | Interactive map, geocoding, clustering |
| Real-time | SSE (Server-Sent Events) | Works on Vercel serverless, sufficient for notifications/messages |
| SMS | Twilio | SMS notifications |
| File Storage | Vercel Blob | Property photos, review images, ID uploads |
| Search | PostgreSQL full-text + trigram | Good enough for Tier 1, upgrade to Meilisearch if needed |
| Deploy | Vercel | Preview deploys, edge middleware, Neon integration |

## Database Schema

### Core Tables

```
user                    → id, email, name, phone, role(guest/host/admin), avatar_url
guest_profile           → user preferences, accessibility needs, dietary, ID doc
property                → name, slug, type, star_rating, address, lat/lng, policies, avg_rating
property_amenity        → pool, breakfast, parking, wifi, spa, etc.
property_image          → url, alt_text, sort_order, is_primary
room_type               → name, category, max_occupancy, bed_config, base_rate, amenities
room_type_image         → photos per room type
room_inventory          → per-date availability (room_type_id, date, total, booked, rate)
room                    → physical rooms for assignment (room_number, floor, status)
booking                 → confirmation_no, status, dates, guests, pricing snapshot, policies
booking_group           → group booking organizer
booking_addon           → breakfast, spa, transfers, insurance, parking
booking_modification    → change log with price diffs
payment                 → stripe intent, amount, status, method, card info
payment_method          → saved cards/wallets per user
refund                  → stripe refund, amount, reason, status
review                  → rating, title, body, photos, host_response, helpful_count
review_vote             → helpful/not helpful per user
conversation            → booking-linked or property-linked threads
conversation_participant → guest/host/staff with read tracking
message                 → body, type, attachments, translations
notification            → type, title, body, channel, read status, grouping
notification_preference → per-category email/push/sms toggles, quiet hours
wishlist                → named collections, shareable
wishlist_item           → property in wishlist
price_alert             → target price for property/destination
search_history          → recent searches with filters
loyalty_member          → tier, points, qualifying stays
points_transaction      → earn/redeem/transfer/expire log
checkin_record          → method, ID verification, digital key
folio                   → itemized charges, settlement
service_request         → room service, housekeeping, concierge, complaints
```

### Key Indexes
- GiST on `property(latitude, longitude)` for geo queries
- GIN on `tsvector(name, city, country, description)` for full-text search
- GIN trigram on `property.name`, `property.city` for autocomplete
- Unique on `room_inventory(room_type_id, date)` for availability
- Unique on `property.slug`, `booking.confirmation_no`

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (marketing)/            # Homepage, about (shared layout)
│   ├── (auth)/                 # Login, register, forgot-password
│   ├── search/                 # Search results (list + map)
│   ├── properties/[slug]/      # Property detail + booking wizard
│   ├── bookings/               # Booking history, detail, modify, cancel, checkin
│   ├── messages/               # Inbox + conversation threads
│   ├── account/                # Profile, payment methods, notifications, wishlists, loyalty
│   ├── admin/                  # Back-of-house (Tier 3)
│   └── api/                    # Route handlers (webhooks, SSE, search)
├── components/
│   ├── ui/                     # Design system primitives (Button, Input, Card, Dialog, etc.)
│   ├── search/                 # SearchBar, FilterPanel, MapView, PropertyCard
│   ├── booking/                # BookingWizard, RoomSelector, DatePicker, PriceBreakdown
│   ├── property/               # Gallery, AmenityList, ReviewSection
│   ├── messaging/              # ConversationList, MessageThread, Composer
│   ├── notifications/          # NotificationCenter, NotificationItem
│   └── layout/                 # Header, Footer, MobileNav
├── lib/
│   ├── db/                     # Drizzle schema, connection, migrations, seed
│   ├── auth.ts                 # NextAuth config
│   ├── stripe.ts               # Stripe client
│   ├── email.ts                # Resend helpers
│   ├── search.ts               # PG full-text query builder
│   ├── pricing.ts              # Dynamic pricing, tax calc
│   ├── availability.ts         # Inventory checks
│   └── validators/             # Zod schemas
├── actions/                    # Server Actions (booking, search, reviews, messages, etc.)
├── hooks/                      # Custom React hooks
├── stores/                     # Zustand stores
└── types/                      # Shared TypeScript types
```

## API Design

- **Server Actions** for all mutations (type-safe, CSRF-protected, progressive enhancement)
- **Route Handlers** only for: Stripe webhooks, SSE streams, complex search queries
- **Server Components** for data loading (no client-side fetch waterfalls)
- **TanStack Query** for real-time client data (messaging, notifications)
- **Zod** validation shared between client forms and server actions
- Cursor-based pagination, idempotency keys on payments, optimistic locking on availability

## QA-Friendliness

- `data-testid` on every interactive element
- Deterministic seed data (predictable names, prices, confirmation numbers)
- Database reset to seed state via single command
- Playwright-compatible selectors throughout

## Build Phases

### Phase 0: Foundation
- Next.js 15 + TypeScript + Tailwind + ESLint
- Neon PostgreSQL + Drizzle schema + migrations
- Auth.js (credentials + Google OAuth)
- Seed script (10-15 properties, 5 cities, 365 days inventory)
- Design system primitives (Button, Input, Card, Dialog, etc.)
- Shell layout (Header, Footer, responsive nav)
- Deploy to Vercel

### Phase 1A: Search & Discovery (108 flows)
Homepage, search bar, autocomplete, results page, filters, sorting, map view, wishlists, price alerts, comparison, availability calendar, accessibility, pagination

### Phase 1B: Booking (200 flows)
Property detail, booking wizard, Stripe integration, confirmation, email, booking history, modifications, cancellations, group booking, promo codes, dynamic pricing

### Phase 1C: Check-in, Check-out & Reviews (45 flows)
Online check-in, room assignment, express checkout, folio, review submission, review display, moderation

### Phase 1D: Payments Processing (65 flows)
Digital wallets, auth/capture, 3DS, split payments, installments, currency conversion, receipts

### Phase 1E: Notifications & Messaging (104 flows)
Notification dispatch, in-app center, preferences, booking notifications, messaging threads, SSE real-time, templates, auto-responses, translation

### Phase 2: Loyalty & Guest Experience (212 flows)
Points, tiers, rewards, referrals, room service, housekeeping, concierge, complaints

### Phase 3: Back-of-House (353 flows)
Reservations, room management, property management, analytics

### Phase 4: Advanced Payments & Platform (669 flows)
Refunds, invoicing, subscriptions, host payouts, promotions, integrations
