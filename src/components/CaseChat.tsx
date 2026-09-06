"use client";
import { useEffect, useState, useRef } from "react";
import { Send, Loader2, Trash2, Image as ImageIcon, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";

type ChatMsg = { id: string; role: "user" | "assistant"; content: string; image_url?: string | null; model?: string; created_at?: string };

function getApiUrl(): string {
  const env = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  if (env) return env;
  if (typeof window !== "undefined" && window.location.hostname === "localhost") return "http://localhost:8787";
  return "";
}

export function CaseChat({
  patientId,
  visitId,
  preview,
  previews,
  patientLabel,
}: {
  patientId: string;
  visitId?: string | null;
  preview?: string | null;
  previews?: { left: string | null; right: string | null };
  patientLabel?: string;
}) {
  // Normalize to both eyes , support single preview (old) or both (new)
  const bothPreviews = previews || (preview ? { left: preview, right: null } : { left: null, right: null });
  const hasLeft = !!bothPreviews.left;
  const hasRight = !!bothPreviews.right;
  const hasAny = hasLeft || hasRight;
  const hasBoth = hasLeft && hasRight;
  // Backward compat: preview prop still works, but prefer both
  const API = getApiUrl();
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [includeImage, setIncludeImage] = useState(true);
  const [includeLeft, setIncludeLeft] = useState(true);
  const [includeRight, setIncludeRight] = useState(true);
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

  // Convert previews to data URLs (supports both eyes)
  const getImageDataUrls = async (): Promise<{ left: string | null; right: string | null; primary: string | null }> => {
    if (!includeImage || !hasAny) return { left: null, right: null, primary: null };
    const toDataUrl = async (url: string | null): Promise<string | null> => {
      if (!url) return null;
      try {
        if (url.startsWith("data:")) return url;
        const blob = await fetch(url).then((r) => r.blob());
        return await new Promise<string>((res) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result as string);
          fr.readAsDataURL(blob);
        });
      } catch {
        return null;
      }
    };
    const leftUrl = includeLeft ? await toDataUrl(bothPreviews.left) : null;
    const rightUrl = includeRight ? await toDataUrl(bothPreviews.right) : null;
    // Primary for single-image backends: prefer left if available, else right
    const primary = leftUrl || rightUrl || null;
    return { left: leftUrl, right: rightUrl, primary };
  };

  // Backward compat single
  const getImageDataUrl = async (): Promise<string | null> => {
    const r = await getImageDataUrls();
    return r.primary;
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const { left: leftUrl, right: rightUrl, primary: imageUrl } = await getImageDataUrls();
    const hasBoth = !!(leftUrl && rightUrl);
    const optimistic: ChatMsg = {
      id: `tmp_${Date.now()}`,
      role: "user",
      content: text + (hasBoth ? " [both eyes attached]" : leftUrl ? " [left eye attached]" : rightUrl ? " [right eye attached]" : ""),
      image_url: imageUrl,
    };
    setMsgs((m) => [...m, optimistic]);
    setSending(true);
    try {
      if (!API) {
        // No connection, use local guidance
        await new Promise((r) => setTimeout(r, 700));
        setMsgs((m) => [
          ...m,
          {
            id: `asst_${Date.now()}`,
            role: "assistant",
            content:
              `No connection, using local guidance for ${patientLabel || patientId}${hasBoth ? " (both eyes)" : hasAny ? " (one eye)" : ""}: if image quality is under 60, retake the photo. If the screening showed stage 2 or higher, a routine referral within 4 to 8 weeks is advised, otherwise yearly checkup. ` +
              `Your question: "${text}". Connect for detailed image check.\n\n*Early guidance, an eye doctor must confirm.*`,
          },
        ]);
        return;
      }
      // Send both eyes if available: primary image_url + left_image_url/right_image_url for bilateral
      const payload: Record<string, unknown> = { message: text, image_url: imageUrl, visitId };
      if (leftUrl) payload.left_image_url = leftUrl;
      if (rightUrl) payload.right_image_url = rightUrl;
      if (hasBoth) payload.bilateral = true;
      const res = await fetch(`${API}/api/cases/${patientId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = (await res.json()) as { content?: string; error?: string; model?: string };
      if (!res.ok) throw new Error(j.error || `HTTP ${res.status}`);
      setMsgs((m) => [...m, { id: `asst_${Date.now()}`, role: "assistant", content: j.content || "", model: j.model }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setMsgs((m) => [...m, { id: `asst_${Date.now()}`, role: "assistant", content: `AI models not responding, using local help: ${msg.slice(0, 400)}\n\n*Tip: check API keys and that image is https or data URL.*` }]);
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
            <div className="text-xs text-zinc-500">Chat about the eye image, patient details are added automatically</div>
          </div>
        </div>
        <button onClick={clear} className="px-2.5 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-semibold hover:bg-zinc-50 flex items-center gap-1">
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>

      {hasAny && (
        <div className="px-4 py-4 border-b border-zinc-200 bg-zinc-50/50 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex gap-2 shrink-0">
              {hasLeft && bothPreviews.left && (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bothPreviews.left} alt="left eye" className="w-16 h-16 rounded-xl object-cover border-2 border-teal-600 shadow-sm" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-teal-600 text-white text-[11px] font-bold grid place-items-center border-2 border-white">L</span>
                </div>
              )}
              {hasRight && bothPreviews.right && (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bothPreviews.right} alt="right eye" className="w-16 h-16 rounded-xl object-cover border-2 border-amber-500 shadow-sm" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 text-white text-[11px] font-bold grid place-items-center border-2 border-white">R</span>
                </div>
              )}
              {!hasLeft && !hasRight && preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="case image" className="w-16 h-16 rounded-xl object-cover border-2 border-zinc-200" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-zinc-900">{hasBoth ? "Both eyes attached" : hasLeft ? "Left eye attached" : hasRight ? "Right eye attached" : "Fundus attached"}</div>
              <div className="text-xs text-zinc-600 mt-1 leading-relaxed">{hasBoth ? "Both images will be sent for AI check. Ask to compare left and right." : "This image will be sent with your question."}</div>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer shrink-0 bg-white border border-zinc-200 rounded-full px-3 py-1.5 hover:bg-zinc-50">
              <input type="checkbox" checked={includeImage} onChange={(e) => setIncludeImage(e.target.checked)} className="rounded text-teal-600" />
              Include
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-zinc-200">
            <div className="flex items-center gap-3">
              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${hasLeft ? (includeLeft ? "bg-teal-50 border-teal-300 text-teal-800" : "bg-white border-zinc-200 hover:bg-zinc-50") : "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"}`}>
                <input type="checkbox" checked={includeLeft} onChange={(e) => setIncludeLeft(e.target.checked)} disabled={!hasLeft} className="rounded text-teal-600" />
                Left {hasLeft ? "✓" : "Not set"}
              </label>
              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${hasRight ? (includeRight ? "bg-amber-50 border-amber-300 text-amber-800" : "bg-white border-zinc-200 hover:bg-zinc-50") : "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"}`}>
                <input type="checkbox" checked={includeRight} onChange={(e) => setIncludeRight(e.target.checked)} disabled={!hasRight} className="rounded text-amber-600" />
                Right {hasRight ? "✓" : "Not set"}
              </label>
            </div>
            <span className="text-xs text-zinc-500 sm:ml-auto bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-center">{hasBoth ? "Tip: Ask “Compare left vs right”" : "Upload the other eye to compare"}</span>
          </div>
        </div>
      )}

      {!API ? (
        <div className="mx-4 mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Chat using local guidance. Connect for image analysis.
        </div>
      ) : (
        <div className="mx-4 mt-3 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> AI chat ready, image analysis on
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
            <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 border ${m.role === "user" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200"}`}>
                {m.role === "assistant" ? (
                  <div
                    className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:font-bold prose-strong:text-zinc-900 prose-headings:font-bold prose-headings:mt-2 prose-headings:mb-1"
                    dangerouslySetInnerHTML={{
                      __html: m.content
                        // bold **text** -> <strong>
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        // italic *text* (avoid **)
                        .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>")
                        // headings ## -> <strong>
                        .replace(/^###\s+(.+)$/gm, "<div class='font-bold mt-2'>$1</div>")
                        .replace(/^##\s+(.+)$/gm, "<div class='font-bold text-sm mt-2'>$1</div>")
                        // bullet lists — lines starting with - or •
                        .replace(/^\s*[—\-•]\s+(.+)$/gm, "<div class='flex gap-1.5 ml-1'><span class='text-zinc-400'>•</span><span>$1</span></div>")
                        // numbered lists
                        .replace(/^\s*\d+\.\s+(.+)$/gm, "<div class='ml-1'>$1</div>")
                        // line breaks
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                ) : (
                  <span className="whitespace-pre-wrap">{m.content}</span>
                )}
                {m.model && <div className="mt-2 text-[10px] opacity-60 font-mono border-t border-zinc-100 pt-1">via {m.model}</div>}
              </div>
              {m.created_at && <div className="text-[10px] text-zinc-400 mt-1 px-1">{new Date(m.created_at).toLocaleString()}</div>}
            </div>
          ))
        )}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white border border-zinc-200 px-3.5 py-2.5 text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Thinking, checking AI models
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
          placeholder="Ask about this eye image, e.g. What stage is this or What is seen"
          className="flex-1 px-3.5 py-2.5 rounded-full border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
        />
        <button onClick={send} disabled={!input.trim() || sending} className="px-5 py-2.5 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-40 flex items-center gap-1.5">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
      <div className="px-3 pb-2 text-[10px] text-zinc-500 flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" /> Early AI check, eye doctor must confirm.
      </div>
    </div>
  );
}
