"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, LogIn, ArrowRight, ShieldCheck, WifiOff } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("asha@glucovision.in");
  const [password, setPassword] = useState("demo123");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/app/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFCF9] flex flex-col">
      <header className="max-w-[1120px] mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 grid place-items-center shadow-sm">
            <Logo size={22} />
          </div>
          <div className="leading-none">
            <div className="font-bold tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              GlucoVision
            </div>
            <div className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Smart India Hackathon ’26</div>
          </div>
        </Link>
        <Link href="/signup" className="text-sm font-semibold px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50">
          Create account
        </Link>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1.05fr_0.95fr] max-w-[1120px] mx-auto w-full px-6 gap-10 items-center py-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> PHC Edition • Offline-first
          </div>
          <h1 className="mt-4 text-[40px] md:text-[52px] font-black leading-[0.9] tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            Welcome back
            <br />
            <span className="text-zinc-400">to your PHC</span>
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-zinc-600 max-w-[520px]">
            Sign in to continue screening. Works offline — your last session is cached. All data is encrypted, and every AI result needs ophthalmologist confirmation.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-[520px]">
            {[
              { k: "ASHA", e: "asha@glucovision.in" },
              { k: "MO", e: "mo@glucovision.in" },
              { k: "Eye", e: "eye@glucovision.in" },
            ].map((d) => (
              <button
                key={d.k}
                onClick={() => {
                  setEmail(d.e);
                  setPassword("demo123");
                }}
                className="rounded-2xl bg-white border border-zinc-200 p-3 text-left hover:border-zinc-300 hover:shadow-sm transition"
              >
                <div className="text-xs font-black tracking-widest">{d.k}</div>
                <div className="text-xs text-zinc-500 truncate">{d.e}</div>
                <div className="text-xs font-mono text-zinc-400">demo123</div>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <WifiOff className="w-3 h-3" /> Demo works without backend — or set <code className="px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200">NEXT_PUBLIC_API_URL</code> for Cloudflare D1
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-zinc-200 rounded-[28px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-black tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            Sign in
          </h2>
          <p className="text-sm text-zinc-600 mt-1">Use a demo account or your registered email.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold tracking-widest uppercase">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="asha@glucovision.in"
                type="email"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type={show ? "text" : "password"}
                  required
                  className="mt-1 w-full px-4 py-3 pr-11 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-full hover:bg-zinc-100">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40"
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-sm">
              <span className="text-zinc-500">No account?</span> <Link href="/signup" className="font-bold text-teal-700 hover:underline">Create one</Link>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-xs leading-relaxed text-zinc-600">
            <b>Demo credentials:</b> any demo email above with <code>demo123</code>. Works offline (mock). With Cloudflare D1, real accounts are PBKDF2-hashed and JWT-issued via <code>/api/auth/*</code>.
          </div>
        </form>
      </div>
    </main>
  );
}
