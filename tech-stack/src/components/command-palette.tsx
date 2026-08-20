"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { layers } from "@/data/layers";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting palette state on open, not a render loop
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return layers.slice(0, 8);
    return layers
      .filter((layer) => {
        const haystack = [layer.title, layer.shortTitle, layer.summary, ...layer.recommended, ...layer.techGroups.flatMap((g) => g.items.map((i) => i.name))]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  function go(slug: string) {
    setOpen(false);
    router.push(`/layers/${slug}`);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-border-hairline bg-surface-1 px-3 py-2 text-sm text-text-muted transition-colors hover:border-border-strong sm:w-64"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search layers…</span>
        <kbd className="hidden rounded border border-border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-text-muted sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-hairline bg-surface-1 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border-hairline px-4 py-3">
              <Search className="h-4 w-4 text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.min(i + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && results[activeIndex]) {
                    go(results[activeIndex].slug);
                  }
                }}
                placeholder="Search technologies, layers, categories…"
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-text-muted hover:text-text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {results.length === 0 && <div className="px-3 py-8 text-center text-sm text-text-muted">No layers found.</div>}
              {results.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.slug}
                    type="button"
                    onClick={() => go(layer.slug)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === activeIndex ? "bg-brand-soft" : "hover:bg-surface-2"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2">
                      <Icon className="h-4 w-4 text-text-secondary" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text-primary">{layer.title}</span>
                      <span className="block truncate text-xs text-text-muted">{layer.summary}</span>
                    </span>
                    <span className="shrink-0 text-[11px] font-mono text-text-muted">{String(layer.number).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
