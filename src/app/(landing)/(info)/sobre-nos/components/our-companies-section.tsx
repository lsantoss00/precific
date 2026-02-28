import correaLopesLogo from "@/public/images/correa-e-lopes-logo.webp";
import lopesAdvogadosLogo from "@/public/images/lopes-advogados-logo.webp";
import viriatoCastLogo from "@/public/images/viriato-cast-logo.webp";
import viriatoContabilidadeLogo from "@/public/images/viriato-contabilidade-logo.webp";
import viriatoCorretoraDeSegurosLogo from "@/public/images/viriato-corretora-de-seguros-logo.webp";
import viriatoImobiliariaLogo from "@/public/images/viriato-imobiliaria-logo.webp";
import CompanyCard from "@/src/app/(landing)/(info)/sobre-nos/components/company-card";
import { CompanyInfoType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-info-type";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";

const OurCompaniesSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      aria-labelledby="companies-heading"
    >
      <Column className="gap-6 2xl:max-w-7xl m-auto">
        <FadeInOnScroll direction="up" offset={16}>
          <h2
            id="companies-heading"
            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl leading-tight"
          >
            Nossas Empresas
          </h2>
        </FadeInOnScroll>
        <Column as="ul" className="gap-4 sm:gap-6">
          {companiesInfo.map((company, index) => (
            <FadeInOnScroll
              as="li"
              key={company.name}
              direction="up"
              offset={16}
              delay={index * 0.1}
            >
              <CompanyCard
                company={company}
                isLast={index === companiesInfo.length - 1}
              />
            </FadeInOnScroll>
          ))}
        </Column>
      </Column>
    </Container>
  );
};

export default OurCompaniesSection;

const companiesInfo: CompanyInfoType[] = [
  {
    name: "Viriato Contabilidade",
    description:
      "Há mais de 40 anos no mercado, a Viriato Contabilidade oferece soluções completas em gestão contábil, fiscal e tributária para empresas de todos os portes. Com uma equipe altamente qualificada, garantimos compliance e eficiência na gestão financeira dos nossos clientes.",
    image: viriatoContabilidadeLogo,
    externalLink: "https://viriato.com.br/",
    foundedYear: "1983",
  },
  {
    name: "Viriato Gestão Imobiliária",
    description:
      "Administradora de imóveis com expertise em gestão patrimonial completa. Oferecemos soluções personalizadas para proprietários e locatários, com transparência, tecnologia e atendimento diferenciado no mercado imobiliário.",
    image: viriatoImobiliariaLogo,
    externalLink: "https://viriatoimobiliaria.com.br/",
    foundedYear: "2003",
  },
  {
    name: "Correa & Lopes",
    description:
      "Escritório especializado em consultoria tributária e planejamento fiscal estratégico. Atuamos com foco em otimização tributária, sempre dentro da legalidade, ajudando empresas a reduzirem sua carga fiscal e aumentarem sua competitividade no mercado.",
    image: correaLopesLogo,
    externalLink: "https://correaelopes.com.br/",
    foundedYear: "2010",
  },
  {
    name: "J.A Lopes Advogados",
    description:
      "Escritório de advocacia empresarial com foco em direito tributário, corporativo e trabalhista. Nossa equipe oferece assessoria jurídica estratégica e personalizada, protegendo os interesses dos nossos clientes com excelência e comprometimento.",
    image: lopesAdvogadosLogo,
    externalLink: "https://jalopesadvogados.com.br/",
    foundedYear: "2010",
  },
  {
    name: "Viriato Corretora de Seguros",
    description:
      "Corretora de seguros especializada em soluções personalizadas para pessoas físicas e jurídicas. Oferecemos consultoria completa em seguros patrimoniais, de vida, empresariais e muito mais, sempre buscando as melhores condições do mercado para nossos clientes.",
    image: viriatoCorretoraDeSegurosLogo,
    externalLink: "https://viriatocorretoradeseguros.com.br/",
    foundedYear: "2023",
  },
  {
    name: "Viriato Cast",
    description:
      "Canal de conteúdo educacional e informativo do Grupo Viriato. Produzimos podcasts, vídeos e materiais sobre gestão empresarial, tributação, empreendedorismo e inovação, compartilhando conhecimento para impulsionar negócios.",
    image: viriatoCastLogo,
    externalLink: "https://instagram.com/viriatocast/",
    foundedYear: "2020",
  },
];
