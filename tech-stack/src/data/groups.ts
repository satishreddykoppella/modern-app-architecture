import type { GroupMeta } from "./types";

export const groups: GroupMeta[] = [
  {
    id: "frontend",
    title: "Frontend & BFF",
    description: "The web client and the backend-for-frontend layer that shapes data for it.",
  },
  {
    id: "clients",
    title: "Client Applications",
    description: "Mobile, CLI, and desktop clients that talk to the same business services.",
  },
  {
    id: "gateway",
    title: "Gateway & APIs",
    description: "The edge gateway and protocol choices that connect clients to services.",
  },
  {
    id: "backend",
    title: "Business Services",
    description: "The core service layer and how it is organized as it grows.",
  },
  {
    id: "ai",
    title: "AI & Agents",
    description: "Agent runtimes, MCP tool access, and retrieval-augmented generation.",
  },
  {
    id: "data",
    title: "Data & Storage",
    description: "Databases, caching, object storage, and search.",
  },
  {
    id: "messaging",
    title: "Messaging & Streaming",
    description: "Queues and event streams for async and decoupled processing.",
  },
  {
    id: "realtime",
    title: "Realtime & Notifications",
    description: "Pushing live updates and messages to users across channels.",
  },
  {
    id: "security",
    title: "Security & Identity",
    description: "Authentication, authorization, secrets, and defense in depth.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Containers, orchestration, and infrastructure as code.",
  },
  {
    id: "devops",
    title: "DevOps & Delivery",
    description: "CI/CD, monorepo tooling, and runtime configuration.",
  },
  {
    id: "quality",
    title: "Quality & Docs",
    description: "Testing, API documentation, and schema validation.",
  },
  {
    id: "observability",
    title: "Observability",
    description: "Metrics, logs, traces, and error monitoring in production.",
  },
];

export function getGroup(id: string): GroupMeta | undefined {
  return groups.find((g) => g.id === id);
}
