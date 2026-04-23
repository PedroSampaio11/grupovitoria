import { siteConfig } from "@/constants/site";

export function JsonLdSchema() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "Country",
      name: "Brazil",
    },
    priceRange: "$$",
    image: siteConfig.ogImage,
    sameAs: [
      siteConfig.links.instagram,
    ],
  };

  const transportService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Transporte de Veículos",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "Country",
      name: "Brazil",
    },
    description: "Transporte especializado de veículos, vans e frotas corporativas com seguro RCTR-C, rastreamento por satélite 24/7 e SLA de 99.8%.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Transporte",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Transporte por Cegonha",
            description: "Transporte de múltiplos veículos via caminhão cegonha com cobertura nacional.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Transporte por Van Executiva",
            description: "Entrega expressa de veículos com prazo de 24h para concessionárias.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Transporte em Baú Fechado",
            description: "Transporte de veículos de luxo e colecionáveis em baú climatizado.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transportService) }}
      />
    </>
  );
}
