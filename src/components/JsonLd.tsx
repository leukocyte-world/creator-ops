import React from 'react';

export default function JsonLd() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CreatorOps AI",
    "image": "https://creatorops.site/icon.svg",
    "screenshot": "https://creatorops.site/dashboard-preview.png",
    "brand": {
      "@type": "Brand",
      "name": "CreatorOps AI",
      "logo": "https://creatorops.site/icon.svg"
    },
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication, MultimediaApplication",
    "description": "The ultimate AI-powered system for modern creators. Scale your audience on X (Twitter) and YouTube with 17+ specialized CreatorOps AI viral growth tools.",
    "url": "https://creatorops.site",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Viral Reverse Engineer",
      "Twitter Hook Generator",
      "Faceless YouTube Automation",
      "90-Day Creator Money Map",
      "Retention Killer Scripts"
    ],
    "author": {
      "@type": "Organization",
      "name": "CreatorOps AI",
      "url": "https://creatorops.site"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://creatorops.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Tools",
        "item": "https://creatorops.site/tools"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
