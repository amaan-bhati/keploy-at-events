# Keploy at events

A one-page link hub to share at events: who Keploy is, a Keploy-styled QR code that opens this
same page, the team's LinkedIn profiles, and where to go next (GitHub, testing guides, the app).

## Run locally

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Edit the content

Everything the page says lives in `lib/content.ts`: the heading, the description, the team
(name, role, LinkedIn, avatar) and the resource cards. Links to keploy.io and app.keploy.io get
UTM tags automatically (`utm_source=event`, `utm_medium=qr_linkpage`,
`utm_campaign=keploy_at_events`, `utm_content=<card>`), so event traffic is visible in GA4.

## QR code

The QR code is drawn on the server and always points at the address the page is served from
(the Vercel URL or a custom domain). To pin it to a specific URL, set `NEXT_PUBLIC_SITE_URL`
in the Vercel project settings, for example `https://keploy-at-events.vercel.app`.

It uses the highest error correction level, so the bunny in the centre does not affect scanning.

## Deploy

Import the repo in Vercel (framework preset: Next.js, no extra settings needed).
