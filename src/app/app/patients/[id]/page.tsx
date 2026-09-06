"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DR_LABELS } from "@/lib/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CaseChat } from "@/components/CaseChat";
import {
  ArrowLeft,
  ScanEye,
  Eye,
  Activity,
  MapPin,
  Phone,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  Send,
  MessageCircle,
  Pill,
  Footprints,
  X,
  ZoomIn,
  ClipboardList,
  Info,
  Beaker,
  FileText,
} from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";

function AddVisitInline({ patientId }: { patientId: string }) {
  const { patients, addVisit } = useStore();
  const patient = patients.find((p) => p.id === patientId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), stage: 2 as 0 | 1 | 2 | 3 | 4, confidence: 87, quality: 85, notes: "" });
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useState(() => ({ current: null as HTMLInputElement | null }))[0];

  const onFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const submit = async () => {
    if (!patient) return;
    let imageUrl: string | undefined = preview || undefined;
    if (preview && preview.startsWith("blob:")) {
      try {
        const blob = await fetch(preview).then((r) => r.blob());
        const dataUrl = await new Promise<string>((res, rej) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result as string);
          fr.onerror = rej;
          fr.readAsDataURL(blob);
        });
        imageUrl = dataUrl;
      } catch {}
    }
    // Generate systematic analysis based on patient + visit
    const stage = form.stage;
    const conf = form.confidence / 100;
    const quality = form.quality;
    const lesions =
      stage === 0
        ? []
        : Array.from({ length: stage >= 3 ? 3 : stage === 2 ? 2 : 1 }).map((_, i) => ({
            x: 35 + Math.random() * 30,
            y: 35 + Math.random() * 30,
            r: 14 + Math.random() * 10,
            label: ["haemorrhage", "exudates", "microaneurysm", "neovascularization"][Math.floor(Math.random() * 4)],
          }));
    const analysis = {
      summary: `${["No DR", "Mild NPDR", "Moderate NPDR", "Severe NPDR", "Proliferative DR"][stage]}, ${lesions.length ? lesions.length + " " + lesions.map((l) => l.label).join(", ") : "no lesions"} at ${quality}/100 quality, ${form.confidence}% confidence. Risk ${patient.riskScore}/100.`,
      lesionsDetected: lesions.length
        ? lesions.map((r) => ({ type: r.label, count: 1, locations: `posterior pole (${r.x.toFixed(0)}%,${r.y.toFixed(0)}%)`, severity: (stage >= 3 ? "severe" : stage === 2 ? "moderate" : "mild") as "severe" | "moderate" | "mild" }))
        : [{ type: "none", count: 0, locations: "entire retina clear", severity: "none" as const }],
      stageJustification:
        stage === 0
          ? "No spots, confirms No DR."
          : stage === 1
            ? "1 to 3 small spots only, Mild stage."
            : stage === 2
              ? "Bleeding or spots near center, Moderate stage."
              : stage === 3
                ? "Bleeding in 4 areas, Severe stage, high risk."
                : "New vessels seen, Proliferative, urgent.",
      confidenceExplanation: conf >= 0.92 ? `High confidence ${form.confidence}%, quality ${quality}/100 clear.` : conf >= 0.82 ? `Fair confidence ${form.confidence}%, quality ${quality}/100 okay.` : `Lower confidence ${form.confidence}%, quality ${quality}/100 not great.`,
      riskScoreBreakdown: [
        { factor: "HbA1c", value: `${patient.hbA1c}%`, contribution: patient.hbA1c >= 9 ? "high, above target" : patient.hbA1c >= 7.5 ? "moderate" : "low, at target" },
        { factor: "BP", value: patient.bp, contribution: parseInt(patient.bp.split("/")[0]) >= 140 ? "high, high BP" : "moderate" },
        { factor: "Duration", value: `${patient.diabetesYears}y`, contribution: patient.diabetesYears >= 10 ? "high, long duration" : "moderate" },
        { factor: "Family history", value: patient.familyHistory ? "Yes" : "No", contribution: patient.familyHistory ? "family risk" : "no family risk" },
        { factor: "Symptoms", value: patient.symptoms.join(", ") || "no symptoms", contribution: patient.symptoms.length ? "has symptoms, check macula" : "no symptoms" },
      ],
      imageQualityAssessment: quality >= 90 ? `Excellent ${quality}/100, clear and usable.` : quality >= 75 ? `Good ${quality}/100, okay.` : `Low ${quality}/100, a bit blurry.`,
      clinicalSignificance: ["No DR, check yearly", "Mild, improve control", "Moderate, referral in 4 to 8 weeks", "Severe, urgent in 1 to 2 weeks", "PDR, emergency within 1 week"][stage],
      recommendedActions: [["Annual screen", "Maintain <7%", "Foot check"], ["Re-screen 6m", "BP/lipid control"], ["Referral 4-8w", "Optimize DM", "SMS reminder"], ["Urgent referral 1-2w", "PRP counselling"], ["Emergency <1w", "PRP + anti-VEGF"]][stage],
      urgency: (["routine", "routine", "soon", "urgent", "emergency"][stage] as "routine" | "soon" | "urgent" | "emergency"),
    };

    const dietPlan = (() => {
      if (stage === 0) return { summary: "Balanced plate", dos: ["Whole grains, dal, veg", "Fruit 100g"], donts: ["Avoid sugar"], dailyCalories: patient.gender === "F" ? "1400-1600 kcal" : "1600-1800 kcal", followUp: "Annual eye check" };
      if (stage === 1) return { summary: "Tighten control", dos: ["Millet + veg", "Walk 30 min"], donts: ["No sugar"], dailyCalories: "1400-1500 kcal", followUp: "Eye check in 6 months" };
      if (stage === 2) return { summary: "Steady sugar and eye follow up", dos: ["Millet + dal + veg", "Walk + foot check"], donts: ["No sweets"], dailyCalories: "1300-1500 kcal", followUp: "Eye check in 3 months" };
      if (stage === 3) return { summary: "Strict control", dos: ["Strict salt <4g", "Small meals"], donts: ["No sugar"], dailyCalories: "1200-1400 kcal", followUp: "Urgent referral 1-2 weeks" };
      return { summary: "Very strict", dos: ["Very strict small portions"], donts: ["No sugar"], dailyCalories: "1200-1300 kcal", followUp: "Emergency 1 week" };
    })();
    const eyeVal = (form as unknown as { eye?: string }).eye || "left";
    const visit = {
      id: `v${Date.now()}`,
      date: new Date(form.date).toISOString(),
      drStage: stage,
      confidence: conf,
      heatmapRegions: lesions,
      notes: form.notes || `${["No DR", "Mild NPDR", "Moderate NPDR", "Severe NPDR", "Proliferative DR"][stage]}, manual entry. Quality ${quality}/100.`,
      imageQuality: quality,
      imageUrl,
      eye: eyeVal as "left" | "right",
      analysis: { ...analysis, dietPlan },
      dietPlan,
    };
    addVisit(patientId, visit);
    setOpen(false);
    setPreview(null);
    setForm({ date: new Date().toISOString().slice(0, 10), stage: 2, confidence: 87, quality: 85, notes: "" });
  };

  return (
    <div className="border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" /> Add new examination, new entries possible
        </h3>
        <button onClick={() => setOpen(!open)} className="px-3 py-1.5 border border-zinc-200 bg-white text-xs font-semibold hover:bg-zinc-50">
          {open ? "Cancel" : "+ New entry"}
        </button>
      </div>
      <p className="text-xs text-zinc-600 mt-1">Upload eye image, set stage, confidence and quality, we create the summary and save it.</p>
      {open && (
        <div className="mt-3 border border-zinc-200 bg-zinc-50 p-3 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-bold text-zinc-500">Image (optional but recommended)</div>
              <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] || null)} className="mt-1 w-full text-xs" />
              {preview && <img src={preview} alt="preview" className="mt-2 w-full h-32 object-cover border border-zinc-200" />}
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs">
                  <span className="font-bold text-zinc-500">Date</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full px-2 py-1.5 border border-zinc-200 text-xs" />
                </label>
                <label className="text-xs">
                  <span className="font-bold text-zinc-500">Stage</span>
                  <CustomSelect
                    value={String(form.stage)}
                    onChange={(v) => setForm({ ...form, stage: parseInt(v) as any })}
                    options={[
                      { value: "0", label: "0, No DR" },
                      { value: "1", label: "1, Mild" },
                      { value: "2", label: "2, Moderate" },
                      { value: "3", label: "3, Severe" },
                      { value: "4", label: "4, PDR" },
                    ]}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs">
                  <span className="font-bold text-zinc-500">Confidence %</span>
                  <input type="number" min={50} max={98} value={form.confidence} onChange={(e) => setForm({ ...form, confidence: parseInt(e.target.value) || 87 })} className="mt-1 w-full px-2 py-1.5 border border-zinc-200 text-xs" />
                </label>
                <label className="text-xs">
                  <span className="font-bold text-zinc-500">Quality /100</span>
                  <input type="number" min={60} max={100} value={form.quality} onChange={(e) => setForm({ ...form, quality: parseInt(e.target.value) || 85 })} className="mt-1 w-full px-2 py-1.5 border border-zinc-200 text-xs" />
                </label>
              </div>
              <label className="text-xs">
                <span className="font-bold text-zinc-500">Notes</span>
                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="e.g. heatmap shows spots near center" className="mt-1 w-full px-2 py-1.5 border border-zinc-200 text-xs" />
              </label>
            </div>
          </div>
          <button onClick={submit} className="w-full py-2 bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800">
            Save examination, will appear in dashboard and timeline
          </button>
          <div className="text-[11px] text-zinc-500">Systematic analysis auto-generated: stage justification, confidence, risk breakdown, urgency.</div>
        </div>
      )}
    </div>
  );
}

function AddPrescriptionForm({ patientId }: { patientId: string }) {
  const { patients, updatePatient, addPharmacy } = useStore();
  const patient = patients.find((p) => p.id === patientId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ drug: "", dosage: "", frequency: "OD", duration: "30d", indication: "" });
  const submit = () => {
    if (!patient || !form.drug) return;
    const rx = {
      drug: form.drug,
      dosage: form.dosage || "Not set",
      frequency: form.frequency,
      duration: form.duration,
      prescribedBy: "PHC Shirpur",
      prescribedOn: new Date().toISOString().slice(0, 10),
      indication: form.indication || "As per visit",
      status: "active" as const,
    };
    const next = [...(patient.prescriptions || []), rx];
    updatePatient(patientId, { prescriptions: next } as unknown as Partial<(typeof patient)>);
    // also queue in pharmacy for dispensing workflow
    addPharmacy({
      id: `RX-${Date.now().toString().slice(-6)}`,
      patientId: patient.id,
      patientName: patient.name,
      prescription: `${rx.drug} ${rx.dosage} ${rx.frequency}, ${rx.indication}`,
      status: "pending",
      date: rx.prescribedOn,
      pharmacist: "Ph. Sunil Joshi",
    });
    setForm({ drug: "", dosage: "", frequency: "OD", duration: "30d", indication: "" });
    setOpen(false);
  };
  return (
    <div className="mt-3">
      {!open ? (
        <button onClick={() => setOpen(true)} className="w-full py-2 border border-dashed border-zinc-300 text-xs font-semibold hover:bg-zinc-50">
          + Add prescription
        </button>
      ) : (
        <div className="border border-zinc-200 p-3 space-y-2 bg-zinc-50">
          <input placeholder="Drug e.g. Metformin 500mg" value={form.drug} onChange={(e) => setForm({ ...form, drug: e.target.value })} className="w-full px-2 py-1.5 border border-zinc-200 text-xs" />
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="Dosage" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} className="px-2 py-1.5 border border-zinc-200 text-xs" />
            <CustomSelect value={form.frequency} onChange={(v) => setForm({ ...form, frequency: v })} options={[{ value: "OD", label: "OD" }, { value: "BD", label: "BD" }, { value: "TID", label: "TID" }, { value: "HS", label: "HS" }, { value: "QID", label: "QID" }]} />
            <input placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="px-2 py-1.5 border border-zinc-200 text-xs" />
          </div>
          <input placeholder="Indication" value={form.indication} onChange={(e) => setForm({ ...form, indication: e.target.value })} className="w-full px-2 py-1.5 border border-zinc-200 text-xs" />
          <div className="flex gap-2">
            <button onClick={submit} className="flex-1 py-1.5 bg-teal-700 text-white text-xs font-semibold">Save</button>
            <button onClick={() => setOpen(false)} className="flex-1 py-1.5 border border-zinc-200 bg-white text-xs">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReferPatientForm({ patient }: { patient: import("@/lib/types").Patient }) {
  const { addReferral } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ stage: String(patient.visits[patient.visits.length - 1]?.drStage ?? 2), via: "eSanjeevani" as "eSanjeevani" | "Direct" });
  const submit = () => {
    addReferral({
      id: `REF-${Date.now().toString().slice(-6)}`,
      patientId: patient.id,
      date: new Date().toISOString().slice(0, 10),
      stage: parseInt(form.stage) as 0 | 1 | 2 | 3 | 4,
      status: "pending",
      via: form.via,
    });
    setOpen(false);
  };
  return (
    <div className="mt-3">
      {!open ? (
        <button onClick={() => setOpen(true)} className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-zinc-900 text-white text-xs font-semibold hover:bg-black">
          <Send className="w-3.5 h-3.5" /> Refer this patient
        </button>
      ) : (
        <div className="border border-zinc-700 bg-zinc-800 p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <CustomSelect value={form.stage} onChange={(v) => setForm({ ...form, stage: v })} options={[0, 1, 2, 3, 4].map((s) => ({ value: String(s), label: `Stage ${s}` }))} />
            <CustomSelect value={form.via} onChange={(v) => setForm({ ...form, via: v as any })} options={[{ value: "eSanjeevani", label: "eSanjeevani" }, { value: "Direct", label: "Direct" }]} />
          </div>
          <div className="flex gap-2">
            <button onClick={submit} className="flex-1 py-1.5 bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700">Queue referral</button>
            <button onClick={() => setOpen(false)} className="flex-1 py-1.5 border border-zinc-600 text-white text-xs">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PatientExaminationPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { patients, referrals, pharmacy } = useStore();
  const patient = useMemo(() => patients.find((p) => p.id === id), [patients, id]);
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  if (!patient) {
    return (
      <div className="w-full max-w-[1220px] mx-auto p-6 min-w-0 overflow-x-hidden">
        <Link href="/app/patients" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to patients
        </Link>
        <div className="mt-6 border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-semibold text-amber-900">Patient not found</p>
          <p className="text-sm text-zinc-600 mt-1">ID: {id}, it may have been removed or is still syncing.</p>
          <Link href="/app/patients" className="mt-3 inline-flex px-4 py-2 bg-zinc-900 text-white text-sm font-semibold">
            Back to registry
          </Link>
        </div>
      </div>
    );
  }

  const visits = [...patient.visits].sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
  const activeVisit = selectedVisit ? visits.find((v) => v.id === selectedVisit) || visits[0] : visits[0];
  const patientReferrals = referrals.filter((r) => r.patientId === patient.id);
  const patientOrders = pharmacy.filter((o) => o.patientId === patient.id);

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-6">
      {/* breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/app/patients" className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900">
          <ArrowLeft className="w-4 h-4" /> Patients
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="font-semibold">{patient.name}</span>
        <span className="text-xs font-mono text-zinc-500">{patient.id}</span>
        <span className={`ml-2 text-xs font-semibold px-2.5 py-1 border ${patient.riskScore >= 70 ? "bg-red-50 border-red-200 text-red-700" : patient.riskScore >= 40 ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
          RISK {patient.riskScore}
        </span>
      </div>

      {/* header */}
      <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-4">
        <div className="border border-zinc-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                {patient.name} <span className="text-sm font-mono font-medium text-zinc-500">{patient.id}</span>
              </h1>
              <div className="text-sm text-zinc-600 mt-1 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> {patient.age}y • {patient.gender} • {patient.diabetesType} • {patient.diabetesYears}y DM
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {patient.village}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {patient.phone}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-zinc-50 border border-zinc-200">HbA1c {patient.hbA1c}%</span>
                <span className="px-2.5 py-1 bg-zinc-50 border border-zinc-200">BP {patient.bp}</span>
                <span className={`px-2.5 py-1 border font-semibold ${patient.riskScore >= 70 ? "bg-red-50 border-red-200 text-red-700" : "bg-zinc-50 border-zinc-200"}`}>Risk {patient.riskScore}/100</span>
                {patient.familyHistory && <span className="px-2.5 py-1 bg-violet-50 border border-violet-200 text-violet-700">Family history</span>}
                {patient.symptoms.length > 0 && (
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {patient.symptoms.join(", ")}
                  </span>
                )}
              </div>
              <div className="mt-3 text-xs text-zinc-500">
                Last screened: <b className="text-zinc-900">{patient.lastScreened ? new Date(patient.lastScreened).toLocaleString() : "Never"}</b> • {visits.length} examination{visits.length !== 1 ? "s" : ""} • Foot check: {patient.footLastCheck ? new Date(patient.footLastCheck).toLocaleString() : "Not done"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`/app/patients?patient=${patient.id}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-black">
                <ScanEye className="w-4 h-4" /> Screen now
              </Link>
              <Link href="/app/patients" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50">
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
            </div>
          </div>

          {/* glucose */}
          <div className="mt-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Glucose trends (mg/dL)
            </h3>
            <div className="h-[180px] mt-2 border border-zinc-100 bg-zinc-50 p-2">
              {patient.glucose.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.glucose}>
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => String(v).slice(5)} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} domain={[80, 340]} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="fasting" stroke="#0f766e" strokeWidth={2} dot={{ r: 3 }} name="Fasting" />
                    <Line type="monotone" dataKey="postMeal" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Post-meal" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full grid place-items-center text-sm text-zinc-500">No glucose data</div>
              )}
            </div>
          </div>
        </div>

        {/* quick stats */}
        <div className="space-y-3">
          <div className="border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold text-sm">Examination history</h3>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="border border-zinc-200 p-3 bg-zinc-50">
                <div className="text-xl font-black">{visits.length}</div>
                <div className="text-xs text-zinc-600">Total</div>
              </div>
              <div className="border border-zinc-200 p-3 bg-white">
                <div className="text-xl font-black text-amber-700">{visits.filter((v) => v.drStage >= 1 && v.drStage <= 2).length}</div>
                <div className="text-xs text-zinc-600">Mild/Mod</div>
              </div>
              <div className="border border-zinc-200 p-3 bg-red-50">
                <div className="text-xl font-black text-red-700">{visits.filter((v) => v.drStage >= 3).length}</div>
                <div className="text-xs text-zinc-600">Severe/PDR</div>
              </div>
            </div>
            {visits.length > 0 && (
              <div className="mt-3 text-xs leading-relaxed p-3 bg-amber-50 border border-amber-200 text-amber-900">
                <b>Latest:</b> {DR_LABELS[visits[0].drStage]} • {(visits[0].confidence * 100).toFixed(0)}% • Q{visits[0].imageQuality} • {new Date(visits[0].date).toLocaleString()}
                <br />
                {visits[0].notes}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <Link href={`/app/patients?patient=${patient.id}`} className="flex-1 text-center px-3 py-2 bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800">
                + New examination
              </Link>
              <Link href="/app/dashboard" className="flex-1 text-center px-3 py-2 border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="border border-zinc-200 bg-zinc-900 text-white p-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Send className="w-4 h-4" /> Referrals
            </h3>
            {patientReferrals.length === 0 ? (
              <div className="text-xs text-zinc-400 mt-2">No referrals for this patient.</div>
            ) : (
              <div className="mt-2 space-y-2">
                {patientReferrals.map((r) => (
                  <div key={r.id} className="border border-zinc-700 p-2 text-xs">
                    <div className="font-semibold">
                      {r.id} • {DR_LABELS[r.stage]} • {r.status}
                    </div>
                    <div className="text-zinc-400">
                      {r.date} • {r.via} {r.doctor ? `• ${r.doctor}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <ReferPatientForm patient={patient} />
            <Link href="/app/referrals" className="mt-3 inline-flex text-xs underline text-zinc-300 hover:text-white">
              View all referrals
            </Link>
          </div>

          <div className="border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Pill className="w-4 h-4" /> Prescriptions allotted
            </h3>
            <div className="text-xs text-zinc-500 mt-1">Medication plan for this patient, add new prescriptions below</div>
            {(!patient.prescriptions || patient.prescriptions.length === 0) && patientOrders.length === 0 ? (
              <div className="text-xs text-zinc-500 mt-3">No prescriptions yet. Add via screening or below.</div>
            ) : (
              <div className="mt-3 space-y-2">
                {(patient.prescriptions || []).map((rx, i) => (
                  <div key={i} className="border border-zinc-200 p-2.5 text-xs bg-zinc-50">
                    <div className="font-semibold flex items-center justify-between">
                      <span>{rx.drug}, {rx.dosage} {rx.frequency}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${rx.status === "active" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : rx.status === "completed" ? "bg-zinc-100 border-zinc-200 text-zinc-600" : "bg-red-50 border-red-200 text-red-700"}`}>{rx.status}</span>
                    </div>
                    <div className="text-zinc-600 mt-1">
                      {rx.duration} • {rx.indication}
                    </div>
                    <div className="text-zinc-500 text-[11px] mt-1">
                      {rx.prescribedBy} • {rx.prescribedOn}
                    </div>
                  </div>
                ))}
                {patientOrders.map((o) => (
                  <div key={o.id} className="border border-zinc-200 p-2 text-xs bg-white">
                    <div className="font-medium">{o.prescription} <span className="text-zinc-500">({o.id})</span></div>
                    <div className="text-zinc-500">
                      {o.date} • {o.status} {o.pharmacist ? `• ${o.pharmacist}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AddPrescriptionForm patientId={patient.id} />
          </div>
        </div>
      </div>

      {/* exams, image and heatmap timeline */}
      <div className="border border-zinc-200 bg-white p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black tracking-tight flex items-center gap-2" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            <Eye className="w-5 h-5" /> Eye examinations, image timeline
          </h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs font-medium">
              <input type="checkbox" checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} /> Show heatmap
            </label>
            <span className="text-xs text-zinc-500">{visits.length} total</span>
          </div>
        </div>

        {visits.length === 0 ? (
          <div className="mt-6 border-2 border-dashed border-zinc-200 bg-zinc-50 p-10 text-center">
            <div className="w-12 h-12 mx-auto bg-white border border-zinc-200 grid place-items-center">
              <ImageIcon className="w-6 h-6 text-zinc-400" />
            </div>
            <div className="mt-3 font-semibold">No examinations yet</div>
            <div className="text-sm text-zinc-600 mt-1">Images you capture yesterday (or today) will appear here with heatmaps, quality, and AI staging.</div>
            <Link href={`/app/patients?patient=${patient.id}`} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800">
              <ScanEye className="w-4 h-4" /> Start screening
            </Link>
          </div>
        ) : (
          <>
            {/* gallery grid */}
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visits.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVisit(v.id)}
                  className={`group cursor-pointer border overflow-hidden bg-white hover:border-zinc-300 transition ${selectedVisit === v.id || (!selectedVisit && v.id === visits[0].id) ? "border-teal-600 ring-1 ring-teal-600" : "border-zinc-200"}`}
                >
                  <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                    {v.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={v.imageUrl}
                        alt={`Fundus ${v.date} ${DR_LABELS[v.drStage]}`}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center bg-zinc-900 text-zinc-500 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4" /> No image (seed data)
                        </span>
                      </div>
                    )}
                    {/* heatmap overlay */}
                    {showHeatmap && v.heatmapRegions.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {v.heatmapRegions.map((r, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border border-red-400/70 bg-red-500/30"
                            style={{
                              left: `${r.x}%`,
                              top: `${r.y}%`,
                              width: `${r.r * 1.8}%`,
                              height: `${r.r * 1.8}%`,
                              transform: "translate(-50%,-50%)",
                              boxShadow: "0 0 12px rgba(239,68,68,0.5)",
                            }}
                            title={r.label}
                          />
                        ))}
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-white text-xs font-bold border border-zinc-200">
                      {new Date(v.date).toLocaleDateString()} • Q{v.imageQuality}
                    </div>
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border ${v.drStage === 0 ? "bg-emerald-600 text-white border-emerald-700" : v.drStage >= 3 ? "bg-red-600 text-white border-red-700" : "bg-amber-500 text-white border-amber-600"}`}>
                      {DR_LABELS[v.drStage]}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur">{(v.confidence * 100).toFixed(0)}% conf</span>
                      <span className="p-1.5 rounded-full bg-white/90 text-zinc-900">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold leading-tight">
                      {DR_LABELS[v.drStage]} <span className="text-xs font-normal text-zinc-500">• {v.id}</span>
                    </div>
                    <div className="text-xs text-zinc-600 mt-1 line-clamp-2">{v.notes}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {v.heatmapRegions.map((r, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700">
                          {r.label}
                        </span>
                      ))}
                      {v.heatmapRegions.length === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200">No lesions</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* detailed view of selected */}
            {activeVisit && (
              <div className="mt-6 border border-zinc-200 bg-zinc-50 p-4">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
                  <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden border border-zinc-200">
                    {activeVisit.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={activeVisit.imageUrl} alt={`Fundus ${activeVisit.date}`} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-zinc-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    {showHeatmap && activeVisit.heatmapRegions.length > 0 && (
                      <div className="absolute inset-0">
                        {activeVisit.heatmapRegions.map((r, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border-2 border-red-400 bg-red-500/25"
                            style={{
                              left: `${r.x}%`,
                              top: `${r.y}%`,
                              width: `${r.r * 2}%`,
                              height: `${r.r * 2}%`,
                              transform: "translate(-50%,-50%)",
                              boxShadow: "0 0 16px rgba(239,68,68,0.6)",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-white px-2.5 py-1 rounded-full text-xs font-bold border border-zinc-200">
                      {activeVisit.date} • Quality {activeVisit.imageQuality}/100
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-bold tracking-widest text-zinc-500">SELECTED EXAMINATION</div>
                      <div className="text-xl font-black mt-1">{DR_LABELS[activeVisit.drStage]}</div>
                      <div className="text-sm text-zinc-600">
                        Confidence {(activeVisit.confidence * 100).toFixed(0)}% • Quality {activeVisit.imageQuality}/100 • {activeVisit.id}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed bg-white border border-zinc-200 p-3">{activeVisit.notes}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${activeVisit.drStage === 0 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : activeVisit.drStage >= 3 ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                        Stage {activeVisit.drStage} • {DR_LABELS[activeVisit.drStage]}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-medium">
                        Heatmap: {activeVisit.heatmapRegions.map((r) => r.label).join(", ") || "none"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/app/patients?patient=${patient.id}`} className="flex-1 text-center px-4 py-2 bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800">
                        New screening
                      </Link>
                      <button onClick={() => setSelectedVisit(null)} className="px-4 py-2 border border-zinc-200 bg-white text-sm font-medium">
                        Clear
                      </button>
                    </div>
                    <div className="text-xs text-zinc-500 leading-relaxed">
                      <ShieldCheck className="w-3 h-3 inline" /> Early result, an eye specialist will confirm before any treatment.
                    </div>
                  </div>
                </div>
                {/* Why this score */}
                {activeVisit.analysis && (
                  <div className="mt-4 border border-teal-200 bg-white p-4">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-teal-700" /> Why this score
                    </h3>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed bg-teal-50 border border-teal-200 p-2.5">{activeVisit.analysis.summary}</p>

                    <div className="mt-3 grid md:grid-cols-2 gap-3">
                      <div className="border border-zinc-200 p-3">
                        <div className="text-xs font-bold tracking-widest text-zinc-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Lesions detected
                        </div>
                        <div className="mt-2 space-y-1.5">
                          {activeVisit.analysis.lesionsDetected.map((l, i) => (
                            <div key={i} className="text-xs flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${l.severity === "severe" ? "bg-red-500" : l.severity === "moderate" ? "bg-amber-500" : l.severity === "mild" ? "bg-amber-400" : "bg-emerald-500"}`} />
                              <span className="font-medium">{l.type}</span> <span className="text-zinc-500">×{l.count}</span> <span className="text-zinc-600">, {l.locations}</span> <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold border ${l.severity === "severe" ? "bg-red-50 border-red-200 text-red-700" : l.severity === "moderate" ? "bg-amber-50 border-amber-200 text-amber-800" : l.severity === "mild" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>{l.severity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs leading-relaxed p-2.5 bg-zinc-50 border border-zinc-200">
                          <b>Why this stage:</b> {activeVisit.analysis.stageJustification}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="border border-zinc-200 p-3">
                          <div className="text-xs font-bold tracking-widest text-zinc-500">Confidence, why {(activeVisit.confidence * 100).toFixed(0)}%</div>
                          <div className="text-xs leading-relaxed mt-1 text-zinc-700">{activeVisit.analysis.confidenceExplanation}</div>
                          <div className="text-xs leading-relaxed mt-2 p-2 bg-zinc-50 border border-zinc-200">
                            <b>Image quality:</b> {activeVisit.analysis.imageQualityAssessment}
                          </div>
                        </div>
                        <div className="border border-zinc-200 overflow-hidden">
                          <div className="bg-zinc-900 text-white px-3 py-2.5 flex items-center justify-between">
                            <div className="text-xs font-bold tracking-widest">RISK SCORE, WHY {patient.riskScore}/100</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-black ${patient.riskScore >= 70 ? "bg-red-500 text-white" : patient.riskScore >= 40 ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>{patient.riskScore}</span>
                          </div>
                          <div className="divide-y divide-zinc-100">
                            {activeVisit.analysis.riskScoreBreakdown.map((r, i) => {
                              const isHigh = r.contribution.startsWith("high");
                              const isLow = r.contribution.startsWith("low");
                              return (
                                <div key={i} className="px-3 py-2.5 flex gap-3 items-start">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isHigh ? "bg-red-500" : isLow ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                      <span className="text-xs font-bold text-zinc-900">{r.factor}</span>
                                      <span className="text-xs font-mono px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded font-semibold">{r.value}</span>
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold border ${isHigh ? "bg-red-50 border-red-200 text-red-700" : isLow ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>{r.contribution.split(",")[0].trim()}</span>
                                    </div>
                                    <div className="text-xs text-zinc-600 leading-relaxed mt-0.5">{r.contribution.split(",").slice(1).join(",").trim() || r.contribution}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="bg-amber-50 border-t border-amber-200 p-3">
                            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" /> Clinical significance
                            </div>
                            <div className="text-xs leading-relaxed text-amber-900 mt-1">{activeVisit.analysis.clinicalSignificance}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid md:grid-cols-[1.2fr_0.8fr] gap-3">
                      <div className="border border-zinc-200 p-3">
                        <div className="text-xs font-bold tracking-widest text-zinc-500 flex items-center gap-1">
                          <Beaker className="w-3 h-3" /> Recommended actions
                        </div>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-xs leading-relaxed text-zinc-700">
                          {activeVisit.analysis.recommendedActions.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={`border p-3 text-center ${activeVisit.analysis.urgency === "emergency" ? "bg-red-50 border-red-200 text-red-800" : activeVisit.analysis.urgency === "urgent" ? "bg-amber-50 border-amber-200 text-amber-800" : activeVisit.analysis.urgency === "soon" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}>
                        <div className="text-xs font-bold tracking-widest">URGENCY</div>
                        <div className="text-lg font-black mt-1 capitalize">{activeVisit.analysis.urgency}</div>
                        <div className="text-xs mt-1">{activeVisit.analysis.urgency === "routine" ? "Annual rescreen" : activeVisit.analysis.urgency === "soon" ? "4 to 8 weeks" : activeVisit.analysis.urgency === "urgent" ? "1 to 2 weeks" : "Immediate"}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add new examination */}
      <AddVisitInline patientId={patient.id} />

      {/* foot & other */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="border border-zinc-200 bg-white p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <Footprints className="w-4 h-4" /> Foot screening
            </div>
            <div className="text-xs text-zinc-600 mt-1">Last: {patient.footLastCheck || "never"} • bundled with eye camp</div>
          </div>
          <Link href="/app/foot" className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold">
            Open foot
          </Link>
        </div>
        <div className="border border-zinc-200 bg-teal-50 p-4 flex items-center justify-between">
          <div className="text-sm">
            <div className="font-semibold">Need second opinion?</div>
            <div className="text-xs text-zinc-600">eSanjeevani • chat with ophthalmologist</div>
          </div>
          <Link href={`/app/patients?patient=${patient.id}`} className="px-4 py-2 bg-teal-700 text-white text-xs font-semibold">
            Ask
          </Link>
        </div>
      </div>

      {/* Patient-level chat — discuss history/case */}
      <div className="border border-zinc-200 bg-white p-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-teal-700" /> Discuss this patient — history and case
        </h3>
        <p className="text-xs text-zinc-600 mt-1">Chat about all visits, trends, and next steps. Patient history is automatically included. Supports both eye images.</p>
        <div className="mt-4">
          <CaseChat
            patientId={patient.id}
            visitId={activeVisit?.id || null}
            previews={{ left: visits.find((v) => v.eye === "left")?.imageUrl || null, right: visits.find((v) => v.eye === "right")?.imageUrl || null }}
            preview={activeVisit?.imageUrl || visits[0]?.imageUrl || null}
            patientLabel={`${patient.name} • ${patient.riskScore}/100 • ${patient.village}`}
          />
        </div>
      </div>
    </div>
  );
}
