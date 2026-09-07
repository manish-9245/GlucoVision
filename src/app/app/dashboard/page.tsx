"use client";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { ScanEye, Pill, TrendingUp, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useLang } from "@/lib/i18n";
import { drStageLabel, pharmacyStatusLabel } from "@/lib/labels";

export default function Dashboard() {
  const { patients, referrals, pharmacy } = useStore();
  const { t } = useLang();
  const total = patients.length;
  const highRisk = patients.filter((p) => p.riskScore >= 70).length;
  const screened = patients.filter((p) => p.visits.length > 0).length;
  const urgent = patients.filter((p) => p.visits.some((v) => v.drStage >= 3)).length;

  const dist = [
    { name: drStageLabel(t, 0), value: patients.filter((p) => p.visits[p.visits.length - 1]?.drStage === 0).length },
    { name: t("patientMildModLabel"), value: patients.filter((p) => [1, 2].includes(p.visits[p.visits.length - 1]?.drStage)).length },
    { name: t("patientSeverePdrLabelShort"), value: patients.filter((p) => [3, 4].includes(p.visits[p.visits.length - 1]?.drStage)).length },
    { name: t("stageUnscreened"), value: patients.filter((p) => p.visits.length === 0).length },
  ];
  const COLORS = ["#0f766e", "#d97706", "#dc2626", "#e7e5e4"];
  const glucoseAvg = patients.flatMap((p) => p.glucose).slice(-8).map((g, i) => ({ name: `W${i + 1}`, fasting: g.fasting }));

  return (
    <div className="w-full max-w-[1220px] mx-auto p-4 md:p-6 min-w-0 overflow-x-hidden space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("dashboardHeading")}</h1>
          <p className="text-sm text-zinc-600 mt-1">
            {t("dashboardSub")}
            <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 border border-zinc-200 px-2 py-1 bg-zinc-50">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> {t("syncUpToDate")}
            </span>
          </p>
        </div>
        <Link href="/app/patients" className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-black">
          {t("screen")} <ScanEye className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t("dashboardPatientsRegistered"), value: total, sub: `${screened} ${t("dashboardPatientsSub")}` },
          { label: t("dashboardHighRisk"), value: highRisk, sub: t("dashboardHighRiskSub") },
          { label: t("dashboardSevere"), value: urgent, sub: t("dashboardSevereSub") },
          { label: t("dashboardPending"), value: referrals.filter((r) => r.status === "pending").length, sub: t("dashboardPendingSub") },
        ].map((c) => (
          <div key={c.label} className="border border-zinc-200 bg-white p-4">
            <div className="text-xs font-medium text-zinc-500">{c.label}</div>
            <div className="text-[28px] font-bold tracking-tight mt-1">{c.value}</div>
            <div className="text-xs text-zinc-600 mt-1">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{t("dashboardFastingTitle")}</h3>
            <span className="text-xs border border-zinc-200 px-2 py-1 bg-zinc-50">mg/dL</span>
          </div>
          <div className="h-[220px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseAvg}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} domain={[80, 240]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="fasting" stroke="#0f766e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-zinc-500 mt-2">{t("dashboardFastingNote")}</div>
        </div>

        <div className="border border-zinc-200 bg-white p-4">
          <h3 className="font-semibold text-sm">{t("dashboardRiskTitle")}</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dist} dataKey="value" nameKey="name" innerRadius={56} outerRadius={78} paddingAngle={2}>
                  {dist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {dist.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 border border-zinc-200 px-2 py-1.5 bg-zinc-50">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                {d.name}: <b>{d.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="border border-zinc-200 bg-white p-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Pill className="w-4 h-4 text-zinc-600" /> {t("dashboardTeleTitle")}
          </h3>
          <div className="mt-3 divide-y divide-zinc-200 border border-zinc-200">
            {pharmacy.slice(0, 3).map((o) => (
              <div key={o.id} className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{o.patientName}</div>
                  <div className="text-xs text-zinc-600 line-clamp-1">{o.prescription}</div>
                </div>
                <div className="text-xs font-medium border border-zinc-200 px-2 py-1 bg-zinc-50 ml-2 shrink-0">{pharmacyStatusLabel(t, o.status)}</div>
              </div>
            ))}
            {pharmacy.length === 0 && <div className="p-4 text-sm text-zinc-500 text-center">{t("dashboardNoOrders")}</div>}
          </div>
          <Link href="/app/pharmacy" className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline">
            {t("dashboardTeleViewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="border border-zinc-200 bg-white p-4">
          <h3 className="font-semibold text-sm flex items-center justify-between">
            {t("dashboardRecentTitle")}
            <span className="text-xs font-normal text-zinc-500">{patients.filter((p) => p.visits.length > 0).length} {t("dashboardRecentTotal")}</span>
          </h3>
          <div className="mt-3 divide-y divide-zinc-200 border border-zinc-200">
            {patients
              .filter((p) => p.visits.length > 0)
              .sort((a, b) => {
                const da = a.visits[a.visits.length - 1]?.date || "";
                const db = b.visits[b.visits.length - 1]?.date || "";
                return db.localeCompare(da);
              })
              .slice(0, 3)
              .map((p) => {
                const v = p.visits[p.visits.length - 1];
                return (
                  <Link key={p.id} href={`/app/patients/${p.id}`} className="p-3 flex items-center gap-3 hover:bg-zinc-50 transition">
                    <div className="w-12 h-12 shrink-0 border border-zinc-200 bg-zinc-950 overflow-hidden relative">
                      {v.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.imageUrl} alt={`${p.name} fundus`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center bg-zinc-900 text-zinc-500 text-[10px]">{t("patientNoImage")}</div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">Q{v.imageQuality}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {p.name} <span className="text-xs text-zinc-500">{p.village}</span>
                      </div>
                      <div className="text-xs text-zinc-600">
                        {v.date} • {drStageLabel(t, v.drStage)} • {(v.confidence * 100).toFixed(0)}%
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">{v.imageUrl ? t("patientImageSaved") : t("patientSeedVisit")} • {p.visits.length} {t("patientsExamsLabel")}</div>
                    </div>
                    <span className={`text-xs font-medium border px-2 py-1 shrink-0 ml-2 ${v.drStage === 0 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : v.drStage >= 3 ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-800"}`}>{drStageLabel(t, v.drStage)}</span>
                  </Link>
                );
              })}
            {patients.filter((p) => p.visits.length > 0).length === 0 && (
              <div className="p-4 text-sm text-zinc-500 text-center">{t("dashboardNoScreenings")}</div>
            )}
          </div>
          <Link href="/app/patients" className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline">
            {t("dashboardTeleViewAll")} • {t("dashboardRecentTitle")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-zinc-900 text-white p-5 border border-zinc-800">
          <h3 className="font-semibold text-sm">{t("dashboardNextCampTitle")}</h3>
          <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{t("dashboardNextCampDesc")}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="border border-zinc-700 p-3">
              <div className="text-zinc-400">{t("dashboardCoverage")}</div>
              <div className="text-xl font-bold mt-1">68%</div>
            </div>
            <div className="border border-zinc-700 p-3">
              <div className="text-zinc-400">{t("dashboardReferralComp")}</div>
              <div className="text-xl font-bold mt-1">54%</div>
            </div>
          </div>
          <Link href="/app/patients" className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100">
            {t("dashboardPlanCamp")} <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
        {t("dashboardNote")}
      </div>
    </div>
  );
}
