"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { DR_LABELS } from "@/lib/types";
import Link from "next/link";
import { Search, Plus, ScanEye, Activity, MapPin, Phone, AlertTriangle } from "lucide-react";

export default function PatientsPage() {
  const { patients, addPatient } = useStore();
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", age: "42", village: "", diabetesYears: "5", hbA1c: "7.5", bp: "130/85" });

  const filtered = patients.filter((p) => `${p.name} ${p.village} ${p.id}`.toLowerCase().includes(q.toLowerCase()));

  const submit = () => {
    if (!form.name || !form.village) return;
    addPatient({
      id: `GV-${String(patients.length + 1).padStart(3, "0")}`,
      name: form.name,
      age: Number(form.age) || 40,
      gender: "M",
      village: form.village,
      phone: "98XXXXX000",
      diabetesYears: Number(form.diabetesYears) || 5,
      diabetesType: "Type 2",
      bp: form.bp,
      hbA1c: Number(form.hbA1c) || 7,
      familyHistory: false,
      symptoms: [],
      riskScore: Math.min(95, Math.round(Number(form.hbA1c) * 8 + Number(form.diabetesYears) * 2)),
      glucose: [{ date: new Date().toISOString().slice(0, 10), fasting: 130 + Math.round(Math.random() * 40) }],
      visits: [],
    });
    setShowForm(false);
    setForm({ name: "", age: "42", village: "", diabetesYears: "5", hbA1c: "7.5", bp: "130/85" });
  };

  return (
    <div className="p-4 md:p-6 max-w-[1220px] mx-auto space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-sm text-zinc-600 mt-1">Registry • {filtered.length} patients • Tap to start screening</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-black">
          <Plus className="w-4 h-4" /> Register patient
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, village or ID…" className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900" />
        </div>
      </div>

      {showForm && (
        <div className="border border-zinc-200 bg-white p-4 grid md:grid-cols-3 gap-3">
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900" />
          <input placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm" />
          <input placeholder="Village" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm" />
          <input placeholder="Diabetes years" value={form.diabetesYears} onChange={(e) => setForm({ ...form, diabetesYears: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm" />
          <input placeholder="HbA1c %" value={form.hbA1c} onChange={(e) => setForm({ ...form, hbA1c: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm" />
          <input placeholder="BP (e.g. 130/85)" value={form.bp} onChange={(e) => setForm({ ...form, bp: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm" />
          <div className="md:col-span-3 flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50">
              Cancel
            </button>
            <button onClick={submit} className="px-5 py-2 bg-zinc-900 text-white text-sm font-semibold hover:bg-black">
              Save & add glucose
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((p) => {
          const last = p.visits[p.visits.length - 1];
          return (
            <div key={p.id} className="border border-zinc-200 bg-white p-4 flex flex-col gap-3 hover:border-zinc-300">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">
                    {p.name} <span className="text-xs font-mono text-zinc-500">{p.id}</span>
                  </div>
                  <div className="text-xs text-zinc-600 flex flex-wrap gap-2 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Activity className="w-3 h-3" /> {p.age}y • {p.gender} • {p.diabetesType} • {p.diabetesYears}y DM
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {p.village}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {p.phone}
                    </span>
                  </div>
                </div>
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 border ${p.riskScore >= 70 ? "bg-red-50 border-red-200 text-red-700" : p.riskScore >= 40 ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>RISK {p.riskScore}</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-zinc-50 border border-zinc-200">HbA1c {p.hbA1c}%</span>
                <span className="px-2 py-1 bg-zinc-50 border border-zinc-200">BP {p.bp}</span>
                {p.familyHistory && <span className="px-2 py-1 bg-white border border-zinc-200">Family history</span>}
                {p.symptoms.length > 0 && <span className="px-2 py-1 bg-zinc-50 border border-zinc-200 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{p.symptoms.join(", ")}</span>}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                <div className="text-xs">
                  {last ? (
                    <span className="font-medium border px-2 py-1 bg-white border-zinc-200">{DR_LABELS[last.drStage]} • {(last.confidence * 100).toFixed(0)}%</span>
                  ) : (
                    <span className="px-2 py-1 bg-zinc-100 border border-zinc-200">Never screened</span>
                  )}
                  <span className="ml-2 text-zinc-500">{p.lastScreened ? `Last: ${p.lastScreened}` : "—"}</span>
                </div>
                <Link href={`/app/screening?patient=${p.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold hover:bg-black">
                  <ScanEye className="w-3.5 h-3.5" /> Screen now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
