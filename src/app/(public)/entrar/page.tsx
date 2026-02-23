import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
  keywords: ["login", "entrar", "acessar conta", "área do cliente", "precific"],
  openGraph: {
    title: "Entrar | Precific",
    description:
      "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
    url: "https://precificapp.com/entrar",
  },
  twitter: {
    title: "Entrar | Precific",
    description:
      "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente.",
  },
  alternates: {
    canonical: "/entrar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <Column className="items-center justify-center h-screen w-screen px-4">
      <LoginForm />
      <Link href="/" className="flex self-center w-fit my-2" passHref>
        <Button type="button" variant="link" className="text-xs sm:text-sm">
          Caiu de paraquedas? Conheça o Precific!
        </Button>
      </Link>
    </Column>
  );
}
