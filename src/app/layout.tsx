import AtlasLinkBalloon from "@/src/components/atlas-link-balloon";
import WhatsAppHelpLinkBalloon from "@/src/components/whatsapp-help-link-balloon";
import { TanstackQueryProvider } from "@/src/providers/tanstack-query-provider";
import { OrganizationJsonLd } from "@/src/scripts/json-ld/";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "../components/core/sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

export const viewport: Viewport = {
  themeColor: "#66289B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Precific | Inteligência em Precificação e Gestão Tributária",
    template: "%s | Precific",
  },
  description:
    "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus preços em tempo real.",
  metadataBase: new URL("https://precificapp.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "precifica",
    "precificar",
    "precificação",
    "formação de preços",
    "cálculo de impostos",
    "reforma tributária",
    "gestão de custos",
    "margem de lucro",
    "sistema de precificação",
    "tributação empresarial",
    "ibs",
    "cbs",
    "inteligência tributária",
    "precificação automática",
    "gestão financeira",
    "markup",
    "dre",
  ],
  authors: [{ name: "Grupo Viriato", url: "https://viriato.com.br/" }],
  applicationName: "Precific",
  publisher: "Grupo Viriato",
  category: "Business Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7V6UhSUMH_29t_gDjX5_MR_Wo86jwLj9TT2HjaTYwOo",
  },
  openGraph: {
    type: "website",
    locale: "pt-BR",
    siteName: "Precific",
    title: "Precific | Plataforma de Precificação Inteligente",
    description:
      "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus lucros.",
    url: "https://precificapp.com",
    images: [
      {
        url: "/images/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Precific | Plataforma de Precificação Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precific | Plataforma de Precificação Inteligente",
    description:
      "A solução completa para gestão de preços e simulação da nova Reforma Tributária.",
    images: ["/images/opengraph-image.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased bg-background`}
        suppressHydrationWarning
      >
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(OrganizationJsonLd),
          }}
        />
        <TanstackQueryProvider>
          <NextTopLoader
            color="#66289B"
            height={3}
            showSpinner={false}
            crawl={false}
          />

          {children}
          <Toaster position="top-center" />
        </TanstackQueryProvider>
        <AtlasLinkBalloon />
        <WhatsAppHelpLinkBalloon />
      </body>
    </html>
  );
}
