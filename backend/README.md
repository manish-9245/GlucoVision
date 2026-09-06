# GlucoVision — Cloudflare backend for the PHC screening workflow

Deployable Hono Worker powering the GlucoVision app: auth, patient records, referrals, pharmacy, case chat, and NVIDIA NIM inference. It uses Cloudflare D1 for clinical data and secrets, optional R2 for fundus images, and serves the Next.js frontend when `NEXT_PUBLIC_API_URL` is configured. Without that env var, the frontend falls back to local mock data and localStorage for offline PHC use.

## Stack

- **Worker:** Hono `src/index.ts` with CORS, auth, patient CRUD, referrals, pharmacy, chat, and inference routes
- **DB:** Cloudflare D1 `glucovision` — schema `migrations/0001_initial.sql` through `migrations/0007_foot.sql` for patients, glucose readings, visits, referrals, pharmacy orders, foot checks, auth, chat, and secrets
- **Storage:** Optional R2 `glucovision-images` (`IMAGES` binding) for fundus photos — `POST /api/upload` → `R2` → `GET /api/images/:key`
- **Deploy:** `wrangler deploy` (Worker) + `wrangler d1 migrations apply` (local or remote)

## Quickstart (local)

```bash
cd backend
npm install

# 1) Create D1 + R2 (once)
npm run db:create            # wrangler d1 create glucovision  — copy database_id into wrangler.jsonc
wrangler r2 bucket create glucovision-images

# 2) Put database_id into wrangler.jsonc  (replace REPLACE_WITH_D1_ID)

# 3) Migrate + seed (local)
npm run db:migrate:local
npm run db:seed               # uses ../src/lib/mockData.ts 28 patients

# 4) Dev Worker (persists to .wrangler/state)
npm run dev
# Worker at http://localhost:8787
# Test: curl http://localhost:8787/api/health
#       curl http://localhost:8787/api/patients | jq

# 5) Point frontend to it
# In glucovision/.env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8787
# ALLOWED_ORIGIN=http://localhost:3000
# Then: npm run dev (Next, in repo root)
```

## Deploy to Cloudflare

```bash
cd backend

# 1) Login (once)
wrangler login

# 2) Create prod D1 + R2 (if not already)
wrangler d1 create glucovision
wrangler r2 bucket create glucovision-images
# Copy database_id into wrangler.jsonc

# 3) Migrate + seed prod
npm run db:migrate:remote
npm run db:seed:remote

# 4) Deploy Worker
npm run deploy
# → https://glucovision-api.<subdomain>.workers.dev

# 5) Deploy frontend (Cloudflare Pages)
# Option A: Pages + OpenNext (recommended for Next.js 16)
cd ..
npm install -D @opennextjs/cloudflare
npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
# Or: wrangler pages deploy .open-next/assets --project-name glucovision

# Option B: Vercel/Node (no Cloudflare) — keep backend Worker separate and set env:
# In Pages / Vercel env: NEXT_PUBLIC_API_URL=https://glucovision-api.<subdomain>.workers.dev
#                ALLOWED_ORIGIN=https://glucovision.pages.dev,https://your-domain.com
```

## API

- `GET /api/health` — probe
- `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` — authentication
- `GET /api/patients?search=&village=&riskMin=&limit=&offset=` — list
- `GET /api/patients/:id` — detail + glucose + visits
- `POST /api/patients` — `{name, age, gender, village, phone, diabetesYears, diabetesType?, bp, hbA1c, familyHistory, symptoms[], riskScore, medication[]}`
- `PATCH /api/patients/:id` — update local clinical fields such as risk, medication, prescriptions, and foot follow-up
- `POST /api/patients/:id/visits` — `{drStage, confidence, heatmapRegions[], notes, imageQuality, imageUrl?, date?}` (auto-creates referral if stage≥2)
- `GET /api/cases/:patientId/chat` and `POST /api/cases/:patientId/chat` — explainable case chat with context window management
- `GET /api/referrals?status=` + `PATCH /api/referrals/:id` `{status, doctor}`
- `GET /api/pharmacy` + `POST /api/pharmacy` + `PATCH /api/pharmacy/:id`
- `POST /api/upload` — `multipart file` → R2 `fundus/...` → `{key, url}`
- `GET /api/images/:key` — serve R2
- `GET /api/stats` — dashboard aggregates

All write endpoints use `prepare().bind().run()` (D1 prepared statements, no SQL injection) and respect `ALLOWED_ORIGIN` CORS.

## Frontend integration (offline-first)

`src/lib/store.tsx` already wraps `localStorage` + `src/lib/mockData.ts`. To go live, set `NEXT_PUBLIC_API_URL`:

```bash
NEXT_PUBLIC_API_URL=https://glucovision-api.<subdomain>.workers.dev npm run dev
```

`src/lib/api.ts` exports `apiFetch()`. Swap `useStore` to call it when `API_BASE` is set, else fallback to mock (so PHCs work offline with zero config). See `src/lib/api.ts:4`.

## R2 CORS (if direct upload from browser)

In Cloudflare dashboard → R2 → glucovision-images → Settings → CORS: allow `http://localhost:3000` + prod origin, `GET,POST,PUT`, `Content-Type`.

## Cost (D1 Free → Paid)

Free: 5M rows read/day, 100k writes/day, 5GB total. Paid: $5/mo + $0.001/M reads, $1/M writes, $0.75/GB storage. This schema is ~28 patients + ~150 glucose rows + ~20 visits — well within free.

## Troubleshooting

- `REPLACE_WITH_D1_ID` not replaced → `wrangler` error `database_id is required` — copy from `wrangler d1 list`
- `IMAGES` R2 missing → `Error: No such bucket` — `wrangler r2 bucket create glucovision-images`
- CORS blocked → set `ALLOWED_ORIGIN` in `backend/wrangler.jsonc` `vars` to include frontend origin
- `wrangler dev` port 8787 busy → `wrangler dev --port 8788`
