# waxwick.in

Production-ready D2C site for **waxwick** — handcrafted scented candles, hand-poured in Bangalore.

Built on Next.js 14 (App Router) + Tailwind + Razorpay + Meta CAPI. **No database** — products live in `lib/products.ts`, orders live in Razorpay.

## Stack

- Next.js 14 App Router (TypeScript)
- Tailwind CSS (warm cream + ember palette, Cormorant Garamond + Inter)
- Zustand (cart, persisted to localStorage)
- Razorpay (payments + webhook + admin payments list)
- Meta Pixel + Conversions API (event_id-deduped Purchase from browser AND server)
- `jose` JWT (admin auth via signed cookie)

## Getting started

```bash
cp .env.local.example .env.local   # fill in keys
npm install
npm run dev                        # http://localhost:3000
```

## Pages

- `/` — homepage (hero, marquee, social proof, featured, collections, mission, CTA)
- `/products` — catalogue with category filter + sort
- `/products/[slug]` — PDP (statically generated for every product)
- `/checkout` — single-page checkout, Razorpay modal
- `/order-confirmation/[orderId]` — thank-you page (fires browser Purchase event)
- `/admin` — orders dashboard, reads from Razorpay
- `/admin/login` — single-password admin sign-in

## API

| Route | Purpose |
|---|---|
| `GET /api/products` | All active products (force-static, hourly revalidate) |
| `GET /api/products/[slug]` | One product (static + revalidate) |
| `POST /api/orders` | Server-prices the cart, creates a Razorpay order, stashes customer + items in `notes` |
| `POST /api/orders/verify` | HMAC-verifies the browser callback signature, fires CAPI Purchase |
| `POST /api/webhook/razorpay` | Verifies `x-razorpay-signature` against raw body, fires CAPI Purchase using stashed `event_id` (Meta dedupes) |
| `POST /api/admin/auth` | Admin sign-in (returns signed JWT cookie) |
| `DELETE /api/admin/auth` | Admin sign-out |
| `GET /api/admin/payments` | Live payments list from Razorpay (admin-only) |

## Env vars

See [`.env.local.example`](./.env.local.example).

- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`, `META_ACCESS_TOKEN`, `META_TEST_EVENT_CODE` (optional)
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (32+ chars; `openssl rand -hex 32`)
- `NEXT_PUBLIC_SITE_URL`

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. Paste the env vars from `.env.local.example` into the Vercel project’s settings (Production + Preview).
4. After the first deploy, point `waxwick.in` at the project under Domains.
5. In the Razorpay dashboard, register your webhook URL: `https://waxwick.in/api/webhook/razorpay` with events `payment.captured` and `order.paid`.
6. In Meta Events Manager, paste the Pixel ID and a Conversions API access token, and add `https://waxwick.in/order-confirmation` to your test event URLs while validating CAPI.

## Source of truth

| Data | Lives in |
|---|---|
| Products | [`lib/products.ts`](lib/products.ts) — edit and commit |
| Orders | Razorpay (read via `/api/admin/payments`) |
| Cart | Browser localStorage (zustand persist) |

There is **no database**. If you need fulfilment tracking or stock as a source of truth, that is a future sprint — pick a data store first.
