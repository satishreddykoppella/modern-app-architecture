import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Modern Application Tech Stack 2026",
  description:
    "An end-to-end map of a modern 2026 application architecture — frontend to infrastructure — with flow diagrams and technology tradeoffs for every layer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="flex h-full min-h-screen flex-col bg-surface-page font-sans text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="mx-auto flex w-full max-w-[1600px] flex-1">
            <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border-hairline lg:block">
              <Sidebar />
            </aside>
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
