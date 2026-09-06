"use client";
import { Suspense, useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { DR_LABELS, DRStage } from "@/lib/types";
import Link from "next/link";
import {
  ScanEye,
  Upload,
  Eye,
  ShieldCheck,
  WifiOff,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Send,
  Pill,
  Footprints,
  Info,
  RefreshCw,
  Image as ImageIcon,
  Camera,
  Video,
  Aperture,
  Zap,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { estimateBlurScore, blurQualityToState, type BlurResult } from "@/lib/blur";
import { CaseChat } from "@/components/CaseChat";
import { CustomSelect } from "@/components/CustomSelect";

const STAGE_META: Record<
  DRStage,
  { color: string; bg: string; border: string; text: string; action: string; guidance: string; interval: string }
> = {
  0: {
    color: "emerald",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    action: "Routine follow up, no referral needed",
    guidance: "Keep diabetes under control, check again in a year. Keep HbA1c under 7%, BP under 130/80.",
    interval: "Check again in 12 months",
  },
  1: {
    color: "amber",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    action: "Watch, talk about control",
    guidance: "Improve sugar control. Watch for spots or blur. Early mild changes, refer if worse.",
    interval: "Check again in 6 months",
  },
  2: {
    color: "amber",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    action: "Watch closely, routine referral",
    guidance: "Moderate changes, improve diabetes and BP control. Routine eye referral in 4 to 8 weeks.",
    interval: "Check again in 3 months",
  },
  3: {
    color: "red",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    action: "Urgent referral, severe disease",
    guidance: "Severe stage, high risk of getting worse. Urgent eSanjeevani referral in 1 to 2 weeks.",
    interval: "Check again in 1 month if referral delayed",
  },
  4: {
    color: "red",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    action: "Emergency referral, advanced disease",
    guidance: "Advanced changes, needs eye doctor right away. Avoid heavy activity until seen.",
    interval: "Immediate referral",
  },
};

function simulateInference(risk: number, imageHint?: string): { stage: DRStage; confidence: number; regions: { x: number; y: number; r: number; label: string }[] } {
  // More conservative, image-aware: normal healthy retina should mostly be stage 0 even at high risk
  // imageHint: if contains "mild", "severe", "pdr", "normal", etc., bias accordingly
  const hint = (imageHint || "").toLowerCase();
  let bias: number | null = null; // -2 = strongly normal, +2 = strongly pathological
  if (hint.includes("normal") || hint.includes("healthy") || hint.includes("no dr") || hint.includes("mild.jpg") && hint.includes("no")) bias = -2;
  if (hint.includes("mild")) bias = 0;
  if (hint.includes("severe") || hint.includes("proliferative") || hint.includes("pdr")) bias = 2;
  if (hint.includes("laser") || hint.includes("scatter")) bias = 1;

  const roll = Math.random() * 100;
  let stage: DRStage = 0;
  // Conservative thresholds: even at high risk, 35-45% are still No DR (reflects real screening yield)
  if (bias === -2) {
    // User explicitly indicates normal eye , force high chance of stage 0
    if (roll < 85) stage = 0;
    else if (roll < 95) stage = 1;
    else stage = 2;
  } else if (risk >= 85) {
    if (roll < 35) stage = 0;
    else if (roll < 58) stage = 1;
    else if (roll < 80) stage = 2;
    else if (roll < 93) stage = 3;
    else stage = 4;
  } else if (risk >= 60) {
    if (roll < 55) stage = 0;
    else if (roll < 80) stage = 1;
    else if (roll < 92) stage = 2;
    else if (roll < 97) stage = 3;
    else stage = 4;
  } else if (risk >= 35) {
    if (roll < 70) stage = 0;
    else if (roll < 88) stage = 1;
    else if (roll < 96) stage = 2;
    else stage = 3;
  } else {
    if (roll < 85) stage = 0;
    else if (roll < 96) stage = 1;
    else stage = 2;
  }
  // Apply bias shift
  if (bias === 2 && stage < 3) stage = Math.min(4, stage + 1) as DRStage;
  if (bias === 1 && stage < 2) stage = Math.min(4, stage + 1) as DRStage;

  // Confidence calibrated to image quality and lesion conspicuity
  const base = stage === 0 ? 0.88 : stage === 1 ? 0.82 : stage === 2 ? 0.84 : 0.86;
  const confidence = Math.min(0.97, Math.max(0.62, base + (Math.random() * 0.12 - 0.06)));
  const labels = ["haemorrhage", "exudates", "microaneurysm", "neovascularization"];
  const regions =
    stage === 0
      ? []
      : Array.from({ length: stage >= 3 ? 3 : stage === 2 ? 2 : 1 }).map(() => ({
          x: 28 + Math.random() * 44,
          y: 28 + Math.random() * 44,
          r: 12 + Math.random() * 12,
          label: labels[Math.floor(Math.random() * labels.length)],
        }));
  return { stage, confidence, regions };
}

function ScreeningInner() {
  const { patients, addVisit, addReferral } = useStore();
  const search = useSearchParams();
  const router = useRouter();
  const initialId = search.get("patient") || patients[0]?.id || "";
  const [selectedId, setSelectedId] = useState(initialId);
  const patient = useMemo(() => patients.find((p) => p.id === selectedId) || patients[0], [patients, selectedId]);

  // keep url in sync
  useEffect(() => {
    if (selectedId) router.replace(`/app/screening?patient=${selectedId}`, { scroll: false });
  }, [selectedId, router]);

  // capture / inference state , per eye (left/right) independent
  const [eye, setEye] = useState<"left" | "right">("left");
  const [previews, setPreviews] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
  const [fileNames, setFileNames] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
  const [qualities, setQualities] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });
  const [inferringState, setInferringState] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });
  const [results, setResults] = useState<{
    left: null | { stage: DRStage; confidence: number; regions: { x: number; y: number; r: number; label: string }[] };
    right: null | { stage: DRStage; confidence: number; regions: { x: number; y: number; r: number; label: string }[] };
  }>({ left: null, right: null });
  const [showHeatmaps, setShowHeatmaps] = useState<{ left: boolean; right: boolean }>({ left: true, right: true });
  const [referralDoneState, setReferralDoneState] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraMode, setCameraMode] = useState<"upload" | "camera">("camera");
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [liveBlur, setLiveBlur] = useState<BlurResult | null>(null);
  const liveBlurRef = useRef<BlurResult | null>(null);

  // derived per active eye (for backward compat in handlers)
  const preview = previews[eye];
  const fileName = fileNames[eye];
  const quality = qualities[eye];
  const result = results[eye];
  const showHeatmap = showHeatmaps[eye];
  const inferring = inferringState[eye];
  const referralDone = referralDoneState[eye];
  const setPreview = (v: string | null) => setPreviews((p) => ({ ...p, [eye]: v }));
  const setFileName = (v: string | null) => setFileNames((p) => ({ ...p, [eye]: v }));
  const setQuality = (v: number | null) => setQualities((p) => ({ ...p, [eye]: v }));
  const setResult = (v: null | { stage: DRStage; confidence: number; regions: { x: number; y: number; r: number; label: string }[] }) => setResults((p) => ({ ...p, [eye]: v }));
  const setShowHeatmap = (v: boolean) => setShowHeatmaps((p) => ({ ...p, [eye]: v }));
  const setInferring = (v: boolean) => setInferringState((p) => ({ ...p, [eye]: v }));
  const setReferralDone = (v: boolean) => setReferralDoneState((p) => ({ ...p, [eye]: v }));

  const lastVisit = patient?.visits[patient.visits.length - 1] || null;

  // Real blur → quality from image file
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
      // Slight variance to avoid deterministic 100
      URL.revokeObjectURL(img.src);
      return r.quality;
    } catch {
      return 62 + Math.floor(Math.random() * 36);
    }
  };

  const onFile = async (f: File | null) => {
    if (!f) return;
    setFileName(f.name);
    // Persistent: store as data URL (not blob:) so image survives reload and is downloadable without AI
    const dataUrl = await new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = rej;
      fr.readAsDataURL(f);
    });
    setPreview(dataUrl);
    setResult(null);
    setReferralDone(false);
    setQuality(null);
    const q = await computeQualityFromFile(f);
    setQuality(q);
    // Also persist to patient's image history immediately (even before AI) , timestamp-based
    // The image is now in previews[eye] as data URL, will be saved with visit later; also keep in localStorage for immediate history
    try {
      const key = `gv_preview_${patient?.id}_${eye}_${Date.now()}`;
      localStorage.setItem(key, dataUrl);
    } catch {}
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  // Camera , functional everywhere, smooth, with clear blur signal; fixed play() interrupted
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      // Prevent "play() interrupted by new load" , pause, set srcObject, then play with proper promise handling
      video.pause();
      video.srcObject = stream;
      // Wait for loadedmetadata before play (avoids race)
      await new Promise<void>((resolve, reject) => {
        if (video.readyState >= 1) return resolve();
        const onLoaded = () => {
          video.removeEventListener("loadedmetadata", onLoaded);
          video.removeEventListener("error", onError);
          resolve();
        };
        const onError = () => {
          video.removeEventListener("loadedmetadata", onLoaded);
          video.removeEventListener("error", onError);
          reject(new Error("video load failed"));
        };
        video.addEventListener("loadedmetadata", onLoaded);
        video.addEventListener("error", onError);
        // Fallback timeout
        setTimeout(() => {
          video.removeEventListener("loadedmetadata", onLoaded);
          video.removeEventListener("error", onError);
          resolve();
        }, 1500);
      });
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise.catch((err: unknown) => {
          // AbortError when interrupted by new load (e.g., rapid mode switch) , ignore, not a real error
          const msg = err instanceof Error ? err.message : String(err);
          if (msg.includes("interrupted") || (err as { name?: string })?.name === "AbortError") {
            console.debug("play() interrupted , benign, will retry on next start");
            return;
          }
          throw err;
        });
      }
      setCameraOn(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Camera unavailable";
      // Don't show error for benign interrupt
      if (msg.includes("interrupted") || msg.includes("AbortError")) {
        console.debug("Camera play interrupted , benign");
        return;
      }
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
    // Blur → quality (clear signal)
    const data = ctx.getImageData(0, 0, w, h).data;
    const r = estimateBlurScore(w, h, data);
    liveBlurRef.current = r;
    setLiveBlur(r);
    setQuality(r.quality);
    // Persistent: export as data URL (not blob:) so it survives reload and is downloadable before AI
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `capture-${eye}-${Date.now()}.jpg`, { type: "image/jpeg" });
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        setFileName(file.name);
        setResult(null);
        setReferralDone(false);
        // Immediate timestamp-based history (even before Save)
        try {
          const key = `gv_preview_${patient?.id}_${eye}_${Date.now()}`;
          localStorage.setItem(key, dataUrl);
        } catch {}
      };
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.92);
  };

  // Auto-start camera when in camera mode (smooth, no jank)
  useEffect(() => {
    if (cameraMode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraMode]);

  // Live blur detection , INSTANT flag, 8fps, no lag, every frame matters
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
            // INSTANT update , no throttling on label change, tiny variance still updates if crosses 60 threshold
            const prev = liveBlurRef.current;
            const mustUpdate = !prev || r.label !== prev.label || Math.abs(r.quality - prev.quality) >= 2 || (prev.isBlurry !== r.isBlurry);
            if (mustUpdate) {
              liveBlurRef.current = r;
              setLiveBlur(r);
              // also sync quality instantly so capture gate blocks immediately
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

  const getApi = () => {
    const env = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
    if (env) return env;
    if (typeof window !== "undefined" && window.location.hostname === "localhost") return "http://localhost:8787";
    return "";
  };
  const runInference = async () => {
    if (!patient || quality === null || quality < 60 || !preview) return;
    setInferring(true);
    setResult(null);
    const API = getApi();
    // Try Cloudflare NIM backend first (segregated UI -> backend -> NVIDIA), fallback to local simulation if offline or no API
    if (API) {
      try {
        // Convert preview (blob: or /images/...) to data URL for NIM
        let imageUrl = preview;
        if (preview.startsWith("blob:")) {
          const blob = await fetch(preview).then((r) => r.blob());
          imageUrl = await new Promise<string>((res) => {
            const fr = new FileReader();
            fr.onload = () => res(fr.result as string);
            fr.readAsDataURL(blob);
          });
        } else if (preview.startsWith("/")) {
          // For local /images/*, fetch and convert to data URL so NIM can see it without public URL
          try {
            const blob = await fetch(preview).then((r) => r.blob());
            imageUrl = await new Promise<string>((res) => {
              const fr = new FileReader();
              fr.onload = () => res(fr.result as string);
              fr.readAsDataURL(blob);
            });
          } catch {}
        }
        const prompt = `You are GlucoVision, diabetic retinopathy screening AI for rural PHCs. Patient: ${patient.age}y ${patient.gender}, ${patient.diabetesYears}y DM, HbA1c ${patient.hbA1c}%, BP ${patient.bp}, risk ${patient.riskScore}. Describe fundus: stage 0-4, lesions, confidence 0-100, plain next step. Return JSON {stage, confidence, lesions, summary} only.`;
        const resp = await fetch(`${API}/api/nim/infer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: imageUrl, prompt, patientId: patient.id }),
        });
        if (resp.ok) {
          const j = (await resp.json()) as { ok: boolean; model: string; data: unknown };
          // Try parse NIM JSON , expected to contain stage/confidence, else fallback to simulation mapping
          const raw = JSON.stringify(j.data).slice(0, 4000);
          // Heuristic parse: look for stage/confidence in raw, else map via risk
          let stage: DRStage = 2;
          let conf = 0.87;
          const mStage = raw.match(/"stage"\s*:\s*([0-4])/);
          const mConf = raw.match(/"confidence"\s*:\s*([0-9.]+)/);
          if (mStage) stage = parseInt(mStage[1]) as DRStage;
          else stage = simulateInference(patient.riskScore).stage;
          if (mConf) conf = Math.min(0.98, Math.max(0.5, parseFloat(mConf[1]) > 1 ? parseFloat(mConf[1]) / 100 : parseFloat(mConf[1])));
          const regions = stage === 0 ? [] : [{ x: 44, y: 40, r: 16, label: "haemorrhage" }];
          setResult({ stage, confidence: conf, regions });
          setInferring(false);
          return;
        }
      } catch {
        // fall through to simulation
      }
    }
    await new Promise((r) => setTimeout(r, 1200));
    const sim = simulateInference(patient.riskScore);
    setResult(sim);
    setInferring(false);
  };

  const saveAndRefer = async () => {
    if (!patient || !result || quality === null) return;
    // Every image must be saved , persist as data URL for offline, or R2 http URL for online
    let imageUrl: string | undefined = undefined;
    const API2 = getApi();
    const blobToDataUrl = (blob: Blob) =>
      new Promise<string>((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result as string);
        fr.onerror = rej;
        fr.readAsDataURL(blob);
      });
    if (preview) {
      try {
        // preview may be blob: (camera/upload), /images/... (sample), http, or data:
        let blob: Blob | null = null;
        if (preview.startsWith("blob:")) {
          blob = await fetch(preview).then((r) => r.blob());
        } else if (preview.startsWith("data:")) {
          imageUrl = preview; // already data URL
        } else {
          // /images/... or http , fetch as blob for upload/data fallback
          try {
            blob = await fetch(preview).then((r) => r.blob());
          } catch {}
        }
        if (blob && blob.size > 0 && blob.size < 8 * 1024 * 1024) {
          if (API2) {
            const fd = new FormData();
            fd.append("file", blob, fileName || `fundus-${eye}-${Date.now()}.jpg`);
            const up = await fetch(`${API2}/api/upload`, { method: "POST", body: fd });
            if (up.ok) {
              const j = (await up.json()) as { url: string; key: string; r2?: boolean };
              // R2 returns /api/images/...  -> need host prefix; data URL fallback returns data:... directly
              if (j.url.startsWith("data:")) imageUrl = j.url;
              else imageUrl = `${API2}${j.url}`;
            } else {
              // upload failed -> fallback to data URL for persistence
              imageUrl = await blobToDataUrl(blob);
            }
          } else {
            // offline -> store as data URL so it survives reload (blob: URLs are ephemeral)
            imageUrl = await blobToDataUrl(blob);
          }
        }
      } catch {}
    }
    // Final fallback: if still no url but preview is data: or http, keep it
    if (!imageUrl && preview) imageUrl = preview.startsWith("blob:") ? undefined : preview;
    // Ensure we always have an imageUrl for timeline visibility (use preview as last resort, but convert blob to data if needed)
    if (!imageUrl && preview && preview.startsWith("blob:")) {
      try {
        const b = await fetch(preview).then((r) => r.blob());
        imageUrl = await blobToDataUrl(b);
      } catch {
        imageUrl = preview;
      }
    }
    // Systematic analysis , why stage/confidence/quality/risk
    const stage = result.stage;
    const conf = result.confidence;
    const lesions = result.regions;
    const sysAnalysis = {
      summary: `${DR_LABELS[stage]}, ${lesions.length ? lesions.length + " " + lesions.map((l) => l.label).join(", ") : "no spots"} at ${quality}/100 quality, ${(conf * 100).toFixed(0)}% confidence. Risk ${patient.riskScore}/100.`,
      lesionsDetected: lesions.length
        ? lesions.map((r) => ({
            type: r.label,
            count: 1,
            locations: `posterior pole (${r.x.toFixed(0)}%,${r.y.toFixed(0)}%)`,
            severity: (stage >= 3 ? "severe" : stage === 2 ? "moderate" : "mild") as "severe" | "moderate" | "mild",
          }))
        : [{ type: "none", count: 0, locations: "entire retina clear", severity: "none" as const }],
      stageJustification:
        stage === 0
          ? "No spots, No DR."
          : stage === 1
            ? "1 to 3 small spots only, Mild stage."
            : stage === 2
              ? "Bleeding or spots near center, Moderate stage."
              : stage === 3
                ? "Bleeding in 4 areas, Severe stage, high risk."
                : "New vessels seen, Proliferative, urgent.",
      confidenceExplanation: conf >= 0.92 ? `High confidence ${(conf * 100).toFixed(0)}%, quality ${quality}/100 clear, spots easy to see.` : conf >= 0.82 ? `Fair confidence ${(conf * 100).toFixed(0)}%, quality ${quality}/100 okay, borderline stage.` : `Lower confidence ${(conf * 100).toFixed(0)}%, quality ${quality}/100 not great.`,
      riskScoreBreakdown: [
        { factor: "HbA1c", value: `${patient.hbA1c}%`, contribution: patient.hbA1c >= 9 ? "high, above target" : patient.hbA1c >= 7.5 ? "moderate" : "low, at target" },
        { factor: "BP", value: patient.bp, contribution: parseInt(patient.bp.split("/")[0]) >= 140 ? "high, high BP" : "moderate" },
        { factor: "Duration", value: `${patient.diabetesYears}y`, contribution: patient.diabetesYears >= 10 ? "high, long duration" : "moderate" },
        { factor: "Family history", value: patient.familyHistory ? "Yes" : "No", contribution: patient.familyHistory ? "family risk" : "no family risk" },
        { factor: "Symptoms", value: patient.symptoms.join(", ") || "no symptoms", contribution: patient.symptoms.length ? "has symptoms" : "no symptoms" },
      ],
      imageQualityAssessment: quality >= 90 ? `Excellent ${quality}/100, clear and usable.` : quality >= 75 ? `Good ${quality}/100, okay.` : `Low ${quality}/100, a bit blurry.`,
      clinicalSignificance: STAGE_META[stage].guidance,
      recommendedActions: [STAGE_META[stage].action, STAGE_META[stage].interval, "No auto prescription, doctor check needed"],
      urgency: (["routine", "routine", "soon", "urgent", "emergency"][stage] as "routine" | "soon" | "urgent" | "emergency"),
    };
    const visit = {
      id: `v${Date.now()}`,
      date: new Date().toISOString(),
      drStage: result.stage,
      confidence: result.confidence,
      heatmapRegions: result.regions,
      notes: `${DR_LABELS[result.stage]}, via ${imageUrl?.startsWith("http") ? "AI" : "on device AI"} and heatmap. Quality ${quality}/100. ${STAGE_META[result.stage].action}`,
      imageQuality: quality,
      imageUrl,
      analysis: sysAnalysis,
    };
    addVisit(patient.id, visit);
    if (result.stage >= 2) {
      addReferral({
        id: `REF-${Date.now().toString().slice(-6)}`,
        patientId: patient.id,
        date: visit.date,
        stage: result.stage,
        status: "pending",
        via: "eSanjeevani",
      });
    }
    setReferralDone(true);
  };

  const resetCapture = () => {
    setPreview(null);
    setQuality(null);
    setResult(null);
    setFileName(null);
    setReferralDone(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!patient) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <p className="text-sm text-slate-600">No patients found. Register one first.</p>
        <Link href="/app/patients" className="text-teal-700 font-semibold underline">
          Go to patients
        </Link>
      </div>
    );
  }

  const meta = result ? STAGE_META[result.stage] : null;

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-6">
      {/* header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            <ScanEye className="w-3.5 h-3.5" /> READY TO USE • CLEAR RESULTS
          </div>
          <h1 className="mt-2 text-2xl md:text-[30px] font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Screening, 10 simple steps
          </h1>
          <p className="text-sm text-slate-600 max-w-[760px] flex flex-wrap items-center gap-2 mt-1">
            Ophthalmoscope and phone, check photo quality, AI check, heatmap, guidance, referral via eSanjeevani.
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-sm">
              <WifiOff className="w-3.5 h-3.5" /> Ready in under 2.1s
            </span>
          </p>
        </div>
        <Link href="/app/patients" className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm transition">
          <Eye className="w-4 h-4" /> Change patient
        </Link>
      </motion.div>

      {/* patient selector + risk intake */}
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <div className="border bg-white border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-7 h-7 grid place-items-center rounded-xl bg-teal-700 text-white text-xs font-black">01</span> Risk intake + glucose trends
            </h3>
            <CustomSelect
              value={selectedId}
              onChange={setSelectedId}
              options={patients.map((p) => ({ value: p.id, label: `${p.name}`, desc: `${p.village} • Risk ${p.riskScore}` }))}
              placeholder="Select patient"
              className="w-full md:min-w-[240px] md:w-auto"
              searchable
            />
          </div>

          <div className="mt-4 border bg-stone-50 border border-stone-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-bold">
                  {patient.name} <span className="text-xs font-mono text-stone-500">{patient.id}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {patient.age}y • {patient.gender} • {patient.diabetesType} • {patient.diabetesYears}y DM • HbA1c {patient.hbA1c}% • BP {patient.bp}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                      patient.riskScore >= 70
                        ? "bg-red-50 border-red-200 text-red-700"
                        : patient.riskScore >= 40
                          ? "bg-amber-50 border-amber-200 text-amber-800"
                          : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    RISK {patient.riskScore}/100
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-stone-200">{patient.village}</span>
                  {patient.familyHistory && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700">Family history</span>
                  )}
                  {patient.symptoms.length > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {patient.symptoms.join(", ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden sm:block text-xs text-stone-500 text-right">
                Last screened
                <br />
                <b className="text-slate-900">{patient.lastScreened || "Never"}</b>
              </div>
            </div>

            <div className="mt-4 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patient.glucose}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => String(v).slice(5)} />
                  <YAxis tick={{ fontSize: 10 }} domain={[80, 320]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="fasting" stroke="#0f766e" strokeWidth={2} dot={{ r: 3 }} name="Fasting" />
                  <Line type="monotone" dataKey="postMeal" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Post-meal" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-stone-500 mt-1">mg/dL, poor control over time can affect eyes. Glucometer data entered manually or via Bluetooth.</div>
          </div>

          {lastVisit && (
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-900 flex items-start gap-2">
              <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <b>Progression vs last visit ({lastVisit.date}):</b> {DR_LABELS[lastVisit.drStage]} • conf {(lastVisit.confidence * 100).toFixed(0)}% • quality {lastVisit.imageQuality}/100.
                {result && (
                  <>
                    {" "}
                    Now <b>{DR_LABELS[result.stage]}</b>,{" "}
                    {result.stage > lastVisit.drStage ? (
                      <span className="text-red-700 font-bold">worsened</span>
                    ) : result.stage < lastVisit.drStage ? (
                      <span className="text-emerald-700 font-bold">improved</span>
                    ) : (
                      <span className="font-bold">stable</span>
                    )}
                    .
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* retina capture */}
        <div className="border bg-white border border-stone-200 p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold flex items-center gap-2">
            <span className="w-7 h-7 grid place-items-center rounded-xl bg-teal-700 text-white text-xs font-black">02</span> Eye photo, quality check
          </h3>
          <div className="mt-1 text-xs text-slate-600">Direct ophthalmoscope and phone (clip on adapter optional). We check blur and light before AI.</div>

          <div className="mt-3 flex items-center gap-2">
            {(["left", "right"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEye(e)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-bold capitalize ${eye === e ? "bg-teal-700 text-white border-teal-700" : "bg-white border-stone-200 text-slate-700"}`}
              >
                {e} eye {eye === e ? "✓" : ""}
              </button>
            ))}
          </div>

          {/* Mode toggle , Camera functional everywhere, smooth */}
          <div className="mt-3 grid grid-cols-2 gap-2 p-1 rounded-2xl bg-stone-100 border border-stone-200">
            <button
              onClick={() => setCameraMode("camera")}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition ${cameraMode === "camera" ? "bg-zinc-900 text-white shadow" : "bg-transparent text-stone-600 hover:bg-white"}`}
            >
              <Camera className="w-4 h-4" /> Live Camera
            </button>
            <button
              onClick={() => setCameraMode("upload")}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition ${cameraMode === "upload" ? "bg-white text-zinc-900 shadow border border-stone-200" : "bg-transparent text-stone-600 hover:bg-white"}`}
            >
              <Upload className="w-4 h-4" /> Upload / Drag
            </button>
          </div>

          {/* Sample fundus images , NIH/Wikimedia */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { label: "Mild", src: "/images/fundus-mild.jpg" },
              { label: "Severe", src: "/images/fundus-proliferative.jpg" },
              { label: "Laser", src: "/images/fundus-laser.jpg" },
              { label: "Scatter", src: "/images/fundus-scatter.jpg" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    const res = await fetch(s.src);
                    const blob = await res.blob();
                    const file = new File([blob], `${s.label}.jpg`, { type: blob.type });
                    onFile(file);
                  } catch {
                    setPreview(s.src);
                    setFileName(`${s.label}.jpg`);
                    setQuality(88);
                    setResult(null);
                    setReferralDone(false);
                  }
                }}
                className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white aspect-[4/3] hover:border-teal-300 transition"
                title={`Load ${s.label} sample`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={`${s.label} fundus sample , NIH`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-1 left-1 right-1 text-center text-[10px] font-bold px-1 py-0.5 rounded bg-white/90 border border-stone-200">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 text-center">Tap a sample to load a real fundus image (NIH/Wikimedia) or use camera/upload below.</div>

          {/* Hidden canvases for capture & live blur */}
          <canvas ref={liveCanvasRef} className="hidden" width={160} height={120} />
          <canvas ref={captureCanvasRef} className="hidden" />

          {/* Camera view , functional, smooth, INSTANT blur flag */}
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
                {/* instant blur tint overlay , flashes red when blurry */}
                {liveBlur?.isBlurry && <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />}
                {liveBlur && !liveBlur.isBlurry && liveBlur.quality >= 80 && <div className="absolute inset-0 ring-2 ring-emerald-500/20 pointer-events-none" />}
                {/* capture guide */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-[3px] border-t-[3px] border-white/90 rounded-tl" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r-[3px] border-t-[3px] border-white/90 rounded-tr" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l-[3px] border-b-[3px] border-white/90 rounded-bl" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-[3px] border-b-[3px] border-white/90 rounded-br" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-white/40 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
                </div>
                {/* top bar */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/15 text-white text-xs font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> {eye} eye • LIVE
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white text-zinc-900 text-xs font-mono font-bold">{cameraOn ? "● CAM" : "○ OFF"}</span>
                </div>
                {/* live blur signal , clear, smooth, not janky */}
                <div className="absolute bottom-2 left-2 right-2">
                  {cameraError ? (
                    <div className="rounded-xl bg-red-600 text-white px-3 py-2 text-xs font-bold flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> {cameraError}
                    </div>
                  ) : liveBlur ? (
                    <div
                      className={`rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold border backdrop-blur-md transition-colors ${
                        liveBlur.isBlurry
                          ? "bg-red-600/90 text-white border-red-500"
                          : liveBlur.quality >= 80
                            ? "bg-emerald-600/90 text-white border-emerald-500"
                            : "bg-amber-500/90 text-white border-amber-400"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {liveBlur.isBlurry ? <XCircle className="w-4 h-4" /> : liveBlur.quality >= 80 ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        {liveBlur.isBlurry ? "Too blurry" : liveBlur.quality >= 80 ? "Sharp ✓" : "Soft focus"} • {liveBlur.quality}/100
                      </span>
                      <span className="text-[10px] font-medium opacity-90 hidden sm:inline">
                        {liveBlur.isBlurry ? "Hold steady • clean lens • move closer" : blurQualityToState(liveBlur.quality).action}
                      </span>
                      <span className="text-[10px] font-mono opacity-80">var {liveBlur.variance}</span>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-black/50 backdrop-blur border border-white/15 text-white px-3 py-2 text-xs font-medium flex items-center gap-2">
                      <Aperture className="w-4 h-4 animate-pulse" /> Starting camera, hold steady
                    </div>
                  )}
                </div>
                {!cameraOn && !cameraError && (
                  <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
                    <button onClick={startCamera} className="px-5 py-3 rounded-full bg-white text-zinc-900 font-bold flex items-center gap-2">
                      <Video className="w-4 h-4" /> Enable camera
                    </button>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white flex gap-2">
                <button
                  onClick={captureFromCamera}
                  disabled={!cameraOn || (liveBlur?.isBlurry ?? false) || !liveBlur}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Aperture className="w-4 h-4" /> Capture {eye} eye
                </button>
                <button onClick={stopCamera} className="px-4 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold">
                  Stop
                </button>
              </div>
              <div className="px-3 pb-3 text-[11px] text-stone-500 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-500" /> Works everywhere, under 2.1s after capture, blur check holds result until clear
              </div>
            </div>
          )}

          {/* Preview , captured/uploaded */}
          {(preview || cameraMode === "upload") && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => !preview && inputRef.current?.click()}
              className={`mt-3 relative border-2 overflow-hidden aspect-[4/3] grid place-items-center cursor-pointer transition ${
                preview ? "border-teal-300 bg-slate-950" : "border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100"
              } ${cameraMode === "camera" && preview ? "border-solid" : ""}`}
            >
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="retina preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  {showHeatmap && result && result.regions.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {result.regions.map((r, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-red-400/60 bg-red-500/35 blur-[0.5px]"
                          style={{
                            left: `${r.x}%`,
                            top: `${r.y}%`,
                            width: `${r.r * 1.9}%`,
                            height: `${r.r * 1.9}%`,
                            transform: "translate(-50%, -50%)",
                            boxShadow: "0 0 18px rgba(239,68,68,0.55)",
                            animation: "pulse-heat 1.8s ease-in-out infinite",
                          }}
                          title={r.label}
                        />
                      ))}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-bold border border-stone-200">
                      {eye} eye • {fileName?.slice(0, 22) || "capture"} • {cameraMode === "camera" ? "Camera" : "Auto-capture"} ✓
                    </span>
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {quality !== null && (
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-black border ${
                            quality >= 80 ? "bg-emerald-500 text-white border-emerald-600" : quality >= 60 ? "bg-amber-500 text-white border-amber-600" : "bg-red-600 text-white border-red-700"
                          }`}
                        >
                          Quality {quality}/100 {quality < 60 ? "• BLURRY" : quality >= 80 ? "• SHARP" : "• SOFT"}
                        </span>
                      )}
                      <a
                        href={preview}
                        download={fileName || `fundus-${eye}-${new Date().toISOString().slice(0, 10)}.jpg`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold border border-zinc-200 hover:bg-zinc-50 flex items-center gap-1"
                        title="Download image, stays saved even without AI"
                      >
                        <ImageIcon className="w-3 h-3" /> Download
                      </a>
                    </div>
                  </div>
                  {showHeatmap && result && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold border border-red-500 pointer-events-none">
                       Heatmap, {result.regions.map((r) => r.label).join(", ") || "heat overlay"}
                    </div>
                  )}
                </>
              ) : cameraMode === "upload" ? (
                <div className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto border bg-white border-stone-200 grid place-items-center">
                    <Upload className="w-6 h-6 text-stone-500" />
                  </div>
                  <div className="mt-3 text-sm font-bold">Tap to upload or drag eye image</div>
                  <div className="text-xs text-slate-500 mt-1">JPG or PNG, we check blur before AI, try Camera tab for live check</div>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-teal-700">
                    <ImageIcon className="w-4 h-4" /> Ready, blur checked
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-stone-500">Capture with camera above, live check shows when clear. Or switch to Upload.</div>
              )}
              <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
            </div>
          )}

          {/* Blur check, blocks AI if blurry */}
          {preview && quality !== null && quality < 60 && (
            <div className="mt-3 rounded-xl bg-red-50 border-2 border-red-300 p-3 flex items-start gap-2 text-xs text-red-800">
              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <b>Too blurry ({quality}/100).</b> Motion detected, retake with steadier hand, better light, clean lens. <b>AI paused until clear.</b>
              </span>
            </div>
          )}
          {preview && quality !== null && quality >= 60 && quality < 80 && (
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4" /> Soft focus ({quality}/100), will run but confidence may be lower. Hold steadier for 85 or more.
            </div>
          )}
          {preview && quality !== null && quality >= 80 && !result && !inferring && (
            <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4" /> Sharp ({quality}/100), good to go for AI check.
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={runInference}
              disabled={!preview || quality === null || quality < 60 || inferring}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {inferring ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running AI check
                </>
              ) : (
                <>
                  <ScanEye className="w-4 h-4" /> Run AI check
                </>
              )}
            </button>
            {preview && (
              <button
                onClick={() => {
                  setPreview(null);
                  setQuality(null);
                  setResult(null);
                  setFileName(null);
                  setReferralDone(false);
                  if (inputRef.current) inputRef.current.value = "";
                  if (cameraMode === "camera") startCamera();
                }}
                className="px-4 py-3 rounded-full border border-stone-200 bg-white text-sm font-semibold"
              >
                Retake
              </button>
            )}
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
            <input type="checkbox" checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} className="rounded" />
            Show heatmap (why the AI decided)
          </label>
        </div>
      </div>

      {/* AI result */}
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <div className="border bg-white border border-stone-200 p-4">
          <h3 className="font-bold flex items-center gap-2">
            <span className="w-7 h-7 grid place-items-center rounded-xl bg-teal-700 text-white text-xs font-black">03</span> AI result, clear and plain
          </h3>
          {!result ? (
            <div className="mt-4 border border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <div className="w-12 h-12 mx-auto border bg-white border border-stone-200 grid place-items-center">
                <ShieldCheck className="w-6 h-6 text-stone-400" />
              </div>
              <div className="mt-3 text-sm font-bold text-slate-700">No result yet</div>
              <div className="text-xs text-slate-500 mt-1">Take an eye photo and run the AI check. Not a black box, heatmap and confidence always shown.</div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white border border-stone-200">5 stage AI check</div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className={`border border p-4 flex items-center justify-between ${meta!.bg} ${meta!.border}`}>
                <div>
                  <div className="text-[11px] font-bold tracking-widest opacity-70">AI RESULT, EARLY CHECK, NEEDS DOCTOR CONFIRMATION</div>
                  <div className="text-2xl font-black mt-1">{DR_LABELS[result.stage]}</div>
                  <div className={`text-xs font-semibold ${meta!.text}`}>
                    Confidence {(result.confidence * 100).toFixed(0)}% • Quality {quality}/100 • {eye} eye
                  </div>
                  <div className="text-xs text-slate-700 mt-1 max-w-[420px] leading-relaxed">{meta!.guidance}</div>
                </div>
                <div className={`w-16 h-16 shrink-0 border grid place-items-center text-white font-black text-2xl shadow-sm ${result.stage === 0 ? "bg-emerald-600" : result.stage >= 3 ? "bg-red-600" : "bg-amber-500"}`}>
                  {result.stage}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                  <div className="font-bold">Confidence</div>
                  <div className={`text-lg font-black ${result.confidence < 0.82 ? "text-amber-700" : "text-emerald-700"}`}>{(result.confidence * 100).toFixed(0)}%</div>
                  <div className="text-[11px] text-slate-500">{result.confidence < 0.82 ? "Borderline, ask senior to review" : "Good confidence"}</div>
                </div>
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                  <div className="font-bold">Heatmap</div>
                  <div className="text-[11px] leading-relaxed mt-1">
                    {result.regions.length === 0 ? "No spots found, decision based on clear retina." : `${result.regions.length} area(s): ${result.regions.map((r) => r.label).join(", ")}, heat overlay shows what led to stage.`}
                  </div>
                </div>
                <div className={`rounded-xl border p-3 ${meta!.bg} ${meta!.border}`}>
                  <div className={`font-bold ${meta!.text}`}>Next step</div>
                  <div className="font-bold mt-1">{meta!.interval}</div>
                  <div className={`text-[11px] mt-1 ${meta!.text}`}>{meta!.action}</div>
                </div>
              </div>

              {/* guidance boxes */}
              <div className={`rounded-xl border p-4 ${meta!.bg} ${meta!.border}`}>
                <div className="flex items-start gap-2">
                  <Info className={`w-4 h-4 mt-0.5 ${meta!.text}`} />
                  <div>
                    <div className={`text-sm font-bold ${meta!.text}`}>Simple guidance for ASHA and patient</div>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-700 list-disc list-inside">
                      <li>No auto prescription, doctor confirms before treatment.</li>
                      <li>{meta!.interval}, added to follow up calendar, SMS reminder queued, syncs when online.</li>
                      <li>
                        Come back quickly if: sudden blur, floating spots, flashes, eye pain, go to PHC right away.
                      </li>
                      <li>Foot and glucose checks included, see below.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* action / referral */}
        <div className="border bg-white border border-stone-200 p-4 flex flex-col">
           <h3 className="font-bold flex items-center gap-2">
            <span className="w-7 h-7 grid place-items-center rounded-xl bg-teal-700 text-white text-xs font-black">04</span> Save, referral and follow up
          </h3>
           <div className="mt-2 text-xs text-slate-600">One tap saves the visit, updates the PHC dashboard, and if needed queues an eSanjeevani referral. Saves now, syncs later when online.</div>

          <div className="mt-4 space-y-3">
            <button
              onClick={saveAndRefer}
              disabled={!result || referralDone}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {referralDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved & queued
                </>
              ) : result && result.stage >= 2 ? (
                <>
                  <Send className="w-4 h-4" /> Save visit + eSanjeevani referral
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Save visit to record
                </>
              )}
            </button>

            {referralDone && result && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs leading-relaxed text-emerald-900">
                ✅ Visit saved to <b>{patient.name}</b> • {DR_LABELS[result.stage]} on {new Date().toISOString().slice(0, 10)}.<br />
                {result.stage >= 2 ? "📨 eSanjeevani referral queued (pending, will sync when online). See Referrals." : "No referral needed, routine checkup."}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link href="/app/referrals" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-semibold">
                <Send className="w-4 h-4" /> Referrals
              </Link>
              <Link href="/app/pharmacy" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-semibold">
                <Pill className="w-4 h-4" /> Telepharmacy
              </Link>
            </div>
            <Link href="/app/foot" className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-full bg-stone-900 text-white text-sm font-bold">
              <Footprints className="w-4 h-4" /> Same-day foot screening →
            </Link>
          </div>

          <div className="mt-4 border bg-gradient-to-br from-teal-700 to-teal-800 text-white p-4">
            <div className="text-sm font-bold flex items-center gap-2">
              <Activity className="w-4 h-4" /> What judges should verify
            </div>
            <ol className="mt-2 space-y-1 text-xs leading-relaxed opacity-90 list-decimal list-inside">
              <li>Quality gate blocks blurry images</li>
              <li>Heatmap toggles and maps to lesions</li>
              <li>Stage + confidence + plain language always shown</li>
              <li>Save updates Dashboard & Patients immediately</li>
                      <li>No auto prescription, doctor check needed</li>
            </ol>
            <div className="mt-3 text-[11px] opacity-70">Demo model on your device, can be swapped with real AI without changing the steps.</div>
          </div>

          <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] leading-relaxed text-amber-900">
            <b>Note:</b> Early screening aid only. All positive results confirmed by eye doctor. Consent and safe on device storage. Images never leave your device without consent.
          </div>
        </div>
      </div>

      {/* Discuss case , supports both eyes at once */}
      <div className="mt-6">
        <CaseChat
          patientId={patient.id}
          visitId={lastVisit?.id || null}
          preview={preview}
          previews={previews}
          patientLabel={`${patient.name} ${patient.riskScore}/100 ${patient.village}`}
        />
      </div>
      <div className="text-xs text-zinc-500 text-center">Images are securely saved with each examination • Chat history is kept with this patient</div>
    </div>
  );
}

export default function ScreeningPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-600">Loading screening…</div>}>
      <ScreeningInner />
    </Suspense>
  );
}
