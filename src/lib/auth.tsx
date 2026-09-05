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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("gv_token");
    const u = localStorage.getItem("gv_user");
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {}
    }
    // verify with backend if API set
    if (USE_API && t) {
      fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          if (j?.user) {
            setUser(j.user);
            localStorage.setItem("gv_user", JSON.stringify(j.user));
          } else {
            // token invalid
            localStorage.removeItem("gv_token");
            localStorage.removeItem("gv_user");
            setToken(null);
            setUser(null);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!USE_API) {
      // offline demo — accept any demo account, create mock user
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
