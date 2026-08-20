import type { LucideIcon } from "lucide-react";

export type TechItem = {
  name: string;
  recommended?: boolean;
  note?: string;
};

export type TechGroup = {
  heading: string;
  items: TechItem[];
};

export type DiagramNodeVariant =
  | "client"
  | "gateway"
  | "service"
  | "store"
  | "queue"
  | "ai"
  | "accent"
  | "default";

export type DiagramNode = {
  id: string;
  label: string;
  sublabel?: string;
  variant?: DiagramNodeVariant;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
};

/**
 * A diagram is expressed as ordered rows (top → bottom). By default every
 * node in a row connects to every node in the next row (fan-out/fan-in).
 * Pass explicit `edges` to override this when a row needs partial connections.
 */
export type FlowDiagram = {
  rows: DiagramNode[][];
  edges?: DiagramEdge[];
  direction?: "vertical" | "horizontal";
};

export type Layer = {
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  group: string;
  icon: LucideIcon;
  summary: string;
  description: string[];
  techGroups: TechGroup[];
  recommended: string[];
  diagram?: FlowDiagram;
  useCases?: string[];
};

export type GroupMeta = {
  id: string;
  title: string;
  description: string;
};
