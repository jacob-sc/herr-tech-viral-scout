import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viral Scout — Herr Tech",
  description:
    "Finde virale Videos aus Afrika, Asien, Europa & Amerika, die zu deinem Creator-Profil passen.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <nav className="px-6 sm:px-8 h-14 border-b border-border flex items-center gap-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/herr-tech-logo.png" alt="HERR TECH" className="h-[18px] object-contain" />
          <span className="text-sm text-muted">/ viral-scout</span>
        </nav>
        <div className="flex-1 flex flex-col">{children}</div>
        <footer className="border-t border-border px-6 sm:px-8 py-4 text-xs text-muted text-center shrink-0">
          © herr.tech · Viral Scout · Built with{" "}
          <a
            href="https://github.com/jacob-sc/herr-tech-viral-scout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Herr Tech Starter Tools
          </a>
        </footer>
      </body>
    </html>
  );
}
