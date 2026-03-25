import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "CreatorOps — AI Tools for X & YouTube Creators",
  description: "Reverse-engineer viral posts, generate hooks, build faceless YouTube channels, and grow your creator business with AI-powered tools.",
  keywords: ["creator tools", "AI writing", "YouTube growth", "X Twitter viral", "content creator"],
  openGraph: {
    title: "CreatorOps",
    description: "AI-powered creator toolkit for X & YouTube",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
