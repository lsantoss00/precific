import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { socialMediaLinks } from "@/src/utils/social-media-links";

const SocialMediasCard = () => {
  return (
    <Card className="h-full w-full flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-10.5 rounded-md">
      <Column className="gap-1">
        <span className="text-lg font-semibold text-foreground">
          Siga o Grupo Viriato
        </span>
        <span className="text-muted-foreground text-sm">
          Acompanhe novidades e conteúdos sobre a Reforma Tributária!
        </span>
      </Column>
      <Row className="gap-3">
        {socialMediaLinks.map((socialMedia) => (
          <a
            key={socialMedia.label}
            href={socialMedia.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label={socialMedia.label}
          >
            {socialMedia.icon}
          </a>
        ))}
      </Row>
    </Card>
  );
};

export default SocialMediasCard;
