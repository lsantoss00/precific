import notFoundImage from "@/public/images/404-image.webp";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "Página Não Encontrada",
  description:
    "A página que você está procurando não foi encontrada. Verifique o endereço digitado ou retorne à página inicial do Precific.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body className="antialiased bg-background min-h-screen flex flex-col items-center justify-center space-y-4 m-4">
        <Column as="main" className="gap-10" aria-label="Página não encontrada">
          <Image
            src={notFoundImage}
            alt="Página não encontrada"
            width={500}
            height={500}
            className="flex self-center"
            aria-hidden="true"
          />
          <Column as="header" className="gap-2">
            <h1 className="text-2xl md:text-4xl font-medium text-center">
              Página não encontrada
            </h1>
            <p className="text-xs md:text-sm text-center">
              A página que você está tentando acessar não existe{" "}
              <span aria-label="emoji triste">:(</span>
            </p>
          </Column>
        </Column>
        <Link href="/produtos">
          <Button
            className="cursor-pointer h-12"
            variant="secondary"
            type="button"
          >
            <ArrowLeft aria-hidden="true" />
            Voltar para o Precific
          </Button>
        </Link>
      </body>
    </html>
  );
}
