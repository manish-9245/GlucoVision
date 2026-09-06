"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

function ScreeningInner() {
  const { patients } = useStore();
  const search = useSearchParams();
  const router = useRouter();
  const initialId = search.get("patient") || patients[0]?.id || "";
  useEffect(() => {
    if (initialId) router.replace(`/app/patients/${initialId}`);
    else router.replace("/app/patients");
  }, [initialId, router]);

  return (
    <div className="p-10 text-center">
      <div className="inline-flex items-center gap-2 text-sm text-zinc-600">
        <span className="w-4 h-4 border-2 border-zinc-200 border-t-teal-600 rounded-full animate-spin" /> Redirecting to patient examination...
      </div>
      <div className="mt-2 text-xs text-zinc-500">Screening now happens inside the Patients tab. Choose a patient to start.</div>
    </div>
  );
}

export default function ScreeningPage() {
  return (
    <div className="p-4 md:p-6 max-w-[1220px] mx-auto space-y-6">
      <ScreeningInner />
    </div>
  );
}
