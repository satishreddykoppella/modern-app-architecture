import type { FlowDiagram } from "./types";

export const masterArchitecture: FlowDiagram = {
  direction: "vertical",
  rows: [
    [
      { id: "web", label: "Next.js Web", variant: "client" },
      { id: "mobile", label: "React Native", variant: "client" },
      { id: "cli", label: "CLI", variant: "client" },
      { id: "agent", label: "AI Agent", variant: "ai" },
    ],
    [
      { id: "bff", label: "Next.js BFF", variant: "service" },
      { id: "mcp", label: "MCP Server", variant: "ai" },
    ],
    [{ id: "gateway", label: "Envoy Gateway", sublabel: "TLS, auth, rate limiting", variant: "gateway" }],
    [{ id: "services", label: "Business Services", sublabel: "Node.js + NestJS/Fastify", variant: "service" }],
    [
      { id: "redis", label: "Redis", sublabel: "cache, queue", variant: "store" },
      { id: "mongodb", label: "MongoDB", sublabel: "primary data", variant: "store" },
      { id: "minio", label: "MinIO", sublabel: "object storage", variant: "store" },
      { id: "search", label: "OpenSearch", sublabel: "search + vector", variant: "store" },
    ],
  ],
  edges: [
    { from: "web", to: "bff" },
    { from: "mobile", to: "gateway" },
    { from: "cli", to: "gateway" },
    { from: "agent", to: "mcp" },
    { from: "bff", to: "gateway" },
    { from: "mcp", to: "gateway" },
    { from: "gateway", to: "services" },
    { from: "services", to: "redis" },
    { from: "services", to: "mongodb" },
    { from: "services", to: "minio" },
    { from: "services", to: "search" },
  ],
};

export const observabilityStrip: FlowDiagram = {
  direction: "vertical",
  rows: [
    [{ id: "platform", label: "Docker + Kubernetes", sublabel: "Terraform · GitHub Actions · Argo CD", variant: "gateway" }],
    [{ id: "otel", label: "OpenTelemetry", variant: "accent" }],
    [
      { id: "prometheus", label: "Prometheus", sublabel: "metrics", variant: "store" },
      { id: "tempo", label: "Tempo", sublabel: "traces", variant: "store" },
      { id: "loki", label: "Loki", sublabel: "logs", variant: "store" },
      { id: "sentry", label: "Sentry", sublabel: "errors", variant: "store" },
    ],
    [{ id: "grafana", label: "Grafana", sublabel: "unified dashboards", variant: "accent" }],
  ],
};
