# Lupira Web

The real Lupira product, as a web client — signup, email verification,
login, password reset, the actual symptom-check flow against the real
scikit-learn-backed diagnosis endpoint, history, and profile management.
All of it calls the real API in `../` (this repo's Express backend); none
of it is illustrative. The self-contained, no-login mini demo that ships
in `../public/demo.html` is a separate, deliberately simpler thing — this
is the real app.

## Stack

React 19, TypeScript, Vite, Tailwind v4, React Router, TanStack Query.

## Running locally

```bash
npm install
cp .env.example .env   # VITE_API_URL, defaults to http://localhost:3000
npm run dev
```

The backend needs to be running too (`npm run dev` in the repo root) and
needs `cors` to actually allow this app's origin — see `WEB_APP_URL` in
the root `.env`.

## What's not wired up yet

Google/Facebook login buttons aren't in the UI. The backend already
supports both (`/api/auth/google/*`, `/api/auth/facebook/*`), but they
need a real OAuth client registered for this app's specific origin in
Google Cloud Console / Meta for Developers — that's an external account
setup step, not a code change, so it's left for whoever sets that up to
wire in (`api/auth.ts` already has `loginWithGoogle`/`signUpWithGoogle`
ready to call).

## Deploying

Static build (`npm run build` → `dist/`) — works on any static host.
`public/_redirects` is already set up for SPA client-side routing
(Netlify-syntax, which Render's Static Sites also honor).

Once deployed, two things need to happen on the backend for this to
actually work in production:

1. Set `WEB_APP_URL` to this app's real URL — it's used both for CORS
   (the backend will reject requests from any origin not in its
   allowlist) and for the email-verification/password-reset pages to
   link back to the right place.
2. Nothing else — the backend already reads `WEB_APP_URL` correctly as
   of the commit that added this app.
