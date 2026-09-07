"use client";
import { useEffect } from "react";

export function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Never cache in development: dev chunk URLs stay stable across edits,
    // so a cache-first SW would serve stale JS modules (runtime mismatch).
    // Also evict any SW/caches left over from earlier runs.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((rs) => rs.forEach((r) => r.unregister()))
        .catch(() => {});
      if ("caches" in window) {
        caches
          .keys()
          .then((ks) => ks.forEach((k) => caches.delete(k)))
          .catch(() => {});
      }
      return;
    }
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    };
    // `load` may already have fired before hydration — register immediately then.
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
