"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useEffect, useState } from "react";
import { Patient, Referral, PharmacyOrder } from "./types";
import { patients as seedPatients, referrals as seedReferrals, pharmacyOrders as seedPharmacy } from "./mockData";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
const USE_API = !!API;

type Store = {
  patients: Patient[];
  referrals: Referral[];
  pharmacy: PharmacyOrder[];
  addPatient: (p: Patient) => void;
  updatePatient: (id: string, patch: Partial<Patient>) => void;
  addVisit: (patientId: string, visit: Patient["visits"][number]) => void;
  addReferral: (r: Referral) => void;
  addPharmacy: (o: PharmacyOrder) => void;
  updatePharmacy: (id: string, status: PharmacyOrder["status"]) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const [referrals, setReferrals] = useState<Referral[]>(seedReferrals);
  const [pharmacy, setPharmacy] = useState<PharmacyOrder[]>(seedPharmacy);

  // If Cloudflare D1 API is configured, hydrate from it (with localStorage fallback for offline)
  useEffect(() => {
    if (!USE_API) {
      const raw = localStorage.getItem("gv_store");
      if (raw) {
        try {
          const j = JSON.parse(raw);
          if (j.patients) setPatients(j.patients);
          if (j.referrals) setReferrals(j.referrals);
          if (j.pharmacy) setPharmacy(j.pharmacy);
        } catch {}
      }
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [pRes, rRes, phRes] = await Promise.all([
          fetch(`${API}/api/patients?limit=100`).then((r) => (r.ok ? r.json() : null)),
          fetch(`${API}/api/referrals`).then((r) => (r.ok ? r.json() : null)),
          fetch(`${API}/api/pharmacy`).then((r) => (r.ok ? r.json() : null)),
        ]);
        if (cancelled) return;
        if (pRes?.patients?.length) setPatients(pRes.patients);
        if (rRes?.referrals?.length) setReferrals(rRes.referrals);
        if (phRes?.orders?.length) setPharmacy(phRes.orders);
        // also cache for offline
        localStorage.setItem("gv_store_api", JSON.stringify({ patients: pRes?.patients, referrals: rRes?.referrals, pharmacy: phRes?.orders }));
      } catch {
        // fallback to localStorage mock
        const raw = localStorage.getItem("gv_store") || localStorage.getItem("gv_store_api");
        if (raw) {
          try {
            const j = JSON.parse(raw);
            if (j.patients) setPatients(j.patients);
            if (j.referrals) setReferrals(j.referrals);
            if (j.pharmacy) setPharmacy(j.pharmacy || j.orders);
          } catch {}
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  // persist local (for offline), only when not using API or as cache
  useEffect(() => {
    if (USE_API) {
      localStorage.setItem("gv_store_api", JSON.stringify({ patients, referrals, pharmacy }));
    } else {
      localStorage.setItem("gv_store", JSON.stringify({ patients, referrals, pharmacy }));
    }
  }, [patients, referrals, pharmacy]);

  const addPatient = (p: Patient) => {
    setPatients((s) => [p, ...s]);
    if (USE_API) fetch(`${API}/api/patients`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }).catch(() => {});
  };
  const updatePatient = (id: string, patch: Partial<Patient>) => {
    setPatients((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    if (USE_API && patch.footLastCheck) {
      // foot_checks table not in patients, but keep as patient field for demo
      fetch(`${API}/api/patients/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) }).catch(() => {});
    }
  };
  const addVisit = (patientId: string, visit: Patient["visits"][number]) => {
    setPatients((s) => s.map((p) => (p.id === patientId ? { ...p, visits: [...p.visits, visit], lastScreened: visit.date } : p)));
    if (USE_API)
      fetch(`${API}/api/patients/${patientId}/visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visit),
      }).catch(() => {});
  };
  const addReferral = (r: Referral) => {
    setReferrals((s) => [r, ...s]);
    if (USE_API) fetch(`${API}/api/referrals`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) }).catch(() => {});
  };
  const addPharmacy = (o: PharmacyOrder) => {
    setPharmacy((s) => [o, ...s]);
    if (USE_API) fetch(`${API}/api/pharmacy`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }).catch(() => {});
  };
  const updatePharmacy = (id: string, status: PharmacyOrder["status"]) => {
    setPharmacy((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    if (USE_API) fetch(`${API}/api/pharmacy/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).catch(() => {});
  };

  return <Ctx.Provider value={{ patients, referrals, pharmacy, addPatient, updatePatient, addVisit, addReferral, addPharmacy, updatePharmacy }}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
};
