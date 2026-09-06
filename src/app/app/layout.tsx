"use client";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen grid place-items-center bg-[#FCFCF9]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-teal-600 animate-spin" />
        <div className="text-sm font-medium text-zinc-500">Loading GlucoVision…</div>
      </div>
    </div>
  ),
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
