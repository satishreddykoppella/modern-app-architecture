"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Layers3 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { Sidebar } from "@/components/sidebar";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-hairline bg-surface-1/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Layers3 className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Tech Stack 2026</span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-border-hairline bg-surface-1 shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-border-hairline px-4">
              <span className="font-semibold text-text-primary">Navigation</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-2"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]" onClick={() => setMobileOpen(false)}>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
