# Contributing to GlucoVision

Thank you for considering contributing! This project is built for rural PHCs — every improvement helps prevent blindness.

## Quick Start

```bash
git clone https://github.com/manish-9245/GlucoVision.git
cd GlucoVision
npm install
npm run dev
# http://localhost:3000  login: asha@glucovision.in / demo123
```

With Cloudflare backend (optional):

```bash
cd backend && npm install
npx wrangler d1 migrations apply glucovision --local
npx wrangler d1 execute glucovision --local --file=./seed.sql
npx wrangler dev --local --persist-to=./.wrangler/state --port 8788
# In root .env.local: NEXT_PUBLIC_API_URL=http://localhost:8788
```

## Development

- **UI:** Next.js 16 + Tailwind 4 + Framer Motion + GSAP. Keep `Cabinet Grotesk` for display, `Geist` for body. Maintain `py-32 md:py-48` section spacing and `grid-flow-dense` for bento.
- **Backend:** Hono + Cloudflare Workers + D1/R2. Add migrations in `backend/migrations/`, never edit applied files.
- **AI:** NIM fallback in `backend/src/nim.ts` + `backend/nim_backup.py` (keep `import requests`).

## Pull Requests

1. Fork → branch `feat/your-feature` → commit with conventional messages (`feat:`, `fix:`, `docs:`)
2. Ensure `npm run build` passes and `npx tsc --project backend/tsconfig.json --noEmit` passes
3. Update `README.md` if you change setup/deploy
4. Never commit `.env`, `.env.encrypted`, `.wrangler/`, or real `NVIDIA_API_KEY` — use `wrangler secret put` + D1 `secrets` (AES-GCM)

## Code Style

- No emojis in code/comments (per repo policy)
- Use `file_path:line_number` when referencing code
- Keep UI/backend strictly segregated (`src/` vs `backend/`)

## Reporting Issues

Use GitHub Issues with template: describe PHC workflow affected, steps to reproduce, expected vs actual, and whether offline-first is impacted.

## License

By contributing, you agree your contributions are MIT licensed.
