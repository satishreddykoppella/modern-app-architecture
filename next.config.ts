import type { NextConfig } from "next";

const repoName = "modern-app-architecture";
// Only GitHub Pages serves this app from a /repoName sub-path; Vercel and
// local dev serve it from the domain root, so the base path is opt-in via
// an env var the GitHub Actions workflow sets rather than tied to NODE_ENV.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
