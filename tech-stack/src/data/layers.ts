import {
  MonitorSmartphone,
  Shuffle,
  Network,
  PlugZap,
  Server,
  Boxes,
  Zap,
  Database,
  Layers as LayersIcon,
  HardDrive,
  ListOrdered,
  Radio,
  Workflow,
  Bot,
  BrainCircuit,
  Search,
  Fingerprint,
  ShieldCheck,
  Smartphone,
  Terminal,
  Laptop,
  Signal,
  Bell,
  BookOpen,
  FileCheck2,
  Package,
  Archive,
  Ship,
  FileCode2,
  GitBranch,
  Activity,
  Bug,
  KeyRound,
  Flag,
  ShieldAlert,
  TestTube2,
  GitMerge,
} from "lucide-react";
import type { Layer } from "./types";

export const layers: Layer[] = [
  {
    slug: "web-frontend",
    number: 1,
    title: "Web Frontend Layer",
    shortTitle: "Web Frontend",
    group: "frontend",
    icon: MonitorSmartphone,
    summary:
      "The web frontend layer is what users actually see and touch — a React-based, server-rendered UI built with Next.js and TypeScript that turns backend data into fast, accessible interfaces.",
    description: [
      "The frontend layer owns everything that happens inside the browser: rendering the component tree, routing between views, managing interactivity, and turning raw API responses into something a human can read and act on. In a modern TypeScript stack, Next.js sits on top of React as the meta-framework of choice — it adds file-based routing, server-side rendering, static generation, and React Server Components on top of React's component model, while TypeScript gives every prop, API response, and form value a checked shape. This combination lets one team own the full rendering pipeline instead of stitching together a bundler, router, and server by hand.",
      "This layer exists because rendering and data-shaping logic is fundamentally different from business logic — it changes on a different cadence, is driven by design and UX concerns, and needs to run partly on the server (for speed and SEO) and partly on the client (for interactivity). Next.js's hybrid rendering model — mixing Server Components, streaming, and client components — exists precisely so teams don't have to choose between a fast initial load and a rich interactive experience; you ship only the JavaScript that actually needs to run in the browser, and fetch data as close to its source as possible for everything else.",
      "The interesting tradeoffs live in the supporting libraries. Tailwind CSS plus shadcn/ui has become the default styling pairing because Tailwind's utility classes avoid CSS naming and specificity fights, while shadcn/ui gives you accessible, unstyled-by-default Radix components you copy into your own codebase instead of importing as an opaque dependency — versus Material UI's more prescriptive, batteries-included component system, or Styled Components' runtime CSS-in-JS, which is flexible but adds a runtime cost. Similarly, Zustand's minimal hook-based API beats Redux Toolkit for most apps that don't need Redux's strict action/reducer discipline or time-travel debugging, and TanStack Query has largely replaced hand-rolled fetch-and-cache logic by treating server data as a first-class cache with revalidation, retries, and background refetching built in. On the forms side, React Hook Form paired with Zod has become the standard because Zod's schema can validate data at runtime and, via z.infer, generate the exact TypeScript type the form uses — one definition, two guarantees.",
    ],
    techGroups: [
      {
        heading: "Core Framework",
        items: [
          { name: "Next.js", recommended: true, note: "meta-framework of choice" },
          { name: "React", recommended: true, note: "component model foundation" },
          { name: "TypeScript", recommended: true, note: "type safety across the stack" },
        ],
      },
      {
        heading: "Styling",
        items: [
          { name: "Tailwind CSS", recommended: true, note: "utility-first, best default" },
          { name: "shadcn/ui", recommended: true, note: "accessible, ownable components" },
          { name: "Material UI", note: "batteries-included component library" },
          { name: "Styled Components", note: "runtime CSS-in-JS" },
          { name: "CSS Modules", note: "zero-runtime scoped CSS" },
        ],
      },
      {
        heading: "Client State",
        items: [
          { name: "Zustand", recommended: true, note: "minimal, hook-based" },
          { name: "Redux Toolkit", note: "structured, devtools-heavy apps" },
          { name: "Jotai", note: "atomic state model" },
          { name: "Recoil", note: "atomic, React-first" },
        ],
      },
      {
        heading: "Server State / Data Fetching",
        items: [
          { name: "TanStack Query", recommended: true, note: "cache and sync for REST/GraphQL" },
          { name: "SWR", note: "lightweight, Vercel-made" },
          { name: "Next.js Server Components", note: "fetch on the server, ship less JS" },
        ],
      },
      {
        heading: "Forms",
        items: [
          { name: "React Hook Form", recommended: true, note: "uncontrolled, high performance" },
          { name: "Formik", note: "older, more boilerplate" },
        ],
      },
      {
        heading: "Validation",
        items: [
          { name: "Zod", recommended: true, note: "TS-first schema validation" },
          { name: "Valibot", note: "smaller bundle alternative" },
          { name: "Yup", note: "established, schema-based" },
        ],
      },
      {
        heading: "Charts",
        items: [
          { name: "Recharts", note: "composable, React-native API" },
          { name: "Apache ECharts", note: "feature-rich, heavier" },
          { name: "D3.js", note: "low-level, full control" },
          { name: "Chart.js", note: "simple canvas charts" },
        ],
      },
      {
        heading: "Tables",
        items: [
          { name: "TanStack Table", note: "headless, flexible" },
          { name: "AG Grid", note: "enterprise data grid" },
          { name: "MUI Data Grid", note: "pairs with Material UI" },
        ],
      },
      {
        heading: "Testing",
        items: [
          { name: "Vitest", note: "fast unit tests" },
          { name: "Jest", note: "established standard" },
          { name: "React Testing Library", note: "component-level testing" },
          { name: "Playwright", recommended: true, note: "cross-browser E2E" },
          { name: "Cypress", note: "developer-friendly E2E" },
        ],
      },
    ],
    recommended: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Playwright",
    ],
    useCases: [
      "Rendering server-first pages and dashboards with the Next.js App Router",
      "Managing ephemeral UI state such as modals, filters, and wizards with Zustand",
      "Caching, revalidating, and syncing remote data with TanStack Query",
      "Building and validating complex forms with React Hook Form and Zod",
      "Running cross-browser end-to-end tests with Playwright before every release",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser", variant: "client" }],
        [{ id: "nextjs", label: "Next.js", sublabel: "React + TypeScript", variant: "accent" }],
        [
          { id: "styling", label: "Tailwind CSS + shadcn/ui", sublabel: "styling layer", variant: "default" },
          { id: "state", label: "TanStack Query + Zustand", sublabel: "server + client state", variant: "store" },
        ],
        [{ id: "bff", label: "BFF", variant: "service" }],
      ],
    },
  },
  {
    slug: "bff",
    number: 2,
    title: "BFF Layer",
    shortTitle: "BFF Layer",
    group: "frontend",
    icon: Shuffle,
    summary:
      "The Backend-For-Frontend is a thin server layer owned by the frontend team that adapts, aggregates, and secures backend APIs for exactly the UI that consumes them.",
    description: [
      "A Backend For Frontend sits between the Next.js application and the internal API gateway, and its job is narrow by design: shape backend data for one specific frontend experience. Rather than letting the browser call multiple internal services directly, the BFF becomes the single hop the client talks to — it owns session handling, aggregates calls to several downstream services into one response, transforms payloads into exactly the shape the UI needs, and enforces authorization before anything reaches the internal network. The architecture is a straight line: Browser talks to Next.js, Next.js talks to the BFF, and the BFF talks to Envoy at the edge of the service mesh.",
      "This layer exists because putting API composition and UI-specific logic directly in the browser is both slow and insecure — every extra network hop from the client is high-latency and exposes internal service topology, while every bit of aggregation logic duplicated across client code paths becomes a maintenance burden. A dedicated BFF also lets each frontend evolve independently: a web app and a mobile app can each have a BFF tuned to their own data and latency needs, without forcing the underlying business services to serve every possible client shape directly.",
      "The real decision is where the BFF lives and how much framework it needs. Next.js Route Handlers let the BFF live inside the same application and deployment as the frontend itself — same repo, same TypeScript types, one less service to operate, and no extra network hop between the rendering layer and the BFF — which is why it's the recommended default for most teams. A standalone NestJS or Fastify BFF makes sense when the aggregation logic is heavy enough to warrant its own deployment, scaling profile, or team ownership, and NestJS in particular brings dependency injection, guards, and interceptors that help larger teams keep a growing BFF disciplined. GraphQL (Apollo or Yoga) is worth reaching for when multiple clients need very different, flexible views of the same data, and tRPC is compelling in TypeScript-only monorepos where you don't need a public API contract at all — but for a single web frontend, the simplicity of colocated Route Handlers usually wins.",
    ],
    techGroups: [
      {
        heading: "BFF Technologies",
        items: [
          { name: "Next.js Route Handlers", recommended: true, note: "colocated with the frontend app" },
          { name: "Node.js", note: "runtime substrate" },
          { name: "NestJS", note: "structured, DI-based framework" },
          { name: "Fastify", note: "high-performance HTTP server" },
          { name: "Express", note: "minimal, ubiquitous" },
          { name: "GraphQL Apollo", note: "flexible client-driven queries" },
          { name: "GraphQL Yoga", note: "lightweight GraphQL server" },
          { name: "tRPC", note: "end-to-end typesafe TS-only APIs" },
        ],
      },
    ],
    recommended: ["Next.js BFF (Route Handlers)"],
    useCases: [
      "Handling authentication and session management for the web app",
      "Aggregating calls to multiple backend services into a single UI-friendly response",
      "Transforming and reshaping data specifically for one frontend experience",
      "Validating requests and enforcing authorization before calling internal services",
      "Normalizing errors and streaming responses back to the browser",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser", variant: "client" }],
        [{ id: "nextjs", label: "Next.js", variant: "default" }],
        [{ id: "bff", label: "BFF", variant: "accent" }],
        [{ id: "envoy", label: "Envoy", variant: "gateway" }],
      ],
    },
  },
  {
    slug: "api-gateway",
    number: 3,
    title: "API / Edge Gateway Layer",
    shortTitle: "API Gateway",
    group: "gateway",
    icon: Network,
    summary:
      "The API/Edge gateway is the single front door into your service mesh — terminating TLS, enforcing policy, and routing every request from the BFF to the right backend service.",
    description: [
      "The gateway layer is the choke point where every request from the BFF enters the internal service landscape. It terminates TLS, authenticates and authorizes traffic, routes each request to the correct backend service, and applies traffic policy — rate limiting, load balancing, retries, and circuit breaking — before a request ever reaches business logic. In the reference architecture, the Next.js BFF talks to Envoy, and Envoy fans requests out to the User Service, Asset Service, Document Service, and AI Service behind it.",
      "This layer exists so that cross-cutting concerns don't have to be reimplemented in every service. Without a gateway, each service would need its own TLS handling, its own rate limiting, its own retry logic, and its own auth verification — inconsistent, error-prone, and hard to audit. Centralizing these concerns at the edge also gives you one place to add observability (tracing, metrics, logging) across the entire service mesh, and one place to safely roll out traffic shifting strategies like canary releases without touching individual services.",
      "The choice of gateway technology tracks the shape of the organization more than the shape of the traffic. Envoy Gateway is the natural fit for enterprise and cloud-native environments already investing in Kubernetes and service-mesh patterns — it speaks the xDS API, integrates cleanly with sidecar proxies, and scales to very large, dynamic service topologies, at the cost of a steeper operational learning curve. NGINX remains the pragmatic choice for simpler applications: it's mature, extremely well understood, and easy to operate without a dedicated platform team. Kong sits at the other end — when the architecture is API-management-heavy, with external developer portals, quotas, and a large plugin surface to maintain, Kong's ecosystem earns its extra complexity. Managed cloud gateways (AWS API Gateway, Azure API Management, Google API Gateway) and Cloudflare trade some control for near-zero operational overhead, which is attractive for teams that don't want to run gateway infrastructure at all.",
    ],
    techGroups: [
      {
        heading: "Gateway Technologies",
        items: [
          { name: "Envoy Gateway", recommended: true, note: "enterprise / cloud-native" },
          { name: "NGINX", recommended: true, note: "simpler applications" },
          { name: "Kong", recommended: true, note: "API-management-heavy" },
          { name: "Envoy", note: "underlying proxy engine" },
          { name: "Traefik", note: "cloud-native, auto-discovery" },
          { name: "Apache APISIX", note: "dynamic, plugin-driven gateway" },
          { name: "HAProxy", note: "high-performance load balancer" },
          { name: "AWS API Gateway", note: "managed, AWS-native" },
          { name: "Azure API Management", note: "managed, Azure-native" },
          { name: "Google API Gateway", note: "managed, GCP-native" },
          { name: "Cloudflare", note: "edge routing and DDoS protection" },
        ],
      },
    ],
    recommended: ["Envoy Gateway (enterprise / cloud-native)", "NGINX (simpler applications)", "Kong (API-management-heavy)"],
    useCases: [
      "Routing requests from the BFF to the correct downstream business service",
      "Terminating TLS and enforcing authentication at the edge",
      "Applying rate limiting and load balancing across service instances",
      "Handling retries and circuit breaking to contain downstream failures",
      "Providing centralized observability and tracing across the service mesh",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "bff", label: "Next.js BFF", variant: "service" }],
        [{ id: "envoy", label: "Envoy Gateway", variant: "gateway" }],
        [
          { id: "user-svc", label: "User Service", variant: "service" },
          { id: "asset-svc", label: "Asset Service", variant: "service" },
          { id: "doc-svc", label: "Document Service", variant: "service" },
          { id: "ai-svc", label: "AI Service", variant: "service" },
        ],
      ],
    },
  },
  {
    slug: "api-protocols",
    number: 4,
    title: "API Protocol Layer",
    shortTitle: "API Protocols",
    group: "gateway",
    icon: PlugZap,
    summary:
      "Choosing the right protocol for each hop — REST, gRPC, SSE, MCP, queues — determines latency, coupling, and how naturally two systems can talk to each other.",
    description: [
      "The protocol layer defines the contract and transport used at every hop in the system. There is no single universal protocol; instead, each edge of the architecture — browser to BFF, BFF to services, service to service, server to browser, AI agent to tools, and background processing — gets the protocol best suited to its constraints. Browser-facing traffic typically runs over REST or GraphQL, BFF-to-service and service-to-service calls favor REST or gRPC, server-to-browser pushes use SSE or WebSocket, AI agents talk to tools over MCP, and asynchronous work flows through message queues or event streams.",
      "This layer exists because a single protocol can't satisfy every hop's requirements at once. Public and browser-facing traffic needs broad compatibility, cacheability, and easy debugging, which REST provides out of the box, while GraphQL trades that simplicity for precise, client-driven queries. Internal, high-frequency service-to-service calls benefit from a binary, strongly-typed, streaming-capable protocol like gRPC, which is far more efficient than JSON-over-HTTP at scale. Push scenarios — live notifications, presence, streaming AI responses — need a persistent channel rather than request/response polling, and AI agents need a standardized way to discover and invoke external tools rather than a bespoke integration per agent.",
      "The tradeoffs show up clearly at the browser boundary: gRPC's binary framing and HTTP/2-only transport make it awkward to call directly from a browser without a translation layer, which is why it's reserved for BFF-to-service and service-to-service hops rather than the public edge, where REST's ubiquity and cacheability still win. On the streaming side, SSE is the simpler choice for one-directional server push (think live status updates or token-by-token AI output), while WebSocket earns its extra operational complexity only when the client also needs to push data back in real time. MCP exists specifically to standardize how AI agents call tools, replacing ad hoc function-calling glue with a shared protocol, and message queues or event streams decouple producers from consumers for background work — at the cost of eventual consistency and an extra piece of broker infrastructure to operate.",
    ],
    techGroups: [
      {
        heading: "Communication Mechanisms",
        items: [
          { name: "REST", recommended: true, note: "browser to BFF, BFF to services" },
          { name: "GraphQL", note: "flexible client-driven queries" },
          { name: "gRPC", recommended: true, note: "service to service, low latency" },
          { name: "WebSocket", recommended: true, note: "bidirectional server to browser" },
          { name: "Server-Sent Events", recommended: true, note: "one-way server to browser streaming" },
          { name: "Webhooks", note: "async event notification outbound" },
          { name: "MCP", recommended: true, note: "AI agent to tools" },
          { name: "Message Queues", recommended: true, note: "decoupled async processing" },
          { name: "Event Streams", note: "high-throughput event backbone" },
        ],
      },
    ],
    recommended: ["REST", "gRPC", "SSE / WebSocket", "MCP", "Message Queues"],
    useCases: [
      "Serving browser-to-BFF requests over REST or GraphQL",
      "Handling BFF-to-service and service-to-service calls over REST or gRPC",
      "Streaming real-time updates and AI responses to the browser over SSE or WebSocket",
      "Letting AI agents discover and invoke tools through MCP",
      "Decoupling background and async workloads through message queues",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [
          { id: "browser", label: "Browser", variant: "client" },
          { id: "ai-agent", label: "AI Agent", variant: "ai" },
        ],
        [{ id: "bff", label: "BFF", variant: "service" }],
        [{ id: "services", label: "Business Services", variant: "service" }],
      ],
      edges: [
        { from: "browser", to: "bff", label: "REST / GraphQL" },
        { from: "bff", to: "services", label: "REST / gRPC" },
        { from: "ai-agent", to: "services", label: "MCP" },
      ],
    },
  },
  {
    slug: "business-services",
    number: 5,
    title: "Business Service Layer",
    shortTitle: "Business Services",
    group: "backend",
    icon: Server,
    summary:
      "The business service layer is where core domain logic lives — the controllers, services, and repositories that implement your actual product behavior, in whatever runtime fits your team.",
    description: [
      "Behind the gateway sits the layer that actually implements the product: business services organized into controllers that handle incoming requests, services that encode business rules, and repositories that talk to the database. This is the layer where domain logic actually lives, as opposed to the routing, aggregation, and presentation concerns handled by the layers above it. It's also the layer most exposed to language and framework choice, because different runtimes genuinely suit different kinds of workloads and teams.",
      "This layer exists as a distinct tier because business logic changes for different reasons and at a different pace than either the UI or the network plumbing around it, and because most real organizations are polyglot in practice. Node.js and TypeScript let a team share types, tooling, and even validation schemas with the frontend and BFF, which shortens the feedback loop for full-stack teams. Java frameworks like Spring Boot, Quarkus, and Micronaut suit organizations with deep JVM investment, strict enterprise governance, or long operational histories that value mature tooling and stability over developer velocity. Go excels at high-throughput, low-latency, resource-constrained services thanks to its compiled binaries and lightweight concurrency model, and Python (FastAPI, Django, Flask) is the natural choice when a service needs to sit close to a team's data science or ML workflows. ASP.NET Core rounds this out for organizations built around the Microsoft ecosystem.",
      "Within the recommended Node.js/TypeScript path, the real tradeoff is between structure and speed. NestJS brings an Angular-like architecture — dependency injection, decorators, guards, interceptors, pipes, and first-class module boundaries — which pays off once a codebase or team grows large enough that consistency matters more than raw simplicity, and it has built-in support for microservice transports when you outgrow a single deployable. Fastify strips that ceremony away in favor of raw throughput and a smaller footprint, which is the better call for a small, focused, performance-sensitive service. Express remains the most widely known option but is deliberately unopinionated, leaving structure entirely up to the team — workable, but it puts the burden of consistency back on code review rather than the framework.",
    ],
    techGroups: [
      {
        heading: "JavaScript / TypeScript",
        items: [
          { name: "Node.js", recommended: true, note: "shared language across the stack" },
          { name: "NestJS", recommended: true, note: "structured, DI-based, scales with teams" },
          { name: "Fastify", recommended: true, note: "lightweight, high-performance" },
          { name: "Express", note: "unopinionated, ubiquitous" },
          { name: "Hono", note: "lightweight, edge-friendly" },
        ],
      },
      {
        heading: "Java",
        items: [
          { name: "Spring Boot", note: "mature enterprise standard" },
          { name: "Quarkus", note: "cloud-native, fast startup" },
          { name: "Micronaut", note: "lightweight, low-memory JVM" },
        ],
      },
      {
        heading: "Go",
        items: [
          { name: "Go", note: "compiled, high concurrency" },
          { name: "Gin", note: "minimal, fast HTTP framework" },
          { name: "Fiber", note: "Express-inspired, very fast" },
          { name: "Echo", note: "minimalist, extensible" },
        ],
      },
      {
        heading: "Python",
        items: [
          { name: "FastAPI", note: "async, type-hinted, ML-friendly" },
          { name: "Django", note: "batteries-included, ORM + admin" },
          { name: "Flask", note: "minimal, flexible microframework" },
        ],
      },
      {
        heading: ".NET",
        items: [{ name: "ASP.NET Core", note: "enterprise, Microsoft ecosystem" }],
      },
    ],
    recommended: ["Node.js", "TypeScript", "NestJS or Fastify"],
    useCases: [
      "Implementing core domain and business rules behind the API gateway",
      "Exposing REST or gRPC endpoints through controllers",
      "Encapsulating data access and persistence logic in repositories",
      "Enforcing cross-cutting concerns like auth guards and validation pipes",
      "Supporting microservice-to-microservice communication patterns",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "envoy", label: "Envoy Gateway", variant: "gateway" }],
        [{ id: "service", label: "Business Service", sublabel: "Node.js + NestJS/Fastify", variant: "accent" }],
        [
          { id: "controllers", label: "Controllers", variant: "service" },
          { id: "services", label: "Services", variant: "default" },
          { id: "repositories", label: "Repositories", variant: "store" },
        ],
      ],
    },
  },
  {
    slug: "service-architecture",
    number: 6,
    title: "Service Architecture",
    shortTitle: "Service Architecture",
    group: "backend",
    icon: Boxes,
    summary:
      "Service architecture decides how you carve up your backend — one deployable modular monolith, many independent microservices, or event-driven serverless functions — and when to move from one to the next.",
    description: [
      "Service architecture is about the macro-structure of the backend: how many independently deployable units you run, and where the boundaries between them sit. This is a different question from what happens inside a single service (that's the business service layer) — it's about whether your User, Asset, Family, Documents, and Reporting logic live inside one application with clean internal module boundaries, or as separately deployed services like a User Service, Asset Service, Document Service, Identity Service, and so on, or as event-driven functions that only run when triggered.",
      "This decision exists because the two ends of the spectrum solve different problems and create different costs. A modular monolith keeps everything in a single deployable, which means simple transactions, easy local reasoning, and one thing to build, test, and deploy — but it demands real discipline in enforcing module boundaries internally, or the codebase gradually turns into an unstructured ball of mud. Microservices give you independent deployment, independent scaling, and failure isolation per domain, which matters once different parts of the system have genuinely different load profiles or are owned by different teams — but every one of those benefits is paid for with distributed systems complexity: network calls replace function calls, consistency becomes eventual, and you now need service discovery, inter-service auth, and far more infrastructure to operate.",
      "Serverless functions (AWS Lambda, Azure Functions, Google Cloud Functions, Cloudflare Workers) sit at a further extreme — no servers to manage, scale-to-zero economics, and a natural fit for spiky or event-driven workloads, but with tradeoffs like cold starts, execution time limits, and tighter coupling to a specific cloud vendor. Given all of this, the pragmatic default is to start with a modular monolith: it's faster to build, cheaper to operate, and far easier to refactor while the domain boundaries are still being discovered. Microservices should be extracted only when there's a concrete justification — a real scaling mismatch, a team boundary that needs its own release cadence, or a compliance requirement for isolation — rather than adopted upfront on the assumption that you'll need them eventually.",
    ],
    techGroups: [
      {
        heading: "Modular Monolith",
        items: [
          { name: "User Module" },
          { name: "Asset Module" },
          { name: "Family Module" },
          { name: "Documents Module" },
          { name: "Reporting Module" },
        ],
      },
      {
        heading: "Microservices",
        items: [
          { name: "User Service" },
          { name: "Asset Service" },
          { name: "Document Service" },
          { name: "Identity Service" },
          { name: "Notification Service" },
          { name: "Reporting Service" },
          { name: "AI Service" },
          { name: "Search Service" },
        ],
      },
      {
        heading: "Serverless",
        items: [
          { name: "AWS Lambda" },
          { name: "Azure Functions" },
          { name: "Google Cloud Functions" },
          { name: "Cloudflare Workers" },
        ],
      },
    ],
    recommended: ["Start with a modular monolith", "Extract microservices only when justified"],
    useCases: [
      "Organizing domain boundaries cleanly within a single deployable application",
      "Scaling and deploying a high-traffic domain independently once it's extracted",
      "Isolating a service for compliance, security, or data-residency reasons",
      "Running spiky or event-driven workloads on serverless functions",
      "Deciding when a monolith module has earned the right to become its own microservice",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "monolith", label: "Node Application", sublabel: "start here", variant: "accent" }],
        [
          { id: "user-module", label: "User Module", variant: "service" },
          { id: "asset-module", label: "Asset Module", variant: "service" },
          { id: "documents-module", label: "Documents Module", variant: "service" },
          { id: "reporting-module", label: "Reporting Module", variant: "service" },
        ],
      ],
    },
  },
  {
    slug: "cache",
    number: 7,
    title: "Cache Layer",
    shortTitle: "Cache",
    group: "data",
    icon: Zap,
    summary:
      "An in-memory data store that sits beside the primary database to absorb hot reads and short-lived state, cutting latency and database load.",
    description: [
      "The cache layer is an infrastructure dependency of the business service, not a replacement for the primary database. It exists because disk-backed databases, no matter how well indexed, are slower and more expensive to query repeatedly than an in-memory key-value store. By placing a cache like Redis alongside MongoDB or PostgreSQL, the business service can serve frequently requested data in sub-millisecond time while reserving the primary database for durable, authoritative writes and less frequent reads.",
      "Redis is the default recommendation because it goes far beyond simple key-value caching: it offers rich data structures (hashes, sorted sets, streams), atomic operations, and built-in expiry, which lets one dependency cover caching, sessions, rate limiting, and more. Valkey is the open-source community fork that emerged after Redis changed its license, offering a drop-in-compatible alternative under open governance for teams wary of vendor licensing risk. Memcached is a simpler, pure-cache alternative — no persistence, no complex structures — a reasonable choice when all you need is a fast LRU cache and nothing more. Dragonfly and KeyDB are newer, performance-oriented, Redis-protocol-compatible engines built to exploit multi-core hardware for higher throughput at similar or lower cost.",
      "The most important pattern to understand is read-through caching: the business service checks Redis first, and on a cache hit returns the data immediately without touching the database. On a miss, it queries MongoDB, writes the result back into Redis, and then returns the data to the caller. Crucially, Redis never calls MongoDB directly — the business service always orchestrates both, which keeps invalidation logic explicit and auditable. Beyond caching, this same infrastructure doubles as the home for sessions, rate limiting, distributed locks, pub/sub messaging, and lightweight job queues, making it one of the highest-leverage pieces of infrastructure in the stack.",
    ],
    techGroups: [
      {
        heading: "Cache / In-Memory Stores",
        items: [
          { name: "Redis", recommended: true, note: "rich data structures, huge ecosystem" },
          { name: "Valkey", note: "open-source fork after Redis relicensing" },
          { name: "Memcached", note: "simple, pure cache, no persistence" },
          { name: "Dragonfly", note: "drop-in, multi-core throughput" },
          { name: "KeyDB", note: "drop-in, multi-threaded performance" },
        ],
      },
    ],
    recommended: ["Redis"],
    useCases: [
      "Caching hot reads to reduce database load",
      "Session storage for authenticated users",
      "Rate limiting API requests",
      "Distributed locks for coordinating services",
      "Pub/Sub messaging and lightweight job queues",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "business-service", label: "Business Service", variant: "service" }],
        [{ id: "redis", label: "Redis Cache", variant: "store" }],
        [{ id: "mongodb", label: "MongoDB", variant: "store" }],
        [{ id: "return-data", label: "Return Data", variant: "accent" }],
      ],
      edges: [
        { from: "business-service", to: "redis" },
        { from: "redis", to: "return-data", label: "HIT" },
        { from: "redis", to: "mongodb", label: "MISS" },
        { from: "mongodb", to: "return-data", label: "store in Redis, then return" },
      ],
    },
  },
  {
    slug: "database",
    number: 8,
    title: "Primary Database Layer",
    shortTitle: "Database",
    group: "data",
    icon: Database,
    summary:
      "The durable system of record for the application — chosen based on whether your data is document-shaped and evolving or relational and transactional.",
    description: [
      "The primary database is where the application's real, durable state lives — the source of truth that every other layer (cache, search index, analytics) ultimately derives from. Choosing it well matters more than almost any other infrastructure decision, because migrating between fundamentally different data models later is expensive and risky. The right choice depends less on trends and more on the actual shape of your data and the guarantees your application needs.",
      "Document databases like MongoDB store data as flexible, nested JSON-like documents, which makes them a great fit when your schema evolves quickly, when records naturally nest (a member profile with embedded addresses and preferences, an asset with variable metadata), or when different records in the same collection legitimately have different shapes. Relational databases like PostgreSQL instead enforce a fixed schema across tables and excel at expressing relationships explicitly through foreign keys and joins. This makes PostgreSQL the stronger choice when you need multi-table transactions, strict referential integrity, ownership hierarchies, or financial records where correctness and consistency cannot be negotiated away.",
      "A third category, distributed SQL databases such as CockroachDB, YugabyteDB, and Google Spanner, exists for a different problem entirely: horizontal scale-out with strong consistency across geographic regions. These systems combine relational semantics with the scalability of distributed systems, but they come with real operational complexity and are typically only worth adopting once an application has outgrown a single-node relational database and needs global, always-consistent writes. For most applications starting out, the practical choice comes down to MongoDB for document-oriented workloads or PostgreSQL for relationship-heavy ones.",
    ],
    techGroups: [
      {
        heading: "Document Databases",
        items: [
          { name: "MongoDB", recommended: true, note: "flexible schema, nested documents" },
          { name: "Amazon DocumentDB" },
          { name: "Couchbase" },
          { name: "Firestore" },
        ],
      },
      {
        heading: "Relational Databases",
        items: [
          { name: "PostgreSQL", recommended: true, note: "joins, transactions, strong consistency" },
          { name: "MySQL" },
          { name: "MariaDB" },
          { name: "SQL Server" },
          { name: "Oracle" },
        ],
      },
      {
        heading: "Distributed SQL",
        items: [
          { name: "CockroachDB", note: "for extreme scale / global distribution" },
          { name: "YugabyteDB", note: "for extreme scale / global distribution" },
          { name: "Google Spanner", note: "for extreme scale / global distribution" },
        ],
      },
    ],
    recommended: ["MongoDB (document-oriented apps)", "PostgreSQL (relationship-heavy apps)"],
    useCases: [
      "Flexible, rapidly evolving schemas (MongoDB)",
      "Nested member profiles and document metadata (MongoDB)",
      "Complex multi-table joins (PostgreSQL)",
      "Financial records and transactional integrity (PostgreSQL)",
      "Ownership relationships and reporting queries (PostgreSQL)",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "business-service", label: "Business Service", variant: "service" }],
        [
          { id: "mongodb", label: "MongoDB", sublabel: "flexible schema", variant: "store" },
          { id: "postgresql", label: "PostgreSQL", sublabel: "strong consistency", variant: "store" },
        ],
      ],
    },
  },
  {
    slug: "orm",
    number: 9,
    title: "ORM / Database Access Layer",
    shortTitle: "ORM / Driver",
    group: "data",
    icon: LayersIcon,
    summary:
      "The abstraction between application code and the database — translating objects and queries while adding type safety, validation, and migrations.",
    description: [
      "Applications rarely talk to a database with raw driver calls scattered throughout business logic; instead, an ORM or query-builder layer sits between the two, translating application-level objects and queries into database operations. This layer exists to give engineers type safety, schema validation, connection pooling, and migration tooling, so that data-access code stays consistent and maintainable as the codebase grows. The right tool here depends heavily on which primary database you chose and how much control versus convenience you want to trade off.",
      "For MongoDB, the native driver gives maximum control and minimal abstraction — you write queries close to the metal, which is valuable when you need fine-grained performance tuning. Mongoose sits a layer above it, adding schema definitions, validation, and middleware hooks, which speeds up modeling at the cost of some overhead and a more opinionated structure. Prisma can also target MongoDB, offering a unified, type-safe client experience across databases, though it abstracts away some native driver-level features in the process.",
      "For PostgreSQL, the tradeoffs run along a similar spectrum. Prisma remains a strong, developer-friendly option with generated types and integrated migrations, though its query flexibility can feel constrained for complex SQL. Drizzle has emerged as a lightweight, SQL-like, high-performance alternative that many TypeScript teams now prefer for its transparency and minimal runtime overhead. TypeORM and Sequelize are older, more heavyweight ORMs with mature ecosystems but more legacy-style patterns, while Kysely offers a type-safe query builder for teams that want raw SQL control without giving up compile-time safety.",
    ],
    techGroups: [
      {
        heading: "MongoDB Access",
        items: [
          { name: "MongoDB Native Driver", recommended: true, note: "maximum control, minimal abstraction" },
          { name: "Mongoose", recommended: true, note: "schema validation, middleware" },
          { name: "Prisma" },
        ],
      },
      {
        heading: "PostgreSQL Access",
        items: [
          { name: "Prisma", recommended: true, note: "generated types, built-in migrations" },
          { name: "Drizzle", recommended: true, note: "lightweight, SQL-like, high performance" },
          { name: "TypeORM" },
          { name: "Sequelize" },
          { name: "Kysely", note: "type-safe SQL query builder" },
        ],
      },
    ],
    recommended: ["MongoDB: Native Driver or Mongoose", "PostgreSQL: Drizzle or Prisma"],
    useCases: [
      "Type-safe query building and result mapping",
      "Schema validation and modeling for documents",
      "Database migrations and schema versioning",
      "Connection pooling and query performance tuning",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "business-service", label: "Business Service (TypeScript)", variant: "service" }],
        [{ id: "orm-layer", label: "ORM / Driver Layer", variant: "default" }],
        [
          { id: "mongodb", label: "MongoDB", variant: "store" },
          { id: "postgresql", label: "PostgreSQL", variant: "store" },
        ],
      ],
    },
  },
  {
    slug: "object-storage",
    number: 10,
    title: "Object / File Storage Layer",
    shortTitle: "Object Storage",
    group: "data",
    icon: HardDrive,
    summary:
      "A dedicated store for large binary files — PDFs, images, videos, and documents — kept separate from the primary database to stay cheap and scalable.",
    description: [
      "Large binary files don't belong inside a primary database's row or document storage — they bloat backups, slow down replication, and are expensive to store on database-grade disks. Object storage exists to solve this specific problem: it's built to hold arbitrarily large blobs cheaply and durably, addressed by a simple key rather than a complex schema, and often fronted by a CDN for fast delivery. This makes it the natural home for PDFs, images, videos, identity documents, property documents, certificates, scanned files, backups, and exports.",
      "The common architectural pattern splits responsibilities cleanly: the business service writes file metadata — filename, owner, permissions, tags, upload timestamp — into the primary database (MongoDB or PostgreSQL), while the actual file bytes go to the object store. This two-write pattern requires some care to keep metadata and files consistent (for example, cleaning up orphaned files if a metadata write fails), but it decouples the economics and scaling characteristics of file storage from the primary database entirely.",
      "MinIO is the recommended choice when self-hosting: it exposes an S3-compatible API while giving full control over data residency and infrastructure, which matters for on-premise or regulated environments. Amazon S3 is the recommended choice on AWS, offering effectively unlimited durability and scale as a fully managed service. Google Cloud Storage and Azure Blob Storage serve the equivalent role on their respective clouds, and Cloudflare R2 is notable for its S3-compatible API without egress fees, which can matter significantly for read-heavy, high-egress workloads.",
    ],
    techGroups: [
      {
        heading: "Object Storage",
        items: [
          { name: "MinIO", recommended: true, note: "self-hosted, S3-compatible" },
          { name: "AWS S3", recommended: true, note: "managed / AWS-native" },
          { name: "Google Cloud Storage" },
          { name: "Azure Blob Storage" },
          { name: "Cloudflare R2", note: "S3-compatible, no egress fees" },
        ],
      },
    ],
    recommended: ["MinIO (self-hosted)", "Amazon S3 (AWS)"],
    useCases: [
      "Storing PDFs and scanned documents",
      "Serving images and video assets",
      "Storing identity and property documents",
      "Certificates and compliance files",
      "Backups and data exports",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "business-service", label: "Business Service", variant: "service" }],
        [
          { id: "metadata", label: "Metadata", variant: "default" },
          { id: "files", label: "Files", variant: "default" },
        ],
        [
          { id: "mongodb", label: "MongoDB", variant: "store" },
          { id: "minio", label: "MinIO", variant: "store" },
        ],
      ],
      edges: [
        { from: "business-service", to: "metadata" },
        { from: "business-service", to: "files" },
        { from: "metadata", to: "mongodb" },
        { from: "files", to: "minio" },
      ],
    },
  },
  {
    slug: "queues",
    number: 11,
    title: "Queue / Async Processing Layer",
    shortTitle: "Job Queues",
    group: "messaging",
    icon: ListOrdered,
    summary:
      "Queues decouple slow or unreliable work from the request/response cycle, so APIs stay fast while workers grind through reports, documents, and notifications in the background.",
    description: [
      "A queue sits between the part of the system that receives work and the part that actually does it, letting the API return in milliseconds while the heavy lifting happens somewhere else. Instead of an HTTP handler blocking on a ten-second PDF render or a call to an external OCR service, the handler writes a job description to a queue and responds immediately; a separate pool of workers pulls jobs off the queue at its own pace and does the real work asynchronously.",
      "This layer exists because not all work belongs in the request/response cycle. Report generation, AI inference calls, document and OCR pipelines, sending email and SMS, running data imports, and syncing state with third-party systems are all slow, occasionally flaky, and don't need to finish before the user gets a response. Queues also add resilience: if a worker crashes mid-job, the message can be retried or dead-lettered instead of silently lost, and workers can be scaled horizontally and independently of the API tier to absorb bursty load.",
      "BullMQ on top of Redis is the pragmatic default for Node.js teams — many already run Redis for caching or sessions, so adding job queues costs almost nothing operationally, and BullMQ's API for retries, backoff, rate limiting, and delayed jobs covers the vast majority of background-job needs. RabbitMQ offers richer routing (topics, fanout, dead-letter exchanges) at the cost of another piece of infrastructure to run. Kafka, Pulsar, and NATS are built for high-throughput, ordered, replayable event logs rather than simple task queues — the right call when you need durability and multiple independent consumers, but overkill for \"send this email.\" Managed cloud queues like SQS, Pub/Sub, and Azure Service Bus trade operational burden for vendor lock-in and, in multi-cloud setups, extra latency.",
    ],
    techGroups: [
      {
        heading: "Queue Technologies",
        items: [
          { name: "BullMQ + Redis", recommended: true, note: "best for Node.js stacks" },
          { name: "RabbitMQ" },
          { name: "Apache Kafka" },
          { name: "NATS" },
          { name: "AWS SQS" },
          { name: "Google Pub/Sub" },
          { name: "Azure Service Bus" },
          { name: "Apache Pulsar" },
        ],
      },
    ],
    recommended: ["BullMQ + Redis"],
    useCases: [
      "Generating large reports without blocking the API",
      "Processing uploaded documents and running OCR",
      "Running AI/LLM inference jobs asynchronously",
      "Sending transactional email and SMS notifications",
      "Synchronizing data with external systems in the background",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "api", label: "API", variant: "service" }],
        [{ id: "bullmq", label: "BullMQ", variant: "queue" }],
        [{ id: "redis", label: "Redis", variant: "store" }],
        [{ id: "worker", label: "Worker", variant: "queue" }],
        [
          { id: "mongodb", label: "MongoDB", variant: "store" },
          { id: "minio", label: "MinIO", variant: "store" },
          { id: "externalapis", label: "External APIs", variant: "accent" },
        ],
      ],
    },
  },
  {
    slug: "event-streaming",
    number: 12,
    title: "Event Streaming Layer",
    shortTitle: "Event Streaming",
    group: "messaging",
    icon: Radio,
    summary:
      "A durable, replayable event log lets one change fan out to any number of independent consumers — without the producer ever knowing who's listening.",
    description: [
      "Event streaming differs from a job queue in a fundamental way: a queue is about work distribution, where one consumer takes a message and it's gone, while an event stream is a durable, ordered log that many independent consumers can read from at their own pace, replaying history if needed. When the Member Service updates a member, it doesn't call the four systems that care about that change directly — it publishes a MemberUpdated event to Kafka, and analytics, notifications, search indexing, and audit each subscribe independently.",
      "This layer exists to decouple producers from consumers at scale. The Member Service has no idea how many things are listening to its events, and new consumers — a future fraud-detection service, for example — can be added without touching the producer at all. Because the log is durable and replayable, a new consumer can even reprocess historical events to backfill its own state, something a queue, where messages disappear once consumed, cannot do.",
      "Kafka is the default choice because it is the most battle-tested option, has the largest ecosystem (Kafka Connect, Schema Registry, ksqlDB), and nearly every cloud and vendor tool speaks its protocol — but it is also the most operationally demanding, historically requiring careful partition and replication tuning. Redpanda is a Kafka-API-compatible rewrite that trims much of that operational overhead. Pulsar separates the compute and storage layers, which helps with elastic scaling and multi-tenancy. NATS JetStream is far lighter weight and easier to self-host, at the cost of a smaller ecosystem. AWS Kinesis is fully managed and integrates tightly with the rest of AWS, but locks you into that platform and its shard-based scaling model.",
    ],
    techGroups: [
      {
        heading: "Event Streaming Technologies",
        items: [
          { name: "Apache Kafka", recommended: true, note: "industry standard for event streaming" },
          { name: "Redpanda" },
          { name: "Apache Pulsar" },
          { name: "NATS JetStream" },
          { name: "AWS Kinesis" },
        ],
      },
    ],
    recommended: ["Apache Kafka"],
    useCases: [
      "Feeding analytics pipelines from live data changes",
      "Triggering notifications when domain events occur",
      "Keeping search indexes in sync with source data",
      "Building tamper-evident audit trails",
      "Decoupling services so consumers can be added independently",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "memberservice", label: "Member Service", variant: "service" }],
        [{ id: "event", label: "MemberUpdated Event", variant: "default" }],
        [{ id: "kafka", label: "Kafka", variant: "queue" }],
        [
          { id: "analytics", label: "Analytics", variant: "default" },
          { id: "notifications", label: "Notifications", variant: "default" },
          { id: "searchindex", label: "Search Index", variant: "default" },
          { id: "auditservice", label: "Audit Service", variant: "default" },
        ],
      ],
    },
  },
  {
    slug: "mcp",
    number: 13,
    title: "MCP Layer",
    shortTitle: "MCP Layer",
    group: "ai",
    icon: Workflow,
    summary:
      "MCP is the API for AI agents — the same business services your web and mobile clients call through a REST API, an agent calls through an MCP server.",
    description: [
      "The Model Context Protocol (MCP) exists to answer a specific question: how does an AI agent call into your business services without every agent framework needing a bespoke, hand-rolled integration for every backend? The architecture is AI Agent -> MCP Client -> MCP Server -> Business Services — the MCP server wraps existing business logic, like searching members, fetching assets, or generating a report, as a small set of well-described tools that any MCP-compatible agent can discover and invoke.",
      "The central insight is symmetry with the API layer you already have. Traditional clients — a web app, a mobile app, a CLI — reach business services through an API. AI agents reach the exact same business services through MCP. Web/Mobile/CLI -> API -> Business Services and AI Agent -> MCP -> Business Services are two parallel front doors into one house: MCP is, functionally, the API for AI agents. This matters because MCP servers should stay thin, translating tool calls into the same service-layer calls your REST or GraphQL API already makes rather than reimplementing business logic. Get this right and you get one source of truth for authorization, validation, and business rules regardless of whether the caller is a human clicking a button or an agent deciding to call a tool.",
      "Because MCP is just a protocol, you can implement a server in any language with a compliant SDK — TypeScript, Python, Java, and Go all have first-class support. TypeScript on Node.js is the natural choice for teams whose business services and API layer are already TypeScript, since the MCP server can share types, validation schemas, and service clients with the rest of the stack instead of re-describing the same domain model twice. Tools should be narrow and purposeful, like searchMembers, getMember, getAssets, or generateReport, rather than one giant escape-hatch query tool — both because smaller, well-named tools are easier for a model to pick correctly, and because each tool becomes a controllable, auditable permission boundary.",
    ],
    techGroups: [
      {
        heading: "Implementation Languages",
        items: [
          { name: "TypeScript", recommended: true, note: "shares types with the rest of the stack" },
          { name: "Node.js", recommended: true, note: "pairs naturally with TypeScript" },
          { name: "Python" },
          { name: "Java" },
          { name: "Go" },
        ],
      },
      {
        heading: "Example MCP Tools",
        items: [
          { name: "searchMembers" },
          { name: "getMember" },
          { name: "getAssets" },
          { name: "searchDocuments" },
          { name: "generateReport" },
          { name: "getStatistics" },
          { name: "createMember" },
          { name: "updateMember" },
        ],
      },
    ],
    recommended: ["TypeScript MCP Server"],
    useCases: [
      "Searching members via natural language",
      "Fetching assets and statistics on demand",
      "Generating reports through an agent",
      "Creating and updating records with guardrails",
      "Querying documents semantically through a search tool",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "agent", label: "AI Agent", variant: "ai" }],
        [{ id: "mcpclient", label: "MCP Client", variant: "ai" }],
        [{ id: "mcpserver", label: "MCP Server", variant: "ai" }],
        [{ id: "bizservices", label: "Business Services", variant: "service" }],
      ],
    },
  },
  {
    slug: "ai-agent",
    number: 14,
    title: "AI Agent Layer",
    shortTitle: "AI Agents",
    group: "ai",
    icon: Bot,
    summary: "The agent runtime is the loop that turns an LLM from a text completer into something that can plan, call tools, and get things done.",
    description: [
      "The agent layer is where a language model stops just answering questions and starts doing things — calling tools, making multi-step plans, and looping until a task is complete. An agent runtime, whether that's LangGraph, the OpenAI Agents SDK, or the Vercel AI SDK, sits between your UI and the model, handling the loop of sending context to the LLM, parsing whether it wants to call a tool, executing that tool (which might be an MCP server, a RAG lookup, or an internal function), feeding the result back, and repeating until the model produces a final answer.",
      "This layer exists because raw LLM completions aren't enough for most real product experiences — users want an assistant that can look things up, take actions, and stream its reasoning as it works, not a one-shot text completion. The framework choice mostly comes down to how much control versus convenience you want: LangGraph and LangChain give fine-grained control over agent state and graphs of steps at the cost of more boilerplate; CrewAI and AutoGen optimize for multi-agent collaboration patterns; Semantic Kernel and PydanticAI lean on strong typing; the Vercel AI SDK optimizes specifically for streaming agent output straight into a React or Next.js UI with minimal glue code.",
      "Model provider choice is a similar tradeoff between capability, cost, and control. OpenAI and Anthropic remain the leading general-purpose providers, with strong reasoning and tool-use performance and the broadest ecosystem support in agent frameworks. Google Gemini, AWS Bedrock, and Azure OpenAI matter most when you're already committed to that cloud and want billing, IAM, and compliance to live in one place. Ollama and vLLM let you self-host open models, trading some raw capability for full control over data residency, latency, and cost at high volume. In a Next.js-centered stack, the Vercel AI SDK talking to OpenAI or Anthropic is the path of least resistance: streaming responses render naturally in React, and swapping model providers later is mostly a configuration change.",
    ],
    techGroups: [
      {
        heading: "Agent Frameworks",
        items: [
          { name: "OpenAI Agents SDK" },
          { name: "LangGraph" },
          { name: "LangChain" },
          { name: "Vercel AI SDK", recommended: true, note: "pairs naturally with Next.js" },
          { name: "Semantic Kernel" },
          { name: "AutoGen" },
          { name: "CrewAI" },
          { name: "PydanticAI" },
        ],
      },
      {
        heading: "Model Providers",
        items: [
          { name: "OpenAI", recommended: true, note: "leading general-purpose model providers" },
          { name: "Anthropic", recommended: true, note: "leading general-purpose model providers" },
          { name: "Google Gemini" },
          { name: "AWS Bedrock" },
          { name: "Azure OpenAI" },
          { name: "Ollama", note: "self-hosted / open models" },
          { name: "vLLM", note: "self-hosted / open models" },
        ],
      },
    ],
    recommended: ["Vercel AI SDK", "OpenAI or Anthropic (model provider)"],
    useCases: [
      "Conversational assistants embedded in the product",
      "Autonomous multi-step task agents",
      "Tool-calling workflows that reach into business systems",
      "Streaming chat UIs with live token output",
      "Multi-step reasoning over complex requests",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "ui", label: "Next.js AI UI", variant: "client" }],
        [{ id: "runtime", label: "AI SDK / Agent Runtime", variant: "ai" }],
        [
          { id: "llm", label: "LLM", variant: "ai" },
          { id: "mcp", label: "MCP", variant: "ai" },
          { id: "rag", label: "RAG", variant: "ai" },
          { id: "tools", label: "Internal Tools", variant: "service" },
        ],
      ],
    },
  },
  {
    slug: "rag",
    number: 15,
    title: "RAG Layer",
    shortTitle: "RAG Pipeline",
    group: "ai",
    icon: BrainCircuit,
    summary: "RAG grounds an LLM in your own current, proprietary data at query time, instead of relying on what it happened to memorize during training.",
    description: [
      "Retrieval-Augmented Generation exists to solve a problem that model size alone can't: an LLM only knows what was in its training data, frozen at some cutoff date, and it has never seen your company's private documents, tickets, or product catalog. RAG fixes this by retrieving relevant, up-to-date, proprietary content at query time and injecting it into the model's context window, so the model answers from real evidence instead of guessing from memory.",
      "The pipeline is: documents get parsed into plain text, split into chunks small enough to embed meaningfully and retrieve precisely, each chunk is turned into a vector embedding by an embedding model, and those vectors land in a vector database for similarity search. At query time, the same embedding process runs on the user's question, the vector database returns the nearest chunks, and those chunks get stitched into the prompt sent to the LLM. Chunk size and overlap are real design decisions here — too large and retrieval gets imprecise and expensive; too small and the model loses surrounding context it needs to answer well.",
      "The vector store choice mostly comes down to what you're already running. If MongoDB is already your primary database, MongoDB Vector Search lets you keep vectors alongside the documents they describe with no new system to operate, though it won't match a dedicated engine at extreme scale. If you're on a PostgreSQL stack, pgvector gets you vector search inside the same relational database, great for joining retrieval results with structured data but scaling less gracefully than purpose-built engines as vector volume grows. For teams that expect retrieval to be a first-class, heavily-optimized workload, a dedicated vector database like Qdrant — or Pinecone, Weaviate, Milvus, Chroma — is built specifically for high-recall approximate nearest-neighbor search with rich metadata filtering. Elasticsearch and OpenSearch are reasonable choices if you're already running one for full-text search and want to add vector search to the same cluster.",
    ],
    techGroups: [
      {
        heading: "Vector Stores",
        items: [
          { name: "Qdrant", recommended: true, note: "dedicated vector database" },
          { name: "Pinecone" },
          { name: "Weaviate" },
          { name: "Milvus" },
          { name: "Chroma" },
          { name: "pgvector", recommended: true, note: "if already using PostgreSQL" },
          { name: "MongoDB Vector Search", recommended: true, note: "if already using MongoDB" },
          { name: "Redis Vector Search" },
          { name: "Elasticsearch" },
          { name: "OpenSearch" },
        ],
      },
    ],
    recommended: ["MongoDB Vector Search (if already on MongoDB)", "Qdrant (dedicated vector DB)", "pgvector (if on PostgreSQL)"],
    useCases: [
      "Semantic search across a knowledge base",
      "Grounding chatbot answers in company-specific data",
      "Document Q&A over manuals, contracts, or policies",
      "Recommendation systems based on content similarity",
      "Detecting near-duplicate content",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "documents", label: "Documents", variant: "default" }],
        [{ id: "parser", label: "Parser", variant: "default" }],
        [{ id: "chunking", label: "Chunking", variant: "default" }],
        [{ id: "embedding", label: "Embedding", variant: "ai" }],
        [{ id: "vectordb", label: "Vector Database", variant: "store" }],
      ],
    },
  },
  {
    slug: "search",
    number: 16,
    title: "Search Layer",
    shortTitle: "Search",
    group: "data",
    icon: Search,
    summary: "A dedicated search index that gives full-text search, faceting, and analytics the primary database was never designed to provide.",
    description: [
      "Primary databases are optimized for transactional reads and writes, not for ranked full-text search, fuzzy matching, or multi-dimensional faceted filtering across millions of records. The search layer exists to fill that gap: it maintains a purpose-built, denormalized index of your data that can answer complex queries — relevance-ranked text search, aggregations, analytics dashboards, faceted navigation — far faster and more flexibly than the primary database ever could.",
      "The standard architectural pattern keeps the search index in sync via change events rather than dual writes from the application. MongoDB emits change streams (or an equivalent CDC pipeline) whenever documents are created or updated, and those events flow into OpenSearch to update the index. This keeps the search index eventually consistent with the source of truth without forcing every write path in the business service to also know about the search engine, which would tightly couple two systems that should evolve independently.",
      "OpenSearch is the recommended engine because it's the Apache-2.0-licensed fork that emerged after Elasticsearch changed its licensing terms, and it has since become the default choice for teams wanting a fully open-source, AWS-backed search engine with the same core capabilities. Elasticsearch itself remains powerful and widely used, especially where its broader ecosystem and tooling matter more than licensing concerns. Meilisearch and Typesense are lighter-weight alternatives optimized for developer experience and instant, typo-tolerant search at smaller scale, while Apache Solr remains a mature, battle-tested option in longer-established enterprise environments.",
    ],
    techGroups: [
      {
        heading: "Search Engines",
        items: [
          { name: "Elasticsearch" },
          { name: "OpenSearch", recommended: true, note: "open-source fork, AWS-backed" },
          { name: "Meilisearch", note: "lightweight, fast to set up" },
          { name: "Typesense", note: "lightweight, instant search DX" },
          { name: "Apache Solr" },
        ],
      },
    ],
    recommended: ["OpenSearch"],
    useCases: ["Full-text search", "Advanced filtering", "Aggregations", "Analytics", "Faceted search", "Large-scale search"],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "mongodb", label: "MongoDB", variant: "store" }],
        [{ id: "change-event", label: "Change Event / CDC", variant: "default" }],
        [{ id: "opensearch", label: "OpenSearch", sublabel: "Search Index", variant: "store" }],
      ],
    },
  },
  {
    slug: "authentication",
    number: 17,
    title: "Authentication Layer",
    shortTitle: "Authentication",
    group: "security",
    icon: Fingerprint,
    summary:
      "Authentication answers a single question before anything else is allowed to happen: who is this? It's the front door of every secure system, verifying identity before authorization, personalization, or business logic ever runs.",
    description: [
      "Authentication is the process of proving that a user, service, or device is who it claims to be. It is easy to conflate with authorization, but the two solve different problems: authentication establishes identity, while authorization (a separate layer) decides what that identity is allowed to do. Every request that touches sensitive data or performs a privileged action needs to be traceable back to a verified identity, which is why authentication sits at the very front of the security stack, ahead of business logic and often ahead of the application itself.",
      "The core decision here is build versus buy versus self-host. Rolling your own auth with something like Auth.js / NextAuth gives full control and no vendor lock-in, but you inherit the burden of correctly implementing token issuance, session handling, password storage, and every edge case attackers look for — a notoriously easy place to get subtly wrong. Managed identity platforms like Auth0, Clerk, Firebase Auth, and Supabase Auth trade that risk for speed: you get hosted login UIs, social providers, and MFA out of the box, at the cost of per-user pricing and a dependency on the vendor's roadmap and uptime. Self-hosted enterprise identity providers like Keycloak, or cloud-native options like AWS Cognito and Microsoft Entra ID, sit in between — more operational responsibility than a pure SaaS product, but full control over data residency, customization, and cost at scale.",
      "Protocol choice matters as much as vendor choice. OAuth 2.0 is fundamentally a delegation protocol for granting access to resources, not an identity protocol, which is why it's so often paired with OpenID Connect (OIDC), which layers a standardized identity token on top of OAuth 2.0's access tokens. SAML remains common in older enterprise and education environments doing SSO but is increasingly being displaced by OIDC for new integrations. Passkeys and WebAuthn represent the newest shift — removing passwords entirely in favor of device-bound cryptographic credentials, which cuts phishing risk dramatically. For any system that expects enterprise customers, the pragmatic default is OIDC on top of an enterprise-grade identity provider such as Keycloak, Okta, or Entra ID, since enterprise buyers routinely require SSO, SCIM provisioning, and audit trails that these platforms already provide.",
    ],
    techGroups: [
      {
        heading: "Identity Systems",
        items: [
          { name: "Keycloak", recommended: true, note: "enterprise-grade" },
          { name: "Auth0" },
          { name: "Okta", recommended: true, note: "enterprise-grade" },
          { name: "Microsoft Entra ID", recommended: true, note: "enterprise-grade" },
          { name: "AWS Cognito" },
          { name: "Clerk" },
          { name: "Firebase Auth" },
          { name: "Supabase Auth" },
          { name: "Auth.js / NextAuth" },
        ],
      },
      {
        heading: "Protocols",
        items: [
          { name: "OAuth 2.0", recommended: true },
          { name: "OpenID Connect", recommended: true },
          { name: "SAML" },
          { name: "Passkeys / WebAuthn" },
        ],
      },
    ],
    recommended: ["OpenID Connect (OIDC)", "Keycloak / Okta / Entra ID"],
    useCases: [
      "Single sign-on across internal and customer-facing apps",
      "Social login (Google, GitHub, Microsoft) for consumer products",
      "Enterprise directory integration (LDAP/AD via SAML or OIDC)",
      "Passwordless and passkey-based login",
      "Session management and token refresh across services",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "user", label: "User", variant: "client" }],
        [{ id: "idp", label: "Identity Provider", sublabel: "OIDC", variant: "accent" }],
        [{ id: "app", label: "Application", variant: "gateway" }],
        [{ id: "services", label: "Business Services", variant: "service" }],
      ],
      edges: [
        { from: "user", to: "idp", label: "login" },
        { from: "idp", to: "app", label: "ID token / access token" },
        { from: "app", to: "services" },
      ],
    },
  },
  {
    slug: "authorization",
    number: 18,
    title: "Authorization Layer",
    shortTitle: "Authorization",
    group: "security",
    icon: ShieldCheck,
    summary:
      "Once identity is established, authorization decides what that identity is actually allowed to do — the difference between letting someone in the building and handing them the keys to a specific room.",
    description: [
      "Authorization is the decision engine that sits right after authentication: given a verified identity, can it perform this specific action on this specific resource? It exists because identity alone tells you nothing about permissions — a logged-in user could be an admin, a guest, or someone who should have been offboarded weeks ago. Getting this layer wrong is one of the most common sources of real-world security incidents, because the failure mode isn't a dramatic breach, it's a quiet, everyday over-permissioning that nobody notices until it's exploited.",
      "The strategy you pick shapes how the system scales with complexity. Role-Based Access Control (RBAC) is the simplest and most common default — assign users to roles, assign permissions to roles — and it works well until an organization needs enough exceptions and role variants that you end up with 'role explosion,' where you're creating a new role for every edge case. Attribute-Based Access Control (ABAC) evaluates permissions dynamically based on attributes of the user, resource, and context (time of day, department, data sensitivity), which handles nuance far better but requires more upfront policy design. Relationship-Based Access Control (ReBAC), popularized by Google's Zanzibar model, is built for permission graphs like 'can edit if owner OR shared-with OR member of a group that has access' — ideal for document- and folder-sharing systems, but it's the most complex model to reason about and operate.",
      "On the technology side, Open Policy Agent (OPA) is the general-purpose policy engine of choice — it decouples policy from application code using the Rego language and is widely adopted beyond just app authorization, showing up in Kubernetes admission control and service meshes too. Cerbos offers a gentler on-ramp with YAML-based policies purpose-built for application-level authorization, trading some of OPA's generality for a shorter learning curve. Casbin is a lighter embedded library for teams that want policy logic in-process rather than as a separate service. SpiceDB and Authzed implement the Zanzibar ReBAC model directly for teams that need Google-Drive-style sharing semantics. In practice, RBAC is the right starting point for most applications because it's easy to audit and reason about, with a move to OPA or Cerbos as policy-as-code once authorization logic needs to be centralized, versioned, and enforced consistently across multiple services.",
    ],
    techGroups: [
      {
        heading: "Strategies",
        items: [
          { name: "RBAC", recommended: true, note: "simplest, most common default" },
          { name: "ABAC" },
          { name: "ReBAC" },
          { name: "Policy-based access" },
        ],
      },
      {
        heading: "Technologies",
        items: [
          { name: "Open Policy Agent", recommended: true },
          { name: "Cerbos", recommended: true },
          { name: "Casbin" },
          { name: "SpiceDB" },
          { name: "Authzed" },
        ],
      },
    ],
    recommended: ["RBAC", "Open Policy Agent or Cerbos"],
    useCases: [
      "Role-based feature access (admin vs. editor vs. viewer)",
      "Resource ownership checks (only the owner can delete)",
      "Fine-grained per-record permissions in shared documents",
      "Policy-as-code enforcement across multiple microservices",
      "Multi-tenant isolation so one tenant can never see another's data",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "request", label: "Request + User Roles", variant: "client" }],
        [{ id: "policy", label: "Policy Engine", sublabel: "OPA / Cerbos", variant: "accent" }],
        [
          { id: "allow", label: "Allow", variant: "default" },
          { id: "deny", label: "Deny", variant: "default" },
        ],
      ],
      edges: [
        { from: "request", to: "policy" },
        { from: "policy", to: "allow", label: "permit" },
        { from: "policy", to: "deny", label: "deny" },
      ],
    },
  },
  {
    slug: "mobile",
    number: 19,
    title: "Mobile Layer",
    shortTitle: "Mobile",
    group: "clients",
    icon: Smartphone,
    summary:
      "The native and cross-platform apps that put your product in users' pockets — where reach, offline resilience, and device APIs matter more than anywhere else in the stack.",
    description: [
      "The mobile layer is the client surface that runs on iOS and Android, talking to the same business services that power your web app but through a fundamentally different runtime: constrained hardware, intermittent connectivity, app-store review cycles, and platform-specific UX conventions. Unlike a web app that ships instantly on every page load, a mobile app is a versioned artifact users install and update on their own schedule, which changes how you think about backward compatibility, feature flags, and rollout risk. This layer exists because a responsive website, no matter how well built, can't match a native app's access to push notifications, biometrics, background sync, camera hardware, or the simple fact of an icon on the home screen.",
      "The core decision is native versus cross-platform. Writing separately in Swift and Kotlin gives you the tightest integration with each platform's APIs and the best long-term performance ceiling, but it means maintaining two codebases, two hiring pipelines, and two release trains — a real cost for teams that don't have mobile-specific headcount to spare. Cross-platform frameworks collapse that into one codebase: Flutter compiles to native ARM via its own Skia-based rendering engine and its own Dart language, while React Native and .NET MAUI bridge to native UI components from JavaScript/TypeScript or C# respectively. For a team already invested in React and TypeScript on the web, React Native is the pragmatic choice because it lets you share type definitions, validation logic, API clients, and even some UI logic between web and mobile, rather than reimplementing everything twice.",
      "Expo sits on top of React Native and removes most of the native-tooling pain that historically made React Native hard to adopt: no need to touch Xcode or Android Studio for common tasks, managed native modules for camera/push/biometrics, and EAS for cloud builds and submission. Its biggest practical win is over-the-air (OTA) updates — you can ship JavaScript-level bug fixes and UI changes to users instantly without waiting on App Store or Play Store review, reserving the slower native-binary release path for changes that actually touch native code. The tradeoff is that you inherit React Native's abstraction layer, so highly custom native UI or bleeding-edge platform APIs sometimes require ejecting from the managed workflow or writing a native module by hand.",
    ],
    techGroups: [
      {
        heading: "Mobile Technologies",
        items: [
          { name: "React Native", recommended: true, note: "best for React/TypeScript teams sharing code with web" },
          { name: "Flutter" },
          { name: "Swift" },
          { name: "Kotlin" },
          { name: ".NET MAUI" },
        ],
      },
    ],
    recommended: ["React Native + Expo"],
    useCases: [
      "Ship one codebase that targets both iOS and Android",
      "Share business logic, types, and API clients with the web app",
      "Access native device features like camera, push notifications, and biometrics",
      "Ship JavaScript-level fixes instantly via Expo OTA updates without app-store review",
      "Build offline-first flows that sync once connectivity returns",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "app", label: "React Native App", variant: "client" }],
        [{ id: "gateway", label: "Envoy Gateway", variant: "gateway" }],
        [{ id: "services", label: "Business Services", variant: "service" }],
      ],
    },
  },
  {
    slug: "cli",
    number: 20,
    title: "CLI Layer",
    shortTitle: "CLI",
    group: "clients",
    icon: Terminal,
    summary:
      "The command-line surface for developers, CI pipelines, and automation scripts — where speed, scriptability, and predictable exit codes matter more than pixels.",
    description: [
      "The CLI layer is a client interface just like a web or mobile app, except its users are developers, build servers, and scripts rather than end consumers. It exists because a huge share of the work around a modern product — provisioning resources, running migrations, scaffolding new services, triggering deploys, debugging production state — is faster and more reliable as a typed, scriptable command than as a web form. A well-designed CLI becomes the connective tissue between a developer's terminal and the same business services that power every other client, which means it should never contain business logic of its own; it should be a thin, well-documented wrapper around APIs that already exist.",
      "The language and framework choice here is less about runtime performance and more about ecosystem fit and distribution. Go with Cobra and Rust with Clap produce single, dependency-free static binaries that start instantly and are trivial to distribute — a strong choice when the CLI needs to run in minimal containers or be handed to non-technical users. Python with Click or Typer favors teams that already lean on Python for scripting and data tooling and want readable, decorator-based command definitions. For a team standardized on TypeScript across web, mobile, and backend, though, Node.js with oclif or Commander keeps everything in one language and lets the CLI import the same shared types and API clients used elsewhere — oclif adds more scaffolding for larger, plugin-based CLIs (think a CLI with dozens of subcommands and auto-generated help), while Commander is the lighter option for small, focused tools.",
      "How the CLI talks to backend services deserves its own decision. REST is the default because it's simple, cacheable, and easy to debug with curl when something goes wrong. GraphQL and gRPC show up when the CLI needs to compose complex queries or demands the low latency and strong typing of binary protocols, respectively. The newer and increasingly relevant option is MCP (Model Context Protocol), which matters specifically when the CLI's commands need to be discoverable and invokable by AI agents rather than only by humans — turning your CLI into a tool an LLM-based agent can call directly as part of an autonomous workflow, which is quickly becoming a first-class use case rather than an edge case.",
    ],
    techGroups: [
      {
        heading: "CLI Frameworks",
        items: [
          { name: "Node.js + Commander", recommended: true, note: "lightweight, good for smaller focused tools" },
          { name: "Node.js + oclif", recommended: true, note: "plugin architecture for larger CLIs" },
          { name: "Python + Click" },
          { name: "Python + Typer" },
          { name: "Go + Cobra" },
          { name: "Rust + Clap" },
        ],
      },
      {
        heading: "Communication Protocols",
        items: [
          { name: "REST", recommended: true, note: "simple, debuggable default" },
          { name: "GraphQL" },
          { name: "gRPC" },
          { name: "MCP", note: "for AI-agent-invoked CLI tools" },
        ],
      },
    ],
    recommended: ["TypeScript + oclif", "TypeScript + Commander"],
    useCases: [
      "Scripting and automation for repetitive engineering tasks",
      "CI/CD tooling that triggers builds, tests, and deploys",
      "Developer productivity commands like local environment setup",
      "Scaffolding and codegen for new services or components",
      "Admin and ops tasks executed directly against the API",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "terminal", label: "Developer Terminal", variant: "client" }],
        [{ id: "cli", label: "CLI (TypeScript + oclif)", variant: "client" }],
        [{ id: "proto", label: "REST / gRPC / MCP", variant: "gateway" }],
        [{ id: "services", label: "Business Services", variant: "service" }],
      ],
    },
  },
  {
    slug: "desktop",
    number: 21,
    title: "Desktop Application Layer",
    shortTitle: "Desktop",
    group: "clients",
    icon: Laptop,
    summary:
      "Native-feeling desktop apps for Windows, macOS, and Linux, built from the same web codebase you already maintain instead of a separate native stack.",
    description: [
      "The desktop layer covers installable applications that run outside the browser sandbox, giving users a dedicated icon, offline access, deeper OS integration, and freedom from browser tab sprawl. It exists for the same reason the mobile layer exists: some experiences genuinely benefit from being a first-class citizen on the operating system rather than a page inside a browser — a menu-bar utility, a tool that needs persistent background processes, or an app whose users expect it to survive a network outage. But desktop is a smaller and more mature battleground than mobile, and the dominant pattern for web-native teams has settled around reusing the browser rendering stack rather than adopting a wholly separate native toolkit.",
      "Electron is the incumbent here: it bundles Chromium and Node.js so your existing React/TypeScript web app runs almost unmodified inside a native window, with full access to Node APIs for file-system, OS-level integrations, and background work. The cost is binary size and memory footprint — every Electron app ships its own copy of Chromium, which is why Electron apps have a reputation for being heavy. Tauri addresses exactly that complaint by using the OS's built-in system webview instead of bundling a browser, with a Rust-based backend instead of Node — producing dramatically smaller installers and lower memory use, at the cost of relying on whatever quirks and inconsistencies exist across each platform's native webview.",
      "Flutter Desktop, .NET MAUI, and Qt are the alternatives when you're not trying to reuse a web codebase at all — Flutter renders its own UI toolkit natively for desktop the same way it does for mobile, MAUI targets desktop from the .NET/C# ecosystem, and Qt is the long-standing native toolkit favored in performance-sensitive or embedded contexts. For a team whose core product is already a TypeScript/React web app, though, the calculus is straightforward: Electron when you want maximum code reuse and don't mind the footprint, Tauri when installer size and resource usage actually matter to your users (say, a lightweight background utility) and you're comfortable with a Rust backend.",
    ],
    techGroups: [
      {
        heading: "Desktop Technologies",
        items: [
          { name: "Electron", recommended: true, note: "shares TypeScript/web stack" },
          { name: "Tauri", recommended: true, note: "smaller footprint, Rust-based" },
          { name: "Flutter Desktop" },
          { name: ".NET MAUI" },
          { name: "Qt" },
        ],
      },
    ],
    recommended: ["Electron (shared web stack)", "Tauri (smaller footprint)"],
    useCases: [
      "Cross-platform desktop apps that reuse the existing web codebase",
      "Offline-capable tools that need to work without connectivity",
      "Native OS integration such as file system access, tray icons, and notifications",
      "Lightweight utilities where installer and memory footprint matter",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "shell", label: "Desktop Shell (Electron / Tauri)", variant: "client" }],
        [{ id: "ui", label: "Web UI (React/TypeScript, shared with web app)", variant: "client" }],
        [{ id: "api", label: "Business Services API", variant: "service" }],
      ],
    },
  },
  {
    slug: "realtime",
    number: 22,
    title: "Real-Time Communication Layer",
    shortTitle: "Real-Time",
    group: "realtime",
    icon: Signal,
    summary:
      "The mechanisms that push data to clients the instant it changes, instead of making them poll and wait — essential for AI streaming, chat, and live collaboration.",
    description: [
      "The real-time layer exists to solve a problem that classic request/response HTTP handles poorly: getting data to a client the moment it's available on the server, rather than forcing the client to keep asking. Polling works but wastes bandwidth and adds latency proportional to your poll interval; real-time transports instead keep a channel open and push updates as they happen. This matters more in 2026 than it used to because LLM-backed features have made streaming a default user expectation — nobody wants to stare at a spinner while an AI response generates server-side and then dumps the whole answer at once.",
      "The technology choice should follow the shape of the data flow, not personal preference. Server-Sent Events (SSE) is a one-way, server-to-client stream built on plain HTTP, which makes it the natural fit for token-by-token AI response streaming and for progress updates on long-running jobs — it's simple to implement, plays nicely with standard HTTP infrastructure like proxies and load balancers, and automatically reconnects on drops. WebSocket, by contrast, is a full bidirectional connection: the client can push messages back as easily as the server pushes to it, which is exactly what chat and real-time collaboration need but is more than AI streaming or notifications require. Reaching for WebSocket when SSE would do adds unnecessary connection-management complexity — you have to build acknowledgment protocols and reconnection logic yourself.",
      "Socket.IO is a WebSocket-plus-fallback library that smooths over older-browser gaps and adds room/broadcast abstractions, useful if you need battle-tested reconnection semantics on top of WebSocket. WebTransport is the newer, HTTP/3-based option promising lower latency and multiplexed streams without WebSocket's head-of-line blocking, but its ecosystem and browser support are still catching up, making it more of a forward-looking bet than a default choice today. GraphQL Subscriptions layer real-time push on top of an existing GraphQL API, which is convenient if GraphQL is already your query layer but adds real complexity if it isn't. The practical rule of thumb: reach for SSE first for anything one-directional (AI output, progress, notifications), and only bring in WebSocket when the client genuinely needs to talk back in real time, as in chat or collaborative editing.",
    ],
    techGroups: [
      {
        heading: "Real-Time Technologies",
        items: [
          { name: "WebSocket", recommended: true, note: "bidirectional chat/collaboration" },
          { name: "Socket.IO" },
          { name: "Server-Sent Events", recommended: true, note: "AI streaming, progress updates" },
          { name: "WebTransport" },
          { name: "GraphQL Subscriptions" },
        ],
      },
    ],
    recommended: ["Server-Sent Events (AI streaming, progress)", "WebSocket (bidirectional/chat)"],
    useCases: [
      "Streaming AI/LLM responses to the client token-by-token",
      "Powering live chat and real-time collaboration features",
      "Driving progress bars and status updates for long-running jobs",
      "Feeding real-time dashboards and notification badges",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "server", label: "Server", variant: "service" }],
        [
          { id: "sse", label: "SSE Stream", variant: "default" },
          { id: "ws", label: "WebSocket Connection", variant: "default" },
        ],
        [{ id: "browser", label: "Browser Client", variant: "client" }],
      ],
      edges: [
        { from: "server", to: "sse", label: "AI streaming / progress" },
        { from: "server", to: "ws", label: "bidirectional chat" },
        { from: "sse", to: "browser" },
        { from: "ws", to: "browser" },
      ],
    },
  },
  {
    slug: "notifications",
    number: 23,
    title: "Notification Layer",
    shortTitle: "Notifications",
    group: "realtime",
    icon: Bell,
    summary:
      "The system that reaches users outside your app — email, SMS, push, and in-app alerts — so important events get seen even when nobody's staring at the screen.",
    description: [
      "The notification layer exists because real-time transports like WebSocket and SSE only reach users who currently have your app open. The moment they close the tab or background the app, you need a different mechanism to tell them their payment failed, their order shipped, or someone mentioned them in a thread. This layer spans multiple channels — email, SMS, push notifications, in-app notification centers, and outbound webhooks to other systems — each suited to a different urgency level and user context, and a mature product typically needs several of them working together rather than picking just one.",
      "Historically, teams integrated each channel separately: SendGrid or Amazon SES for transactional email, Twilio for SMS and 2FA codes, Firebase Cloud Messaging for Android/cross-platform push, and Apple Push Notification Service for iOS. This per-channel approach still works and is often the right call when you only need one or two channels and want direct control over deliverability and cost — SES in particular is attractive at scale because of its low per-email pricing, while Twilio remains the de facto standard for SMS given its global carrier reach. Postmark is worth calling out specifically for transactional email deliverability, favored by teams that care deeply about inbox placement over marketing-email features.",
      "The alternative that's become increasingly common is unified notification infrastructure — platforms like Novu and Knock that sit in front of all these channels behind a single API, letting you define a notification once (with templates, user preferences, and digesting/batching rules) and have it fan out to email, SMS, push, and in-app automatically based on what the user has opted into. This removes a lot of boilerplate: instead of your business services knowing about SendGrid, Twilio, and FCM individually, they emit one event to the notification service and let it own channel routing, retries, and preference management. The tradeoff is another vendor dependency and less granular control per channel, but for most product teams the operational simplicity of a unified layer outweighs that cost, especially once you're juggling more than two or three notification channels.",
    ],
    techGroups: [
      {
        heading: "Channels",
        items: [{ name: "Email" }, { name: "SMS" }, { name: "Push Notifications" }, { name: "In-App Notifications" }, { name: "Webhooks" }],
      },
      {
        heading: "Technologies",
        items: [
          { name: "SendGrid", recommended: true, note: "transactional email" },
          { name: "Amazon SES", recommended: true, note: "transactional email at scale" },
          { name: "Postmark", note: "deliverability-focused email" },
          { name: "Twilio", recommended: true, note: "SMS and 2FA" },
          { name: "Firebase Cloud Messaging", recommended: true, note: "cross-platform push" },
          { name: "Apple Push Notification Service", recommended: true, note: "iOS push" },
          { name: "Novu", recommended: true, note: "unified notification infrastructure" },
          { name: "Knock", recommended: true, note: "unified notification infrastructure" },
        ],
      },
    ],
    recommended: ["Novu or Knock (unified notification infra)", "SendGrid / SES (email)", "Twilio (SMS)"],
    useCases: [
      "Sending transactional emails like receipts and password resets",
      "Delivering SMS 2FA codes for account security",
      "Pushing mobile alerts to iOS and Android devices",
      "Populating an in-app notification center",
      "Firing webhook events out to external systems",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "service", label: "Business Service", variant: "service" }],
        [{ id: "notify", label: "Notification Service (Novu / Knock)", variant: "accent" }],
        [
          { id: "email", label: "Email", variant: "default" },
          { id: "sms", label: "SMS", variant: "default" },
          { id: "push", label: "Push", variant: "default" },
          { id: "inapp", label: "In-App", variant: "default" },
        ],
      ],
    },
  },
  {
    slug: "api-documentation",
    number: 24,
    title: "API Documentation Layer",
    shortTitle: "API Docs",
    group: "quality",
    icon: BookOpen,
    summary:
      "API documentation turns a contract into something both humans and machines can consume — the difference between an API developers can integrate with in minutes and one they have to reverse-engineer.",
    description: [
      "Every API has a contract, whether or not it's written down: the shape of requests, responses, and errors that clients depend on. The documentation layer exists to make that contract explicit and machine-readable rather than something buried in code or tribal knowledge. OpenAPI (formerly known as the Swagger specification) is the dominant standard for REST APIs, describing endpoints, schemas, and auth requirements in a format that tooling can consume directly — generating interactive docs, client SDKs, and even mock servers from a single source of truth.",
      "How that spec gets rendered matters for developer experience. Swagger UI is the classic, ubiquitous choice — functional, widely supported by default in many frameworks, but visually and interactively dated compared to newer options. Redoc offers a clean, read-only reference-style rendering suited to polished public documentation sites. Scalar is the modern alternative gaining ground as the 2026 default: it combines an interactive try-it-out experience with a far better design and performance profile than Swagger UI, making it the natural choice for teams building documentation as a genuine product surface rather than an afterthought. The deeper practice worth adopting alongside any of these tools is contract-first design — writing the OpenAPI spec before the implementation, then generating server stubs and client SDKs from it — which keeps documentation from silently drifting out of sync with the code, a chronic problem with docs generated after the fact from annotations.",
      "Not every API is REST, and the documentation approach has to match the paradigm. GraphQL is self-documenting through introspection, with tools like GraphiQL and Apollo's ecosystem built directly on top of the schema. AsyncAPI does for event-driven and asynchronous interfaces — Kafka topics, WebSocket channels, message queues — what OpenAPI does for REST, letting teams document channels and message schemas with the same rigor. The recommended default is OpenAPI as the specification format, rendered through Scalar (or Swagger UI where it's already the team standard) for REST APIs, with AsyncAPI layered in wherever event-driven interfaces exist alongside the synchronous ones.",
    ],
    techGroups: [
      {
        heading: "Documentation Tools",
        items: [
          { name: "OpenAPI", recommended: true },
          { name: "Swagger UI", recommended: true },
          { name: "Redoc" },
          { name: "Scalar", recommended: true },
          { name: "GraphQL Schema" },
          { name: "AsyncAPI" },
        ],
      },
    ],
    recommended: ["OpenAPI", "Scalar or Swagger UI"],
    useCases: [
      "Interactive API explorers for developers to try requests live",
      "Client SDK generation directly from the API spec",
      "Contract-first API design that keeps docs and code in sync",
      "Onboarding external developers and partners quickly",
      "Documenting async and event-driven APIs with AsyncAPI",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "spec", label: "OpenAPI Spec", variant: "default" }],
        [
          { id: "swagger", label: "Swagger UI", variant: "default" },
          { id: "scalar", label: "Scalar", variant: "default" },
          { id: "sdks", label: "Client SDKs", variant: "default" },
        ],
      ],
    },
  },
  {
    slug: "schema-validation",
    number: 25,
    title: "Schema / Validation Layer",
    shortTitle: "Schema Validation",
    group: "quality",
    icon: FileCheck2,
    summary: "A single schema definition validates data on both the frontend and backend, so your types and your runtime checks can never drift apart.",
    description: [
      "The schema and validation layer defines the shape and constraints of the data flowing through the system — request payloads, form inputs, API responses — and checks it at runtime, before malformed data can reach business logic on the backend or before a broken form can even submit on the frontend. It's a thin layer, but it sits at nearly every boundary in the system: every form, every API route, every service-to-service call benefits from a schema that says exactly what's allowed.",
      "This layer exists because TypeScript's types are a compile-time-only guarantee — they vanish the moment code is compiled to JavaScript, so they can't actually stop bad data from a network request or a user-filled form from reaching your code at runtime. Schema libraries fill that gap by validating data as it arrives, and in TypeScript-first stacks the better ones go a step further: a library like Zod can generate the static TypeScript type directly from the same schema object, so the runtime check and the compile-time type are guaranteed to agree because they come from a single source of truth.",
      "The tradeoffs mostly come down to ecosystem fit and where the schema is used. On the frontend, Zod, Valibot, and Yup all integrate well with React Hook Form, but Zod has the widest adoption and richest ecosystem, Valibot trades some of that maturity for a much smaller, tree-shakeable bundle, and Yup is older and well-established but has weaker native TypeScript inference. On the backend, Joi and Ajv (JSON Schema-based, extremely fast, and a natural fit for OpenAPI-driven validation) are strong standalone choices, and class-validator suits decorator-heavy frameworks like NestJS — but none of them share a schema definition with a TypeScript frontend. When both ends of the stack are TypeScript, standardizing on Zod everywhere lets a single schema module be imported by the frontend form and the backend route handler alike, so validation logic is written once and can never quietly drift out of sync between client and server.",
    ],
    techGroups: [
      {
        heading: "Frontend",
        items: [
          { name: "Zod", recommended: true, note: "TS-first, RHF-friendly" },
          { name: "Valibot", note: "smaller bundle, tree-shakeable" },
          { name: "Yup", note: "established, less TS-native" },
        ],
      },
      {
        heading: "Backend",
        items: [
          { name: "Zod", recommended: true, note: "shared schema, end-to-end TS" },
          { name: "Joi", note: "mature Node.js validator" },
          { name: "Ajv", note: "JSON-Schema-based, very fast" },
          { name: "class-validator", note: "decorator-based, NestJS-friendly" },
          { name: "JSON Schema", note: "language-agnostic schema standard" },
        ],
      },
    ],
    recommended: ["Zod (end-to-end TypeScript validation)"],
    useCases: [
      "Validating form input on the client before submission",
      "Validating API request and response payloads on the server",
      "Deriving static TypeScript types from a single schema definition",
      "Sharing one validation contract between frontend and backend in a monorepo",
      "Enforcing data contracts at service boundaries",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "zod-schema", label: "Zod Schema", sublabel: "shared definition", variant: "accent" }],
        [
          { id: "frontend-forms", label: "Frontend Forms", variant: "default" },
          { id: "backend-api", label: "Backend API", variant: "default" },
        ],
      ],
    },
  },
  {
    slug: "containers",
    number: 26,
    title: "Container Layer",
    shortTitle: "Containers",
    group: "infrastructure",
    icon: Package,
    summary:
      "Containers package your code, its dependencies, and its runtime into one portable, isolated unit — the atomic building block everything above this layer gets deployed as.",
    description: [
      "A container solves a problem every engineer has lived through: code that runs perfectly on one machine and breaks on another. By bundling an application together with its exact runtime, libraries, and system dependencies into a single immutable image, containers guarantee that what you tested locally is bit-for-bit what runs in staging and production. This is the foundation the rest of the modern stack — orchestration, CI/CD, observability — is built on top of, because none of those layers work reliably unless the unit they're managing behaves the same way everywhere.",
      "Docker remains the default choice because of its ecosystem: a massive library of base images, tooling that every CI system and cloud provider understands natively, and documentation depth that makes onboarding painless. Under the hood, Docker itself runs on containerd, the low-level runtime that actually creates and manages containers — and containerd alone is a valid, more minimal choice for teams building custom platform tooling who don't need Docker's higher-level CLI and daemon. Podman is the notable alternative: it's daemonless and supports fully rootless containers, which appeals to security-conscious teams who want to eliminate the always-on root daemon Docker traditionally requires. Docker Compose sits a layer above all of this — it's not a container runtime but a way to declare and run multi-container applications from a single YAML file.",
      "In practice, a local development stack might include a Next.js frontend, a Node.js API service, MongoDB, Redis, MinIO for S3-compatible object storage, an Envoy gateway, an MCP server, background workers, and OpenSearch — nine or more moving pieces that would be painful to install and wire together by hand. Docker Compose turns that into a single docker compose up, spinning up every dependency with the right networking, environment variables, and volumes already configured. This mirrors production topology closely enough that integration bugs surface early, on a laptop, instead of after a deploy.",
    ],
    techGroups: [
      {
        heading: "Container Technologies",
        items: [
          { name: "Docker", recommended: true, note: "industry-standard runtime and CLI" },
          { name: "Docker Compose", recommended: true, note: "declarative multi-container local stacks" },
          { name: "Podman", note: "daemonless, rootless alternative" },
          { name: "containerd", note: "low-level runtime under Docker/K8s" },
        ],
      },
    ],
    recommended: ["Docker", "Docker Compose"],
    useCases: [
      "Reproducible local dev environments that match production",
      "Packaging services consistently across dev, staging, and prod",
      "Running a full local stack (DB, cache, storage, gateway) with one command",
      "Isolating service dependencies so upgrades don't collide",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "compose", label: "docker-compose.yml", variant: "accent" }],
        [
          { id: "nextjs", label: "Next.js", variant: "client" },
          { id: "nodesvc", label: "Node Service", variant: "service" },
          { id: "mongo", label: "MongoDB", variant: "store" },
          { id: "redis", label: "Redis", variant: "store" },
        ],
      ],
    },
  },
  {
    slug: "container-registry",
    number: 27,
    title: "Container Registry Layer",
    shortTitle: "Registry",
    group: "infrastructure",
    icon: Archive,
    summary:
      "A container registry is the handoff point between building an image and running it — a versioned, addressable store that CI pushes to and your deployment target pulls from.",
    description: [
      "Once a container image is built, it needs somewhere durable and versioned to live before it can be deployed. A registry stores images as immutable, content-addressable artifacts — each one identified by a digest and typically tagged with a commit SHA or semantic version — so that a deployment always references an exact, reproducible build rather than a moving target. This matters enormously for rollbacks: reverting to 'last week's image' only works if that exact image still exists, untouched, in a registry.",
      "The right registry choice usually follows your cloud and CI provider rather than being picked in isolation. GitHub Container Registry is the path of least resistance for teams already on GitHub Actions — images live next to the code and workflow that built them, with no separate auth setup. AWS ECR, Google Artifact Registry, and Azure Container Registry are the natural fit when you're deploying into that same cloud, since IAM roles handle push/pull permissions and there's no cross-cloud egress cost. Docker Hub, the original public registry, still works fine for open-source images but its rate limits and cost structure make it a weaker choice as the private source of truth for production images. Harbor stands apart as a self-hosted option for organizations with air-gapped environments or compliance requirements that rule out a third-party-hosted registry entirely.",
      "Beyond simple storage, registries are increasingly a security checkpoint: most support automated vulnerability scanning on push, blocking or flagging images with known CVEs before they ever reach a cluster. For global products, registries also support replication across regions, so a pull from a Kubernetes node in Singapore doesn't have to fetch bytes from a registry in Virginia. Getting registry choice and tagging discipline right early avoids a scramble later when someone needs to answer 'exactly what code is running in production right now.'",
    ],
    techGroups: [
      {
        heading: "Registry Technologies",
        items: [
          { name: "Docker Hub", note: "public default, weaker for private prod" },
          { name: "GitHub Container Registry", recommended: true, note: "pairs naturally with GitHub Actions" },
          { name: "AWS ECR", recommended: true, note: "AWS-native" },
          { name: "Google Artifact Registry", note: "GCP-native" },
          { name: "Azure Container Registry", note: "Azure-native" },
          { name: "Harbor", recommended: true, note: "self-hosted option" },
        ],
      },
    ],
    recommended: ["GitHub Container Registry", "AWS ECR (if on AWS)", "Harbor (self-hosted)"],
    useCases: [
      "Storing versioned, immutable Docker images",
      "Image vulnerability scanning integration",
      "Private registries for proprietary code",
      "Multi-region image replication for global deployments",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "ci", label: "CI Build", variant: "default" }],
        [{ id: "image", label: "Docker Image", variant: "accent" }],
        [{ id: "registry", label: "Container Registry", variant: "store" }],
        [{ id: "deploy", label: "Kubernetes / Deployment Target", variant: "service" }],
      ],
    },
  },
  {
    slug: "orchestration",
    number: 28,
    title: "Orchestration Layer",
    shortTitle: "Orchestration",
    group: "infrastructure",
    icon: Ship,
    summary: "Orchestration decides where containers run, how many copies exist, and what happens when one dies — turning a pile of containers into a self-managing system.",
    description: [
      "A single container is easy to run; hundreds of them, across dozens of machines, with traffic that spikes and services that crash, is not. Orchestration is the layer that schedules containers onto available compute, keeps the requested number of replicas running, restarts anything that fails a health check, and handles service discovery so containers can find each other without hardcoded IP addresses. It's the difference between manually SSHing into boxes to restart a crashed process and a system that heals itself within seconds, unattended.",
      "Kubernetes has become the industry standard at scale, and for good reason — it has the largest ecosystem, the most cloud support, and a huge body of operational knowledge to draw on. But it comes with real complexity: learning curve, YAML sprawl, and a control plane that needs care and feeding, which is why most teams run it managed via EKS, GKE, or AKS rather than self-hosting the control plane. OpenShift layers enterprise tooling and stricter defaults on top of Kubernetes for regulated environments, while Nomad offers a simpler, more lightweight scheduler for teams that find Kubernetes overkill. On the other end of the spectrum, platforms like Cloud Run, Fly.io, Render, Railway, and ECS let a small team deploy a container and get auto-scaling, TLS, and rolling deploys without ever touching a cluster.",
      "The pragmatic strategy is to start simple and move to Kubernetes only when scale or organizational complexity actually justifies it. Adopting Kubernetes before you need it is a common trap — it adds operational overhead (cluster upgrades, networking policies, RBAC) that a small team doesn't have the headcount to absorb, for benefits it doesn't yet need. The migration path from a Cloud Run or Railway service to a Kubernetes deployment is usually straightforward precisely because both are consuming the same container images built in earlier layers — you're changing how the container runs, not what's inside it.",
    ],
    techGroups: [
      {
        heading: "At Scale",
        items: [
          { name: "Kubernetes", recommended: true, note: "industry standard at scale" },
          { name: "Amazon EKS", note: "managed Kubernetes on AWS" },
          { name: "Google GKE", note: "managed Kubernetes on GCP" },
          { name: "Azure AKS", note: "managed Kubernetes on Azure" },
          { name: "OpenShift", note: "enterprise Kubernetes distribution" },
          { name: "Nomad", note: "simpler HashiCorp scheduler" },
        ],
      },
      {
        heading: "Simpler Options",
        items: [
          { name: "Docker Compose", note: "single-host, dev-oriented" },
          { name: "AWS ECS", note: "AWS-native container service" },
          { name: "Google Cloud Run", recommended: true, note: "fast to ship, low ops overhead" },
          { name: "Fly.io", note: "edge-deployed containers" },
          { name: "Render", note: "PaaS-style container hosting" },
          { name: "Railway", recommended: true, note: "fast to ship, low ops overhead" },
        ],
      },
    ],
    recommended: ["Start simple: Cloud Run / Railway / ECS", "Scale up: Kubernetes when justified"],
    useCases: [
      "Auto-scaling services under variable load",
      "Zero-downtime rolling deployments",
      "Multi-region deployment",
      "Self-healing infrastructure (auto-restart failed pods)",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "simple", label: "Simple: Docker Compose / Cloud Run", sublabel: "Ship fast, low ops overhead", variant: "default" }],
        [{ id: "growth", label: "Growing traffic & team", sublabel: "Complexity increases", variant: "accent" }],
        [{ id: "k8s", label: "Kubernetes (EKS / GKE / AKS)", sublabel: "Scale & fine-grained control", variant: "service" }],
      ],
    },
  },
  {
    slug: "infrastructure-as-code",
    number: 29,
    title: "Infrastructure as Code",
    shortTitle: "IaC",
    group: "infrastructure",
    icon: FileCode2,
    summary: "Infrastructure as Code turns cloud resources into version-controlled, reviewable definitions instead of manual console clicks nobody can reproduce.",
    description: [
      "Infrastructure as Code means describing servers, networks, databases, and permissions as declarative files that a tool can plan and apply, rather than configuring them by hand through a cloud console. The value isn't just automation — it's that infrastructure changes become reviewable the same way code changes are. A pull request that adds a new database instance can be read, questioned, and approved by a teammate before it touches anything real, and the plan step shows exactly what will change before it happens.",
      "Terraform is the default here largely because of its maturity and provider ecosystem — there's a Terraform provider for nearly every cloud service that exists. OpenTofu emerged as an open-source fork after a licensing change to Terraform, and it's drop-in compatible, which appeals to teams who want the same tool but without dependency on a single vendor's licensing decisions going forward. Pulumi takes a different approach entirely: instead of a domain-specific language like HCL, you write infrastructure in TypeScript, Python, or Go, which lets teams already fluent in those languages use real loops, functions, and type checking instead of learning a new syntax — a natural fit for TypeScript-heavy engineering organizations. Cloud-native options like AWS CDK, CloudFormation, and Azure Bicep integrate tightly with a single provider but trade away the portability that Terraform-style tools offer across multi-cloud setups.",
      "In day-to-day use, IaC pays off most visibly in three moments: spinning up a new environment that's guaranteed to match staging and production, recovering from a disaster by re-applying the same code against a fresh account, and provisioning consistent infrastructure across multiple clouds or regions without hand-copying settings. The upfront cost is real — learning the tool, structuring modules, managing state files safely — but it converts infrastructure from tribal knowledge into something anyone on the team can read, diff, and trust.",
    ],
    techGroups: [
      {
        heading: "IaC Technologies",
        items: [
          { name: "Terraform", recommended: true, note: "cloud-agnostic default" },
          { name: "OpenTofu", recommended: true, note: "cloud-agnostic default" },
          { name: "Pulumi", recommended: true, note: "TypeScript-native IaC" },
          { name: "AWS CDK", note: "AWS-native, code-based" },
          { name: "CloudFormation", note: "AWS-native, YAML/JSON" },
          { name: "Azure Bicep", note: "Azure-native DSL" },
        ],
      },
    ],
    recommended: ["Terraform or OpenTofu", "Pulumi (for TypeScript-heavy teams)"],
    useCases: [
      "Version-controlled, reviewable infrastructure changes",
      "Reproducible environments across dev, staging, and prod",
      "Multi-cloud provisioning",
      "Disaster recovery via re-provisioning from code",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "iac", label: "IaC Definitions (Terraform / OpenTofu)", variant: "accent" }],
        [{ id: "planapply", label: "Plan / Apply", variant: "default" }],
        [
          { id: "compute", label: "Compute", variant: "service" },
          { id: "networking", label: "Networking", variant: "default" },
          { id: "databases", label: "Databases", variant: "store" },
        ],
      ],
    },
  },
  {
    slug: "cicd",
    number: 30,
    title: "CI/CD Layer",
    shortTitle: "CI/CD",
    group: "devops",
    icon: GitBranch,
    summary: "CI/CD automates the path from a commit to a running deployment — testing every change, building it into an image, and rolling it out without a human clicking deploy.",
    description: [
      "Continuous Integration and Continuous Delivery split the software delivery pipeline into two connected concerns. CI runs on every push or pull request — linting, running tests, building artifacts — so problems surface in minutes, not after they've merged. CD picks up where CI leaves off, taking a built artifact and delivering it to an environment, ideally all the way to production, without manual intervention beyond an approval gate if one is required.",
      "GitHub Actions is the natural choice for teams already hosting code on GitHub — workflows live in the same repo, trigger on the same events, and draw on a massive marketplace of pre-built actions. GitLab CI offers the same tight integration for GitLab-hosted repos. Jenkins remains the most extensible option through its plugin ecosystem but demands real operational investment to self-host and maintain, which makes it a harder sell for teams that don't already have that expertise. CircleCI and Buildkite are polished alternatives favored for performance and hybrid self-hosted runner setups, while Argo Workflows is built for Kubernetes-native pipelines expressed as DAGs of containers. On the delivery side, GitOps tools like Argo CD and Flux take a fundamentally different approach from pushing deploys via CI: they continuously reconcile a cluster's actual state against a Git repository describing the desired state, pulling changes in rather than having CI push credentials out to the cluster.",
      "A modern deployment flow typically looks like this: a push to GitHub triggers GitHub Actions, which builds and tests the code, packages it into a Docker image, and pushes that image to a container registry. Argo CD then detects the new image reference (or an updated manifest) and reconciles the Kubernetes cluster to match, rolling out the change and rolling back automatically if health checks fail. This pull-based model is meaningfully more secure than a push-based one, since cluster credentials never need to leave the cluster or live inside CI secrets at all.",
    ],
    techGroups: [
      {
        heading: "CI Technologies",
        items: [
          { name: "GitHub Actions", recommended: true, note: "tightly integrated with GitHub" },
          { name: "GitLab CI", note: "native to GitLab-hosted repos" },
          { name: "Jenkins", note: "most extensible, self-hosted" },
          { name: "CircleCI", note: "polished SaaS/hybrid runners" },
          { name: "Buildkite", note: "hybrid, self-hosted agents" },
          { name: "Argo Workflows", note: "Kubernetes-native DAG pipelines" },
        ],
      },
      {
        heading: "Deployment Tools",
        items: [
          { name: "Argo CD", recommended: true, note: "GitOps continuous delivery" },
          { name: "Flux", note: "alternative GitOps operator" },
          { name: "GitHub Actions", note: "push-based deploys" },
        ],
      },
    ],
    recommended: ["GitHub Actions (CI)", "Argo CD (GitOps CD)"],
    useCases: [
      "Automated testing on every pull request",
      "Building and pushing container images",
      "GitOps-style continuous deployment to Kubernetes",
      "Automatic rollback on failed health checks",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "github", label: "GitHub", variant: "default" }],
        [{ id: "actions", label: "GitHub Actions", variant: "accent" }],
        [{ id: "buildtest", label: "Build / Test", variant: "default" }],
        [{ id: "image", label: "Docker Image", variant: "accent" }],
        [{ id: "registry", label: "Container Registry", variant: "store" }],
        [{ id: "argocd", label: "Argo CD", variant: "ai" }],
        [{ id: "k8s", label: "Kubernetes", variant: "service" }],
      ],
    },
  },
  {
    slug: "observability",
    number: 31,
    title: "Observability Layer",
    shortTitle: "Observability",
    group: "observability",
    icon: Activity,
    summary: "Observability is the nervous system of a production system — metrics, traces, and logs working together so you can see what's actually happening, not just guess.",
    description: [
      "Observability rests on three complementary pillars. Metrics are aggregated numeric signals — request rate, error rate, latency percentiles — that tell you a system's overall health at a glance and power alerting and SLOs. Traces follow a single request as it hops across services, showing exactly where time was spent and where it failed. Logs are the detailed, discrete record of what happened inside a specific process at a specific moment. None of the three replaces the others; a metric spike tells you something is wrong, a trace shows you which service in the request path is slow, and logs give you the exact error message and stack trace to fix it.",
      "Prometheus is the de facto standard for metrics, using a pull-based scraping model that has become the shared language most infrastructure tooling speaks natively. Grafana sits on top as the near-universal dashboard layer, and its real strength is that it doesn't just visualize metrics — it can query logs and traces from other backends too, making it a single pane of glass instead of a separate tool per signal. For tracing, OpenTelemetry has become the vendor-neutral instrumentation standard: you instrument your code once with the OTel SDK and can send that data to any compatible backend, avoiding lock-in to a specific vendor's proprietary agent. Jaeger and Grafana Tempo are both trace storage and query backends that consume that OpenTelemetry data — Tempo is the more natural pairing if you're already standardizing on the Grafana ecosystem, since it stores traces cheaply using object storage and queries them directly from Grafana. For logs, Grafana Loki takes a 'Prometheus, but for logs' approach, indexing only labels and metadata rather than full text, which keeps it far cheaper to run at scale than Elasticsearch or OpenSearch — both of which offer more powerful full-text search but at meaningfully higher operational and storage cost.",
      "The recommended combination — OpenTelemetry for instrumentation, Prometheus for metrics, Tempo for traces, Loki for logs, all visualized in Grafana — gives you one coherent system instead of four disconnected tools. In practice this is what makes on-call bearable: an alert fires from a Prometheus-based SLO breach, the on-call engineer pivots straight into Grafana to see the affected service's dashboard, drills into a slow trace in Tempo to find the offending downstream call, and cross-references Loki logs from that exact time window to find the root cause — all without leaving one UI or correlating timestamps by hand across separate tools.",
    ],
    techGroups: [
      {
        heading: "Metrics",
        items: [{ name: "Prometheus", recommended: true, note: "pull-based metrics standard" }],
      },
      {
        heading: "Dashboards",
        items: [{ name: "Grafana", recommended: true, note: "unified visualization layer" }],
      },
      {
        heading: "Tracing",
        items: [
          { name: "OpenTelemetry", recommended: true, note: "vendor-neutral instrumentation" },
          { name: "Jaeger", note: "standalone trace backend" },
          { name: "Grafana Tempo", recommended: true, note: "cheap, object-storage-backed traces" },
        ],
      },
      {
        heading: "Logging",
        items: [
          { name: "Grafana Loki", recommended: true, note: "cheap, label-indexed logs" },
          { name: "Elasticsearch", note: "full-text search, higher cost" },
          { name: "OpenSearch", note: "open-source Elasticsearch fork" },
        ],
      },
    ],
    recommended: ["OpenTelemetry", "Prometheus", "Grafana", "Loki", "Tempo"],
    useCases: [
      "Tracking service health and SLOs",
      "Distributed request tracing across microservices",
      "Centralized log search and correlation",
      "Real-time dashboards for on-call",
      "Root-causing production incidents",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "app", label: "Application (instrumented with OpenTelemetry)", variant: "service" }],
        [
          { id: "prometheus", label: "Prometheus", sublabel: "metrics", variant: "store" },
          { id: "tempo", label: "Tempo", sublabel: "traces", variant: "store" },
          { id: "loki", label: "Loki", sublabel: "logs", variant: "store" },
        ],
        [{ id: "grafana", label: "Grafana", sublabel: "unified dashboards", variant: "accent" }],
      ],
    },
  },
  {
    slug: "error-monitoring",
    number: 32,
    title: "Error Monitoring",
    shortTitle: "Error Monitoring",
    group: "observability",
    icon: Bug,
    summary: "The safety net that catches exceptions in production and tells you about them before your users have to, complete with the stack trace and context to fix them fast.",
    description: [
      "Error monitoring exists because production is the one environment where things will break in ways your tests never anticipated, and finding out from a user's angry email is always worse than finding out from an automated alert. This layer captures unhandled exceptions, rejected promises, and crashes across both frontend and backend, attaches the context needed to reproduce them — stack traces, breadcrumbs, user session data, release version — and gets that information in front of engineers fast enough to matter. Without it, teams are left grepping logs after the fact, which is slow, incomplete, and reactive rather than proactive.",
      "Sentry has become the default choice for this layer because it was purpose-built around the error-monitoring workflow rather than bolted onto a broader observability platform: automatic error grouping so a thousand instances of the same bug show up as one issue instead of a thousand alerts, release health tracking that ties error rates to specific deploys, and session replay that lets you watch what a user actually did right before a frontend crash. That focus is also its boundary — Sentry isn't trying to be your metrics or infrastructure-monitoring system, which keeps it lightweight to adopt but means it works best alongside, not instead of, broader observability tooling.",
      "Datadog, New Relic, and Dynatrace take the opposite approach: full observability suites that bundle error tracking in with APM, infrastructure metrics, logs, and dashboards under one pane of glass, which is compelling if you want a single vendor for everything but comes with heavier instrumentation and steeper pricing as usage scales. Honeycomb leans further into the observability side with high-cardinality event querying, better suited to teams whose primary need is deep distributed-tracing debugging rather than error alerting per se. For most teams, standing up Sentry specifically for error monitoring — and pairing it with a separate metrics/tracing tool if needed — gets you a faster, cheaper, and more focused signal than trying to make an all-in-one platform's error features do the job.",
    ],
    techGroups: [
      {
        heading: "Error Monitoring Tools",
        items: [
          { name: "Sentry", recommended: true, note: "purpose-built for error tracking" },
          { name: "Datadog" },
          { name: "New Relic" },
          { name: "Dynatrace" },
          { name: "Honeycomb" },
        ],
      },
    ],
    recommended: ["Sentry"],
    useCases: [
      "Real-time error alerting the moment exceptions occur in production",
      "Automatic stack trace grouping and triage across thousands of occurrences",
      "Release health tracking to catch regressions introduced by a deploy",
      "Session replay to see exactly what a user did before a frontend bug",
      "Performance regression detection alongside error trends",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "app", label: "Application (Web + Backend)", variant: "service" }],
        [{ id: "sdk", label: "Sentry SDK", variant: "accent" }],
        [{ id: "dashboard", label: "Sentry Dashboard", variant: "default" }],
        [{ id: "alert", label: "On-Call Alert", variant: "accent" }],
      ],
    },
  },
  {
    slug: "secrets",
    number: 33,
    title: "Secrets Management",
    shortTitle: "Secrets",
    group: "security",
    icon: KeyRound,
    summary: "A centralized system for storing and rotating credentials, keys, and certificates instead of scattering them across env files and code.",
    description: [
      "Secrets management exists to solve a problem every growing application eventually hits: database passwords, API keys, TLS certificates, and encryption keys start out in .env files or hardcoded config, and that approach quickly becomes a security liability. A dedicated secrets manager centralizes these values, encrypts them at rest, controls access through fine-grained policies, and — critically — makes it possible to rotate credentials without redeploying application code.",
      "HashiCorp Vault is the general-purpose, cloud-agnostic default. It supports dynamic secrets (generating short-lived database credentials on demand), detailed access policies, and works consistently across multi-cloud and hybrid environments, at the cost of having to operate and secure an additional service yourself. Cloud-native managed secrets managers — AWS Secrets Manager, Google Secret Manager, and Azure Key Vault — trade that cross-cloud flexibility for tight, zero-effort integration with their respective platform's IAM system, making them the pragmatic choice once a team is already committed to a single cloud provider.",
      "Kubernetes Secrets are worth calling out separately: they're built into the platform and convenient, but base64 encoding is not encryption, so they typically need to be paired with tools like Sealed Secrets or External Secrets Operator to be genuinely safe at rest. 1Password Secrets Automation extends a tool many teams already use for human credential sharing into machine-to-machine secret delivery, which can be an easy on-ramp for smaller teams that don't want to stand up Vault or commit fully to a single cloud's secrets manager.",
    ],
    techGroups: [
      {
        heading: "Secrets Management",
        items: [
          { name: "HashiCorp Vault", recommended: true, note: "cloud-agnostic default" },
          { name: "AWS Secrets Manager", note: "best when already on AWS" },
          { name: "Google Secret Manager", note: "best when already on GCP" },
          { name: "Azure Key Vault", note: "best when already on Azure" },
          { name: "Kubernetes Secrets", note: "needs encryption add-ons" },
          { name: "1Password Secrets Automation" },
        ],
      },
    ],
    recommended: ["HashiCorp Vault (cloud-agnostic)", "Cloud-native secrets manager (if single-cloud)"],
    useCases: [
      "Rotating database and service credentials",
      "Storing database connection strings",
      "Managing API keys",
      "Distributing TLS certificates",
      "Managing encryption keys",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "application", label: "Application / Service", variant: "service" }],
        [{ id: "vault", label: "Secrets Manager (Vault)", variant: "accent" }],
        [
          { id: "db-credentials", label: "Database Credentials", variant: "default" },
          { id: "api-keys", label: "API Keys", variant: "default" },
          { id: "tls-certs", label: "TLS Certs", variant: "default" },
        ],
      ],
    },
  },
  {
    slug: "configuration-feature-flags",
    number: 34,
    title: "Configuration and Feature Flags",
    shortTitle: "Config & Flags",
    group: "devops",
    icon: Flag,
    summary: "Configuration lets one build run differently in every environment; feature flags let you change what that build does without redeploying it at all.",
    description: [
      "Configuration exists to separate what code does from where and how it runs. Following the twelve-factor app principle of externalizing config from code, the same build artifact should be promotable from dev to staging to production without a rebuild — only the configuration values change. This matters because rebuilding per environment reintroduces exactly the kind of drift that makes 'it worked in staging' a common and painful phrase; a single artifact plus environment-specific config is what makes deployments predictable.",
      "Environment variables are the universal baseline — supported everywhere, trivial to set, and the first thing every framework and container runtime expects. They fall apart at scale, though: too many variables become unwieldy to manage, they're visible in process listings, and they're a poor fit for anything genuinely sensitive. Kubernetes ConfigMaps extend this for containerized deployments, letting configuration be mounted as files or injected as env vars per pod, but they tie you to the Kubernetes ecosystem specifically. Vault and AWS Parameter Store go further, centralizing configuration and secrets with versioning, access control, and rotation — more infrastructure to operate, but the right call once compliance requirements or the sheer number of secrets outgrow what env vars can safely handle.",
      "Feature flags solve a different problem: decoupling deployment from release. Code can be merged and shipped to production dark, then turned on gradually — for a percentage of users, a specific cohort, or as an instant kill switch if something goes wrong, all without a redeploy or rollback. LaunchDarkly is the mature commercial option, offering rich targeting rules, experimentation, and analytics, at a cost that scales with usage and seats. Unleash is the leading open-source alternative — self-hostable, with no per-seat billing, appealing to teams that want the same gradual-rollout capability without the ongoing SaaS cost or vendor lock-in. Flagsmith and ConfigCat round out the space with lighter-weight or budget-friendly options. The pragmatic default is environment variables plus Kubernetes ConfigMaps for configuration, and LaunchDarkly or Unleash for feature flags depending on whether commercial support or full self-hosted control matters more to the team.",
    ],
    techGroups: [
      {
        heading: "Configuration",
        items: [
          { name: "Environment Variables", recommended: true, note: "baseline for all apps" },
          { name: "Kubernetes ConfigMaps", recommended: true, note: "for containerized deployments" },
          { name: "Vault" },
          { name: "AWS Parameter Store" },
        ],
      },
      {
        heading: "Feature Flags",
        items: [
          { name: "LaunchDarkly", recommended: true, note: "commercial, full-featured" },
          { name: "Unleash", recommended: true, note: "open-source alternative" },
          { name: "Flagsmith" },
          { name: "ConfigCat" },
        ],
      },
    ],
    recommended: ["Environment Variables + ConfigMaps (config)", "LaunchDarkly or Unleash (feature flags)"],
    useCases: [
      "Environment-specific configuration across dev, staging, and prod",
      "Gradual feature rollouts to a percentage of users",
      "A/B testing new functionality against a control group",
      "Kill switches to instantly disable a risky feature in production",
      "Per-tenant configuration in multi-tenant applications",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [
          { id: "envvars", label: "Env Vars", variant: "default" },
          { id: "configmaps", label: "ConfigMaps", variant: "default" },
          { id: "vault", label: "Vault", variant: "default" },
        ],
        [{ id: "app", label: "Application", variant: "service" }],
        [{ id: "flags", label: "Feature Flag Service", variant: "accent" }],
        [{ id: "toggle", label: "Feature On/Off", sublabel: "per user", variant: "default" }],
      ],
    },
  },
  {
    slug: "security",
    number: 35,
    title: "Security Layer",
    shortTitle: "Security",
    group: "security",
    icon: ShieldAlert,
    summary: "Security isn't a single component you bolt on — it's a checklist that cuts across every other layer, from the network edge down to the dependencies in your lockfile.",
    description: [
      "Unlike most layers in this stack, the security layer isn't a discrete piece of infrastructure you install once — it's a set of requirements that have to be satisfied across the entire system before it's fit for production. That's precisely why it exists as its own layer here: it's easy to build a system where authentication, authorization, and the database are all individually solid, yet the system as a whole is still exploitable because nobody enforced TLS everywhere, rate-limited the login endpoint, or scanned dependencies for known CVEs. Most real-world breaches aren't the result of one dramatic flaw; they're the result of one item on this checklist quietly going unchecked.",
      "The requirements naturally cluster into a few concerns. At the perimeter and transport level: TLS everywhere, a WAF to filter malicious traffic, rate limiting to blunt brute-force and abuse, and CORS to control which origins can call your APIs. At the identity level: OIDC, OAuth 2.0, JWTs, and RBAC/ABAC — the authentication and authorization layers restated as non-negotiable production requirements rather than optional features. At the application level: CSP and CSRF protection guard against browser-based attacks, while input validation stops injection at the source. And at the operational level: secrets management, audit logging, encryption at rest and in transit, and dependency/container scanning close the gaps that only show up after launch, when code has been running long enough to accumulate vulnerable dependencies and stale credentials.",
      "This is defense-in-depth in practice: no single control here is sufficient on its own, and the value comes from layers compensating for each other's blind spots. Cloudflare WAF or AWS WAF handle edge protection with minimal operational overhead, at the cost of adding another managed dependency to the stack. Vault centralizes secrets with rotation and short-lived leases rather than static credentials scattered across config files, but it's infrastructure you now have to run and keep highly available. Snyk, Trivy, and Dependabot automate dependency and container vulnerability scanning directly in CI, catching known CVEs before they reach production — though they require tuning to avoid alert fatigue from low-severity findings. The realistic minimum bar before any production launch is TLS plus OIDC/OAuth2/JWT for identity, a WAF at the edge, Vault for secrets, and automated scanning wired into the CI pipeline so vulnerabilities are caught continuously rather than discovered during an incident.",
    ],
    techGroups: [
      {
        heading: "Security Requirements",
        items: [
          { name: "TLS" },
          { name: "OIDC" },
          { name: "OAuth 2.0" },
          { name: "JWT" },
          { name: "RBAC / ABAC" },
          { name: "Rate limiting" },
          { name: "WAF" },
          { name: "Secrets management" },
          { name: "Audit logging" },
          { name: "Encryption" },
          { name: "CORS" },
          { name: "CSP" },
          { name: "CSRF protection" },
          { name: "Input validation" },
          { name: "Dependency scanning" },
          { name: "Container scanning" },
        ],
      },
      {
        heading: "Security Technologies",
        items: [
          { name: "Cloudflare WAF", recommended: true, note: "edge protection" },
          { name: "AWS WAF", recommended: true, note: "edge protection" },
          { name: "Envoy Rate Limiting" },
          { name: "OPA", recommended: true },
          { name: "Cerbos", recommended: true },
          { name: "Vault", recommended: true, note: "secrets management" },
          { name: "Snyk", recommended: true, note: "dependency scanning" },
          { name: "Trivy", recommended: true, note: "container scanning" },
          { name: "Dependabot", recommended: true, note: "supply chain scanning" },
        ],
      },
    ],
    recommended: ["TLS + OIDC/OAuth2 + JWT", "WAF (Cloudflare/AWS)", "Vault (secrets)", "Snyk / Trivy / Dependabot (scanning)"],
    useCases: [
      "Defense-in-depth checklist before a production launch",
      "Edge and WAF protection against common web attacks",
      "Dependency and container vulnerability scanning in CI",
      "Audit logging to support compliance and incident response",
      "Encryption of data at rest and in transit",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "internet", label: "Internet / Users", variant: "client" }],
        [{ id: "waf", label: "WAF + TLS", variant: "accent" }],
        [{ id: "gateway", label: "Gateway", sublabel: "Rate Limiting, CORS, CSRF", variant: "gateway" }],
        [{ id: "app", label: "Application", sublabel: "RBAC/ABAC, Input Validation", variant: "service" }],
      ],
    },
  },
  {
    slug: "testing",
    number: 36,
    title: "Testing Stack",
    shortTitle: "Testing",
    group: "quality",
    icon: TestTube2,
    summary:
      "Testing is the safety net that lets a team ship fast without breaking things — spanning fast, narrow unit tests all the way up to slow, realistic load tests that simulate real users under real traffic.",
    description: [
      "The testing stack exists to answer a practical question before every deploy: how confident are we that this change didn't break something? No single kind of test can answer that alone, which is why teams typically layer several types together, following a rough pyramid shape — many fast, narrow unit tests at the base, fewer broader integration and end-to-end tests above that, and a small number of expensive, realistic load tests at the top. The shape matters because unit tests are cheap to run on every commit, while end-to-end and load tests are slow and better reserved for key flows and pre-release gates.",
      "On the unit-testing side, Vitest has become the modern default for many new projects — it's Vite-native, extremely fast, and has first-class ESM support, which makes it a natural fit for both frontend and backend TypeScript codebases. Jest remains dominant in older and larger codebases thanks to its maturity and enormous ecosystem, and it's still a perfectly reasonable choice where it's already established. React Testing Library complements either runner for component testing by encouraging assertions on what a user actually sees and does rather than internal implementation details, which makes tests more resilient to refactors. On the backend, Supertest handles HTTP-level assertions against Express-style servers, letting you test routes and middleware without spinning up a browser.",
      "For end-to-end testing, Playwright has overtaken Cypress as the default choice for most new teams in 2026, largely because of genuine cross-browser support (Chromium, Firefox, and WebKit) and stronger built-in parallelization, though Cypress still has loyal users for its developer experience. Postman, Bruno, and Insomnia serve exploratory and contract-level API testing outside of automated suites — Bruno stands out as an open-source, git-friendly alternative to Postman's increasingly cloud-centric model. Load testing is a different discipline entirely: k6 is scriptable in JavaScript, integrates cleanly into CI pipelines, and has become the developer-friendly favorite, while Artillery, Locust, and JMeter remain viable alternatives with their own scripting languages and tooling ecosystems — JMeter in particular persists in many enterprises as a GUI-heavy legacy standard. The recommended combination is Vitest for unit tests, Playwright for end-to-end coverage, and k6 for load testing, all wired into CI so regressions and capacity problems are caught automatically before they reach production.",
    ],
    techGroups: [
      {
        heading: "Frontend Testing",
        items: [
          { name: "Vitest", recommended: true },
          { name: "Jest" },
          { name: "React Testing Library" },
          { name: "Playwright", recommended: true },
          { name: "Cypress" },
        ],
      },
      {
        heading: "Backend Testing",
        items: [{ name: "Vitest", recommended: true }, { name: "Jest" }, { name: "Supertest" }],
      },
      {
        heading: "API Testing Tools",
        items: [{ name: "Postman" }, { name: "Bruno" }, { name: "Insomnia" }],
      },
      {
        heading: "Load Testing",
        items: [{ name: "k6", recommended: true }, { name: "Artillery" }, { name: "Locust" }, { name: "JMeter" }],
      },
    ],
    recommended: ["Vitest (unit)", "Playwright (E2E)", "k6 (load testing)"],
    useCases: [
      "Unit testing individual components and functions",
      "End-to-end testing of critical user flows",
      "API contract testing against expected request/response shapes",
      "Load and stress testing before a major launch",
      "Regression prevention by gating merges in CI",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "change", label: "Code Change", variant: "default" }],
        [
          { id: "unit", label: "Unit Tests", sublabel: "Vitest", variant: "default" },
          { id: "e2e", label: "E2E Tests", sublabel: "Playwright", variant: "default" },
          { id: "load", label: "Load Tests", sublabel: "k6", variant: "default" },
        ],
        [{ id: "gate", label: "CI Pipeline Gate", variant: "accent" }],
      ],
    },
  },
  {
    slug: "monorepo",
    number: 37,
    title: "Monorepo Tooling",
    shortTitle: "Monorepo Tools",
    group: "devops",
    icon: GitMerge,
    summary: "One repository, one dependency graph — shared types and UI components change once and every app sees it immediately, with build tooling that keeps CI fast anyway.",
    description: [
      "A monorepo puts every app and shared package — web frontend, API, MCP server, CLI, background worker, and the packages they all depend on — into one repository with one dependency graph. Instead of publishing an internal types package to a private registry and bumping version numbers across five repos every time a field changes, every app just imports packages/types directly, and the change is visible and buildable everywhere in the same commit.",
      "This layer exists because a modern application built from several services and a shared design system spends a lot of engineering effort just coordinating changes across repository boundaries — which is precisely what a monorepo eliminates. The tradeoff is that a single repository at scale needs tooling to avoid rebuilding and retesting everything on every change, which is what Turborepo, Nx, and Bazel exist for. They understand the dependency graph between packages, cache build and test outputs locally and remotely, and only rerun the tasks actually affected by a given change, which is what keeps CI fast as the number of apps and packages grows into the dozens.",
      "pnpm Workspaces handles the 'one repo, many packages' dependency management problem — symlinking local packages together, deduplicating node_modules, and enforcing that packages only depend on what they explicitly declare. Turborepo layers task orchestration and caching on top: it figures out that changing packages/ui only requires rebuilding apps/web, not apps/worker, and it can share that build cache across the whole team and CI. Nx offers similar capabilities with a larger built-in plugin ecosystem and stronger IDE tooling, and Bazel is the most powerful and most complex option, built for company-scale monorepos spanning multiple languages. For a Node.js/TypeScript stack, pnpm Workspaces plus Turborepo hits the sweet spot of capability versus setup cost.",
    ],
    techGroups: [
      {
        heading: "Monorepo Tools",
        items: [
          { name: "Turborepo", recommended: true },
          { name: "Nx" },
          { name: "pnpm Workspaces", recommended: true },
          { name: "Bazel" },
        ],
      },
    ],
    recommended: ["pnpm Workspaces", "Turborepo"],
    useCases: [
      "Sharing TypeScript types across every app",
      "Maintaining one shared UI component library",
      "Coordinating versioning across apps and packages",
      "Caching and parallelizing builds across the whole repo",
      "Onboarding new apps without re-solving shared infrastructure",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "monorepo", label: "Monorepo", sublabel: "pnpm + Turborepo", variant: "accent" }],
        [
          { id: "web", label: "web", variant: "service" },
          { id: "api", label: "api", variant: "service" },
          { id: "mcp", label: "mcp", variant: "service" },
          { id: "worker", label: "worker", variant: "service" },
        ],
        [
          { id: "types", label: "types", variant: "default" },
          { id: "ui", label: "ui", variant: "default" },
          { id: "database", label: "database", variant: "default" },
          { id: "sdk", label: "sdk", variant: "default" },
        ],
      ],
    },
  },
];

export function getLayer(slug: string): Layer | undefined {
  return layers.find((l) => l.slug === slug);
}

export function getLayersByGroup(groupId: string): Layer[] {
  return layers.filter((l) => l.group === groupId).sort((a, b) => a.number - b.number);
}

export function getAdjacentLayers(slug: string): { prev: Layer | null; next: Layer | null } {
  const index = layers.findIndex((l) => l.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? layers[index - 1] : null,
    next: index < layers.length - 1 ? layers[index + 1] : null,
  };
}
