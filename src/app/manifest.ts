import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Precific",
    short_name: "Precific",
    description:
      "Sistema de precificação e gestão tributária. Automatize o cálculo de custos, impostos e margens de lucro, reduza erros fiscais e aumente a rentabilidade. Simule os impactos da Reforma Tributária (IBS e CBS), otimize seus preços em tempo real e tome decisões estratégicas com mais segurança, precisão e conformidade fiscal.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#5e2a99",
    orientation: "portrait-primary",
    categories: ["business", "finance", "productivity"],
    lang: "pt-BR",
    icons: [
      {
        src: "/images/precific-short-logo-image.webp",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
