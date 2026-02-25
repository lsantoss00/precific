import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Precific",
    short_name: "Precific",
    description:
      "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS).",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#66289B",
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
