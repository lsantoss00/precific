export const OrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://precificapp.com/#organization",
  name: "Precific",
  alternateName: "Precific",
  url: "https://precificapp.com",
  logo: "https://precificapp.com/images/precific-logo-image.webp",
  description:
    "Precific é uma plataforma de precificação que automatiza o cálculo de preços com base em custos, impostos e margens, simulando cenários futuros da Reforma Tributária no Brasil.",
  foundingDate: "2025",
  parentOrganization: {
    "@type": "Organization",
    name: "Grupo Viriato",
    url: "https://viriato.com.br",
    foundingDate: "1980",
  },
  makesOffer: {
    "@id": "https://precificapp.com/#software",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contato@precificapp.com",
      telephone: "+552122929071",
      availableLanguage: ["Portuguese"],
      areaServed: "BR",
    },
  ],
};
