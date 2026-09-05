"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const ROLES = [
  { value: "asha", label: "ASHA Worker", desc: "Village screening, intake" },
  { value: "mo", label: "Medical Officer", desc: "PHC review" },
  { value: "ophthalmologist", label: "Ophthalmologist", desc: "eSanjeevani confirm" },
  { value: "pharmacist", label: "Pharmacist", desc: "Telepharmacy" },
] as const;

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "asha" as (typeof ROLES)[number]["value"], phc: "Shirpur Rural", village: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signup(form);
      router.push("/app/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Signup failed");
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
        <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50">
          Sign in
        </Link>
      </header>

      <div className="flex-1 max-w-[640px] mx-auto w-full px-6 py-10">
        <div className="bg-white border border-zinc-200 rounded-[28px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <h1 className="text-[32px] font-black leading-none tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            Create account
          </h1>
          <p className="text-sm text-zinc-600 mt-2">Join your PHC. Role controls what you see — ASHA screens, MO reviews, Eye confirms, Pharma dispenses.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase">Full name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Asha Kokate" required className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as never })} className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none">
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label} — {r.desc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest uppercase">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="asha@phc.in" type="email" required className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest uppercase">Password</label>
              <div className="relative">
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" type={show ? "text" : "password"} required className="mt-1 w-full px-4 py-3 pr-11 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-full hover:bg-zinc-100">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs text-zinc-500 mt-1">Min 6 chars, PBKDF2-hashed in D1 (Cloudflare) or local mock offline.</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase">PHC</label>
                <input value={form.phc} onChange={(e) => setForm({ ...form, phc: e.target.value })} placeholder="Shirpur Rural" className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase">Village</label>
                <input value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} placeholder="Shirpur, Dhule" className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" />
              </div>
            </div>

            {err && <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-700 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> {err}</div>}

            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-zinc-900 text-white font-bold hover:bg-black disabled:opacity-40">
              {loading ? "Creating…" : <>Create account <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="text-center text-sm">
              <span className="text-zinc-500">Already have an account?</span> <Link href="/login" className="font-bold text-teal-700 hover:underline">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
