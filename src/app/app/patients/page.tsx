"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { Search, Plus, ScanEye, Activity, MapPin, Phone, AlertTriangle, Eye, Image as ImageIcon } from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";
import { useLang } from "@/lib/i18n";
import { drStageLabel } from "@/lib/labels";

export default function PatientsPage() {
  const { patients, addPatient } = useStore();
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", village: "", phone: "", gender: "M" as "M" | "F", diabetesYears: "", hbA1c: "", bp: "", diabetesType: "Type 2" as "Type 1" | "Type 2" });

  const filtered = patients.filter((p) => `${p.name} ${p.village} ${p.id}`.toLowerCase().includes(q.toLowerCase()));

  const submit = () => {
    if (!form.name.trim() || !form.village.trim() || !form.age || !form.hbA1c || !form.bp) return;
    const age = Number(form.age);
    const hb = Number(form.hbA1c);
    const yrs = Number(form.diabetesYears) || 0;
    if (isNaN(age) || isNaN(hb)) return;
    // Risk overrides defaults: computed from actual entered values, not presets
    const risk = Math.min(95, Math.max(5, Math.round(hb * 8 + yrs * 2 + (age > 50 ? 8 : 0))));
    addPatient({
      id: `GV-${String(Date.now()).slice(-6)}`,
      name: form.name.trim(),
      age,
      gender: form.gender,
      village: form.village.trim(),
      phone: form.phone.trim() || "98XXXXX000",
      diabetesYears: yrs,
      diabetesType: form.diabetesType,
      bp: form.bp.trim(),
      hbA1c: hb,
      familyHistory: false,
      symptoms: [],
      riskScore: risk,
      glucose: [{ date: new Date().toISOString().slice(0, 10), fasting: 130 + Math.round(Math.random() * 40) }],
      visits: [],
      medication: [],
      prescriptions: [],
    });
    setShowForm(false);
    setForm({ name: "", age: "", village: "", phone: "", gender: "M", diabetesYears: "", hbA1c: "", bp: "", diabetesType: "Type 2" });
  };

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("patientsHeading")}</h1>
          <p className="text-sm text-zinc-600 mt-1">{t("patientsRegistrySub").replace("patients", `${filtered.length} ${t("patients")}`)}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-black">
          <Plus className="w-4 h-4" /> {t("patientsRegisterBtn")}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("patientsSearchPh2")} className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900" />
        </div>
      </div>

      {showForm && (
        <div className="border border-zinc-200 bg-white p-4 space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <input placeholder={t("patientsFullNamePh")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400" />
            <input placeholder={t("patientsAgePh")} type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
            <CustomSelect value={form.gender} onChange={(v) => setForm({ ...form, gender: v as "M" | "F" })} options={[{ value: "M", label: t("patientsGenderMale") }, { value: "F", label: t("patientsGenderFemale") }]} placeholder={t("commonGender")} />
            <input placeholder={t("patientsVillagePh")} value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
            <input placeholder={t("patientsPhonePh")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
            <CustomSelect value={form.diabetesType} onChange={(v) => setForm({ ...form, diabetesType: v as "Type 1" | "Type 2" })} options={[{ value: "Type 2", label: t("patientsDiabetesType2") }, { value: "Type 1", label: t("patientsDiabetesType1") }]} placeholder={t("commonDiabetesType")} />
            <input placeholder={t("patientsDiabetesYearsPh")} type="number" value={form.diabetesYears} onChange={(e) => setForm({ ...form, diabetesYears: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
            <input placeholder={t("patientsHbA1cPh")} type="number" step="0.1" value={form.hbA1c} onChange={(e) => setForm({ ...form, hbA1c: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
            <input placeholder={t("patientsBpPh")} value={form.bp} onChange={(e) => setForm({ ...form, bp: e.target.value })} className="px-3 py-2.5 border border-zinc-200 text-sm placeholder:text-zinc-400" />
          </div>
          <div className="text-xs text-zinc-500">{t("patientsRequiredNote")}</div>
          <div className="flex justify-end gap-2">
            <button onClick={() => { setShowForm(false); setForm({ name: "", age: "", village: "", phone: "", gender: "M", diabetesYears: "", hbA1c: "", bp: "", diabetesType: "Type 2" }); }} className="px-4 py-2 border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50">
              {t("patientsCancelBtn")}
            </button>
            <button onClick={submit} disabled={!form.name.trim() || !form.village.trim() || !form.age || !form.hbA1c || !form.bp.trim()} className="px-5 py-2 bg-zinc-900 text-white text-sm font-semibold hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed">
              {t("patientsSaveBtn")}
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((p) => {
          const last = p.visits[p.visits.length - 1];
          const thumb = last?.imageUrl;
          return (
            <div key={p.id} className="border border-zinc-200 bg-white p-4 flex flex-col gap-3 hover:border-zinc-300 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/app/patients/${p.id}`} className="font-semibold leading-tight hover:underline">
                    {p.name} <span className="text-xs font-mono text-zinc-500">{p.id}</span>
                  </Link>
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
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 border ${p.riskScore >= 70 ? "bg-red-50 border-red-200 text-red-700" : p.riskScore >= 40 ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>{t("patientsRiskLabel")} {p.riskScore}</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-zinc-50 border border-zinc-200">{t("patientsHbA1cShort")} {p.hbA1c}%</span>
                <span className="px-2 py-1 bg-zinc-50 border border-zinc-200">{t("patientsBpShort")} {p.bp}</span>
                {p.familyHistory && <span className="px-2 py-1 bg-white border border-zinc-200">{t("patientsFamilyHist")}</span>}
                {p.symptoms.length > 0 && <span className="px-2 py-1 bg-zinc-50 border border-zinc-200 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{p.symptoms.join(", ")}</span>}
              </div>

              {/* exam photo, must be visible */}
              <Link href={`/app/patients/${p.id}`} className="flex items-center gap-3 border border-zinc-200 bg-zinc-50 p-2 hover:bg-white transition">
                <div className="w-20 h-14 shrink-0 border border-zinc-200 bg-zinc-950 overflow-hidden relative">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt={`${p.name} last fundus`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-zinc-900 text-zinc-500">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                  {last && <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">Q{last.imageQuality}</div>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {p.visits.length} {t("patientsExamsLabel")} {p.visits.length > 0 && `• ${t("patientsLastLabel")} ${p.lastScreened || last?.date || ""}`}
                  </div>
                  <div className="text-xs text-zinc-600 truncate">
                    {last ? `${drStageLabel(t, last.drStage)} • ${(last.confidence * 100).toFixed(0)}% • ${last.imageUrl ? t("patientImageSaved") : t("patientNoImage")}` : t("patientsNeverScreened")}
                  </div>
                  <div className="text-[11px] text-zinc-500">{t("patientsTapOpen")}</div>
                </div>
                <Eye className="w-4 h-4 text-zinc-400 shrink-0" />
              </Link>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                <div className="text-xs">
                  {last ? (
                    <span className="font-medium border px-2 py-1 bg-white border-zinc-200">{drStageLabel(t, last.drStage)} • {(last.confidence * 100).toFixed(0)}%</span>
                  ) : (
                    <span className="px-2 py-1 bg-zinc-100 border border-zinc-200">{t("patientsNeverScreened")}</span>
                  )}
                  <span className="ml-2 text-zinc-500">{p.lastScreened ? `${t("patientsLastLabel")} ${p.lastScreened}` : t("patientsNotYet")}</span>
                </div>
                <div className="flex gap-1.5">
                  <Link href={`/app/patients/${p.id}`} className="inline-flex items-center gap-1.5 px-3 py-2 border border-zinc-200 bg-white text-xs font-medium hover:bg-zinc-50">
                    <Eye className="w-3.5 h-3.5" /> {t("patientsViewBtn")}
                  </Link>
                  <Link href={`/app/patients/${p.id}#new-examination`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold hover:bg-black">
                    <ScanEye className="w-3.5 h-3.5" /> {t("patientsScreenBtn")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
