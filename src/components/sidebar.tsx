"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { groups } from "@/data/groups";
import { getLayersByGroup } from "@/data/layers";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto px-3 py-4">
      <Link
        href="/"
        className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          pathname === "/" ? "bg-brand-soft text-brand-strong" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Overview
      </Link>

      {groups.map((group) => {
        const groupLayers = getLayersByGroup(group.id);
        if (groupLayers.length === 0) return null;

        return (
          <div key={group.id} className="mt-3 first:mt-0">
            <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">{group.title}</div>
            <div className="flex flex-col gap-0.5">
              {groupLayers.map((layer) => {
                const href = `/layers/${layer.slug}`;
                const isActive = pathname === href;
                const Icon = layer.icon;
                return (
                  <Link
                    key={layer.slug}
                    href={href}
                    className={`group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      isActive ? "bg-brand-soft text-brand-strong font-medium" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-brand-strong" : "text-text-muted group-hover:text-text-secondary"}`} />
                    <span className="truncate">{layer.shortTitle}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
