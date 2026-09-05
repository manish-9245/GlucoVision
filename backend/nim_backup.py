"""
GlucoVision — NVIDIA NIM backup (Python) — import requests must stay
Mirrors the Worker fallback logic for local testing / disaster recovery.
Requires: pip install requests cryptography

Env:
  NVIDIA_API_KEY  — your integrate.api.nvidia.com key (Bearer)
  ENCRYPTION_KEY  — 32-byte base64 for Fernet (or set via python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
"""

import requests
import os
import json
import time
import base64
from typing import Optional

# keep import requests as requested — all HTTP via requests
invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"

# Creds handling — encrypt and save (do not commit plain .env)
try:
    from cryptography.fernet import Fernet
except ImportError:
    Fernet = None  # fallback to base64 obfuscation if not installed

CREDS_FILE = ".env.encrypted"
PLAIN_ENV = ".env"

def _load_key() -> Optional[bytes]:
    k = os.getenv("ENCRYPTION_KEY")
    if k:
        return k.encode() if isinstance(k, str) else k
    # try reading from .env.encrypted meta
    if os.path.exists(CREDS_FILE):
        try:
            with open(CREDS_FILE, "r") as f:
                meta = json.load(f)
                if meta.get("key"):
                    return meta["key"].encode()
        except Exception:
            pass
    return None

def encrypt_and_save_all_creds():
    """Encrypt NVIDIA_API_KEY + any other secrets and save to .env.encrypted (never commit plain)."""
    api_key = os.getenv("NVIDIA_API_KEY")
    if not api_key:
        print("[creds] NVIDIA_API_KEY not set — skipping encrypt")
        return
    key = _load_key()
    if Fernet and key:
        try:
            f = Fernet(key)
            token = f.encrypt(api_key.encode()).decode()
            payload = {"NVIDIA_API_KEY_enc": token, "key": key.decode(), "algo": "fernet"}
        except Exception as e:
            print(f"[creds] Fernet encrypt failed: {e} — falling back to base64")
            payload = {"NVIDIA_API_KEY_enc": base64.b64encode(api_key.encode()).decode(), "algo": "base64"}
    else:
        # base64 obfuscation (not strong) — instruct to install cryptography
        print("[creds] cryptography not installed — using base64 (install: pip install cryptography)")
        payload = {"NVIDIA_API_KEY_enc": base64.b64encode(api_key.encode()).decode(), "algo": "base64"}
    with open(CREDS_FILE, "w") as out:
        json.dump(payload, out, indent=2)
    # also ensure .gitignore contains .env.encrypted / .env
    print(f"[creds] Encrypted creds saved to {CREDS_FILE} (do not commit plain .env)")

def get_api_key() -> str:
    k = os.getenv("NVIDIA_API_KEY")
    if k and not k.startswith("nvapi-") and os.path.exists(CREDS_FILE):
        # try decrypt
        try:
            with open(CREDS_FILE, "r") as f:
                data = json.load(f)
            enc = data.get("NVIDIA_API_KEY_enc")
            if data.get("algo") == "fernet" and Fernet:
                f = Fernet(data["key"].encode())
                return f.decrypt(enc.encode()).decode()
            else:
                return base64.b64decode(enc).decode()
        except Exception:
            pass
    return k or ""

# ---- 3 model configs (exactly as you provided, kept) ----

MODELS = [
    {
        "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
        "stream": False,
        "payload": lambda image_url, prompt: {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": image_url}},
                    ],
                }
            ],
            "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
            "max_tokens": 65536,
            "reasoning_budget": 16384,
            "stream": False,
            "temperature": 0.6,
            "top_p": 0.95,
        },
    },
    {
        "model": "moonshotai/kimi-k3",
        "stream": True,
        "payload": lambda image_url, prompt: {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": image_url}},
                    ],
                }
            ],
            "model": "moonshotai/kimi-k3",
            "max_tokens": 16384,
            "seed": 0,
            "stream": True,
            "temperature": 1,
            "reasoning_effort": "max",
        },
    },
    {
        "model": "meta/llama-3.2-90b-vision-instruct",
        "stream": False,
        "payload": lambda image_url, prompt: {
            "messages": [
                {
                    "content": [
                        {"image_url": {"url": image_url}, "type": "image_url"},
                        {"type": "text", "text": prompt},
                    ],
                    "role": "user",
                }
            ],
            "model": "meta/llama-3.2-90b-vision-instruct",
            "frequency_penalty": 0,
            "max_tokens": 512,
            "presence_penalty": 0,
            "stream": False,
            "temperature": 1,
            "top_p": 1,
        },
    },
]

def call_nim_with_fallback(image_url: str, prompt: str = "What is in this image? Describe fundus findings for diabetic retinopathy screening."):
    """Try 3 NIM models in order — if one fails, next must work. Keeps import requests."""
    api_key = get_api_key()
    if not api_key:
        raise RuntimeError("NVIDIA_API_KEY not set (env or .env.encrypted)")
    last_err = None
    for cfg in MODELS:
        model = cfg["model"]
        stream = cfg["stream"]
        payload = cfg["payload"](image_url, prompt)
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Accept": "text/event-stream" if stream else "application/json",
        }
        url = invoke_url
        print(f"[nim] Trying {model} stream={stream} ...")
        try:
            response = requests.post(url, headers=headers, json=payload, stream=stream, timeout=90)
            if stream:
                # stream mode — collect chunks
                chunks = []
                for line in response.iter_lines():
                    if line:
                        txt = line.decode("utf-8")
                        # keep raw for debugging, also try parse json
                        chunks.append(txt)
                        print(txt)
                # consider success if we got any data and status 200
                if response.status_code == 200 and chunks:
                    return {"model": model, "stream": True, "chunks": chunks, "status": response.status_code}
                raise RuntimeError(f"Stream {model} failed {response.status_code}: {chunks[:2]}")
            else:
                data = response.json()
                if response.status_code == 200 and data:
                    print(f"[nim] {model} succeeded")
                    print(json.dumps(data)[:800])
                    return {"model": model, "stream": False, "data": data, "status": response.status_code}
                raise RuntimeError(f"{model} {response.status_code}: {data}")
        except Exception as e:
            print(f"[nim] {model} failed: {e}")
            last_err = e
            time.sleep(0.8)
            continue
    raise RuntimeError(f"All 3 NIM models failed. Last: {last_err}")

# ---- Example CLI ----
if __name__ == "__main__":
    import argparse

    ap = argparse.ArgumentParser(description="GlucoVision NIM backup — import requests fallback")
    ap.add_argument("--image", default="https://assets.ngc.nvidia.com/products/api-catalog/phi-3-5-vision/example1b.jpg", help="image_url")
    ap.add_argument("--prompt", default="What is in this image? Describe diabetic retinopathy findings if present.", help="text prompt")
    ap.add_argument("--encrypt-creds", action="store_true", help="encrypt and save NVIDIA_API_KEY to .env.encrypted")
    args = ap.parse_args()

    if args.encrypt_creds:
        encrypt_and_save_all_creds()
    else:
        # auto-encrypt on first run if .env.encrypted missing
        if not os.path.exists(CREDS_FILE) and os.getenv("NVIDIA_API_KEY"):
            encrypt_and_save_all_creds()
        result = call_nim_with_fallback(args.image, args.prompt)
        print("\n=== FINAL ===")
        print(json.dumps(result, indent=2)[:2000])
