"use client";
import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import { DRStage } from "@/lib/types";
import Link from "next/link";
import { Send, CheckCircle2, Clock, Stethoscope, MapPin, Phone, Filter, ArrowRight, ShieldCheck, WifiOff, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomSelect } from "@/components/CustomSelect";
import { useLang } from "@/lib/i18n";
import { drStageLabel } from "@/lib/labels";

export default function ReferralsPage() {
  const { t } = useLang();
  const { referrals, patients, addReferral } = useStore();
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientId: patients[0]?.id || "", via: "eSanjeevani" as "eSanjeevani" | "Direct", stage: 2 as DRStage });

  const filtered = useMemo(() => (filter === "all" ? referrals : referrals.filter((r) => r.status === filter)), [referrals, filter]);

  const enriched = filtered.map((r) => {
    const p = patients.find((x) => x.id === r.patientId);
    return { ...r, patient: p };
  });

  const counts = {
    all: referrals.length,
    pending: referrals.filter((r) => r.status === "pending").length,
    confirmed: referrals.filter((r) => r.status === "confirmed").length,
    completed: referrals.filter((r) => r.status === "completed").length,
  };

  const createReferral = () => {
    if (!form.patientId) return;
    const pat = patients.find((p) => p.id === form.patientId);
    if (!pat) return;
    addReferral({
      id: `REF-${Date.now().toString().slice(-6)}`,
      patientId: form.patientId,
      date: new Date().toISOString().slice(0, 10),
      stage: form.stage,
      status: "pending",
      via: form.via,
    });
    setShowForm(false);
  };

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Send className="w-3.5 h-3.5" /> {t("referralsQueueBadge")} • {counts.pending} {t("referralsFilterPending2").toUpperCase()}
          </div>
          <h1 className="mt-2 text-2xl md:text-[30px] font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {t("referralsHeading2")}
          </h1>
          <p className="text-sm text-slate-600 max-w-[720px]">{t("referralsSubText2")}</p>
        </div>
        <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 shadow-lg shadow-teal-700/20">
          <motion.span animate={{ rotate: showForm ? 45 : 0 }}>
            <Send className="w-4 h-4" />
          </motion.span>
          {t("referralsNewReferralBtn")}
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm">
          <WifiOff className="w-3.5 h-3.5" /> {counts.pending} {t("referralsQueueWaiting2")}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> {t("referralsPreliminaryBadge")}
        </span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "completed"] as const).map((k) => (
          <motion.button
            key={k}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(k)}
            className={`px-4 py-2.5 rounded-full text-sm font-bold border capitalize transition ${filter === k ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white border-stone-200 text-slate-700 hover:bg-stone-50 hover:border-stone-300"}`}
          >
            {k === "all" ? t("referralsFilterAll2") : k === "pending" ? t("referralsFilterPending2") : k === "confirmed" ? t("referralsFilterConfirmed2") : t("referralsFilterCompleted2")} • {counts[k]}
          </motion.button>
        ))}
        <span className="ml-auto hidden md:inline-flex items-center gap-1.5 text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-full">
          <Filter className="w-3.5 h-3.5" /> {enriched.length} {t("commonReferralsSuffix")}
        </span>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="border bg-white border border-stone-200 p-5 grid md:grid-cols-4 gap-3 shadow-sm">
            <CustomSelect value={form.patientId} onChange={(v) => setForm({ ...form, patientId: v })} options={patients.map((p) => ({ value: p.id, label: p.name, desc: `${p.village} • ${drStageLabel(t, p.visits[p.visits.length - 1]?.drStage ?? 0)}` }))} placeholder={t("commonSelectPatient")} searchable />
            <CustomSelect value={String(form.stage)} onChange={(v) => setForm({ ...form, stage: Number(v) as DRStage })} options={[0, 1, 2, 3, 4].map((s) => ({ value: String(s), label: `${t("stage")} ${s}`, desc: drStageLabel(t, s as DRStage) }))} />
            <CustomSelect value={form.via} onChange={(v) => setForm({ ...form, via: v as never })} options={[{ value: "eSanjeevani", label: "eSanjeevani" }, { value: "Direct", label: "Direct" }]} />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 transition">
                {t("cancel")}
              </button>
              <button onClick={createReferral} className="flex-1 px-4 py-3 rounded-full bg-teal-700 text-white text-sm font-bold hover:bg-teal-800 shadow-md transition">
                {t("pharmacyQueueBtn")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {enriched.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 border bg-white border border-dashed border-stone-300 p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-stone-50 border border-stone-200 grid place-items-center">
                <Send className="w-6 h-6 text-stone-400" />
              </div>
              <div className="mt-3 font-bold">{t("referralsNoFilteredTitle")}</div>
              <div className="text-sm text-slate-600">{t("referralsNoFilteredDesc")}</div>
              <Link href="/app/patients" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-700 text-white text-sm font-bold">
                {t("referralsGoScreening")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            enriched.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group border bg-white border border-stone-200 p-5 flex flex-col gap-3 hover:shadow-lg hover:shadow-stone-200/40 hover:border-stone-300 transition-all overflow-hidden relative"
              >
                <div className="absolute top-0 left-5 right-5 h-[2px] bg-gradient-to-r from-teal-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      {r.patient?.name || r.patientId} <span className="text-xs font-mono text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full">{r.id}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1.5 flex flex-wrap gap-2">
                      {r.patient && (
                        <>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-50 border border-stone-200">
                            <MapPin className="w-3 h-3" /> {r.patient.village}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-50 border border-stone-200">
                            <Phone className="w-3 h-3" /> {r.patient.phone}
                          </span>
                        </>
                      )}
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-50 border border-stone-200">
                        <Clock className="w-3 h-3" /> {r.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full border capitalize shadow-sm ${
                      r.status === "pending"
                        ? "bg-amber-50 border-amber-200 text-amber-800"
                        : r.status === "confirmed"
                          ? "bg-sky-50 border-sky-200 text-sky-700"
                          : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    {r.status === "pending" ? t("referralsPendingLabel") : r.status === "confirmed" ? t("referralsConfirmedLabel") : t("referralsCompletedLabel")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`px-2.5 py-1 rounded-full border font-bold shadow-sm ${r.stage >= 3 ? "bg-red-50 border-red-200 text-red-700" : r.stage >= 1 ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                    {drStageLabel(t, r.stage)} • {t("stage")} {r.stage}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-stone-200 font-semibold shadow-sm">{r.via}</span>
                  {r.patient && <span className="px-2.5 py-1 rounded-full bg-white border border-stone-200 font-medium shadow-sm">HbA1c {r.patient.hbA1c}% • {r.patient.bp}</span>}
                </div>

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs leading-relaxed">
                  {r.status === "pending" && <span>⏳ <b>{t("referralsQueued")}</b>, {t("referralsHowStep2b")}</span>}
                  {r.status === "confirmed" && <span><b>{t("referralsConfirmed")}</b> {r.doctor ? `by ${r.doctor}` : ""}, {t("referralsHowStep3b")}</span>}
                  {r.status === "completed" && <span>✅ {t("referralsCompleted")}, {t("referralsHowStep3b")}</span>}
                </div>

                <div className="flex gap-2 pt-1">
                  <Link href={`/app/patients?patient=${r.patientId}`} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition">
                    {t("referralsViewPatient")} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full bg-white border border-stone-200 text-xs font-semibold shadow-sm">
                    <Stethoscope className="w-3.5 h-3.5" /> PHC → {r.via}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border bg-slate-900 text-white p-6 md:p-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-transparent to-transparent" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative">
          <h3 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-300" /> {t("referralsHowTitle")}</h3>
          <ol className="mt-3 space-y-2 text-sm opacity-90 list-decimal list-inside">
            <li>{t("referralsHowStep1b")}</li>
            <li>{t("referralsHowStep2b")}</li>
            <li>{t("referralsHowStep3b")}</li>
            <li>{t("referralsHowStep4b")}</li>
          </ol>
        </div>
        <div className="relative border bg-white text-slate-900 p-5 border border-stone-200 shadow-xl">
          <div className="text-xs font-black tracking-widest text-teal-700">{t("referralsForJudges")}</div>
          <p className="text-sm mt-2 leading-relaxed">{t("referralsForJudgesDesc")}</p>
          <Link href="/app/patients" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-700 text-white text-sm font-bold hover:bg-teal-800 shadow-md transition">
            {t("referralsRunScreening")} <CheckCircle2 className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
