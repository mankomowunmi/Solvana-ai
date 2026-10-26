# Solvana AI API

This Cloudflare Worker keeps AI inference away from the public GitHub Pages frontend.

## Local setup

```bash
cd worker
npm install
npx wrangler login
npm run dev
```

Set `VITE_API_URL` to the local Worker URL when running the frontend.

## Deploy

```bash
npm run deploy
```

Then set `ALLOWED_ORIGIN` in `wrangler.toml` to the exact deployed frontend origin and set `VITE_API_URL` in the frontend deployment environment.

The Worker uses the Cloudflare Workers AI binding. No provider API key belongs in the frontend or Git repository.

## Commercial-readiness notes

- Add a durable rate limiter before public launch; the Worker currently validates payload size and content but does not provide durable per-user quotas.
- Add authentication and a database before offering cross-device saved plans.
- Add terms, privacy policy, support contact, abuse reporting, and an incident response process.
- Review model output and safety behavior with representative tests before charging users.
