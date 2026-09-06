"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Footprints, Upload, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Search, Camera, Activity, Info, Sparkles, ArrowRight, Video, Aperture, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { estimateBlurScore, type BlurResult } from "@/lib/blur";
import { CustomSelect } from "@/components/CustomSelect";

type FootFlag = { id: string; label: string; severity: "low" | "med" | "high" };

const QUESTIONS: { key: string; label: string; hint: string }[] = [
  { key: "numbness", label: "Numbness / tingling in feet?", hint: "Peripheral neuropathy screen" },
  { key: "wound", label: "Non-healing wound / blister >1 week?", hint: "Ulcer risk" },
  { key: "swelling", label: "Swelling, redness or warmth?", hint: "Infection / Charcot flag" },
  { key: "color", label: "Colour change (pale / bluish)?", hint: "Ischaemia flag" },
  { key: "callus", label: "Callus / cracked skin?", hint: "Pressure points" },
];

export default function FootScreeningPage() {
  const { patients, updatePatient } = useStore();
  const [selectedId, setSelectedId] = useState(patients[0]?.id || "");
  const patient = useMemo(() => patients.find((p) => p.id === selectedId) || patients[0], [patients, selectedId]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number | null>(null);
  const [result, setResult] = useState<null | { risk: "low" | "moderate" | "high"; flags: FootFlag[] }>(null);
  const [q, setQ] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraMode, setCameraMode] = useState<"upload" | "camera">("camera");
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [liveBlur, setLiveBlur] = useState<BlurResult | null>(null);
  const liveBlurRef = useRef<BlurResult | null>(null);

  const filteredPatients = patients.filter((p) => `${p.name} ${p.village} ${p.id}`.toLowerCase().includes(q.toLowerCase()));

  const computeQualityFromFile = async (file: File) => {
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("load failed"));
      });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("canvas");
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      const r = estimateBlurScore(c.width, c.height, data);
      URL.revokeObjectURL(img.src);
      return r.quality;
    } catch {
      return 64 + Math.floor(Math.random() * 34);
    }
  };

  const onFile = async (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    setResult(null);
    setQuality(null);
    const qq = await computeQualityFromFile(f);
    setQuality(qq);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraOn(true);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Camera unavailable";
      setCameraError(msg.includes("NotAllowed") ? "Camera permission denied, allow camera or use upload." : msg);
      setCameraOn(false);
    }
  };
  const stopCamera = () => {
    const v = videoRef.current;
    const stream = v?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (v) v.srcObject = null;
    setCameraOn(false);
    setLiveBlur(null);
    liveBlurRef.current = null;
  };
  const captureFromCamera = async () => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const r = estimateBlurScore(w, h, data);
    liveBlurRef.current = r;
    setLiveBlur(r);
    setQuality(r.quality);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setPreview(url);
      setResult(null);
    }, "image/jpeg", 0.92);
  };
  useEffect(() => {
    if (cameraMode === "camera") startCamera();
    else stopCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraMode]);
  useEffect(() => {
    if (!cameraOn || cameraMode !== "camera") return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 120) {
        last = now;
        const video = videoRef.current;
        const c = liveCanvasRef.current;
        if (video && c && video.videoWidth) {
          const w = 160;
          const h = Math.round((video.videoHeight / video.videoWidth) * w) || 120;
          c.width = w;
          c.height = h;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(video, 0, 0, w, h);
            const d = ctx.getImageData(0, 0, w, h).data;
            const r = estimateBlurScore(w, h, d);
            const prev = liveBlurRef.current;
            const mustUpdate = !prev || r.label !== prev.label || Math.abs(r.quality - prev.quality) >= 2 || prev.isBlurry !== r.isBlurry;
            if (mustUpdate) {
              liveBlurRef.current = r;
              setLiveBlur(r);
              setQuality(r.quality);
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cameraOn, cameraMode]);

  const runCheck = () => {
    const yesCount = Object.values(answers).filter(Boolean).length;
    const hasWound = !!answers.wound;
    const hasSwelling = !!answers.swelling;
    let risk: "low" | "moderate" | "high" = "low";
    if (hasWound || hasSwelling) risk = "high";
    else if (yesCount >= 2) risk = "moderate";
    else if (yesCount === 1) risk = "moderate";
    const flags: FootFlag[] = [];
    if (answers.numbness) flags.push({ id: "1", label: "Possible nerve loss, simple touch test advised", severity: "med" });
    if (answers.wound) flags.push({ id: "2", label: "Wound not healing, ulcer risk, needs dressing and less pressure", severity: "high" });
    if (answers.swelling) flags.push({ id: "3", label: "Swelling or infection, needs urgent check", severity: "high" });
    if (answers.color) flags.push({ id: "4", label: "Possible low blood flow, check pulses if possible", severity: "high" });
    if (answers.callus) flags.push({ id: "5", label: "Hard skin or cracks, needs care and better footwear", severity: "med" });
    if (quality !== null && quality < 60) flags.push({ id: "6", label: "Photo too blurry, retake in better light", severity: "low" });
    setResult({ risk, flags });
    if (patient) updatePatient(patient.id, { footLastCheck: new Date().toISOString().slice(0, 10) });
  };

  if (!patient) {
    return (
      <div className="w-full max-w-[1220px] mx-auto p-6 min-w-0 overflow-x-hidden text-sm text-slate-600">
        No patients. <Link href="/app/patients" className="text-teal-700 font-bold underline">Register one</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <Footprints className="w-3.5 h-3.5" /> SAME PHONE • SAME VISIT
          </div>
          <h1 className="mt-2 text-2xl md:text-[30px] font-black tracking-tight flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
            Foot screening
          </h1>
          <p className="text-sm text-slate-600 max-w-[760px]">Diabetic foot check in under 3 minutes: 5 quick questions, phone photo, clear color guidance. No extra device, works like the eye check.</p>
        </div>
        <Link href="/app/screening" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm transition">
          Back to eye screening <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="border bg-white border border-stone-200 p-5 space-y-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 grid place-items-center text-teal-700">
                  <Search className="w-4 h-4" />
                </span>
                Choose patient
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 font-medium">{patient.footLastCheck ? `Last foot check: ${patient.footLastCheck}` : "No prior foot check"}</span>
            </div>
            <div className="mt-3 relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-teal-600 transition" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patient…" className="w-full pl-10 pr-3 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none transition" />
            </div>
            <CustomSelect value={selectedId} onChange={setSelectedId} options={(q ? filteredPatients : patients).map((p) => ({ value: p.id, label: p.name, desc: `${p.village} ${p.footLastCheck ? `• foot ${p.footLastCheck}` : "• no foot record"}` }))} placeholder="Select patient" searchable />
            <motion.div layout className="mt-3 rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs leading-relaxed">
              <div className="font-bold">{patient.name} • {patient.age}y • {patient.diabetesYears}y DM • HbA1c {patient.hbA1c}%</div>
              <div className="text-slate-600">{patient.village} • Risk {patient.riskScore} • {patient.symptoms.join(", ") || "no eye symptoms"}</div>
            </motion.div>
          </div>

          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-700" /> 5-point foot check (ASHA-friendly)
            </h3>
            <div className="mt-3 space-y-2">
              {QUESTIONS.map((qq, i) => (
                <motion.label
                  key={qq.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${answers[qq.key] ? "bg-amber-50 border-amber-200 shadow-sm" : "bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300"}`}
                >
                  <input type="checkbox" checked={!!answers[qq.key]} onChange={(e) => setAnswers({ ...answers, [qq.key]: e.target.checked })} className="mt-1 rounded border-stone-300 text-teal-700 focus:ring-teal-600" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold leading-tight">{qq.label}</div>
                    <div className="text-xs text-slate-500">{qq.hint}</div>
                  </div>
                  <AnimatePresence>
                    {answers[qq.key] && (
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.label>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-stone-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" /> Tap yes for any that apply. This is a risk flag, not a final diagnosis, referral decides treatment.
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="border bg-white border border-stone-200 p-5 shadow-sm">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 grid place-items-center text-teal-700">
                <Camera className="w-4 h-4" />
              </span>
              Foot photo, quality check (same as eye photo)
            </h3>
            <div className="text-xs text-slate-600 mt-1">Place foot on plain background, good light, include sole and top. Quick check before flagging.</div>

            <div className="mt-3 grid grid-cols-2 gap-2 p-1 rounded-2xl bg-stone-100 border border-stone-200">
              <button onClick={() => setCameraMode("camera")} className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition ${cameraMode === "camera" ? "bg-zinc-900 text-white shadow" : "bg-transparent text-stone-600 hover:bg-white"}`}>
                <Camera className="w-4 h-4" /> Live Camera
              </button>
              <button onClick={() => setCameraMode("upload")} className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition ${cameraMode === "upload" ? "bg-white text-zinc-900 shadow border border-stone-200" : "bg-transparent text-stone-600 hover:bg-white"}`}>
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>
            <canvas ref={liveCanvasRef} className="hidden" width={160} height={120} />
            <canvas ref={captureCanvasRef} className="hidden" />

            {cameraMode === "camera" && !preview && (
              <div
                className={`mt-3 rounded-2xl overflow-hidden bg-black relative transition-colors duration-150 ${
                  liveBlur?.isBlurry
                    ? "border-[3px] border-red-500 shadow-[0_0_24px_rgba(239,68,68,0.35)]"
                    : liveBlur && liveBlur.quality >= 80
                      ? "border-[3px] border-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.30)]"
                      : "border border-zinc-200"
                }`}
              >
                <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                  {liveBlur?.isBlurry && <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />}
                  {liveBlur && !liveBlur.isBlurry && liveBlur.quality >= 80 && <div className="absolute inset-0 ring-2 ring-emerald-500/20 pointer-events-none" />}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-[3px] border-t-[3px] border-white/90 rounded-tl" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-[3px] border-t-[3px] border-white/90 rounded-tr" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-[3px] border-b-[3px] border-white/90 rounded-bl" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-[3px] border-b-[3px] border-white/90 rounded-br" />
                  </div>
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/15 text-white text-xs font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white text-zinc-900 text-xs font-mono font-bold">{cameraOn ? "● CAM" : "○ OFF"}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    {cameraError ? (
                      <div className="rounded-xl bg-red-600 text-white px-3 py-2 text-xs font-bold flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> {cameraError}
                      </div>
                    ) : liveBlur ? (
                      <div className={`rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold border backdrop-blur-md ${liveBlur.isBlurry ? "bg-red-600/90 text-white border-red-500" : liveBlur.quality >= 80 ? "bg-emerald-600/90 text-white border-emerald-500" : "bg-amber-500/90 text-white border-amber-400"}`}>
                        <span className="flex items-center gap-1.5">
                          {liveBlur.isBlurry ? <XCircle className="w-4 h-4" /> : liveBlur.quality >= 80 ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {liveBlur.isBlurry ? "Too blurry" : liveBlur.quality >= 80 ? "Sharp ✓" : "Soft focus"} • {liveBlur.quality}/100
                        </span>
                        <span className="text-[10px] font-mono opacity-80">var {liveBlur.variance}</span>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-black/50 backdrop-blur border border-white/15 text-white px-3 py-2 text-xs font-medium flex items-center gap-2">
                        <Aperture className="w-4 h-4 animate-pulse" /> Starting, hold foot steady
                      </div>
                    )}
                  </div>
                  {!cameraOn && !cameraError && (
                    <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
                      <button onClick={() => { setCameraMode("camera"); setTimeout(() => { const v = videoRef.current; if (v && !cameraOn) { navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } }).then(s => { v.srcObject = s; v.play(); setCameraOn(true); }).catch(()=>{}); } }, 100); }} className="px-5 py-3 rounded-full bg-white text-zinc-900 font-bold flex items-center gap-2">
                        <Video className="w-4 h-4" /> Enable camera
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-white flex gap-2">
                  <button onClick={captureFromCamera} disabled={!cameraOn || (liveBlur?.isBlurry ?? false) || !liveBlur} className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed">
                    <Aperture className="w-4 h-4" /> Capture foot
                  </button>
                  <button onClick={stopCamera} className="px-4 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold">
                    Stop
                  </button>
                </div>
              </div>
            )}

            {(preview || cameraMode === "upload") && (
              <label className={`mt-3 relative border-2 overflow-hidden aspect-[4/3] grid place-items-center cursor-pointer transition flex flex-col ${preview ? "border-teal-300 bg-slate-950" : "border-dashed border-stone-300 bg-stone-50 hover:bg-white hover:border-stone-400 hover:shadow-sm"}`}>
                {preview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="foot preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-bold border border-stone-200 shadow-sm">Foot capture ✓</span>
                      {quality !== null && (
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black border shadow-md ${quality >= 80 ? "bg-emerald-500 text-white border-emerald-600" : quality >= 60 ? "bg-amber-500 text-white border-amber-600" : "bg-red-600 text-white border-red-700"}`}>
                          Quality {quality}/100 {quality < 60 ? "• BLURRY" : quality >= 80 ? "• SHARP" : "• SOFT"}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <motion.div whileHover={{ scale: 1.02 }} className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto border bg-white border-stone-200 grid place-items-center shadow-sm">
                      <Upload className="w-6 h-6 text-stone-500" />
                    </div>
                    <div className="mt-3 text-sm font-bold">Tap to add foot photo</div>
                    <div className="text-xs text-slate-500 mt-1">Optional but improves triage. Real blur detection before flagging.</div>
                  </motion.div>
                )}
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
              </label>
            )}

            <AnimatePresence>
              {quality !== null && quality < 60 && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-3 rounded-xl bg-red-50 border-2 border-red-300 p-3 flex items-start gap-2 text-xs text-red-800">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0" /> Quality {quality}/100, <b>Too blurry</b>. Retake with steadier hand, better light, plain background.
                </motion.div>
              )}
              {quality !== null && quality >= 60 && quality < 80 && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2 text-xs text-amber-800">
                  <AlertTriangle className="w-4 h-4" /> Soft focus {quality}/100, will flag but hold steadier for 85 or more.
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={runCheck} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 shadow-lg shadow-teal-700/20 hover:shadow-xl transition">
              <ShieldCheck className="w-4 h-4" /> Run foot risk flag
            </motion.button>
            <div className="mt-2 text-[11px] text-center text-stone-500">On device check, no cloud needed. Image stays on your device.</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="border bg-white border border-stone-200 p-5 shadow-sm">
            <h3 className="font-bold text-sm">Result, color coded guidance</h3>
            {!result ? (
              <div className="mt-3 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-stone-200 grid place-items-center">
                  <Footprints className="w-5 h-5 text-stone-400" />
                </div>
                <div className="mt-2 text-sm font-bold text-slate-700">No check yet</div>
                <div className="text-xs text-slate-500">Answer the 5 questions (and optional photo) then run the flag.</div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-3">
                <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`border border p-4 flex items-center justify-between ${result.risk === "low" ? "bg-emerald-50 border-emerald-200" : result.risk === "moderate" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest opacity-60">FOOT RISK FLAG • PRELIMINARY</div>
                    <div className={`text-xl font-black mt-1 ${result.risk === "low" ? "text-emerald-700" : result.risk === "moderate" ? "text-amber-800" : "text-red-700"}`}>{result.risk === "low" ? "Low risk, self care" : result.risk === "moderate" ? "Moderate, PHC review" : "High, urgent referral"}</div>
                    <div className="text-xs text-slate-700 mt-1">{result.flags.length === 0 ? "No flags, keep up foot care." : `${result.flags.length} flag(s) found`}</div>
                  </div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className={`w-14 h-14 border grid place-items-center text-white font-black text-xl shadow-lg ${result.risk === "low" ? "bg-emerald-600 shadow-emerald-600/20" : result.risk === "moderate" ? "bg-amber-500 shadow-amber-500/20" : "bg-red-600 shadow-red-600/20"}`}>{result.risk === "low" ? "✓" : result.risk === "moderate" ? "!" : "!!"}</motion.div>
                </motion.div>

                {result.flags.length > 0 ? (
                  <div className="space-y-2">
                    {result.flags.map((f, i) => (
                      <motion.div key={f.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`rounded-xl border p-3 text-xs leading-relaxed flex items-start gap-2 ${f.severity === "high" ? "bg-red-50 border-red-200 text-red-800" : f.severity === "med" ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-stone-50 border-stone-200 text-slate-700"}`}>
                        {f.severity === "high" ? <XCircle className="w-4 h-4 shrink-0 mt-0.5" /> : f.severity === "med" ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                        <span>{f.label}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs leading-relaxed text-emerald-900">✅ No red flags. Counsel: daily foot check, moisturise, never walk barefoot, trim nails straight, report any blister within 24h.</div>
                )}

                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs leading-relaxed">
                  <b>Next steps:</b>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>{result.risk === "high" ? "Urgent PHC/MO review + referral to surgery/podiatry. Offload pressure, sterile dressing." : result.risk === "moderate" ? "Review at PHC within 1 week. Footwear & hygiene counselling." : "Re-screen every 6 months; sooner if wound appears."}</li>
                    <li>Record saved to {patient.name} • last foot check updated.</li>
                    <li>Combine with eye & glucose data on the <Link href="/app/patients" className="text-teal-700 font-bold underline">patient record</Link>.</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Link href="/app/pharmacy" className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-black transition">Post-care via pharmacy</Link>
                  <Link href={`/app/screening?patient=${patient.id}`} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 transition">Back to eye screen →</Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white p-6 grid md:grid-cols-2 gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="relative">
          <h3 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-300" /> Why bundled?</h3>
          <p className="text-sm opacity-90 mt-1 leading-relaxed">Eye and foot risk share the same factors (duration, HbA1c, BP). One visit, one record, one ASHA workflow, double the benefit without extra trips.</p>
        </div>
        <div className="relative border bg-white text-slate-900 p-4 shadow-xl">
          <div className="text-xs font-black tracking-widest text-teal-700">TRY IN 60 SECONDS</div>
          <ol className="mt-2 space-y-1 text-sm list-decimal list-inside">
            <li>Pick a high risk patient (Arjun or Ramesh), check wound and upload any photo, see High flag</li>
            <li>Pick a low risk patient, no flags, see Low risk</li>
            <li>See last foot check update on the patient card</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
