"use client";

import { useEffect, useRef, useState } from "react";
import type { DiagramNode, DiagramNodeVariant, FlowDiagram as FlowDiagramType } from "@/data/types";

const VARIANT_COLOR: Record<DiagramNodeVariant, string> = {
  client: "var(--node-client)",
  gateway: "var(--node-gateway)",
  service: "var(--node-service)",
  store: "var(--node-store)",
  queue: "var(--node-queue)",
  ai: "var(--node-ai)",
  accent: "var(--node-accent)",
  default: "var(--node-default)",
};

const VARIANT_LABEL: Record<DiagramNodeVariant, string> = {
  client: "Client",
  gateway: "Gateway",
  service: "Service",
  store: "Data Store",
  queue: "Queue / Worker",
  ai: "AI / Agent",
  accent: "Highlight",
  default: "Component",
};

const ROW_HEIGHT = 140;
const MIN_COL_WIDTH = 190;
const STROKE_WIDTH = 1.75;
const SOURCE_GAP = 26;
const TARGET_GAP = 36;
const LANE_MARGIN_PCT = 9;

type Point = { x: number; y: number };

function nodeCenterPct(rows: DiagramNode[][], rowIndex: number, colIndex: number): Point {
  const rowLen = rows[rowIndex].length;
  return {
    x: ((colIndex + 0.5) / rowLen) * 100,
    y: ((rowIndex + 0.5) / rows.length) * 100,
  };
}

function findNodePosition(rows: DiagramNode[][], id: string): { rowIndex: number; colIndex: number } | null {
  for (let r = 0; r < rows.length; r++) {
    const c = rows[r].findIndex((n) => n.id === id);
    if (c !== -1) return { rowIndex: r, colIndex: c };
  }
  return null;
}

type ResolvedEdge = {
  fromPct: Point;
  toPct: Point;
  rowSpan: number;
  label?: string;
  key: string;
};

function resolveEdges(diagram: FlowDiagramType): ResolvedEdge[] {
  const { rows, edges } = diagram;

  if (edges && edges.length > 0) {
    return edges
      .map((edge, i): ResolvedEdge | null => {
        const from = findNodePosition(rows, edge.from);
        const to = findNodePosition(rows, edge.to);
        if (!from || !to) return null;
        return {
          fromPct: nodeCenterPct(rows, from.rowIndex, from.colIndex),
          toPct: nodeCenterPct(rows, to.rowIndex, to.colIndex),
          rowSpan: to.rowIndex - from.rowIndex,
          label: edge.label,
          key: `${edge.from}-${edge.to}-${i}`,
        };
      })
      .filter((e): e is ResolvedEdge => e !== null);
  }

  const result: ResolvedEdge[] = [];
  for (let r = 0; r < rows.length - 1; r++) {
    for (let i = 0; i < rows[r].length; i++) {
      for (let j = 0; j < rows[r + 1].length; j++) {
        result.push({
          fromPct: nodeCenterPct(rows, r, i),
          toPct: nodeCenterPct(rows, r + 1, j),
          rowSpan: 1,
          key: `${rows[r][i].id}-${rows[r + 1][j].id}`,
        });
      }
    }
  }
  return result;
}

/** Lane x for edges that skip over intermediate rows, routed away from the center column so the curve doesn't cut through a skipped node. */
function laneX(fromX: number, toX: number, width: number): number {
  const avg = (fromX + toX) / 2;
  return avg <= 50 ? width * (LANE_MARGIN_PCT / 100) : width * (1 - LANE_MARGIN_PCT / 100);
}

function buildPath(fromPct: Point, toPct: Point, rowSpan: number, width: number, height: number): string {
  const from = { x: (fromPct.x / 100) * width, y: (fromPct.y / 100) * height + SOURCE_GAP };
  const to = { x: (toPct.x / 100) * width, y: (toPct.y / 100) * height - TARGET_GAP };

  if (rowSpan <= 1) {
    const midY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
  }

  const lane = laneX(fromPct.x, toPct.x, width);
  const midY = (from.y + to.y) / 2;
  const ya = from.y + (midY - from.y) * 0.65;
  const yb = midY + (to.y - midY) * 0.35;
  return `M ${from.x} ${from.y} C ${from.x} ${ya}, ${lane} ${ya}, ${lane} ${midY} C ${lane} ${yb}, ${to.x} ${yb}, ${to.x} ${to.y}`;
}

function labelPositionPct(edge: ResolvedEdge): Point {
  if (edge.rowSpan <= 1) {
    return {
      x: (edge.fromPct.x + edge.toPct.x) / 2,
      y: (edge.fromPct.y + edge.toPct.y) / 2,
    };
  }
  const avg = (edge.fromPct.x + edge.toPct.x) / 2;
  return {
    x: avg <= 50 ? LANE_MARGIN_PCT : 100 - LANE_MARGIN_PCT,
    y: (edge.fromPct.y + edge.toPct.y) / 2,
  };
}

function useMeasuredWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

export function FlowDiagram({ diagram, className = "" }: { diagram: FlowDiagramType; className?: string }) {
  const { rows } = diagram;
  const edges = resolveEdges(diagram);
  const height = rows.length * ROW_HEIGHT;
  const maxCols = Math.max(...rows.map((r) => r.length));
  const minWidth = maxCols > 1 ? maxCols * MIN_COL_WIDTH : undefined;
  const [containerRef, width] = useMeasuredWidth();

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div ref={containerRef} className="relative" style={{ height, minWidth }}>
        {width !== null && (
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,0.5 L8,4.5 L0,8.5 Z" fill="var(--diagram-line)" />
              </marker>
            </defs>
            {edges.map((edge) => (
              <path
                key={edge.key}
                d={buildPath(edge.fromPct, edge.toPct, edge.rowSpan, width, height)}
                fill="none"
                stroke="var(--diagram-line)"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              />
            ))}
          </svg>
        )}

        {edges
          .filter((e) => e.label)
          .map((edge) => {
            const { x, y } = labelPositionPct(edge);
            return (
              <span
                key={`label-${edge.key}`}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border-hairline bg-surface-1 px-2 py-0.5 text-[10px] font-medium text-text-secondary shadow-sm"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {edge.label}
              </span>
            );
          })}

        {rows.map((row, r) =>
          row.map((node, c) => {
            const { x, y } = nodeCenterPct(rows, r, c);
            const color = VARIANT_COLOR[node.variant ?? "default"];
            return (
              <div key={node.id} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <div
                  className="min-w-[150px] max-w-[220px] overflow-hidden rounded-xl border border-border-hairline bg-surface-1 shadow-sm"
                  title={VARIANT_LABEL[node.variant ?? "default"]}
                >
                  <div className="h-[3px] w-full" style={{ backgroundColor: color }} />
                  <div className="px-3.5 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      <span className="truncate text-[13px] font-semibold text-text-primary">{node.label}</span>
                    </div>
                    {node.sublabel && <div className="mt-0.5 truncate text-[11px] text-text-muted">{node.sublabel}</div>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
