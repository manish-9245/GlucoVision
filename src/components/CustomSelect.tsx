"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { value: string; label: string; desc?: string };

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
  searchable = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = searchable && query ? options.filter((o) => `${o.label} ${o.desc || ""}`.toLowerCase().includes(query.toLowerCase())) : options;

  return (
    <div ref={ref} className={`relative m-1 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm font-medium hover:border-zinc-300 hover:bg-zinc-50 transition text-left shadow-sm min-w-0"
      >
        <span className={`flex-1 min-w-0 break-words whitespace-normal leading-snug text-left ${selected ? "text-zinc-900" : "text-zinc-400"}`}>{selected ? selected.label : placeholder}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 ml-2">
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 w-full min-w-0 max-w-[calc(100vw-2rem)] left-0 right-0 md:left-auto md:right-auto md:w-full rounded-xl border border-zinc-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {searchable && (
              <div className="p-3 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 text-sm outline-none placeholder:text-zinc-400 bg-transparent py-1"
                />
              </div>
            )}
            <div className="max-h-[240px] overflow-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-zinc-500 text-center">No results</div>
              ) : (
                filtered.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-sm text-left transition break-words whitespace-normal leading-relaxed ${value === o.value ? "bg-zinc-900 text-white shadow-md" : "hover:bg-zinc-50 border border-transparent hover:border-zinc-200"}`}
                  >
                    <span className="flex-1 min-w-0 break-words">
                      <span className={`font-medium break-words ${value === o.value ? "text-white" : "text-zinc-900"}`}>{o.label}</span>
                      {o.desc && <span className={`block text-xs mt-0.5 break-words whitespace-normal ${value === o.value ? "text-white/70" : "text-zinc-500"}`}>{o.desc}</span>}
                    </span>
                    {value === o.value && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
