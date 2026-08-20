import Link from "next/link";
import type { Layer } from "@/data/types";

export function LayerCard({ layer }: { layer: Layer }) {
  const Icon = layer.icon;
  return (
    <Link
      href={`/layers/${layer.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border-hairline bg-surface-1 p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-strong">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs text-text-muted">{String(layer.number).padStart(2, "0")}</span>
      </div>
      <div>
        <h3 className="font-semibold text-text-primary group-hover:text-brand-strong">{layer.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-text-secondary">{layer.summary}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {layer.recommended.slice(0, 3).map((r) => (
          <span key={r} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-text-secondary">
            {r}
          </span>
        ))}
      </div>
    </Link>
  );
}
