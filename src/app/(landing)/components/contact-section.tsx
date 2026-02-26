import ContactForm from "@/src/app/(landing)/components/contact-form";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

const ContactSection = () => {
  return (
    // TO-DO: Padronizar com único Container
    <Flex
      id="contato"
      className="flex-col lg:flex-row items-stretch justify-between h-full"
    >
      <Container as="section" variant="section" className="xl:w-1/2 bg-primary">
        <Column className="flex flex-col gap-12 h-full">
          <FadeInOnScroll direction="left" offset={20}>
            <Column as="header" className="gap-4">
              <h2
                id="contact-heading"
                className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-white max-w-lg leading-tight"
              >
                Nossa equipe especializada está pronta para tirar suas dúvidas
              </h2>
              <p className="text-sm md:text-base xl:text-base 2xl:text-lg max-w-xl text-zinc-200">
                Preencha o formulário{" "}
                <span className="xl:inline hidden">ao lado</span>
                <span className="xl:hidden">abaixo</span> para que um dos nossos
                especialistas entre em contato, assim, poderemos tirar suas
                dúvidas e marcar uma demonstração gratuita!
              </p>
            </Column>
          </FadeInOnScroll>
          <FadeInOnScroll direction="left" delay={0.2} offset={16}>
            <Image
              src="/svgs/undraw_questions.svg"
              alt="Imagem ilustrativa de contato"
              width={400}
              height={400}
              priority
            />
          </FadeInOnScroll>
        </Column>
      </Container>
      <Container as="section" variant="section" className="xl:w-1/2 bg-white">
        <Column className="space-y-8 md:space-y-12 xl:space-y-20 2xl:space-y-40 items-center justify-center">
          <FadeInOnScroll direction="right" offset={20}>
            <Column className="space-y-4 md:space-y-5 w-full">
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center max-w-lg leading-tight self-center">
                Fale com um especialista agora e garanta o seu Precific!
              </h3>
              <p className="text-sm md:text-base xl:text-base 2xl:text-lg text-muted-foreground text-center max-w-xl self-center">
                Nossa equipe prestará o atendimento rápido.
              </p>
              <ContactForm />
            </Column>
          </FadeInOnScroll>
        </Column>
      </Container>
    </Flex>
  );
};
export default ContactSection;
