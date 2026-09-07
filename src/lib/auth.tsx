"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "asha" | "mo" | "ophthalmologist" | "pharmacist" | "admin";
type User = { id: string; name: string; email: string; role: Role; phc: string | null; village: string | null; phone: string | null };

type AuthCtx = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; role: Role; phc?: string; village?: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);
const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
const USE_API = !!API;

function readStoredToken(): string | null {
  try {
    return localStorage.getItem("gv_token");
  } catch {
    return null;
  }
}

function readStoredUser(): User | null {
  try {
    const u = localStorage.getItem("gv_user");
    return u ? (JSON.parse(u) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Hydrate synchronously during initial render (client) instead of setState-in-effect.
  const [user, setUser] = useState<User | null>(() => (typeof window === "undefined" ? null : readStoredUser()));
  const [token, setToken] = useState<string | null>(() => (typeof window === "undefined" ? null : readStoredToken()));
  // Loading is only true when a backend verification round-trip will run.
  const [loading, setLoading] = useState(
    () => typeof window === "undefined" || (USE_API && readStoredToken() !== null),
  );

  useEffect(() => {
    if (!USE_API || !token) return;
    // verify with backend if API set (setState only inside async callbacks)
    let cancelled = false;
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled) return;
        if (j?.user) {
          setUser(j.user as User);
          try {
            localStorage.setItem("gv_user", JSON.stringify(j.user));
          } catch {}
        } else {
          // token invalid
          try {
            localStorage.removeItem("gv_token");
            localStorage.removeItem("gv_user");
          } catch {}
          setToken(null);
          setUser(null);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email: string, password: string) => {
    if (!USE_API) {
      // offline demo, accept any demo account, create mock user
      const mock: User = { id: "local_" + email, name: email.split("@")[0], email, role: "asha", phc: "Shirpur Rural", village: "Shirpur, Dhule", phone: null };
      // try to infer role from email prefix
      if (email.startsWith("mo@")) mock.role = "mo";
      else if (email.startsWith("eye@") || email.startsWith("oph")) mock.role = "ophthalmologist";
      else if (email.startsWith("pharma")) mock.role = "pharmacist";
      else if (email.startsWith("admin")) mock.role = "admin";
      const fakeToken = `demo.${btoa(JSON.stringify(mock))}`;
      localStorage.setItem("gv_token", fakeToken);
      localStorage.setItem("gv_user", JSON.stringify(mock));
      setToken(fakeToken);
      setUser(mock);
      return;
    }
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error || "Login failed");
    localStorage.setItem("gv_token", j.token);
    localStorage.setItem("gv_user", JSON.stringify(j.user));
    setToken(j.token);
    setUser(j.user);
  };

  const signup = async (data: { name: string; email: string; password: string; role: Role; phc?: string; village?: string }) => {
    if (!USE_API) {
      const mock: User = { id: "local_" + data.email, name: data.name, email: data.email, role: data.role, phc: data.phc || null, village: data.village || null, phone: null };
      const fakeToken = `demo.${btoa(JSON.stringify(mock))}`;
      localStorage.setItem("gv_token", fakeToken);
      localStorage.setItem("gv_user", JSON.stringify(mock));
      setToken(fakeToken);
      setUser(mock);
      return;
    }
    const res = await fetch(`${API}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error || "Signup failed");
    localStorage.setItem("gv_token", j.token);
    localStorage.setItem("gv_user", JSON.stringify(j.user));
    setToken(j.token);
    setUser(j.user);
  };

  const logout = async () => {
    if (USE_API && token) {
      try {
        await fetch(`${API}/api/auth/logout`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      } catch {}
    }
    localStorage.removeItem("gv_token");
    localStorage.removeItem("gv_user");
    setUser(null);
    setToken(null);
  };

  return <Ctx.Provider value={{ user, token, loading, login, signup, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside provider");
  return v;
};

// Helper to get token for direct fetch
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("gv_token") : null);
export const isAuthenticated = () => !!getToken();
