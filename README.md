# Bunkly

A hotel booking app built with Next.js 15, Neon PostgreSQL, and Drizzle ORM.

## Getting started

```bash
cp .env.example .env        # add your DATABASE_URL
npm install
npm run db:migrate          # apply schema migrations
npm run db:seed             # load demo data
npm run dev                 # http://localhost:3000
```

## Available commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:push` | Push schema directly to DB (dev only, skips migrations) |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |

## Running E2E tests

Tests use [Playwright](https://playwright.dev). Playwright starts the production server (`npm run start`) automatically via `webServer` if it isn't already running. Make sure the app has been built first.

### Prerequisites

```bash
npm install
npm run build                        # required before running tests
npx playwright install --with-deps   # install browsers once
cp .env.example .env                 # DATABASE_URL must be set
```

### Run the full suite

```bash
npx playwright test
```

Playwright runs three projects in order:

1. **setup** — seeds the database and saves an authenticated session (`tests/.auth/user.json`)
2. **e2e** — all feature tests, reusing the saved session
3. **auth** — unauthenticated auth-flow tests (login, register, etc.)

### Run only P0 smoke tests

Tag your test runner to pick up the P0 cases:

```bash
npx playwright test --grep "BOOK-01|BOOK-02|BOOK-03|AUTH-0|SEARCH-0[123]|PROP-0|LOY-0|ACCT-0[345]"
```

### Run a single spec file

```bash
npx playwright test tests/booking.spec.ts
npx playwright test tests/auth.spec.ts
```

### Run with the HTML report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Run in headed mode (watch the browser)

```bash
HEADED=1 npx playwright test
```

### Run in UI mode (interactive)

```bash
npx playwright test --ui
```

## Test structure

```
tests/
├── auth.setup.ts       # seeds DB + saves storageState (setup project)
├── helpers.ts          # shared utilities: futureDate(), seeded user constants
├── auth.spec.ts        # AUTH-01–06  (auth project, no saved session)
├── booking.spec.ts     # BOOK-01–08
├── search.spec.ts      # SEARCH-01–04
├── property.spec.ts    # PROP-01–02
├── loyalty.spec.ts     # LOY-01–03
├── account.spec.ts     # ACCT-01–06
├── messages.spec.ts    # MSG-01–04
├── reviews.spec.ts     # REV-01–04
├── wishlist.spec.ts    # WISH-01–04
├── alerts.spec.ts      # ALERT-01–02
└── nav.spec.ts         # NAV-01 (static pages)
```

See [`docs/cc-test-plan.md`](docs/cc-test-plan.md) for the full prioritised test matrix (P0/P1/P2).

## Seeded demo accounts

| Email | Password | Role |
|-------|----------|------|
| `sarah@example.com` | `password123` | Guest (default test user) |
| `marcus@example.com` | `password123` | Guest |
| `emily@example.com` | `password123` | Guest |
| `admin@example.com` | `admin123` | Admin |
| `host@example.com` | `host123` | Host |
