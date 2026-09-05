"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, ScanEye, Send, Pill, Footprints, Menu, X, LogOut, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/patients", label: "Patients", icon: Users },
  { href: "/app/screening", label: "Screening", icon: ScanEye },
  { href: "/app/referrals", label: "Referrals", icon: Send },
  { href: "/app/pharmacy", label: "Telepharmacy", icon: Pill },
  { href: "/app/foot", label: "Foot Screening", icon: Footprints },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#FCFCF9]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-teal-600 animate-spin" />
          <div className="text-sm font-medium text-zinc-500">Loading GlucoVision…</div>
        </div>
      </div>
    );
  }
  if (!user) return null;
  return (
    <div className="min-h-screen flex bg-white">
      {/* sidebar desktop - solid, no blur, no gradient, single radius system */}
      <aside className="hidden lg:flex w-[256px] shrink-0 flex-col border-r border-zinc-200 bg-white sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-zinc-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 grid place-items-center shadow-sm">
              <Logo size={20} />
            </div>
            <div className="leading-none">
              <div className="font-bold tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                GlucoVision
              </div>
              <div className="text-[11px] font-medium text-zinc-500">PHC Edition • Offline</div>
            </div>
          </Link>
        </div>
        <nav className="p-3 flex-1 overflow-auto">
          {nav.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium border mb-1 ${active ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-transparent hover:bg-zinc-50 hover:border-zinc-200"}`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </Link>
            );
          })}
          <div className="mt-6 border border-zinc-200 p-4 bg-zinc-50">
            <div className="text-sm font-semibold">PHC: Shirpur Rural</div>
            <div className="text-xs text-zinc-500">Dhule District • MH</div>
            <div className="mt-3 text-xs leading-relaxed text-zinc-600">
              Health worker: <b className="text-zinc-900">Asha Kokate</b>
              <br />
              112 patients screened this month
            </div>
          </div>
        </nav>
        <div className="p-3 border-t border-zinc-200 text-[11px] leading-relaxed text-zinc-600">Preliminary AI screening — requires ophthalmologist confirmation before treatment.</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-zinc-200 flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 grid place-items-center shadow-sm">
              <Logo size={20} />
            </div>
            <span className="font-bold" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              GlucoVision
            </span>
          </Link>
          <button onClick={() => setOpen(!open)} className="w-11 h-11 border border-zinc-200 bg-white grid place-items-center rounded-full shadow-sm active:scale-95 transition">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>
        {open && (
          <div className="lg:hidden border-b border-zinc-200 bg-white p-3 grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium border ${path === n.href ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </Link>
            ))}
          </div>
        )}
        <main className="flex-1 min-w-0">{children}</main>
        <footer className="px-6 py-4 text-center text-xs text-zinc-500 border-t border-zinc-200">Built for Smart India Hackathon • Offline-first • Explainable AI • eSanjeevani integrated</footer>
      </div>
    </div>
  );
}
