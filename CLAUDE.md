# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Production build
npm start       # Start production server
npm run lint    # Run ESLint
```

No test runner is configured. `tests/getTracking.http` is a manual REST client test file.

## Environment Variables

Not committed — create a `.env.local` file with:

```
AZURE_EMAIL_CONNECTION_STRING=    # Azure Communication Email service
AZURE_EMAIL_SENDER=               # Sender email address
URGENTSHIP_LOGO_URL=              # Defaults to https://www.urgentship.com/logo.png
TRACKING_URL=                     # External tracking API endpoint
TRACKING_API_KEY=                 # API key for tracking service
```

## Architecture

Next.js 15 App Router with TypeScript and Tailwind CSS 4.

**Pages:**
- `/` — Marketing landing page composed of section components (Hero, Features, Services, CoverageSection, CallToAction)
- `/track` — Package tracking; `page.tsx` is a server component with Suspense wrapping `TrackPageClient.tsx` (client component). Tracking number and ZIP are passed as query params from the homepage `TrackingForm`.

**API Routes (`src/app/api/`):**
- `POST /api/track` — Validates ZIP code format, calls external service at `TRACKING_URL`, returns tracking data (status, recipient info, events, delivery image URL)
- `POST /api/contact-sales` — Sends contact form email via Azure Communication Email; captures IP, resolves geolocation via `ipapi.co`, logs with Pacific timezone
- `GET /api/image-proxy` — Proxies external delivery confirmation image URLs to avoid CORS/mixed-content issues

**Component conventions:**
- Scroll-triggered animations use `AnimatedOnScroll` (wraps Framer Motion)
- Interactive US state map lives in `USMap.tsx` + `src/tools/statePaths.ts`
- `MobileNav.tsx` handles mobile navigation separately from `Navbar.tsx`

**Path alias:** `@/*` resolves to `./src/*`
