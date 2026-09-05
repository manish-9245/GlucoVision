// AES-GCM 256-bit encryption for creds at rest in D1 — uses Web Crypto API (Workers)
// ENCRYPTION_KEY must be 32-byte base64 via wrangler secret put ENCRYPTION_KEY
const ENC_ALGO = "AES-GCM";

function b64ToBytes(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}
function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

async function getKey(base64Key: string): Promise<CryptoKey> {
  const raw = b64ToBytes(base64Key);
  return crypto.subtle.importKey("raw", raw, { name: ENC_ALGO }, false, ["encrypt", "decrypt"]);
}

export async function encryptText(plain: string, base64Key: string): Promise<{ iv: string; ciphertext: string }> {
  const key = await getKey(base64Key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = await crypto.subtle.encrypt({ name: ENC_ALGO, iv }, key, new TextEncoder().encode(plain));
  return { iv: bytesToB64(iv), ciphertext: bytesToB64(new Uint8Array(enc)) };
}

export async function decryptText(ciphertextB64: string, ivB64: string, base64Key: string): Promise<string> {
  const key = await getKey(base64Key);
  const iv = b64ToBytes(ivB64);
  const data = b64ToBytes(ciphertextB64);
  const dec = await crypto.subtle.decrypt({ name: ENC_ALGO, iv }, key, data);
  return new TextDecoder().decode(dec);
}

// Helper to store/retrieve encrypted secret in D1
export async function storeEncryptedSecret(DB: D1Database, keyName: string, plainValue: string, base64Key: string) {
  const { iv, ciphertext } = await encryptText(plainValue, base64Key);
  const id = `sec_${keyName}`;
  await DB.prepare(
    `INSERT INTO secrets (id, key_name, encrypted_value, iv, updated_at) VALUES (?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%SZ','now'))
     ON CONFLICT(key_name) DO UPDATE SET encrypted_value=excluded.encrypted_value, iv=excluded.iv, updated_at=excluded.updated_at`
  )
    .bind(id, keyName, ciphertext, iv)
    .run();
  return id;
}

export async function getEncryptedSecret(DB: D1Database, keyName: string, base64Key: string): Promise<string | null> {
  const row = await DB.prepare("SELECT encrypted_value, iv FROM secrets WHERE key_name = ?").bind(keyName).first<{ encrypted_value: string; iv: string }>();
  if (!row) return null;
  return decryptText(row.encrypted_value, row.iv, base64Key);
}
