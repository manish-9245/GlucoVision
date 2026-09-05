# Security Policy

## Reporting a Vulnerability

**Do not** open a public issue for security vulnerabilities. Email the maintainer via GitHub or open a private security advisory at https://github.com/manish-9245/GlucoVision/security/advisories/new

We aim to respond within 48 hours.

## Secrets Handling

- **Never commit** `.env`, `.env.encrypted`, `.wrangler/`, or real API keys. All secrets are stored via:
  - `wrangler secret put NVIDIA_API_KEY` / `ENCRYPTION_KEY` / `JWT_SECRET` (Cloudflare Workers)
  - D1 `secrets` table with AES-GCM encryption (`backend/src/crypto.ts`)
  - Python backup `backend/nim_backup.py` encrypts to `.env.encrypted` via Fernet
- Repo is scanned for `nvapi-` patterns — only `startswith` checks are allowed, never real keys
- `SECURITY.md` and `backend/README.md` document rotation: `storeEncryptedSecret` → D1, `wrangler secret put` → Workers

## Supported Versions

| Version | Supported |
|---------|-----------|
| main    | ✅        |

## Scope

This is a screening aid, not a diagnosis. All AI results require ophthalmologist confirmation via eSanjeevani before treatment (see Responsible AI in app).
