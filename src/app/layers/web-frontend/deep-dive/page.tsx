import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";
import { frontendFundamentals } from "@/data/frontend-fundamentals";
import { DeepDiveSectionCard } from "@/components/deep-dive-section";

export const metadata = {
  title: "Browser & JS Fundamentals — Tech Stack 2026",
  description:
    "The browser, runtime, network, and protocol layers underneath the Web Frontend layer — rendering pipeline, event loop, workers, CORS, auth, caching, security, and rendering architectures.",
};

export default function FrontendDeepDivePage() {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 sm:px-8">
      <div className="min-w-0 flex-1">
        <div className="mb-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-primary">
            Overview
          </Link>
          <span>/</span>
          <Link href="/layers/web-frontend" className="hover:text-text-primary">
            Web Frontend
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Deep Dive</span>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
            <Globe className="h-7 w-7" />
          </span>
          <div>
            <div className="font-mono text-xs text-text-muted">Web Frontend Layer · Deep Dive</div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Browser &amp; JS Fundamentals</h1>
          </div>
        </div>

        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-text-secondary">
          Next.js, React, and the tooling on the Web Frontend Layer page are the visible surface. This is the machinery
          underneath — the browser, the runtime, the network, and the protocols — in the order that actually builds
          understanding, each layer depending on the one before it.
        </p>

        <div className="mb-10 rounded-2xl border border-border-hairline bg-surface-1 p-6 sm:p-8">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">Seventeen sections, one dependency chain</div>
          <div className="flex flex-wrap gap-2">
            {frontendFundamentals.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-border-hairline bg-surface-2 px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
              >
                <span className="text-text-muted">{s.number}</span> {s.title.split(",")[0].split("&")[0].trim()}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {frontendFundamentals.map((section) => (
            <DeepDiveSectionCard key={section.slug} section={section} />
          ))}
        </div>

        <nav className="mt-10 flex items-center justify-between gap-4 border-t border-border-hairline pt-6">
          <Link href="/layers/web-frontend" className="group flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block text-xs text-text-muted">Back to</span>
              Web Frontend Layer
            </span>
          </Link>
        </nav>
      </div>

      <aside className="sticky top-24 hidden h-fit w-56 shrink-0 xl:block">
        <div className="mb-2 px-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">On this page</div>
        <nav className="flex max-h-[calc(100vh-8rem)] flex-col gap-0.5 overflow-y-auto">
          {frontendFundamentals.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="flex items-baseline gap-2 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
            >
              <span className="font-mono text-text-muted">{s.number}</span>
              <span className="truncate">{s.title}</span>
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
