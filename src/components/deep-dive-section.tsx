import type { DeepDiveSection } from "@/data/types";
import { FlowDiagram } from "@/components/diagrams/flow-diagram";

export function DeepDiveSectionCard({ section }: { section: DeepDiveSection }) {
  return (
    <section id={section.slug} className="scroll-mt-20 border-b border-border-hairline py-12 last:border-b-0">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-mono text-sm text-brand">{section.number}</span>
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">{section.title}</h2>
      </div>
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-text-muted">{section.kicker}</p>

      <div className="flex flex-col gap-4">
        {section.paragraphs.map((p, i) => (
          <p key={i} className="max-w-3xl leading-relaxed text-text-secondary">
            {p}
          </p>
        ))}
      </div>

      {section.diagram && (
        <div className="mt-6 rounded-2xl border border-border-hairline bg-surface-1 p-6 sm:p-8">
          {section.diagramCaption && (
            <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">{section.diagramCaption}</div>
          )}
          <FlowDiagram diagram={section.diagram} />
        </div>
      )}

      {section.table && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border-hairline bg-surface-1">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-hairline">
                {section.table.headers.map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-border-hairline last:border-b-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2.5 align-top ${j === 0 ? "font-medium text-text-primary" : "text-text-secondary"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.code && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border-hairline bg-[#141412] dark:bg-black">
          <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-white/50">{section.code.label}</div>
          <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
            <code className="font-mono text-white/85">{section.code.code}</code>
          </pre>
        </div>
      )}

      {section.callout && (
        <div className="mt-6 rounded-xl border-l-2 border-status-warning bg-status-warning/10 px-5 py-4">
          <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-status-warning">{section.callout.label}</div>
          <p className="text-sm leading-relaxed text-text-primary">{section.callout.text}</p>
        </div>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {section.terms.map((term) => (
          <li key={term} className="rounded-full border border-border-hairline bg-surface-2 px-3 py-1 font-mono text-xs text-text-secondary">
            {term}
          </li>
        ))}
      </ul>
    </section>
  );
}
