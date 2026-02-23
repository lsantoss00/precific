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
      price: "79.99",
      priceCurrency: "BRL",
    },
    {
      "@type": "Offer",
      name: "Plano Intermediário",
      price: "199.99",
      priceCurrency: "BRL",
    },
    {
      "@type": "Offer",
      name: "Plano Avançado",
      price: "399.99",
      priceCurrency: "BRL",
    },
    {
      "@type": "Offer",
      name: "Plano Customizado",
      price: "799.99",
      priceCurrency: "BRL",
    },
  ],
  publisher: {
    "@id": "https://precificapp.com/#organization",
  },
  description:
    "Aplicativo de precificação que automatiza cálculos de preços e simula cenários da Reforma Tributária.",
};
