import WhatsAppIcon from "@/public/svgs/whatsapp-logo.svg";
import { SupportLinkItemType } from "@/src/app/(private)/suporte/types/support-link-item-type";
import { whatsAppHelpLink } from "@/src/constants/whatsapp-help-link";
import { Cookie, FileText, Handshake, Mail, Phone } from "lucide-react";

export const supportContactChannelsLinks: SupportLinkItemType[] = [
  {
    title: "WhatsApp",
    description: "+55 (21) 2292-9071",
    icon: <WhatsAppIcon className="h-5 w-5 text-green-600" />,
    backgroundIconColor: "bg-green-600/10",
    href: whatsAppHelpLink,
  },
  {
    title: "Email",
    description: "contato@precificapp.com",
    icon: <Mail className="h-5 w-5 text-red-600" />,
    backgroundIconColor: "bg-red-600/10",
    href: "mailto:contato@precificapp.com",
  },
  {
    title: "Telefone",
    description: "+55 (21) 2292-9071",
    icon: <Phone className="h-5 w-5 text-secondary" />,
    backgroundIconColor: "bg-secondary/10",
    href: "tel:+552122929071",
  },
];

export const supportUsefulResourcesLinks: SupportLinkItemType[] = [
  {
    title: "Sobre Nós",
    description: "Conheça o Grupo Viriato e nossa missão.",
    icon: <FileText className="h-5 w-5 text-zinc-500" />,
    href: "/sobre-nos",
  },

  {
    title: "Termos de Uso",
    description:
      "Conheça nossos termos de uso e garanta uma experiência segura e confiável.",
    icon: <Handshake className="h-5 w-5 text-zinc-500" />,

    href: "/termos-de-uso",
  },
  {
    title: "Política de Privacidade",
    description:
      "Conheça nossa política de privacidade e garanta a segurança de seus dados.",
    icon: <Cookie className="h-5 w-5 text-zinc-500" />,
    href: "/politica-de-privacidade",
  },
];
