import grupoViriatoLogoImageWhite from "@/public/images/grupo-viriato-logo-white.webp";
import precificLogoImageWhite from "@/public/images/precific-logo-image-white.webp";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { socialMediaLinks } from "@/src/constants/social-media-links";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIconClasses =
    "w-10 h-10 rounded-md text-white flex items-center justify-center transition-all hover:-translate-y-1";

  const footerLinkClasses =
    "text-white text-sm hover:underline transition-colors";

  return (
    <footer className="bg-black w-full">
      <Container variant="section">
        <Flex className="flex-col xl:flex-row justify-between gap-8 md:gap-12 lg:gap-16">
          <Column className="flex-1 space-y-4 md:space-y-6 w-full md:w-auto">
            <Row className="items-center gap-4">
              <Flex as="figure" className="relative">
                <Image
                  src={grupoViriatoLogoImageWhite}
                  alt="Grupo Viriato - Empresa de contabilidade e consultoria tributária"
                  width={120}
                  height={120}
                  sizes="120px"
                  loading="lazy"
                  className="object-contain"
                />
              </Flex>
              <span
                className="h-12 w-px bg-muted-foreground"
                aria-hidden="true"
              />
              <Flex as="figure" className="relative">
                <Image
                  src={precificLogoImageWhite}
                  alt="Precific | Plataforma de Precificação Inteligente"
                  width={140}
                  height={140}
                  sizes="140px"
                  loading="lazy"
                  className="object-contain"
                />
              </Flex>
            </Row>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm md:w-full md:max-w-none xl:max-w-lg leading-relaxed text-justify">
              O Precific é um produto oficial do Grupo Viriato, desenvolvido
              para apoiar empresas na formação de preços com precisão,
              inteligência tributária e eficiência operacional. Há mais de 40
              anos impulsionando negócios, o Grupo Viriato reúne soluções em
              contabilidade, consultoria tributária, jurídico, seguros e gestão
              empresarial, oferecendo tecnologia e expertise para transformar
              resultados.
            </p>
            <Flex as="ul" className="gap-4" aria-label="Redes sociais">
              {socialMediaLinks.map((socialMedia) => (
                <li key={socialMedia.label}>
                  <Link
                    href={socialMedia.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialIconClasses}
                    aria-label={`Visitar ${socialMedia.label}`}
                  >
                    {socialMedia.icon}
                  </Link>
                </li>
              ))}
            </Flex>
          </Column>
          <Flex
            as="nav"
            className="flex-col sm:flex-row gap-8 md:gap-12 w-full md:w-auto justify-between"
            aria-label="Links do rodapé"
          >
            {usefulLinks.map((usefulLink) => (
              <Column key={usefulLink.title} className="space-y-3 md:space-y-4">
                <h3 className="text-muted-foreground md:text-lg font-semibold">
                  {usefulLink.title}
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {usefulLink.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className={footerLinkClasses}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Column>
            ))}
          </Flex>
        </Flex>
        <div className="mt-8">
          <p className="text-muted-foreground text-xs md:text-sm text-center">
            <small>
              © {currentYear} Precific — uma solução do{" "}
              <a
                href="https://www.viriato.com.br/"
                target="_blank"
                className="hover:text-white hover:underline"
              >
                Grupo Viriato
              </a>
              . Todos os direitos reservados.
            </small>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

export const usefulLinks = [
  {
    title: "Atendimento",
    links: [
      {
        title: "contato@precificapp.com",
        href: "mailto:contato@precificapp.com",
      },
      {
        title: "+55 (21) 2292-9071",
        href: "tel:+552122929071",
      },
    ],
  },
  {
    title: "Nossas Empresas",
    links: [
      {
        title: "Viriato Contabilidade",
        href: "https://viriato.com.br/",
      },
      {
        title: "Correa & Lopes",
        href: "https://correaelopes.com.br/",
      },
      {
        title: "Viriato Gestão Imobiliária",
        href: "https://viriatoimobiliaria.com.br/",
      },
      {
        title: "J.A Lopes Advogados",
        href: "https://jalopesadvogados.com.br/",
      },
      {
        title: "Viriato Corretora de Seguros",
        href: "https://viriatocorretoradeseguros.com.br/",
      },
      {
        title: "Viriato Cast",
        href: "https://instagram.com/viriatocast/",
      },
    ],
  },
  {
    title: "Institucional",
    links: [
      {
        title: "Sobre Nós",
        href: "/sobre-nos",
      },
      {
        title: "Termos de Uso",
        href: "/termos-de-uso",
      },
      {
        title: "Política de Privacidade",
        href: "/politica-de-privacidade",
      },
    ],
  },
];
