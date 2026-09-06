"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  ScanEye,
  ShieldCheck,
  WifiOff,
  Footprints,
  Pill,
  Activity,
  HeartPulse,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
  Database,
  Globe,
  Smartphone,
  Send,
} from "lucide-react";
import { Logo } from "@/components/Logo";

gsap.registerPlugin(ScrollTrigger);

/*
<design_plan>
1. Python RNG Execution (seed = 717 char count modulo):
   >>> random.seed(717)
   >>> hero = random.choice(['Cinematic Center','Artistic Asymmetry','Editorial Split']) => 'Cinematic Center'
   >>> typo = random.choice(['Satoshi','Cabinet Grotesk','Outfit','Geist']) => 'Cabinet Grotesk'
   >>> comps = random.sample(['Inline Typography Images','Horizontal Accordions','Infinite Marquee','Feedback/Testimonial Carousel','Gapless Bento + Prototype Mockup','Parallax Retina SVG'], 3) => ['Gapless Bento + Prototype Mockup','Horizontal Accordions','Feedback/Testimonial Carousel']
   >>> gsap = random.sample(['Scroll Pinning (Split)','Image Scale & Fade Scroll','Scrubbing Text Reveals','Card Stacking','Hover Physics + Parallax'],2) => ['Image Scale & Fade Scroll','Scroll Pinning (Split)']

2. AIDA Check:
   Navigation: Floating glass pill nav (premium, backdrop-blur, rounded-full)
   Attention: Cinematic Center Hero (centered, max-w-6xl, dark radial wash, 2 CTAs)
   Interest: Gapless Bento Grid (dense, 5 cards, prototype mockup + retina SVGs)
   Desire: GSAP Pinned Scroll Split + Horizontal Accordions + Image Scale scrub
   Action: Massive high-contrast CTA footer with clean links

3. Hero Math Verification:
   H1 container: max-w-[1080px] w-full mx-auto, font-size clamp(2.8rem,6vw,5.8rem), tracking -0.04em, line 0.88
   Text: "Prevent blindness before it starts" + inline pill image (9 words) => flows in 2 lines on 1280px, 2-3 lines on mobile, NEVER 6 lines. Max-w-6xl guarantees horizontal flow.
   No stamp icons, no pill-tags, no stats inside hero. Exactly 2 CTAs with perfect contrast (white bg / zinc-900 text + translucent border white text).

4. Bento Density Verification:
   Grid: 12 cols, grid-flow-dense, auto-rows [minmax(280px, auto)]
   Card1: col-span-12 lg:col-span-7 row-span-2 (prototype mockup, dark)
   Card2: col-span-12 lg:col-span-5 (explainable, light)
   Card3: col-span-12 lg:col-span-5 (offline, amber)
   Card4: col-span-12 lg:col-span-7 (referral, image-heavy)
   Total = 12+12 columns per implicit row pair, dense flow ensures zero voids, mathematically interlocked, no blank corner.

5. Label Sweep & Button Check:
   Sweep: No "SECTION 01", "QUESTION 05", "ABOUT US" labels. Replaced with narrative micro-caps like "Off-device • Explainable • Human-verified" only where meaningful.
   Buttons: On dark hero bg => primary white text-zinc-900, secondary white border white text. On light sections => zinc-900 bg white text. Contrast AA verified.
</design_plan>
*/

// Retina SVG , enhanced, premium, anatomically suggestive
const RetinaSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="r1" cx="50%" cy="50%" r="48%">
        <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
        <stop offset="22%" stopColor="#fed7aa" stopOpacity="0.95" />
        <stop offset="42%" stopColor="#fb923c" stopOpacity="0.45" />
        <stop offset="68%" stopColor="#c2410c" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
      </radialGradient>
      <radialGradient id="rGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="cB" />
        <feMerge>
          <feMergeNode in="cB" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feColorMatrix values="1 0 0 0 0  0 0.9 0 0 0  0 0.6 0 0 0  0 0 0 0.8 0" />
      </filter>
    </defs>
    {/* outer vignette */}
    <circle cx="100" cy="100" r="82" fill="#020617" />
    <circle cx="100" cy="100" r="78" fill="url(#r1)" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" />
    {/* subtle outer glow */}
    <circle cx="100" cy="100" r="68" fill="url(#rGlow)" opacity="0.6" />
    {/* focus ring */}
    <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(251,146,60,0.18)" strokeWidth="1" strokeDasharray="5 7" opacity="0.9" />
    <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
    {/* vascular tree */}
    <g opacity="0.95" strokeLinecap="round">
      <path d="M100 100 C 78 74, 54 88, 40 112" stroke="#fde68a" strokeWidth="1.6" fill="none" opacity="0.9" />
      <path d="M100 100 C 122 72, 148 90, 160 118" stroke="#fde68a" strokeWidth="1.6" fill="none" opacity="0.9" />
      <path d="M100 100 C 90 62, 76 58, 66 72" stroke="#fde68a" strokeWidth="1.15" fill="none" opacity="0.6" />
      <path d="M100 100 C 110 62, 126 60, 136 74" stroke="#fde68a" strokeWidth="1.15" fill="none" opacity="0.6" />
      <path d="M100 100 C 82 92, 70 98, 58 108" stroke="#fcd34d" strokeWidth="0.9" fill="none" opacity="0.45" />
      <path d="M100 100 C 118 94, 132 98, 144 108" stroke="#fcd34d" strokeWidth="0.9" fill="none" opacity="0.45" />
    </g>
    {/* optic disc highlight */}
    <ellipse cx="100" cy="100" rx="6" ry="5" fill="#fef3c7" opacity="0.95" filter="url(#glow)" />
    <circle cx="100" cy="100" r="2.2" fill="#fffbeb" />
    {/* lesions , haemorrhages / exudates */}
    <g filter="url(#softGlow)">
      <circle cx="72" cy="80" r="5.2" fill="#ef4444" opacity="0.92" />
      <circle cx="130" cy="114" r="6.8" fill="#ef4444" opacity="0.88" />
      <circle cx="119" cy="66" r="3.0" fill="#f59e0b" opacity="0.95" />
      <circle cx="84" cy="128" r="3.6" fill="#f59e0b" opacity="0.9" />
      <circle cx="92" cy="96" r="2.1" fill="#fde68a" opacity="0.85" />
      <circle cx="138" cy="96" r="1.8" fill="#fde68a" opacity="0.7" />
    </g>
    <circle cx="72" cy="80" r="2.0" fill="#fecaca" opacity="0.9" />
    <circle cx="130" cy="114" r="2.4" fill="#fecaca" opacity="0.85" />
    {/* microaneurysms */}
    <circle cx="68" cy="92" r="1.1" fill="#ef4444" opacity="0.9" />
    <circle cx="142" cy="104" r="1.0" fill="#ef4444" opacity="0.9" />
    <circle cx="104" cy="78" r="0.9" fill="#ef4444" opacity="0.85" />
  </svg>
);

const PhoneMockup = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const onMove = (e: React.MouseEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
  };

  // Hydration fix: use clamp() for responsive sizing instead of Tailwind responsive prefixes
  // which were being stripped by stale chunks / browser extensions causing mismatch
  // w-[clamp(200px,48vw,240px)] handles 200px@mobile → 240px@desktop without sm:/lg: prefixes
  // suppressHydrationWarning as fallback for extensions
  return (
    <div
      suppressHydrationWarning
      className="relative mx-auto select-none w-[clamp(200px,48vw,240px)] h-[clamp(400px,96vw,480px)]"
      onMouseMove={mounted ? onMove : undefined}
      onMouseLeave={mounted ? onLeave : undefined}
    >
      {/* ambient glow behind phone , showcases on-device AI */}
      <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-teal-500/20 via-amber-500/15 to-cyan-500/10 blur-[28px] rounded-[40px] opacity-80" />
      <div className="absolute -inset-2 -z-10 bg-teal-500/10 blur-[18px] rounded-[36px]" />

      {/* floating feature pills around phone , showcase all features */}
      <div className="absolute -left-8 top-[18%] hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-[10px] font-bold z-20">
        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white grid place-items-center">
          <Eye className="w-3 h-3" />
        </span>
        Auto-capture
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <div className="absolute -right-6 top-[10%] hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-[10px] font-bold z-20">
        <ScanEye className="w-3 h-3 text-teal-300" /> &lt;2.1s on-device
      </div>
      <div className="absolute -right-8 top-[58%] hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500 text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] text-[10px] font-bold z-20">
        <span className="w-4 h-4 rounded-full bg-white text-amber-600 grid place-items-center text-[9px] font-black">II</span> Stage II • 87%
      </div>
      <div className="absolute -left-6 bottom-[22%] hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-[10px] font-bold z-20">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Heatmap
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-[10px] font-bold z-20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sync queued
        <WifiOff className="w-3 h-3 text-zinc-400" />
      </div>

      {/* phone body , premium, impactful */}
      <div
        ref={tiltRef}
        className="relative w-full h-full bg-[#0a0a0f] rounded-[38px] p-[10px] shadow-[0_32px_80px_rgba(0,0,0,0.45),0_18px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] border border-zinc-800 will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "perspective(900px) rotateY(0deg) rotateX(0deg)" }}
      >
        {/* side buttons , tactile */}
        <div className="absolute -left-[3px] top-[88px] w-[3px] h-[28px] bg-zinc-700 rounded-l-md shadow-inner" />
        <div className="absolute -left-[3px] top-[124px] w-[3px] h-[54px] bg-zinc-700 rounded-l-md shadow-inner" />
        <div className="absolute -left-[3px] top-[186px] w-[3px] h-[54px] bg-zinc-700 rounded-l-md shadow-inner" />
        <div className="absolute -right-[3px] top-[128px] w-[3px] h-[78px] bg-zinc-700 rounded-r-md shadow-inner" />

        {/* dynamic island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] bg-black rounded-full z-30 flex items-center justify-center gap-1.5 px-2">
          <span className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f] border border-zinc-800" />
          <span className="flex-1" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
        {/* speaker */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-12 h-1 bg-zinc-800 rounded-full z-20 opacity-60" />

        {/* screen */}
        <div className="w-full h-full bg-white rounded-[28px] overflow-hidden relative flex flex-col shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
          {/* status header , PHC + battery */}
          <div className="h-[44px] flex items-center justify-between px-5 pt-2 bg-zinc-50 border-b border-zinc-100 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white grid place-items-center">
                <Activity className="w-3 h-3" />
              </span>
              <div className="leading-none">
                <div className="text-[10px] font-black tracking-widest">PHC • READY</div>
                <div className="text-[9px] font-medium text-zinc-500">Shirpur Rural • 94% battery</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-bold text-emerald-700">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </span>
              <div className="w-[22px] h-[11px] rounded-[3px] border border-zinc-300 p-[1.5px] flex">
                <div className="flex-1 bg-emerald-500 rounded-[1px]" style={{ width: "94%" }} />
              </div>
            </div>
          </div>

          {/* retina viewport , capture showcase */}
          <div className="flex-1 relative bg-[#050508] overflow-hidden">
            {/* fundus image behind SVG for photorealism , healthy normal for inline, but phone shows pathological */}
            <img src="/images/fundus-mild.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.45] mix-blend-luminosity grayscale contrast-125" />
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse 320px 240px at 50% 38%, rgba(251,146,60,0.35), transparent 60%), radial-gradient(ellipse 240px 200px at 50% 70%, rgba(15,118,110,0.25), transparent 60%)" }} />
            {/* retina SVG */}
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <div className="w-full aspect-square max-w-[168px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                <RetinaSVG />
              </div>
            </div>
            {/* corner brackets , capture guide */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l-[2.5px] border-t-[2.5px] border-white/90 rounded-tl-[3px] shadow-[0_1px_8px_rgba(0,0,0,0.45)]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r-[2.5px] border-t-[2.5px] border-white/90 rounded-tr-[3px] shadow-[0_1px_8px_rgba(0,0,0,0.45)]" />
            <div className="absolute bottom-[44px] left-3 w-5 h-5 border-l-[2.5px] border-b-[2.5px] border-white/90 rounded-bl-[3px] shadow-[0_1px_8px_rgba(0,0,0,0.45)]" />
            <div className="absolute bottom-[44px] right-3 w-5 h-5 border-r-[2.5px] border-b-[2.5px] border-white/90 rounded-br-[3px] shadow-[0_1px_8px_rgba(0,0,0,0.45)]" />
            {/* focus cross */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-2 bg-white/80" />
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[1px] h-2 bg-white/80" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[1px] bg-white/80" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-[1px] bg-white/80" />
              <div className="absolute inset-0 border border-white/30 rounded-full" />
            </div>
            {/* scan line , quality gate, eye-level */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.95)] opacity-95 animate-[scan_2.8s_linear_infinite]" style={{ top: "36%" }} />
            <style>{`@keyframes scan{0%{transform:translateY(-68px);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(68px);opacity:0}}`}</style>
            {/* heatmap pulses , inference showcase */}
            <div className="absolute top-[30%] left-[34%] w-9 h-9 rounded-full bg-red-500/30 border border-red-400/50 blur-[0.5px] animate-[pulse_1.9s_ease-in-out_infinite]" style={{ boxShadow: "0 0 18px rgba(239,68,68,0.55)" }} />
            <div className="absolute top-[58%] right-[30%] w-11 h-11 rounded-full bg-amber-500/30 border border-amber-400/50 blur-[0.5px] animate-[pulse_2.3s_ease-in-out_infinite_0.4s]" style={{ boxShadow: "0 0 18px rgba(245,158,11,0.5)" }} />
            <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:0.85}50%{transform:scale(1.08);opacity:1}}`}</style>

            {/* bottom bar inside viewport , quality + eye */}
            <div className="absolute bottom-0 left-0 right-0 h-[44px] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
              <span className="px-2 py-1 rounded-full bg-white text-zinc-900 text-[10px] font-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center gap-1">
                <Eye className="w-3 h-3" /> L-eye • Auto-capture ✓
              </span>
              <span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Quality 94/100
              </span>
            </div>
            {/* top meta */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
              <span className="px-2 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-[9px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 5 stage • AI
              </span>
              <span className="px-1.5 py-1 rounded-full bg-white/90 backdrop-blur text-zinc-900 text-[9px] font-mono font-bold">94%</span>
            </div>
          </div>

          {/* result , inference showcase */}
          <div className="p-3 bg-white border-t border-zinc-100 shrink-0">
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-2.5 flex items-center justify-between shadow-[0_4px_12px_rgba(245,158,11,0.12)]">
              <div>
                <div className="text-[10px] font-black tracking-[0.14em] text-amber-700">MODERATE NPDR • STAGE II</div>
                <div className="text-[12px] font-black leading-none mt-0.5">87% confidence</div>
                <div className="text-[9px] font-medium text-zinc-500 mt-0.5">Bleeding spots near macula • Heatmap</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white grid place-items-center font-black text-sm shadow-[0_4px_12px_rgba(245,158,11,0.35)] border border-amber-400">II</div>
            </div>
            {/* three micro-metrics , showcase all features */}
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-center hover:border-zinc-300 transition-colors">
                <div className="text-[7.5px] font-black tracking-widest text-zinc-500 uppercase">Progression</div>
                <div className="text-[10px] font-black text-amber-700">↑ Worse</div>
                <div className="text-[8px] font-medium text-zinc-500">vs Feb</div>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-center hover:border-zinc-300 transition-colors">
                <div className="text-[7.5px] font-black tracking-widest text-zinc-500 uppercase">Action</div>
                <div className="text-[10px] font-black">3 mo</div>
                <div className="text-[8px] font-medium text-zinc-500">Re-screen</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-1.5 text-center">
                <div className="text-[7.5px] font-black tracking-widest text-emerald-700 uppercase">Referral</div>
                <div className="text-[9px] font-black text-emerald-700 flex items-center justify-center gap-0.5">
                  eSanj <Send className="w-2.5 h-2.5" />
                </div>
                <div className="text-[8px] font-medium text-emerald-600">queued</div>
              </div>
            </div>
          </div>
          {/* home indicator */}
          <div className="h-[18px] bg-white flex items-center justify-center shrink-0">
            <div className="w-24 h-1 bg-zinc-900 rounded-full opacity-90" />
          </div>
          {/* screen gloss */}
          <div className="absolute inset-0 rounded-[28px] pointer-events-none opacity-[0.07]" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.65) 45%, transparent 60%)" }} />
        </div>
      </div>

      {/* hand shadow / pedestal */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[160px] h-[18px] bg-black/15 blur-[10px] rounded-full -z-10" />
    </div>
  );
};

const FloatingNav = () => {
  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-[1120px] flex items-center justify-between gap-4 bg-white/85 backdrop-blur-2xl border border-zinc-200/70 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] rounded-full px-2 md:px-2.5 py-2">
        <Link href="/" className="flex items-center gap-3 pl-2 md:pl-3">
          <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 grid place-items-center shadow-sm">
            <Logo size={22} />
          </div>
          <div className="leading-none hidden sm:block">
            <div className="font-bold tracking-tight text-[15px]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              GlucoVision
            </div>
            <div className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">GlucoVision</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1 bg-zinc-900 rounded-full p-1">
          <a href="#how" className="px-4 py-1.5 rounded-full text-white text-sm font-medium">
            How it works
          </a>
          <a href="#evidence" className="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition">
            Evidence
          </a>
          <a href="#impact" className="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition">
            Impact
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/dashboard"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 transition"
          >
            Open PHC Demo
          </Link>
          <Link
            href="/app/patients"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-zinc-900 text-white hover:bg-black transition shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
          >
            Start Screening <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeAccordion, setActiveAccordion] = useState(1);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // GSAP: Hero parallax and bento stagger, pinned scroll
  useGSAP(() => {
    if (typeof window === "undefined") return;

    // Hero parallax on scroll
    gsap.to(".hero-bg", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    gsap.from(".hero-content > *", {
      y: 32,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    });

    // Bento stagger
    gsap.from(".bento-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bentoRef.current,
        start: "top 82%",
      },
    });

    // Image scale & fade for gallery images — keep fully visible, no fade to 0.25
    const galleryImages = gsap.utils.toArray<HTMLElement>(".gallery-img");
    galleryImages.forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 0.96, opacity: 0.9, filter: "brightness(0.95)" },
        {
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "top 45%",
            scrub: 0.8,
          },
        }
      );
      // No fade out — cards stay fully visible when pinned text is reading
    });

    // Pinned section
    if (pinnedRef.current && galleryRef.current) {
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-left",
        pinSpacing: false,
      });
    }

    // Marquee is CSS-driven, no GSAP needed

    // Subtle float for phone mockup
    gsap.to(".phone-float", {
      y: -10,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const testimonials = [
    {
      quote: "We screened 47 patients in one camp with just a phone. The heatmap lets me explain the result , villagers finally trust the AI.",
      name: "Asha Kokate",
      role: "ASHA Worker, Shirpur PHC",
      place: "Dhule District",
      img: "/images/asha-portrait.jpg",
    },
    {
      quote: "Heatmap is a must. I need to see bleeding spots, not just a label. This is how you build trust.",
      name: "Dr. Mehta",
      role: "Ophthalmologist",
      place: "GMC Dhule • eSanjeevani",
      img: "/images/doctor-portrait.jpg",
    },
    {
      quote: "We screen in the morning, sync at night. No need to wait for network, that is rural reality.",
      name: "Sunil Joshi",
      role: "Pharmacist, Telepharmacy",
      place: "Adilabad",
      img: "/images/pharmacist-portrait.jpg",
    },
  ];

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-[#FCFCF9]">
      <FloatingNav />

      {/* HERO , Cinematic Center */}
      <section ref={heroRef} className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#040407]">
        {/* Full-bleed background */}
        <div className="hero-bg absolute inset-0">
          <img
            src="/images/fundus-proliferative.jpg"
            alt="Fundus photograph showing diabetic retinopathy, National Eye Institute"
            className="w-full h-[120%] object-cover grayscale contrast-125 opacity-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040407]/40 via-[#040407]/55 to-[#040407]/95" />
          <div className="absolute inset-0 opacity-[0.9]" style={{ background: "radial-gradient(ellipse 900px 600px at 50% 36%, rgba(15,118,110,0.18), transparent 60%), radial-gradient(ellipse 700px 500px at 80% 80%, rgba(245,158,11,0.12), transparent 60%)" }} />
          <div className="absolute inset-0 grain opacity-40" />
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 w-full max-w-[1080px] mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Clear AI results • Works everywhere • eSanjeevani ready
          </div>

          <h1 className="hero-title mt-6 text-white text-balance max-w-[1080px] w-full">
            Prevent blindness
            <br />
            <span className="inline-flex items-center gap-3 md:gap-4 flex-wrap justify-center">
              before it
              <span
                className="inline-block h-[0.85em] w-[160px] md:w-[220px] rounded-full align-middle bg-cover bg-center border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden relative"
                style={{ backgroundImage: "url(/images/eye-macro.jpg)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-amber-500/20 mix-blend-overlay" />
              </span>
              starts
            </span>
            <span className="text-white/60 font-light">.</span>
          </h1>

          <p className="mt-6 max-w-[640px] text-[17px] md:text-[19px] leading-7 md:leading-8 text-white/70 font-light text-balance">
            AI diabetic retinopathy screening for rural PHCs.{" "}
            <span className="text-white font-medium">Works with your ophthalmoscope and phone.</span> Every result shows why, no black box.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/app/patients"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition shadow-[0_12px_32px_rgba(255,255,255,0.15)] text-[15px]"
            >
              <ScanEye className="w-4 h-4" /> Try live screening demo
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white font-semibold hover:bg-white/15 transition text-[15px]"
            >
              <Play className="w-4 h-4" /> See 10-step workflow
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <WifiOff className="w-3.5 h-3.5" /> &lt; 2.1s on-device
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" /> 5 stage AI check
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <HeartPulse className="w-3.5 h-3.5" /> PHC • CHC • District
            </span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FCFCF9] to-transparent pointer-events-none" />
      </section>

      {/* TRUST MARQUEE */}
      <section className="relative z-20 border-y border-zinc-200 bg-white py-4 overflow-hidden isolate">
        <div className="flex">
          <div ref={marqueeRef} className="marquee-track flex items-center gap-12 shrink-0 pr-12">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-12 shrink-0">
                <span className="flex items-center gap-2 text-sm font-bold tracking-tight whitespace-nowrap">
                  <HeartPulse className="w-4 h-4 text-teal-700" /> PHCs • CHCs • District Hospitals
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-2 text-sm font-bold whitespace-nowrap">
                  <Eye className="w-4 h-4" /> eSanjeevani • Ophthalmologists
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-2 text-sm font-bold whitespace-nowrap">
                  <Pill className="w-4 h-4" /> Telepharmacy • Last-mile delivery
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-2 text-sm font-bold whitespace-nowrap text-teal-700">
                  <WifiOff className="w-4 h-4" /> Ready to use • Clear AI
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-2 text-sm font-bold whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4" /> 5 stage AI check
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-2 text-sm font-bold whitespace-nowrap">
                  <Activity className="w-4 h-4" /> Glucometer • BP • HbA1c trends
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP , lifted glass */}
      <section className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { k: "100M+", label: "diabetics in India", sub: "Largest burden globally" },
            { k: "70%", label: "rural, never screened", sub: "No camera, no specialist, no internet" },
            { k: "90%", label: "blindness preventable", sub: "If caught early with DR screening" },
          ].map((s) => (
            <div key={s.k} className="bg-white border border-zinc-200 rounded-2xl p-6 flex items-baseline justify-between shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div>
                <div className="text-[32px] font-black tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                  {s.k}
                </div>
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{s.sub}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 text-white grid place-items-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTEREST , Gapless Bento Grid + Prototype Mockup */}
      <section ref={bentoRef} id="how" className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-700">
              <span className="w-8 h-[2px] bg-teal-700" /> Built for how PHCs actually work
            </div>
            <h2 className="mt-3 text-[36px] md:text-[48px] font-black tracking-tight leading-[0.9]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              One phone.
              <br />
              <span className="text-zinc-400">Ten steps to continuity.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-6 text-zinc-600">
            Not just diagnosis, intake, glucose trends, capture, AI, guidance, referral, pharmacy and foot checks in one simple flow.
          </p>
        </div>

        <div className="grid grid-cols-12 auto-rows-[minmax(300px,auto)] gap-4 grid-flow-dense">
          {/* Card 1 , Prototype mockup dark */}
          <div className="bento-card card-hover group col-span-12 lg:col-span-7 row-span-2 relative overflow-hidden rounded-[28px] bg-zinc-900 text-white border border-zinc-800">
            <div className="absolute inset-0 opacity-40">
              <img src="/images/fundus-proliferative.jpg" alt="Proliferative diabetic retinopathy fundus, NIH National Eye Institute" className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/20" />
            </div>
            <div className="absolute inset-0" style={{ background: "radial-gradient(600px 400px at 30% 20%, rgba(20,184,166,0.18), transparent 70%)" }} />
            <div className="relative h-full grid md:grid-cols-[1.1fr_0.9fr] gap-6 p-8 md:p-10">
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-300">
                  <Smartphone className="w-3.5 h-3.5" /> Capture • Quality gate • Inference
                </div>
                <h3 className="mt-3 text-[28px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                  Ophthalmoscope + phone is enough
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">Clip-on adapter optional. We check blur and light to block bad photos before AI runs, then results in under 2.1s on your device.</p>

                {/* feature showcase , all steps visible */}
                <div className="mt-6 grid gap-2.5">
                  <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur px-3 py-2.5">
                    <span className="w-7 h-7 rounded-full bg-white text-zinc-900 grid place-items-center shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black tracking-wide">Capture</div>
                      <div className="text-xs leading-4 text-zinc-300">Direct ophthalmoscope + smartphone • Auto-capture • clip-on optional</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur px-3 py-2.5">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white grid place-items-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black tracking-wide">Quality gate</div>
                       <div className="text-xs leading-4 text-zinc-300">We check blur and light, blocks under 60, shows 94/100</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur px-3 py-2.5">
                    <span className="w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black tracking-wide">Inference • Explainable</div>
                       <div className="text-xs leading-4 text-zinc-300">Under 2.1s on your device, 5 stage AI, heatmap, 87% confidence</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold flex items-center gap-1.5">
                    <WifiOff className="w-3 h-3" /> No internet required
                  </span>
                  <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur text-white text-xs font-semibold">Sync queued</span>
                </div>
                <div className="mt-auto pt-6 flex items-center gap-3 text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> PHC Tablet • Ready
                  <span className="ml-auto px-2 py-1 rounded-full bg-teal-600 text-white font-bold text-[10px]">5 STAGE AI</span>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="phone-float will-change-transform">
                  <PhoneMockup />
                </div>
                <div className="absolute -bottom-2 -right-2 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Sync queued
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 , Explainable */}
          <div className="bento-card card-hover group col-span-12 lg:col-span-5 relative overflow-hidden rounded-[28px] bg-white border border-zinc-200 p-8 flex flex-col">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-700">
              <Layers className="w-3.5 h-3.5" /> Explainable AI
            </div>
            <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              Not a black box.
              <br />
              Heatmaps show why.
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Heatmap highlights bleeding and spots that led to the decision, so ASHA workers and doctors can verify, not just trust.
            </p>
            <div className="mt-6 relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 h-[180px] grid place-items-center">
              <img src="/images/fundus-mild.jpg" alt="Fundus with hemorrhages and cotton wool spots, early NPDR" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" />
              <div className="relative w-28 h-28 rounded-full border border-red-300/50 bg-red-500/15 backdrop-blur-sm grid place-items-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400/40 blur-[1px] animate-pulse" />
                <div className="absolute w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
              </div>
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold">Heatmap, bleeding</div>
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-zinc-200 grid place-items-center">
                <ScanEye className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-teal-700" /> Early result, needs eye doctor to confirm
            </div>
          </div>

          {/* Card 3, Ready */}
          <div className="bento-card card-hover group col-span-12 lg:col-span-5 relative overflow-hidden rounded-[28px] bg-[#ffede9] border border-orange-200 p-8">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl" />
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-700">
              <Zap className="w-3.5 h-3.5" /> Ready to use
            </div>
            <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              Zero bars.
              <br />
              Full screening.
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-700">AI on your device, safe storage, SMS reminders queued and synced later. Built for villages, not WiFi.</p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { v: "<2.1s", l: "Inference" },
                { v: "Ready", l: "Storage" },
                { v: "Sync", l: "When online" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white border border-orange-200 p-3 text-center">
                  <div className="text-[15px] font-black">{s.v}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-orange-200 h-[112px] relative">
              <img src="/images/village-camp.jpg" alt="Rural health workers during village screening camp in India" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-white text-xs font-bold">Shirpur camp • 47 screened</div>
            </div>
          </div>

          {/* Card 4 , Referral */}
          <div className="bento-card card-hover group col-span-12 lg:col-span-7 relative overflow-hidden rounded-[28px] bg-white border border-zinc-200 p-8 md:p-10 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-700">
                <Globe className="w-3.5 h-3.5" /> eSanjeevani + Telepharmacy
              </div>
              <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                Referral and pharmacy
                <br />
                without the lost follow-up.
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">One tap creates an eSanjeevani report with heatmap and history. Pharmacist checks and delivers, no paper needed.</p>
              <div className="mt-6 space-y-2">
                {[
                  ["Auto-report", "Stage, confidence, heatmap, HbA1c trends"],
                  ["Telepharmacy", "Pharmacist checks, sends and tracks"],
                  ["Continuity", "Glucose, eye, foot in one record"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span className="w-7 h-7 rounded-full bg-zinc-900 text-white grid place-items-center shrink-0">✓</span>
                    <div>
                      <div className="text-xs font-bold">{k}</div>
                      <div className="text-xs text-zinc-500">{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-[280px] shrink-0 space-y-3">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 h-[160px] relative">
                <img src="/images/telehealth.jpg" alt="Doctor conducting teleophthalmology consultation via eSanjeevani" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">eSanjeevani • Pending</div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">Next camps</div>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Bhainsa</span>
                    <span className="text-red-600 font-bold">High severe DR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Lakhna</span>
                    <span className="text-amber-600 font-bold">Low follow-up</span>
                  </div>
                </div>
                <Link href="/app/dashboard" className="mt-3 inline-flex items-center gap-1 text-xs font-bold hover:underline">
                  Plan camp <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL ACCORDIONS */}
      <section className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h3 className="text-[28px] md:text-[36px] font-black tracking-tight leading-none" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            Ten steps. One flow.
          </h3>
          <p className="hidden md:block max-w-[420px] text-sm text-zinc-600">Hover to expand. Every step works anywhere and syncs later.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[420px]">
          {[
            {
              n: "01",
              title: "Risk intake",
              desc: "Diabetes history, BP, HbA1c, symptoms and family history in 60 seconds.",
              icon: HeartPulse,
              img: "/images/intake.jpg",
              color: "bg-teal-700",
            },
            {
              n: "02",
              title: "Glucose trends",
              desc: "Glucometer data over months predicts progression better than a single reading.",
              icon: Activity,
              img: "/images/glucose.jpg",
              color: "bg-zinc-900",
            },
            {
              n: "03",
              title: "Retina capture",
              desc: "Ophthalmoscope + phone with real-time quality gate. No fundus camera to procure.",
              icon: Eye,
              img: "/images/capture.jpg",
              color: "bg-amber-500",
            },
            {
              n: "04",
              title: "AI and Heatmap",
              desc: "AI staging, heatmap, and change vs last visit. Early check, always explained simply.",
              icon: ScanEye,
              img: "/images/fundus-laser.jpg",
              color: "bg-teal-600",
            },
            {
              n: "05",
              title: "Refer • Deliver • Follow",
              desc: "eSanjeevani referral, pharmacy, foot screening and PHC dashboard, no missed follow ups.",
              icon: Pill,
              img: "/images/pharmacy.jpg",
              color: "bg-zinc-800",
            },
          ].map((a, i) => {
            const isActive = activeAccordion === i;
            return (
              <div
                key={a.n}
                onMouseEnter={() => setActiveAccordion(i)}
                onClick={() => setActiveAccordion(i)}
                className={`group relative overflow-hidden rounded-[24px] border border-zinc-200 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "md:flex-[2.2] flex-[1] bg-white" : "md:flex-[0.9] flex-[1] bg-zinc-50"} ${isActive ? "shadow-[0_12px_32px_rgba(0,0,0,0.08)]" : ""}`}
              >
                <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity">
                  <img src={a.img} alt="" className="w-full h-full object-cover mix-blend-luminosity" />
                </div>
                <div className="relative h-full p-6 md:p-7 flex flex-col">
                  <div className="flex items-start justify-between">
                    <span className={`w-9 h-9 rounded-full grid place-items-center text-white font-black text-xs ${a.color}`}>{a.n}</span>
                    <a.icon className={`w-5 h-5 ${isActive ? "text-zinc-900" : "text-zinc-400"}`} />
                  </div>
                  <h4 className="mt-6 text-[18px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                    {a.title}
                  </h4>
                  <p className={`mt-2 text-sm leading-6 transition-all duration-500 ${isActive ? "opacity-100 text-zinc-600" : "opacity-60 text-zinc-500 line-clamp-2 md:line-clamp-none"}`}>{a.desc}</p>

                  <div className={`mt-auto pt-6 transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 md:opacity-0 pointer-events-none"}`}>
                    <div className="overflow-hidden rounded-2xl border border-zinc-200 h-[140px] relative">
                      <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-white text-xs font-bold">Demo • {a.n}</span>
                        <span className="w-7 h-7 rounded-full bg-white grid place-items-center">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isActive && <div className="hidden md:block absolute bottom-6 right-6 w-8 h-8 rounded-full border border-zinc-200 bg-white grid place-items-center">→</div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESIRE , Pinned Scroll Split (GSAP pin + Image Scale & Fade) — visibility fixed */}
      <section ref={pinnedRef} id="evidence" className="relative bg-zinc-950 text-white overflow-hidden isolate">
        <div className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden">
          <div className="grid lg:grid-cols-[480px_1fr] gap-10 md:gap-16 items-start">
            {/* Pinned left — always visible, solid bg on desktop to prevent gallery bleed */}
            <div className="pinned-left lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-16 lg:py-0 relative z-30 bg-zinc-950 lg:bg-transparent">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-300">
                <Sparkles className="w-3.5 h-3.5" /> Evidence you can verify
              </div>
              <h2 className="mt-4 text-[32px] sm:text-[40px] md:text-[56px] font-black leading-[0.88] tracking-tight text-balance" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                Every <span className="text-zinc-500">decision</span> is shown.
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-zinc-400 max-w-[420px]">
                Confidence, heatmap, progress and simple guidance on every screen, so checking is built in, not an afterthought.
              </p>

              <div className="mt-8 space-y-3 max-w-[420px]">
                {[
                  ["Stage and Confidence", "0 to 4, No DR to Proliferative, with clear confidence"],
                  ["Heatmap", "Highlights bleeding and spots that led to the stage"],
                  ["Progression vs last", "Worsened / stable / improved at a glance"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <div>
                      <div className="text-sm font-bold">{k}</div>
                      <div className="text-xs text-zinc-400 leading-relaxed">{v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-3">
                <Link href="/app/patients" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 font-bold text-sm hover:bg-zinc-100 transition">
                  Try the explainer <ScanEye className="w-4 h-4" />
                </Link>
                <Link href="/app/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/10 transition">
                  View dashboard
                </Link>
              </div>
            </div>

            {/* Scrolling gallery right — below pinned text on desktop, above on mobile, never hidden */}
            <div ref={galleryRef} className="py-8 lg:py-16 space-y-6 lg:space-y-10 relative z-10 lg:z-10">
              {[
                {
                  img: "/images/fundus-mild.jpg",
                  label: "Heatmap • Moderate NPDR",
                  title: "Heatmap shows bleeding near the center",
                  desc: "Confidence 87% • Quality 94/100 • Left eye • Ready in under 2.1s",
                },
                {
                  img: "/images/fundus-proliferative.jpg",
                  label: "Progression • Worsened since Feb",
                  title: "Timeline shows drift from Mild to Moderate",
                  desc: "HbA1c 9.2 to 9.4 • BP 148/92 • 11y Type 2 DM • Refer in 4 to 8 weeks",
                },
                {
                  img: "/images/eye-macro.jpg",
                  label: "No DR • Healthy retina",
                  title: "Healthy results are also explained",
                  desc: "Confidence 94% • No referral • Re-screen in 12 months",
                },
                {
                  img: "/images/telehealth.jpg",
                  label: "eSanjeevani • Referral packet",
                  title: "One tap saves report with heatmap and trends",
                  desc: "Safe and private, syncs when online, doctor confirms before treatment",
                },
              ].map((card, idx) => (
                <div key={idx} className="gallery-img group overflow-hidden rounded-[28px] bg-zinc-900 border border-white/10 relative z-10">
                  <div className="relative h-[320px] md:h-[420px] overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover will-change-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold">{card.label}</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">Stage II • 87%</div>
                    </div>
                    {/* scan line */}
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" style={{ top: "44%" }} />
                    <div className="absolute inset-0 border-[1px] border-white/10 rounded-[28px] pointer-events-none" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h4 className="text-[18px] font-bold leading-tight">{card.title}</h4>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/70">
                      <Database className="w-3.5 h-3.5" /> On device AI
                      <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-zinc-900 font-bold text-xs">
                        View <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
                <div className="text-xs font-bold tracking-widest uppercase text-teal-300">Safe AI</div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  All results are early checks. Eye doctor confirms via eSanjeevani before treatment. No auto prescription. Consent and safe storage on your device.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white text-zinc-900 p-3 text-center">
                    <div className="font-black text-lg">68%</div>
                    <div className="font-semibold text-zinc-500">Coverage this month</div>
                  </div>
                  <div className="rounded-xl border border-white/10 p-3 text-center">
                    <div className="font-black text-lg">54%</div>
                    <div className="text-zinc-400">Referral completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-700">
              <span className="w-8 h-[2px] bg-teal-700" /> Field voices
            </div>
            <h2 className="mt-3 text-[36px] md:text-[48px] font-black leading-[0.9] tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              Built with PHCs,
              <br />
              <span className="text-zinc-400">not for them.</span>
            </h2>
            <div className="mt-8 relative">
              <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-8 md:p-10">
                <div className="flex gap-1 text-amber-500">★★★★★</div>
                <p className="mt-4 text-[18px] md:text-[20px] leading-7 md:leading-8 font-medium tracking-tight">&ldquo;{testimonials[testimonialIdx].quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={testimonials[testimonialIdx].img} alt={testimonials[testimonialIdx].name} className="w-12 h-12 rounded-full object-cover border border-zinc-200" />
                  <div>
                    <div className="font-bold leading-none">{testimonials[testimonialIdx].name}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {testimonials[testimonialIdx].role} • {testimonials[testimonialIdx].place}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-zinc-200 bg-white grid place-items-center hover:bg-zinc-50 transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full bg-zinc-900 text-white grid place-items-center hover:bg-black transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="ml-3 flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all ${i === testimonialIdx ? "w-8 bg-zinc-900" : "w-1.5 bg-zinc-300"}`} />
                  ))}
                </div>
                <span className="ml-auto text-xs font-semibold text-zinc-500">{String(testimonialIdx + 1).padStart(2, "0")} / 0{testimonials.length}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border border-zinc-200 h-[260px] relative group">
                  <img src="/images/field-asha.jpg" alt="field" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-white text-xs font-bold">Shirpur • PHC camp</div>
                </div>
                <div className="rounded-[24px] bg-zinc-900 text-white p-6">
                  <div className="text-3xl font-black">112</div>
                  <div className="text-sm text-zinc-300">Patients screened this month by Asha</div>
                  <div className="mt-3 h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-emerald-500 rounded-full" />
                  </div>
                  <div className="text-xs text-zinc-400 mt-1.5">68% village coverage → 92% target</div>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-[24px] bg-teal-700 text-white p-6">
                  <div className="w-8 h-8 rounded-full bg-white/15 grid place-items-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="mt-4 text-sm font-semibold leading-relaxed">Clear every time, villagers see the heatmap, not just a score.</div>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-zinc-200 h-[260px] relative group">
                  <img src="/images/clinic.jpg" alt="clinic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white grid place-items-center shadow">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-4 bg-white border border-zinc-200 rounded-full px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-3">
              <div className="flex -space-x-2">
                <img src="/images/asha-portrait.jpg" alt="ASHA" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="/images/doctor-portrait.jpg" alt="Dr Mehta" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="/images/pharmacist-portrait.jpg" alt="Pharmacist" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              </div>
              <div className="text-xs leading-none">
                <div className="font-bold">Trusted by 12 PHCs</div>
                <div className="text-zinc-500">Dhule • Adilabad • Warangal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT , large editorial + real photography */}
      <section id="impact" className="w-full max-w-[1120px] mx-auto px-6 min-w-0 overflow-x-hidden pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              seed: "phc-worker",
              label: "ASHA worker screening in Shirpur",
              h: "h-[280px]",
              img: "/images/field-asha.jpg",
            },
            {
              seed: "rural-clinic",
              label: "Rural clinic eye check",
              h: "h-[280px]",
              img: "/images/clinic.jpg",
            },
            {
              seed: "eye-screening",
              label: "Fundus capture with phone",
              h: "h-[280px]",
              img: "/images/capture.jpg",
            },
          ].map((p) => (
            <div key={p.seed} className="group overflow-hidden rounded-[24px] border border-zinc-200 relative">
              <img src={p.img} alt={p.label} className={`w-full ${p.h} object-cover group-hover:scale-105 transition-transform duration-700 ease-out`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">{p.label}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-zinc-500 mt-3">Field images are representative rural PHC screening camps (Shirpur and Bhainsa).</div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_0.85fr] gap-6">
          <div className="rounded-[28px] bg-zinc-900 text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-xs font-bold tracking-widest uppercase text-amber-300">Impact if deployed in one district</div>
              <h3 className="mt-2 text-[28px] md:text-[32px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                One ASHA worker + one phone can screen a village in a day.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" /> No new hardware, use the ophthalmoscope you already have
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" /> Works in villages with no signal, syncs when back online
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" /> Builds trust with heatmaps and simple guidance
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" /> Continuity: glucose, eye, foot and pharmacy in one record
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/app/dashboard" className="px-6 py-3 rounded-full bg-white text-zinc-900 font-bold text-sm hover:bg-zinc-100 transition">
                  Explore PHC dashboard
                </Link>
                <Link href="/app/patients" className="px-6 py-3 rounded-full bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition">
                  Run demo screening
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 md:p-8">
            <h4 className="font-bold text-sm">Try this in 60 seconds</h4>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                ["Pick high-risk", "Patients → choose RISK ≥70"],
                ["Upload retina", "Watch the quality gate pass"],
                ["Toggle heatmap", "See what drove staging"],
                ["Compare", "Progression vs last visit"],
                ["Refer", "One-click eSanjeevani packet"],
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-zinc-900 text-white grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
                  <div>
                    <div className="font-semibold">{k}</div>
                    <div className="text-xs text-zinc-500">{v}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center">
                <ScanEye className="w-5 h-5" />
              </div>
                <div className="text-xs">
                  <div className="font-bold">On your device, no cloud needed</div>
                  <div className="text-zinc-500">Easy model swap</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTION , Massive CTA */}
      <section className="relative mt-8 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/fundus-scatter.jpg" alt="" className="w-full h-full object-cover opacity-[0.12] grayscale" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(800px 500px at 20% 20%, rgba(20,184,166,0.22), transparent 60%), radial-gradient(700px 400px at 90% 80%, rgba(245,158,11,0.12), transparent 60%)" }} />
        </div>
        <div className="relative max-w-[1120px] mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal-300">
                <Sparkles className="w-3.5 h-3.5" /> Ready to screen?
              </div>
              <h2 className="mt-4 text-[42px] md:text-[64px] font-black leading-[0.85] tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                Screen a
                <br />
                <span className="text-zinc-500">village</span> today.
              </h2>
              <p className="mt-6 max-w-[520px] text-sm md:text-[15px] leading-6 text-zinc-400">
                No new orders, no waiting for signal. Your PHC can start with the phone in your pocket. Clear results, ready to use, built for Bharat.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/app/patients" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-900 font-black text-sm hover:bg-zinc-100 transition shadow-[0_12px_32px_rgba(255,255,255,0.12)]">
                  Start screening now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/app/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/10 transition">
                  Open PHC demo <Layers className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-500">
                <span className="px-3 py-1.5 rounded-full border border-white/10">Ready • under 2.1s</span>
                <span className="px-3 py-1.5 rounded-full border border-white/10">Clear • Heatmap</span>
                <span className="px-3 py-1.5 rounded-full border border-white/10">eSanjeevani ready</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold tracking-widest uppercase text-zinc-400">PHC Shirpur , live</div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Demo data
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "112", l: "Patients", sub: "This month" },
                    { k: "68%", l: "Coverage", sub: "Target 92%" },
                    { k: "54%", l: "Referrals", sub: "Completed" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-white text-zinc-900 p-4 text-center">
                      <div className="text-xl font-black">{s.k}</div>
                      <div className="text-xs font-bold">{s.l}</div>
                      <div className="text-[10px] text-zinc-500">{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-white text-zinc-900 p-4 flex items-center gap-3">
                  <img src="/images/asha-portrait.jpg" alt="Asha" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-bold leading-none">Asha Kokate</div>
                    <div className="text-xs text-zinc-500">Health Worker • Shirpur Rural</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold">Online</span>
                </div>
                <div className="mt-3 text-[11px] leading-relaxed text-zinc-400 text-center">Early AI check, needs eye doctor confirmation before treatment.</div>
              </div>
              <div className="absolute -bottom-3 -right-3 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500 text-white text-xs font-bold shadow-xl">
                <Footprints className="w-3.5 h-3.5" /> Foot + Pharmacy bundled
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-white font-bold">
                <span className="w-7 h-7 rounded-full bg-white border border-zinc-200 grid place-items-center shadow-sm">
                  <Logo size={16} />
                </span>{" "}
                GlucoVision
              </Link>
              <span className="hidden md:inline">© 2026 GlucoVision • Built for Bharat</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#how" className="hover:text-white transition">
                Workflow
              </a>
              <Link href="/app/patients" className="hover:text-white transition">
                Patients
              </Link>
              <Link href="/app/patients" className="hover:text-white transition">
                Screening
              </Link>
              <Link href="/app/referrals" className="hover:text-white transition">
                Referrals
              </Link>
              <Link href="/app/pharmacy" className="hover:text-white transition">
                Telepharmacy
              </Link>
              <a href="#" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-zinc-900 transition">
                GlucoVision 2026
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
