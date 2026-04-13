import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const BASE_URL = 'https://mochileirosporto.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEOHead({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website'
}: SEOHeadProps) {
  const fullTitle = `${title} | Mochileiros Porto`;

  // Structured Data (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mochileiros Porto",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": [
      "https://www.instagram.com/mochileirosporto",
      "https://www.facebook.com/mochileirosporto"
    ],
    "description": "A maior comunidade de brasileiros em Porto, Portugal."
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mochileiros Porto",
    "image": image,
    "@id": BASE_URL,
    "url": BASE_URL,
    "telephone": "+351XXXXXXXXX", // Placeholder, user should update
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua de Santa Catarina", // Placeholder
      "addressLocality": "Porto",
      "postalCode": "4000-447",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.1496,
      "longitude": -8.6110
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mochileiros Porto",
    "url": BASE_URL
  };

  return (
    <Helmet>
      {/* Básico */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mochileiros Porto" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter/X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Keywords */}
      <meta name="keywords" content="brasileiros porto, comunidade brasileira portugal, imigrantes porto, brasileiros em portugal, excursões porto, clube vip porto, mochileiros porto" />

      {/* Indexação */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mochileiros Porto" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}
