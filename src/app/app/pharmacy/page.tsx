"use client";
import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import { Pill, ShieldCheck, CheckCircle2, Clock, Truck, PackageCheck, AlertTriangle, Search, Plus, Beaker, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STEPS = ["pending", "verified", "dispatched", "delivered"] as const;

export default function PharmacyPage() {
  const { pharmacy, patients, addPharmacy, updatePharmacy } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof STATUS_STEPS)[number] | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientId: patients[0]?.id || "", prescription: "", pharmacist: "Ph. Sunil Joshi" });

  const filtered = useMemo(() => {
    let list = pharmacy;
    if (filter !== "all") list = list.filter((o) => o.status === filter);
    if (q) list = list.filter((o) => `${o.patientName} ${o.prescription} ${o.id}`.toLowerCase().includes(q.toLowerCase()));
    return list;
  }, [pharmacy, filter, q]);

  const counts = {
    all: pharmacy.length,
    pending: pharmacy.filter((o) => o.status === "pending").length,
    verified: pharmacy.filter((o) => o.status === "verified").length,
    dispatched: pharmacy.filter((o) => o.status === "dispatched").length,
    delivered: pharmacy.filter((o) => o.status === "delivered").length,
  };

  const submit = () => {
    const pat = patients.find((p) => p.id === form.patientId);
    if (!pat || !form.prescription) return;
    addPharmacy({
      id: `RX-${Date.now().toString().slice(-6)}`,
      patientId: pat.id,
      patientName: pat.name,
      prescription: form.prescription,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
      pharmacist: form.pharmacist,
    });
    setShowForm(false);
    setForm({ patientId: pat.id, prescription: "", pharmacist: "Ph. Sunil Joshi" });
  };

  const advance = (id: string, cur: (typeof STATUS_STEPS)[number]) => {
    const idx = STATUS_STEPS.indexOf(cur);
    if (idx < STATUS_STEPS.length - 1) updatePharmacy(id, STATUS_STEPS[idx + 1]);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1220px] mx-auto space-y-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Pill className="w-3.5 h-3.5" /> TELEPHARMACY • VERIFY, NOT AUTO-PRESCRIBE
          </div>
          <h1 className="mt-2 text-2xl md:text-[30px] font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Telepharmacy
          </h1>
          <p className="text-sm text-slate-600 max-w-[740px]">Closes the loop after screening + referral. Pharmacist verifies, checks interactions, counsels, then dispatches. Refill reminders via SMS.</p>
        </div>
        <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 shadow-lg shadow-teal-700/20">
          <motion.span animate={{ rotate: showForm ? 45 : 0 }}>
            <Plus className="w-4 h-4" />
          </motion.span>
          New order
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 shadow-sm">
          <AlertTriangle className="w-3.5 h-3.5" /> No auto-prescription — licensed pharmacist verification required
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm">
          <Beaker className="w-3.5 h-3.5" /> Interaction check built-in
        </span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="border bg-white border border-stone-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700">
          <Pill className="w-4 h-4" /> PIPELINE
        </div>
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATUS_STEPS.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`group relative border border p-4 text-left transition overflow-hidden ${filter === s ? "bg-slate-900 text-white border-slate-900 shadow-lg" : "bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-300 hover:shadow-sm"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold tracking-widest ${filter === s ? "text-white/70" : "text-stone-500"}`}>{s.toUpperCase()}</span>
                {s === "pending" && <Clock className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />}
                {s === "verified" && <ShieldCheck className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />}
                {s === "dispatched" && <Truck className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />}
                {s === "delivered" && <PackageCheck className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />}
              </div>
              <div className={`text-[28px] font-black mt-2 tracking-tight ${filter === s ? "text-white" : "text-slate-900"}`}>{counts[s]}</div>
              <div className={`text-xs mt-1 font-medium ${filter === s ? "text-white/70" : "text-slate-500"}`}>
                {s === "pending" && "Awaiting pharmacist"}
                {s === "verified" && "Checked & counselled"}
                {s === "dispatched" && "Out for delivery"}
                {s === "delivered" && "With patient"}
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 h-2 rounded-full bg-stone-100 overflow-hidden flex">
          {STATUS_STEPS.map((s) => (
            <motion.div
              key={s}
              initial={{ flex: 0 }}
              animate={{ flex: counts[s] || 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`${s === "pending" ? "bg-amber-400" : s === "verified" ? "bg-sky-500" : s === "dispatched" ? "bg-violet-500" : "bg-emerald-500"}`}
              style={{ opacity: counts[s] ? 1 : 0.18 }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
        <div className="flex-1 relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-teal-600 transition" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search patient, prescription or RX ID…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
          />
        </div>
        <div className="hidden md:flex gap-2">
          {(["all", ...STATUS_STEPS] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-2 rounded-full text-xs font-bold border capitalize transition ${filter === k ? "bg-slate-900 text-white border-slate-900" : "bg-white border-stone-200 hover:bg-stone-50"}`}
            >
              {k} {k !== "all" ? `• ${counts[k as keyof typeof counts]}` : `• ${counts.all}`}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.3 }} className="border bg-white border border-stone-200 p-5 grid md:grid-cols-[1.1fr_1.6fr_0.9fr_auto] gap-3 items-end shadow-sm">
            <label className="text-sm">
              <span className="text-xs font-bold text-stone-500">Patient</span>
              <select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className="mt-1 w-full px-3 py-3 rounded-xl border border-stone-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none bg-white">
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.village}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-xs font-bold text-stone-500">Prescription (after doctor confirm)</span>
              <input value={form.prescription} onChange={(e) => setForm({ ...form, prescription: e.target.value })} placeholder="e.g. Metformin 500mg BD, Atorvastatin 10mg OD × 30d" className="mt-1 w-full px-3 py-3 rounded-xl border border-stone-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
            </label>
            <label className="text-sm">
              <span className="text-xs font-bold text-stone-500">Pharmacist</span>
              <input value={form.pharmacist} onChange={(e) => setForm({ ...form, pharmacist: e.target.value })} className="mt-1 w-full px-3 py-3 rounded-xl border border-stone-200 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
            </label>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="px-5 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 transition">
                Cancel
              </button>
              <button onClick={submit} className="px-6 py-3 rounded-full bg-teal-700 text-white text-sm font-bold hover:bg-teal-800 shadow-md transition">
                Queue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 border bg-white border border-dashed border-stone-300 p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-stone-50 border border-stone-200 grid place-items-center">
                <Pill className="w-6 h-6 text-stone-400" />
              </div>
              <div className="mt-3 font-bold">No orders here</div>
              <div className="text-sm text-slate-600">Complete a screening → referral → pharmacist verifies before any medicine is dispatched.</div>
            </motion.div>
          ) : (
            filtered.map((o, i) => {
              const idx = STATUS_STEPS.indexOf(o.status);
              return (
                <motion.div
                  key={o.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group border bg-white border border-stone-200 p-5 flex flex-col gap-3 hover:shadow-lg hover:shadow-stone-200/40 hover:border-stone-300 transition-all overflow-hidden relative"
                >
                  <div className="absolute top-0 left-5 right-5 h-[2px] bg-gradient-to-r from-teal-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold">
                        {o.patientName} <span className="text-xs font-mono text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full">{o.id}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        {o.date} {o.pharmacist ? `• ${o.pharmacist}` : ""} • Patient {o.patientId}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full border capitalize shadow-sm ${o.status === "pending" ? "bg-amber-50 border-amber-200 text-amber-800" : o.status === "verified" ? "bg-sky-50 border-sky-200 text-sky-700" : o.status === "dispatched" ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>{o.status}</span>
                  </div>

                  <div className="rounded-xl bg-stone-50 border border-stone-200 p-3.5">
                    <div className="text-[11px] font-bold tracking-widest text-stone-500">PRESCRIPTION</div>
                    <div className="text-sm leading-relaxed mt-1 font-medium">{o.prescription}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    {STATUS_STEPS.map((s, ii) => (
                      <div key={s} className="flex-1 flex items-center gap-1">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + ii * 0.06 }} className={`w-7 h-7 rounded-full grid place-items-center text-xs font-black border ${ii <= idx ? "bg-teal-700 text-white border-teal-700 shadow-sm" : "bg-white border-stone-200 text-stone-400"}`}>{ii + 1}</motion.div>
                        {ii < STATUS_STEPS.length - 1 && <div className={`flex-1 h-1 rounded-full transition ${ii < idx ? "bg-teal-700" : "bg-stone-200"}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-bold tracking-widest text-stone-500">
                    {STATUS_STEPS.map((s) => (
                      <span key={s} className={o.status === s ? "text-teal-700" : ""}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {o.status === "pending" && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-900">
                      <b>Pharmacist action:</b> verify prescription, check drug interactions vs history ({patients.find((p) => p.id === o.patientId)?.medication?.join(", ") || "check record"}), counsel dose/adherence, then verify.
                    </div>
                  )}

                  <div className="flex gap-2">
                    {idx < STATUS_STEPS.length - 1 ? (
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => advance(o.id, o.status)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-teal-700 text-white text-sm font-bold hover:bg-teal-800 shadow-md hover:shadow-lg transition">
                        <CheckCircle2 className="w-4 h-4" /> Mark {STATUS_STEPS[idx + 1]}
                      </motion.button>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold">
                        <PackageCheck className="w-4 h-4" /> Completed — refill reminder set
                      </span>
                    )}
                    <Link href={`/app/screening?patient=${o.patientId}`} className="px-5 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 transition">
                      Patient
                    </Link>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border bg-amber-50 border border-amber-200 p-4 text-xs leading-relaxed text-amber-900 flex gap-3">
        <span className="w-8 h-8 rounded-full bg-amber-500 grid place-items-center text-white shrink-0">
          <Sparkles className="w-4 h-4" />
        </span>
        <span>
          <b>Quality gate:</b> No medicine moves to “verified” without a licensed pharmacist sign-off. Interaction checker flags metformin + contrast / statin interactions, renal dose adjustments, and duplicate therapy before dispatch.
        </span>
      </motion.div>
    </div>
  );
}
