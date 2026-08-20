import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { getAdjacentLayers, getLayer, layers } from "@/data/layers";
import { getGroup } from "@/data/groups";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";
import { TechGroupList } from "@/components/tech-group-list";

export function generateStaticParams() {
  return layers.map((layer) => ({ slug: layer.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const layer = getLayer(slug);
  if (!layer) return {};
  return {
    title: `${layer.title} — Tech Stack 2026`,
    description: layer.summary,
  };
}

export default async function LayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const layer = getLayer(slug);
  if (!layer) notFound();

  const group = getGroup(layer.group);
  const { prev, next } = getAdjacentLayers(slug);
  const Icon = layer.icon;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-primary">
          Overview
        </Link>
        <span>/</span>
        {group && <span>{group.title}</span>}
        <span>/</span>
        <span className="text-text-secondary">{layer.shortTitle}</span>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
            <Icon className="h-7 w-7" />
          </span>
          <div>
            <div className="font-mono text-xs text-text-muted">Layer {String(layer.number).padStart(2, "0")}</div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{layer.title}</h1>
          </div>
        </div>
      </div>

      <p className="mb-10 max-w-3xl text-lg leading-relaxed text-text-secondary">{layer.summary}</p>

      {layer.diagram && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">Flow Diagram</h2>
          <div className="rounded-2xl border border-border-hairline bg-surface-1 p-6 sm:p-8">
            <FlowDiagram diagram={layer.diagram} />
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">Overview</h2>
        <div className="flex flex-col gap-4">
          {layer.description.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-2xl border border-brand/20 bg-brand-soft p-6">
        <div className="mb-3 flex items-center gap-2 text-brand-strong">
          <Sparkles className="h-4 w-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wider">Recommended</h2>
        </div>
        <ul className="flex flex-wrap gap-2">
          {layer.recommended.map((rec) => (
            <li key={rec} className="rounded-full bg-surface-1 px-3.5 py-1.5 text-sm font-medium text-text-primary shadow-sm">
              {rec}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">Technology Options</h2>
        <TechGroupList groups={layer.techGroups} />
      </section>

      {layer.useCases && layer.useCases.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">Common Use Cases</h2>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {layer.useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-2.5 rounded-xl border border-border-hairline bg-surface-1 px-4 py-3 text-sm text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {useCase}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-14 flex items-center justify-between gap-4 border-t border-border-hairline pt-6">
        {prev ? (
          <Link href={`/layers/${prev.slug}`} className="group flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block text-xs text-text-muted">Previous</span>
              {prev.shortTitle}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/layers/${next.slug}`} className="group flex items-center gap-2 text-right text-sm text-text-secondary hover:text-text-primary">
            <span>
              <span className="block text-xs text-text-muted">Next</span>
              {next.shortTitle}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
