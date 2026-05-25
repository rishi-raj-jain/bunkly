# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Push schema directly to DB (dev only, skips migrations)
npm run db:seed      # Seed database with demo data (requires .env with DATABASE_URL)
npm run db:studio    # Open Drizzle Studio (DB GUI)
```

No test runner is configured.

## Architecture

Bunkly is a hotel booking app. It's a Next.js 15 App Router project backed by Neon PostgreSQL (serverless) via Drizzle ORM.

**Data flow pattern:**
- Pages are Server Components that fetch data directly via Drizzle
- Mutations go through Server Actions in `src/lib/actions/` (`"use server"` files)
- Client interactivity uses React state; TanStack Query is a dependency but not yet wired for real-time features
- Auth state comes from Auth.js `auth()` call in Server Components or actions

**Auth (`src/lib/auth.ts`):**
- NextAuth v5 with Credentials + Google OAuth
- JWT session strategy; `session.user.id` is the user's UUID
- **Passwords are stored and compared as plaintext** — intentional for demo purposes
- Seeded users have known passwords for test automation

**Database (`src/lib/db/`):**
- `schema.ts` — single file containing all tables, enums, and relations
- `index.ts` — lazy-initialized Drizzle proxy (avoids connection at import time)
- `seed.ts` — deterministic seed: 10-15 properties across 5 cities, 365 days of inventory, predictable confirmation numbers (prefix `BC-`)
- Migrations live in `src/lib/db/migrations/`

**Key schema relationships:**
- `property` → `room_type` → `room_inventory` (per-date availability with unique index on `room_type_id + date`)
- `booking` → `payment`, `booking_addon`, `booking_modification`
- `user` → `guest_profile`, `loyalty_member`, `notification_preference`
- `conversation` → `conversation_participant` → `message`

**Server Actions (`src/lib/actions/`):**
Each file owns one domain: `booking.ts`, `reviews.ts`, `messages.ts`, `notifications.ts`, `wishlists.ts`, `loyalty.ts`, `checkin.ts`, `account.ts`, etc. Actions call `auth()` to gate authenticated operations.

**Components:**
- `src/components/ui/` — design system primitives (Button, Input, Card, Badge, etc.) built with Radix UI + CVA
- Feature components are colocated by domain: `booking/`, `search/`, `property/`, `messaging/`, `review/`, etc.

**App routes:**
- `(auth)/` — login, register, forgot-password
- `search/` — results page driven by URL search params
- `properties/[slug]/` — property detail + booking sidebar
- `bookings/[id]/` — booking detail and `[id]/confirmation`
- `account/` — profile, payment methods, wishlists, loyalty, notifications, price alerts, reviews
- `messages/[id]/` — conversation threads
- `api/auth/` — NextAuth handlers + register endpoint

## Design Choices

- Every interactive element has a `data-testid` attribute for Playwright selectors
- Seed data is deterministic (fixed slugs, predictable confirmation numbers, known passwords)
- No real payments or email sending — all Stripe and Resend calls are stubbed
