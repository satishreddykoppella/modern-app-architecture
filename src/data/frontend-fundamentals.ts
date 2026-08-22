import type { DeepDiveSection } from "./types";

/**
 * The browser-and-runtime knowledge underneath the Web Frontend layer.
 * Ordered as a dependency chain — each section assumes the ones before it.
 */
export const frontendFundamentals: DeepDiveSection[] = [
  {
    slug: "rendering-pipeline",
    number: "01",
    title: "Browser Architecture & the Rendering Pipeline",
    kicker: "DOM · CSSOM · layout · paint · composite",
    paragraphs: [
      "A browser tab is not one thread doing everything. Chrome runs a separate browser process (UI, network, disk), a sandboxed renderer process per tab, a GPU process for compositing, and a network process. Inside the renderer, the main thread parses HTML into the DOM, parses CSS into the CSSOM, runs JavaScript, and computes layout and paint — while a separate compositor thread handles scrolling and transforms without ever touching the main thread.",
      "This is why element.style.width and element.style.transform, despite both looking like one-line style changes, cost completely different amounts: width forces layout to re-run (it can ripple through siblings and ancestors) before paint and composite follow, while a transform skips layout and paint entirely and goes straight to composite on the GPU. Knowing which CSS properties are composite-only is the single highest-leverage fact for animation performance.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [
          { id: "html", label: "HTML", variant: "default" },
          { id: "css", label: "CSS", variant: "default" },
        ],
        [
          { id: "dom", label: "DOM Tree", variant: "default" },
          { id: "cssom", label: "CSSOM Tree", variant: "default" },
        ],
        [{ id: "rendertree", label: "Render Tree", sublabel: "visible nodes only", variant: "accent" }],
        [{ id: "layout", label: "Layout", sublabel: "geometry — expensive", variant: "service" }],
        [{ id: "paint", label: "Paint", sublabel: "pixels", variant: "service" }],
        [{ id: "composite", label: "Composite", sublabel: "GPU layers", variant: "store" }],
      ],
      edges: [
        { from: "html", to: "dom" },
        { from: "css", to: "cssom" },
        { from: "dom", to: "rendertree" },
        { from: "cssom", to: "rendertree" },
        { from: "rendertree", to: "layout" },
        { from: "layout", to: "paint" },
        { from: "paint", to: "composite" },
      ],
    },
    diagramCaption: "Parse → render pipeline, per document",
    code: {
      label: "Same intent, different cost",
      code: `// Triggers layout → paint → composite (a full reflow)
element.style.width = "500px";

// Triggers composite only — layout and paint are skipped
element.style.transform = "scaleX(1.2)";`,
    },
    terms: ["render-blocking CSS", "reflow vs repaint", "compositor layers", "will-change", "critical rendering path", "sandboxed renderer"],
  },
  {
    slug: "js-execution-model",
    number: "02",
    title: "The JavaScript Execution Model",
    kicker: "call stack · heap · closures · garbage collection",
    paragraphs: [
      "JavaScript runs on a single thread with two memory regions. The stack holds function call frames and is cleaned up automatically the moment a function returns. The heap is an unstructured region for objects, arrays, and closures that lives until nothing references it anymore. A closure is a function that keeps a live reference to variables in its enclosing scope — the same mechanism that makes React hooks work, and the most common source of accidental memory retention in a long-running app (§15).",
      "The garbage collector uses mark-and-sweep: starting from roots — globals, the current stack, active closures — it marks everything reachable and frees the rest. Nothing is freed by reference counting alone, which is why a closure captured by a long-lived event listener can keep an entire object graph alive indefinitely, including DOM nodes that were already removed from the page.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "stack", label: "Call Stack", sublabel: "function frames", variant: "default" }],
        [{ id: "heap", label: "Heap", sublabel: "objects, closures", variant: "store" }],
        [{ id: "gc", label: "Garbage Collector", sublabel: "mark-and-sweep", variant: "accent" }],
      ],
      edges: [
        { from: "stack", to: "heap", label: "holds references to" },
        { from: "heap", to: "gc", label: "unreachable → freed" },
      ],
    },
    diagramCaption: "Where things live",
    terms: ["lexical scope", "execution context", "mark-and-sweep", "detached DOM node", "WeakMap / WeakRef"],
  },
  {
    slug: "event-loop",
    number: "03",
    title: "The Event Loop & Async Scheduling",
    kicker: "microtasks vs macrotasks · promises · async/await",
    paragraphs: [
      "This is the single highest-leverage topic on this page. JavaScript never runs async work in parallel on the main thread — it schedules it. When the call stack empties, the event loop drains the entire microtask queue (promise callbacks, queueMicrotask) before it takes even one item off the task queue (setTimeout, DOM events, I/O). That ordering rule explains almost every 'why did this run before that' surprise in async code.",
      "async/await is exactly this queue model with sugar — every line after an await is a microtask continuation. AbortController layers cancellation on top of it: it doesn't stop a promise from settling, it just signals a fetch or listener to stop early (§06). Race conditions in UI code almost always trace back to two async chains resolving out of the order the UI assumed.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "stack", label: "Call stack empties", variant: "default" }],
        [{ id: "micro", label: "Microtask Queue", sublabel: "drained completely", variant: "accent" }],
        [{ id: "macro", label: "Task Queue", sublabel: "setTimeout, events — ONE per tick", variant: "queue" }],
      ],
      edges: [
        { from: "stack", to: "micro" },
        { from: "micro", to: "macro", label: "then one task runs, and repeats" },
      ],
    },
    diagramCaption: "Scheduling order after the stack empties",
    code: {
      label: "Predict the order",
      code: `console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// A, D, C, B
// sync code (A, D) always finishes first; microtasks (C)
// always beat the next task (B), even at a 0ms delay.`,
    },
    terms: ["microtask starvation", "task vs microtask", "Promise.race", "AbortController", "requestAnimationFrame", "requestIdleCallback"],
  },
  {
    slug: "workers",
    number: "04",
    title: "Workers & Concurrency",
    kicker: "Web Worker · Shared Worker · Service Worker · Node worker threads",
    paragraphs: [
      "The main thread owns the DOM, layout, and paint — any CPU-heavy JavaScript running there blocks user input and animation. Workers give you a second thread, but with a hard constraint: a Web Worker cannot touch the DOM at all. It communicates with the main thread only by passing messages, which keeps it safe but means 'just move it to a worker' always comes with a serialization cost.",
      "A Web Worker is scoped to one tab and shares nothing. A Shared Worker is reachable from every tab of the same origin, useful for coordinating state across tabs or holding one shared socket. A Service Worker is different again — it runs independent of any open tab and exists specifically to intercept network requests (§10). Node's worker_threads solve an unrelated, server-side version of the same problem: offloading CPU-bound work without blocking Node's own event loop.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "main", label: "Main Thread", sublabel: "DOM, React, events", variant: "client" }],
        [{ id: "worker", label: "Web Worker", sublabel: "CPU-heavy JS, no DOM access", variant: "queue" }],
      ],
      edges: [
        { from: "main", to: "worker", label: "postMessage(data) →" },
        { from: "worker", to: "main", label: "← postMessage(result)" },
      ],
    },
    diagramCaption: "Main thread vs. worker",
    table: {
      headers: ["Type", "Shares state with", "Typical use"],
      rows: [
        ["Web Worker", "Nothing — one tab, message-passing only", "Image processing, parsing, heavy computation"],
        ["Shared Worker", "Every tab of the same origin", "Cross-tab state, a single shared socket"],
        ["Service Worker", "The origin, runs independent of any tab", "Network interception, offline cache, push (§10)"],
        ["Node worker_threads", "Nothing by default, can share ArrayBuffer", "Server-side CPU-bound work"],
      ],
    },
    code: {
      label: "Handing off work",
      code: `// main.js
const worker = new Worker("parse.js");
worker.postMessage(hugeArrayBuffer, [hugeArrayBuffer]); // transferred, not copied
worker.onmessage = (e) => renderResult(e.data);

// parse.js — no \`window\`, no \`document\`
self.onmessage = (e) => {
  const result = expensiveParse(e.data);
  self.postMessage(result);
};`,
    },
    terms: ["postMessage", "transferable objects", "structured clone", "OffscreenCanvas", "worker_threads vs Web Worker"],
  },
  {
    slug: "networking-fundamentals",
    number: "05",
    title: "DNS, TCP, TLS & HTTP",
    kicker: "what happens before a single byte of response arrives",
    paragraphs: [
      "Every network-layer topic frontend engineers wave away as 'it's just fetch' is a stack of protocols. DNS turns a hostname into an IP address. TCP — or QUIC, for HTTP/3 — establishes a reliable connection. TLS negotiates encryption. Only then does an HTTP request actually go out. Each step is a round trip, and round trips are latency, which is why connection reuse and protocol version matter for real page-load performance, not just as trivia.",
      "HTTP/1.1 allows one request in flight per connection. HTTP/2 multiplexes many requests over a single TCP connection with compressed headers. HTTP/3 replaces TCP with QUIC over UDP, which removes TCP's head-of-line blocking — a single lost packet no longer stalls every other stream on the connection, which matters most on lossy mobile networks.",
    ],
    table: {
      headers: ["Version", "Transport", "Key change"],
      rows: [
        ["HTTP/1.1", "TCP", "One request in flight per connection (without pipelining)"],
        ["HTTP/2", "TCP", "Multiplexed streams over one connection, header compression"],
        ["HTTP/3", "QUIC (UDP)", "No TCP head-of-line blocking, faster connection setup"],
      ],
    },
    terms: ["connection reuse", "TLS handshake (1-RTT / 0-RTT)", "DNS caching / prefetch", "head-of-line blocking", "QUIC"],
  },
  {
    slug: "fetch-and-browser-apis",
    number: "06",
    title: "fetch() & Browser Networking APIs",
    kicker: "the full path behind one call",
    paragraphs: [
      "fetch(\"https://api.example.com/users\") looks like one line, but it walks through URL parsing, DNS resolution, a TCP or QUIC handshake, a TLS handshake, the HTTP request itself, whatever CDN or gateway sits in front of the origin, and only then a response — at which point the promise resolves and the response body starts streaming into JavaScript.",
      "Two details most React code gets wrong: fetch only rejects on network failure, never on a 4xx/5xx status — response.ok has to be checked explicitly. And the response body is a stream (the Streams API), which is what makes progressive rendering, incremental JSON parsing, and token-by-token AI output possible without waiting for the whole payload to arrive.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "call", label: "fetch(url)", variant: "client" }],
        [{ id: "dns", label: "DNS resolution", variant: "default" }],
        [{ id: "handshake", label: "TCP / QUIC handshake", variant: "default" }],
        [{ id: "tls", label: "TLS handshake", variant: "default" }],
        [{ id: "server", label: "CDN / Gateway / Origin", variant: "gateway" }],
        [{ id: "resolve", label: "Promise resolves, body streams", variant: "accent" }],
      ],
    },
    diagramCaption: 'fetch("https://api.example.com/users")',
    code: {
      label: "Cancellable fetch with a timeout",
      code: `const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api/users", { signal: controller.signal });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const data = await res.json();
} catch (err) {
  if (err.name === "AbortError") console.log("timed out");
} finally {
  clearTimeout(timeout);
}`,
    },
    terms: ["Streams API", "AbortSignal.timeout()", "response.ok", "WebSocket / SSE (§11)"],
  },
  {
    slug: "same-origin-and-cors",
    number: "07",
    title: "Same-Origin Policy & CORS",
    kicker: "why the browser blocks it, not how to silence the error",
    paragraphs: [
      "An origin is scheme + hostname + port — app.example.com and api.example.com are different origins even though they share a parent domain. The Same-Origin Policy is the browser's default: JavaScript on one origin cannot read responses from another. CORS is not a security hole being patched around — it's the server opting back into cross-origin reads it would otherwise be blocked from, on a per-origin basis.",
      "A simple request (GET/POST with plain headers) goes straight out; the browser just hides the response if the origin isn't allowed. A request with custom headers, a non-simple content type, or credentials triggers a preflight: the browser sends an OPTIONS request first to ask permission before sending the real one. Credentials are never sent cross-origin unless the request sets credentials: \"include\" and the server responds with a literal Access-Control-Allow-Origin (not *) plus Access-Control-Allow-Credentials: true — the exact mechanism CSRF defenses have to reason about (§13).",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser", variant: "client" }],
        [
          { id: "preflight", label: "OPTIONS preflight", sublabel: "non-simple request", variant: "gateway" },
          { id: "simple", label: "Simple request", sublabel: "plain GET/POST", variant: "default" },
        ],
        [{ id: "server", label: "Server", variant: "service" }],
        [{ id: "response", label: "Access-Control-Allow-Origin", variant: "accent" }],
      ],
      edges: [
        { from: "browser", to: "preflight" },
        { from: "browser", to: "simple" },
        { from: "preflight", to: "server", label: "asks permission first" },
        { from: "simple", to: "server" },
        { from: "server", to: "response" },
      ],
    },
    diagramCaption: "Two request paths, one policy",
    terms: ["origin vs domain", "preflight cache (Access-Control-Max-Age)", "credentialed requests", "opaque response"],
  },
  {
    slug: "cookies-and-storage",
    number: "08",
    title: "Cookies & Browser Storage",
    kicker: "five places to keep state, five very different tradeoffs",
    paragraphs: [
      "Cookies are the only browser store attached to outgoing requests automatically — which is exactly why they need HttpOnly (unreadable by JS, blocks token theft via XSS), Secure (HTTPS only), and SameSite (controls cross-site sending, the primary structural defense against CSRF). Every other store — localStorage, sessionStorage, IndexedDB, the Cache API — is invisible to the server unless the application explicitly sends its contents.",
      "The capacity and lifetime differences matter as much as the security posture: a cookie is capped near 4KB and rides on every request whether you need it there or not, while IndexedDB and the Cache API scale to a browser-managed quota and are built for structured or large data that never needs to leave the client.",
    ],
    table: {
      headers: ["Store", "Sent to server?", "Capacity", "Survives reload?"],
      rows: [
        ["Cookie", "Yes, every request (unless HttpOnly + scoped)", "~4KB", "Until expiry"],
        ["localStorage", "No", "~5–10MB", "Yes, indefinitely"],
        ["sessionStorage", "No", "~5–10MB", "Tab lifetime only"],
        ["IndexedDB", "No", "Large, quota-based", "Yes, indefinitely"],
        ["Cache API", "No — stores Response objects", "Large, quota-based", "Yes, until evicted"],
      ],
    },
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser", variant: "client" }],
        [
          { id: "cookie", label: "Cookie", variant: "accent" },
          { id: "localstorage", label: "localStorage", variant: "store" },
          { id: "indexeddb", label: "IndexedDB", variant: "store" },
        ],
        [{ id: "server", label: "Server", variant: "service" }],
      ],
      edges: [
        { from: "browser", to: "cookie" },
        { from: "browser", to: "localstorage" },
        { from: "browser", to: "indexeddb" },
        { from: "cookie", to: "server", label: "attached automatically" },
      ],
    },
    diagramCaption: "Only cookies cross the wire on their own",
    code: {
      label: "Set-Cookie, read carefully",
      code: `Set-Cookie: session=abc123;
  HttpOnly;          // invisible to document.cookie
  Secure;            // HTTPS only
  SameSite=Lax;      // not sent on cross-site POSTs
  Max-Age=3600`,
    },
    terms: ["HttpOnly", "SameSite=Strict/Lax/None", "storage quota & eviction", "cookie domain vs path"],
  },
  {
    slug: "sessions-jwt-oauth",
    number: "09",
    title: "Sessions, JWT & OAuth 2.0 / OIDC",
    kicker: "what actually happens between 'click login' and 'logged in'",
    paragraphs: [
      "A session is server state referenced by an opaque cookie — the server can revoke it instantly. A JWT is the opposite tradeoff: a signed, self-contained token the server can verify without a database lookup, fast to check but hard to revoke before it expires. Most real systems mix both — a short-lived JWT access token for API calls, plus a long-lived, revocable refresh token stored server-side or in an HttpOnly cookie.",
      "Storing that access token in localStorage makes it readable by any script on the page, including one injected by an XSS bug (§13) — a single localStorage.getItem(\"token\") call. An HttpOnly cookie is immune to that specific theft vector but opens a CSRF surface instead. There is no storage location that is simply 'safe' — the choice trades one attack surface for another, which is why it has to be made deliberately.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "user", label: "User", variant: "client" }],
        [{ id: "app", label: "Frontend App", variant: "client" }],
        [{ id: "idp", label: "Identity Provider", variant: "accent" }],
        [{ id: "api", label: "Backend API", variant: "service" }],
      ],
      edges: [
        { from: "user", to: "app", label: "click login" },
        { from: "app", to: "idp", label: "redirect: client_id, redirect_uri" },
        { from: "idp", to: "app", label: "auth code → access + ID + refresh token" },
        { from: "app", to: "api", label: "Authorization: Bearer access_token" },
      ],
    },
    diagramCaption: "OAuth 2.0 / OIDC — authorization code flow",
    code: {
      label: "Anatomy of a JWT",
      code: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyXzEyMyJ9.4f8c...
header {alg, typ}  .  payload {sub, exp, scope}  .  signature

// Anyone can decode the payload — it's base64, not encrypted.
// The signature only proves it wasn't tampered with.
// Never put secrets in the payload.`,
    },
    terms: ["access vs refresh vs ID token", "token rotation", "PKCE", "silent refresh", "revocation"],
  },
  {
    slug: "service-workers",
    number: "10",
    title: "Service Workers",
    kicker: "not a Web Worker — a network proxy that outlives the tab",
    paragraphs: [
      "A Service Worker sits between the app and the network. It installs once, activates, and from then on can intercept every fetch the page makes — even when no tab is open — which is what makes offline support, background sync, and push notifications possible.",
      "The lifecycle is deliberate: install is where you pre-cache the app shell, activate is where you clean up old caches from a previous version, and fetch fires on every network request the page makes from then on, letting the worker decide whether to answer from cache, from the network, or some mix of both.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "install", label: "install", variant: "default" }],
        [{ id: "activate", label: "activate", variant: "default" }],
        [{ id: "fetchevent", label: "fetch event intercepted", variant: "accent" }],
        [
          { id: "cache", label: "Serve from Cache", variant: "store" },
          { id: "network", label: "Fetch from network", variant: "service" },
        ],
        [{ id: "respond", label: "Respond to page", variant: "accent" }],
      ],
      edges: [
        { from: "install", to: "activate" },
        { from: "activate", to: "fetchevent" },
        { from: "fetchevent", to: "cache", label: "HIT" },
        { from: "fetchevent", to: "network", label: "MISS" },
        { from: "cache", to: "respond" },
        { from: "network", to: "respond", label: "store in cache, then respond" },
      ],
    },
    diagramCaption: "Lifecycle + cache-first fetch strategy",
    code: {
      label: "Minimal offline-first handler",
      code: `self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached ?? fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open("v1").then((c) => c.put(event.request, copy));
        return res;
      })
    )
  );
});`,
    },
    terms: ["install / activate / fetch", "cache-first vs network-first", "stale-while-revalidate", "push API", "background sync"],
  },
  {
    slug: "realtime",
    number: "11",
    title: "WebSocket, SSE & Real-Time Streaming",
    kicker: "picking the right one is a protocol decision, not a library decision",
    paragraphs: [
      "SSE runs over plain HTTP, is one-directional (server to client), and reconnects itself automatically — which is exactly why it's become the default transport for token-by-token LLM output: one direction, text-based, and free reconnection is worth more than bidirectionality you don't need. WebSocket trades that simplicity for a full-duplex channel, at the cost of handling reconnection yourself.",
      "Polling and long polling still show up behind infrastructure that can't hold a WebSocket or SSE connection open, and WebRTC solves a different problem entirely — peer-to-peer media and data channels that don't want to round-trip through a server at all.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "client", label: "Client", variant: "client" }],
        [
          { id: "sse", label: "SSE", variant: "service" },
          { id: "ws", label: "WebSocket", variant: "service" },
        ],
      ],
      edges: [
        { from: "client", to: "sse", label: "one-way: server → client stream" },
        { from: "client", to: "ws", label: "two-way: full duplex" },
      ],
    },
    diagramCaption: "Direction is the decision",
    table: {
      headers: ["Mechanism", "Direction", "Reconnect", "Good fit"],
      rows: [
        ["Polling", "Client-initiated only", "N/A", "Infrequent updates, simplicity"],
        ["Long polling", "Client-initiated, held open", "Manual", "Legacy infra without WS support"],
        ["SSE", "Server → client", "Automatic, built-in", "Notifications, LLM token streaming"],
        ["WebSocket", "Bidirectional", "Manual", "Chat, collaborative editing, games"],
        ["WebRTC", "Peer-to-peer", "Manual (ICE)", "Video/audio, low-latency data channels"],
      ],
    },
    terms: ["EventSource", "backpressure", "ICE / STUN / TURN", "heartbeat / ping-pong"],
  },
  {
    slug: "caching-layers",
    number: "12",
    title: "Caching Layers",
    kicker: "every response passes through more caches than you think",
    paragraphs: [
      "A single response can be cached at four or five points before it ever reaches your component: the browser's own HTTP cache, a Service Worker's Cache API, a CDN edge node, and an origin or application-level cache — each with its own eviction rules and its own header to control it.",
      "no-cache is the header name most people get wrong — it doesn't disable caching, it forces revalidation on every use. no-store is the one that actually means 'never cache this.' stale-while-revalidate is the pattern worth knowing best: serve the stale response instantly, then refresh it in the background for next time.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser Cache", variant: "client" }],
        [{ id: "sw", label: "Service Worker Cache", variant: "queue" }],
        [{ id: "cdn", label: "CDN Edge Cache", variant: "gateway" }],
        [{ id: "origin", label: "Origin / App Cache", variant: "service" }],
      ],
    },
    diagramCaption: "A response's possible stops",
    table: {
      headers: ["Header", "Meaning"],
      rows: [
        ["Cache-Control: max-age=3600", "Fresh for 1 hour before revalidating"],
        ["Cache-Control: s-maxage=86400", "CDN-specific freshness, separate from browser max-age"],
        ["stale-while-revalidate=60", "Serve stale instantly, refresh in the background"],
        ["no-cache", "Always revalidate with the server (not \"don't cache\")"],
        ["no-store", "Never cache at all"],
        ["ETag / 304 Not Modified", "Revalidate by content hash instead of re-downloading"],
      ],
    },
    terms: ["cache invalidation", "CDN purge", "ETag vs Last-Modified", "immutable assets + content hashing"],
  },
  {
    slug: "browser-security",
    number: "13",
    title: "Browser Security",
    kicker: "these topics only make sense studied together",
    paragraphs: [
      "XSS lets untrusted input execute as script — defended by escaping output, avoiding innerHTML/dangerouslySetInnerHTML, and a strong Content-Security-Policy as a second layer even if the escaping has a bug. CSRF lets a different site make an authenticated request using the victim's cookies — defended by SameSite cookies plus a CSRF token the attacker's page can't read. Clickjacking frames your page invisibly to hijack clicks — defended by frame-ancestors 'none'. SRI protects against a compromised CDN-hosted script by checking a content hash before executing it.",
      "Each control is weak alone and load-bearing in combination: XSS plus a localStorage-held token is one sentence, not two facts (§09) — if an attacker can run script on the page, and the token sits in localStorage, they read it in one line, outside any cookie protection entirely. See §07 for how CORS and credentials interact, and §08–09 for where the token actually lives.",
    ],
    table: {
      headers: ["Threat", "What happens", "Primary defense"],
      rows: [
        ["XSS", "Untrusted input executes as script", "Output escaping + Content-Security-Policy"],
        ["CSRF", "A cross-site page rides the victim's cookies", "SameSite cookies + CSRF token"],
        ["Clickjacking", "Page framed invisibly, clicks hijacked", "frame-ancestors 'none' / X-Frame-Options"],
        ["Compromised CDN script", "A trusted third-party script is tampered with", "Subresource Integrity (integrity=\"sha384-…\")"],
      ],
    },
    callout: {
      label: "Why this matters more than any single row",
      text: "If an attacker can run script on your page, and your access token sits in localStorage, they hold it in one line — localStorage.getItem(\"token\") — outside any cookie protection entirely. Security here is the sum of the controls, not any single one.",
    },
    terms: ["CSP nonce / hash", "iframe sandbox", "mixed content", "trusted types"],
  },
  {
    slug: "rendering-architectures",
    number: "14",
    title: "CSR, SSR, SSG, ISR & React Server Components",
    kicker: "where HTML gets built decides everything else",
    paragraphs: [
      "CSR builds HTML in the browser after JavaScript loads — cheap to host, slow first paint. SSR builds it per request on the server — fast first paint, server load per request. SSG builds it once at build time — fastest possible serve, stale until the next rebuild. ISR is SSG that revalidates itself on a timer, trading a small amount of staleness for that speed. RSC goes further still: a Server Component's code and its dependencies never ship to the browser at all.",
      "Hydration is the step everything above is building toward: the server-rendered HTML is already visible, and React attaches event listeners to it without re-rendering from scratch. Only \"use client\" components hydrate, which is why RSC payloads can be dramatically smaller than an equivalent CSR bundle — you ship the interactive parts and stream everything else as already-rendered HTML.",
    ],
    table: {
      headers: ["Strategy", "HTML built", "Tradeoff"],
      rows: [
        ["CSR", "In the browser, after JS loads", "Cheap to host, slow first paint"],
        ["SSR", "Per request, on the server", "Fast first paint, server load per request"],
        ["SSG", "At build time", "Fastest possible serve, stale until rebuild"],
        ["ISR", "At build, revalidated on a timer", "SSG's speed with bounded staleness"],
        ["RSC (streaming)", "On the server, streamed in chunks", "Zero client JS for server-only components"],
      ],
    },
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "browser", label: "Browser", variant: "client" }],
        [{ id: "cdn", label: "CDN", variant: "gateway" }],
        [{ id: "server", label: "Next.js Server", variant: "service" }],
        [{ id: "rsc", label: "Server Component", variant: "accent" }],
        [{ id: "db", label: "API / Database", variant: "store" }],
        [{ id: "payload", label: "HTML + RSC payload, streamed", variant: "accent" }],
        [{ id: "hydration", label: "Hydration → interactive UI", variant: "client" }],
      ],
      edges: [
        { from: "browser", to: "cdn" },
        { from: "cdn", to: "server" },
        { from: "server", to: "rsc" },
        { from: "rsc", to: "db", label: "fetch" },
        { from: "db", to: "rsc", label: "data" },
        { from: "rsc", to: "payload" },
        { from: "payload", to: "hydration", label: "client components only" },
      ],
    },
    diagramCaption: "A Next.js request with Server Components",
    terms: ["hydration mismatch", "streaming SSR", "Server Actions", "partial prerendering", "use client / use server"],
  },
  {
    slug: "performance-and-memory",
    number: "15",
    title: "Performance & Memory",
    kicker: "Core Web Vitals, bundle strategy, and where leaks hide",
    paragraphs: [
      "Bundle splitting and lazy loading are a direct application of §01 and §03: code you don't ship is code the main thread never has to parse or execute, which keeps the call stack free for the interaction the user is actually waiting on. LCP, INP, and CLS are the metrics that turn 'feels slow' into something measurable and fixable.",
      "When memory grows unbounded, a Chrome DevTools heap snapshot comparison — two snapshots, diffed — is how you find which retained objects are actually detached DOM nodes still referenced by a stray closure. The classic culprit is a listener or subscription that outlives the component that created it.",
    ],
    table: {
      headers: ["Metric", "Measures", "Good"],
      rows: [
        ["LCP", "Largest Contentful Paint — perceived load speed", "< 2.5s"],
        ["INP", "Interaction to Next Paint — responsiveness", "< 200ms"],
        ["CLS", "Cumulative Layout Shift — visual stability", "< 0.1"],
      ],
    },
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "request", label: "Page request", variant: "client" }],
        [
          { id: "critical", label: "Critical bundle", sublabel: "loaded immediately", variant: "accent" },
          { id: "lazy", label: "Lazy chunk", sublabel: "loaded on demand", variant: "default" },
        ],
        [{ id: "interactive", label: "Interactive UI", variant: "store" }],
      ],
      edges: [
        { from: "request", to: "critical" },
        { from: "request", to: "lazy", label: "dynamic import" },
        { from: "critical", to: "interactive" },
        { from: "lazy", to: "interactive" },
      ],
    },
    diagramCaption: "What ships now vs. on demand",
    code: {
      label: "The classic leak: a listener that outlives its component",
      code: `useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", onResize);
  // missing cleanup — onResize (and everything it closes over)
  // stays reachable from \`window\` forever after unmount
  return () => window.removeEventListener("resize", onResize);
}, []);`,
    },
    terms: ["code splitting", "tree shaking", "heap snapshot diffing", "long tasks", "INP"],
  },
  {
    slug: "frontend-system-architecture",
    number: "16",
    title: "BFF, API Gateway & Frontend System Design",
    kicker: "once one app becomes several, new seams appear",
    paragraphs: [
      "A BFF exists because a web client and a mobile client want different shapes of the same data — pagination, field selection, aggregation — and forcing one generic API to serve both means both clients over-fetch. This project's own BFF Layer and API/Edge Gateway Layer pages cover that decision in depth; the piece worth adding here is what happens once the frontend itself needs to split.",
      "Micro-frontends apply the same 'split by team boundary' idea to the UI layer: independently deployable frontend pieces, owned by different teams, composed together at build time or runtime into one shell application — the UI equivalent of extracting a microservice, with the same tradeoff of independence bought with integration complexity.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [
          { id: "teama", label: "Team A remote", variant: "client" },
          { id: "teamb", label: "Team B remote", variant: "client" },
          { id: "teamc", label: "Team C remote", variant: "client" },
        ],
        [{ id: "shell", label: "Shell Application", sublabel: "composes remotes at runtime", variant: "accent" }],
      ],
    },
    diagramCaption: "Micro-frontend composition",
    terms: ["reverse proxy", "rate limiting", "module federation", "edge functions"],
  },
  {
    slug: "accessibility",
    number: "17",
    title: "Accessibility",
    kicker: "the DOM has a second tree, built for assistive tech",
    paragraphs: [
      "Every DOM node has a computed role, name, and state in the accessibility tree. Semantic HTML — button, nav, label — fills these in for free; a div onClick fills in none of them, which is what ARIA attributes exist to patch after the fact, not to replace.",
      "Focus management is the other half: a modal that opens without moving focus into it, or closes without returning focus to its trigger, is invisible to a keyboard-only user regardless of how it looks. Reduced-motion and live-region support round out the baseline every interactive component in this stack should meet.",
    ],
    diagram: {
      direction: "vertical",
      rows: [
        [{ id: "dom", label: "DOM Tree", variant: "default" }],
        [{ id: "acc", label: "Accessibility Tree", variant: "accent" }],
        [
          { id: "sr", label: "Screen reader", variant: "client" },
          { id: "kb", label: "Keyboard navigation", variant: "client" },
          { id: "voice", label: "Switch / voice control", variant: "client" },
        ],
      ],
    },
    diagramCaption: "Two trees, one source",
    terms: ["ARIA roles / states", "focus trap", "tabindex", "live regions", "reduced motion"],
  },
];
