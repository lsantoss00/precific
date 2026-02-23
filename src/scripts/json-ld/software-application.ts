export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://precificapp.com/#software",
  name: "Precific",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  isAccessibleForFree: true,
  offers: [
    {
      "@type": "Offer",
      name: "Plano Básico",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79.99",
        priceCurrency: "BRL",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
    {
      "@type": "Offer",
      name: "Plano Intermediário",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199.99",
        priceCurrency: "BRL",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
    {
      "@type": "Offer",
      name: "Plano Avançado",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "399.99",
        priceCurrency: "BRL",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
    {
      "@type": "Offer",
      name: "Plano Customizado",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "799.99",
        priceCurrency: "BRL",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
  ],
  publisher: {
    "@id": "https://precificapp.com/#organization",
  },
  description:
    "Aplicativo de precificação que automatiza cálculos de preços e simula cenários da Reforma Tributária.",
};
