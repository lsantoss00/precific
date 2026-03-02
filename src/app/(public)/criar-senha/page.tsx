import PasswordForm from "@/src/app/(public)/criar-senha/components/password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Senha",
  description:
    "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  openGraph: {
    title: "Criar Senha | Precific",
    description:
      "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  },
  twitter: {
    title: "Criar Senha | Precific",
    description:
      "Configure sua senha de acesso ao Precific e comece a utilizar as ferramentas de precificação e gestão tributária.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateNewPasswordPage() {
  return <PasswordForm />;
}
