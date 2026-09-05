"use client";
import { useEffect, useState, useRef } from "react";
import { Send, Loader2, Trash2, Image as ImageIcon, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";

type ChatMsg = { id: string; role: "user" | "assistant"; content: string; image_url?: string | null; model?: string; created_at?: string };

export function CaseChat({
  patientId,
  visitId,
  preview,
  patientLabel,
}: {
  patientId: string;
  visitId?: string | null;
  preview: string | null;
  patientLabel?: string;
}) {
  const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [includeImage, setIncludeImage] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    if (!API) return;
    try {
      const url = `${API}/api/cases/${patientId}/chat${visitId ? `?visitId=${visitId}` : ""}`;
      const r = await fetch(url);
      if (r.ok) {
        const j = (await r.json()) as { chats: ChatMsg[] };
        setMsgs(j.chats || []);
      }
    } catch {}
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, visitId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  // Convert preview blob:/local to data URL for NIM (so backend can forward as image_url)
  const getImageDataUrl = async (): Promise<string | null> => {
    if (!includeImage || !preview) return null;
    try {
      if (preview.startsWith("data:")) return preview;
      const blob = await fetch(preview).then((r) => r.blob());
      return await new Promise<string>((res) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result as string);
        fr.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const imageUrl = await getImageDataUrl();
    const optimistic: ChatMsg = { id: `tmp_${Date.now()}`, role: "user", content: text, image_url: imageUrl };
    setMsgs((m) => [...m, optimistic]);
    setSending(true);
    try {
      if (!API) {
        // Offline fallback — local echo with disclaimer
        await new Promise((r) => setTimeout(r, 700));
        setMsgs((m) => [
          ...m,
          {
            id: `asst_${Date.now()}`,
            role: "assistant",
            content:
              `**Offline fallback** — no \`NEXT_PUBLIC_API_URL\` configured. Based on local rule: risk ${patientLabel || patientId} — if image quality <60, retake; if stage ≥2, routine eSanjeevani referral 4-8w; else annual. ` +
              `Your question: "${text}". Attach image and set API to get NIM vision analysis.\n\n*Disclaimer: Preliminary AI — ophthalmologist confirmation required.*`,
          },
        ]);
        return;
      }
      const res = await fetch(`${API}/api/cases/${patientId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, image_url: imageUrl, visitId }),
      });
      const j = (await res.json()) as { content?: string; error?: string; model?: string };
      if (!res.ok) throw new Error(j.error || `HTTP ${res.status}`);
      setMsgs((m) => [...m, { id: `asst_${Date.now()}`, role: "assistant", content: j.content || "", model: j.model }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setMsgs((m) => [...m, { id: `asst_${Date.now()}`, role: "assistant", content: `All 3 NIM models failed — local fallback: ${msg.slice(0, 400)}\n\n*Tip: check NVIDIA_API_KEY and ENCRYPTION_KEY secrets, and that image is https or data URL.*` }]);
    } finally {
      setSending(false);
    }
  };

  const clear = async () => {
    if (!API) {
      setMsgs([]);
      return;
    }
    try {
      await fetch(`${API}/api/cases/${patientId}/chat${visitId ? `?visitId=${visitId}` : ""}`, { method: "DELETE" });
    } catch {}
    setMsgs([]);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-teal-700 text-white grid place-items-center">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <div className="text-sm font-bold leading-none">Discuss this case</div>
            <div className="text-xs text-zinc-500">Chat about the fundus image — patient context is auto-included</div>
          </div>
        </div>
        <button onClick={clear} className="px-2.5 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-semibold hover:bg-zinc-50 flex items-center gap-1">
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>

      {preview && (
        <div className="px-4 py-3 border-b border-zinc-200 bg-white flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="case image" className="w-14 h-14 rounded-xl object-cover border border-zinc-200" />
          <div className="flex-1">
            <div className="text-xs font-bold">Current fundus attached</div>
            <div className="text-xs text-zinc-500">Will be sent to NIM with your question</div>
          </div>
          <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
            <input type="checkbox" checked={includeImage} onChange={(e) => setIncludeImage(e.target.checked)} className="rounded" />
            Include image
          </label>
          <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> {includeImage ? "Yes" : "No"}
          </span>
        </div>
      )}

      {!API && (
        <div className="mx-4 mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> No `NEXT_PUBLIC_API_URL` — chatting in offline fallback mode (local mock). Set Worker URL to enable real NIM vision.
        </div>
      )}

      <div ref={listRef} className="flex-1 overflow-auto max-h-[320px] p-4 space-y-3 bg-[#FCFCF9]">
        {msgs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-zinc-200 grid place-items-center">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div className="mt-2 text-sm font-bold">No messages yet</div>
            <div className="text-xs text-zinc-500 max-w-[36ch] mx-auto">Ask e.g. “What stage is this? Where is the haemorrhage?” or “Explain to ASHA in Hindi.” Image + patient history (risk, HbA1c, prior visits) are auto-included via state-of-art context management.</div>
            <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
              {["What is in this image?", "Explain stage and next step", "Is there neovascularization?", "Summarize for ASHA in Hindi"].map((q) => (
                <button key={q} onClick={() => setInput(q)} className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-medium hover:bg-zinc-50">
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          msgs.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-wrap border ${m.role === "user" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200"}`}>
                {m.content}
                {m.model && <div className="mt-1 text-[10px] opacity-60 font-mono">via {m.model}</div>}
              </div>
            </div>
          ))
        )}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white border border-zinc-200 px-3.5 py-2.5 text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Thinking — trying 3 NIM models with fallback…
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-zinc-200 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Ask about this fundus — e.g. Is there a car in this image? (vision test) or What stage?"
          className="flex-1 px-3.5 py-2.5 rounded-full border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
        />
        <button onClick={send} disabled={!input.trim() || sending} className="px-5 py-2.5 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 flex items-center gap-1.5">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
      <div className="px-3 pb-2 text-[10px] text-zinc-500 flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" /> Preliminary AI — ophthalmologist must confirm. Context window: last 8 turns + patient + image.
      </div>
    </div>
  );
}
