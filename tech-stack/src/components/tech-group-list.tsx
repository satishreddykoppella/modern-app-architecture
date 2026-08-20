import { Check } from "lucide-react";
import type { TechGroup } from "@/data/types";

export function TechGroupList({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.heading} className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">{group.heading}</h4>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.name} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    item.recommended ? "bg-status-good/15 text-status-good" : "bg-surface-3 text-transparent"
                  }`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className={`text-sm ${item.recommended ? "font-medium text-text-primary" : "text-text-secondary"}`}>{item.name}</span>
                  {item.note && <span className="block text-xs text-text-muted">{item.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
