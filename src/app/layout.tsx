import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "CreatorOps — AI Toolkit for Viral X (Twitter) & YouTube Growth",
  description: "Stop guessing and start going viral. Use AI to reverse-engineer viral posts, generate hooks, build faceless YouTube channels, and scale your creator business.",
  verification: {
    google: 'SGdaiH54RwxqCcWTS5zduiCwdh8jsJwTU3gkQiOgX8M',
  },
  keywords: [
    "AI creator tools",
    "viral hook generator",
    "faceless YouTube channel AI",
    "Twitter growth engine",
    "X content generator",
    "YouTube automation tools",
    "content creator toolkit",
    "viral post AI",
    "AI script writer"
  ],
  authors: [{ name: "CreatorOps Team" }],
  creator: "CreatorOps",
  publisher: "CreatorOps",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://creatorops.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CreatorOps — AI Toolkit for X & YouTube",
    description: "The ultimate AI-powered system for modern creators. Scale your audience on X and YouTube with 17+ specialized tools.",
    url: 'https://creatorops.site',
    siteName: 'CreatorOps',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreatorOps — Stop Guessing. Start Going Viral.",
    description: "17+ AI tools to help you dominate X and YouTube.",
    creator: '@creatorops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
          <JsonLd />
          {children}
        </Providers>
      </body>
    </html>
  );
}
