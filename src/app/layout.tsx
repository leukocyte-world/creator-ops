import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "CreatorOps AI — Toolkit for X & YouTube Growth",
  description: "Stop guessing and start going viral. Use CreatorOps AI to reverse-engineer viral posts, generate hooks, build faceless YouTube channels, and scale your creator business.",
  verification: {
    google: 'SGdaiH54RwxqCcWTS5zduiCwdh8jsJwTU3gkQiOgX8M',
  },
  keywords: [
    "CreatorOps AI",
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
  publisher: "CreatorOps AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://creatorops.site'),
  openGraph: {
    title: "CreatorOps AI — Stop Guessing. Start Going Viral.",
    description: "The ultimate AI-powered system for modern creators. Scale your audience on X and YouTube with 17+ specialized tools.",
    url: 'https://creatorops.site',
    siteName: 'CreatorOps AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreatorOps AI — Stop Guessing. Start Going Viral.",
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
  alternates: {
    canonical: 'https://creatorops.site',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': 'CreatorOps AI',
  'description': 'The ultimate AI toolkit for X and YouTube growth. Specialized tools for viral hooks, faceless automation, and niche research.',
  'applicationCategory': 'MultimediaApplication',
  'operatingSystem': 'Web',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'CreatorOps AI',
    'url': 'https://creatorops.site'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CreatorOps AI",
    "url": "https://creatorops.site",
    "logo": "https://creatorops.site/logo.png",
    "sameAs": [
      "https://twitter.com/creatorops"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CreatorOps AI",
    "url": "https://creatorops.site",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://creatorops.site/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData data={organizationData} />
        <StructuredData data={websiteData} />
        <StructuredData data={jsonLd} />
        {/* Crisp Support Chat */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];window.CRISP_WEBSITE_ID="6f4a867a-f4ef-4c6e-9273-044171228511";
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            `
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
