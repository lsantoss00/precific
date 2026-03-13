import SocialMediasCard from "@/src/app/(private)/suporte/components/social-medias-card";
import SupportLinkCard from "@/src/app/(private)/suporte/components/support-link-card";
import SupportPresentationCard from "@/src/app/(private)/suporte/components/support-presentation-card";
import {
  supportContactChannelsLinks,
  supportUsefulResourcesLinks,
} from "@/src/app/(private)/suporte/utils/support-links";
import { Container } from "@/src/components/core/container";
import PageTitle from "@/src/components/page-title";
import { Book, Headset, Megaphone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de ajuda e suporte do Precific. Tire suas dúvidas, acesse tutoriais e entre em contato com nossa equipe de atendimento.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportPage() {
  return (
    <Container variant="page">
      <PageTitle
        icon={<Headset size={26} className="shrink-0" />}
        title="Suporte"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SupportPresentationCard />
        <div className="flex flex-col gap-4">
          <SupportLinkCard
            icon={<Megaphone className="h-5 w-5 text-primary" />}
            backgroundIconColor="bg-primary/10"
            title="Fale Conosco"
            description="Escolha o canal de sua preferência."
            links={supportContactChannelsLinks}
          />
          <SupportLinkCard
            icon={<Book className="h-5 w-5 text-primary" />}
            backgroundIconColor="bg-primary/10"
            title="Links Úteis"
            description="Informações e documentação do sistema."
            links={supportUsefulResourcesLinks}
          />
        </div>
        <div className="lg:col-span-2 flex-1 min-h-0">
          <SocialMediasCard />
        </div>
      </div>
    </Container>
  );
}
