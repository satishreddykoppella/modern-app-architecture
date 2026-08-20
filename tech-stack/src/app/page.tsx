import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { groups } from "@/data/groups";
import { getLayersByGroup, layers } from "@/data/layers";
import { LayerCard } from "@/components/layer-card";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";
import { masterArchitecture, observabilityStrip } from "@/data/architecture";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border-hairline bg-grid px-4 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface-page/40 to-surface-page" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-hairline bg-surface-1 px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm">
            <Layers3 className="h-3.5 w-3.5 text-brand" />
            {layers.length} layers · end-to-end architecture
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            The Modern Application
            <br />
            <span className="text-brand">Tech Stack</span> for 2026
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            A complete map of a production-grade architecture — from the browser down to the infrastructure —
            covering web, mobile, AI agents, MCP, databases, queues, security, and observability, with clear
            recommendations and tradeoffs at every layer.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/layers/web-frontend"
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5"
            >
              Start exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#architecture"
              className="flex items-center gap-2 rounded-xl border border-border-hairline bg-surface-1 px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-2"
            >
              View architecture
            </a>
          </div>
        </div>
      </section>

      <section id="architecture" className="border-b border-border-hairline px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Final Target Architecture</h2>
            <p className="mx-auto mt-2 max-w-2xl text-text-secondary">
              Traditional clients reach business services through an API. AI agents reach the same business
              services through MCP — two parallel front doors into one house.
            </p>
          </div>
          <div className="rounded-2xl border border-border-hairline bg-surface-1 p-6 sm:p-10">
            <FlowDiagram diagram={masterArchitecture} />
          </div>

          <div className="mt-6 rounded-2xl border border-border-hairline bg-surface-1 p-6 sm:p-10">
            <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-text-muted">
              Platform &amp; Observability
            </h3>
            <FlowDiagram diagram={observabilityStrip} />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Every Layer, Explained</h2>
            <p className="mx-auto mt-2 max-w-2xl text-text-secondary">
              Browse by category, or use search (⌘K) to jump straight to a technology.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            {groups.map((group) => {
              const groupLayers = getLayersByGroup(group.id);
              if (groupLayers.length === 0) return null;
              return (
                <div key={group.id}>
                  <div className="mb-5 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{group.title}</h3>
                      <p className="text-sm text-text-muted">{group.description}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-text-muted">{groupLayers.length} layers</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupLayers.map((layer) => (
                      <LayerCard key={layer.slug} layer={layer} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border-hairline px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row">
          <span>Modern Application Tech Stack — 2026</span>
          <span>{layers.length} layers · frontend to infrastructure</span>
        </div>
      </footer>
    </div>
  );
}
