import ContactForm from "@/src/app/(landing)/components/contact-form";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Image from "next/image";

const ContactSection = () => {
  return (
    <Container
      id="contato"
      as="section"
      className="flex flex-col lg:flex-row p-0!"
    >
      <div className="bg-primary lg:flex-1 flex lg:justify-end px-4 sm:px-6 md:px-12 lg:px-16! 2xl:px-0!">
        <div className="w-full max-w-[calc(var(--container-7xl)/2)] py-16 flex flex-col gap-12 justify-between">
          <FadeInOnScroll direction="left" offset={20}>
            <Column className="gap-4">
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
        </div>
      </div>
      <div className="bg-white lg:flex-1 flex lg:justify-start px-4 sm:px-6 md:px-12 lg:px-16! 2xl:px-0!">
        <div className="w-full max-w-[calc(var(--container-7xl)/2)] py-16 flex flex-col items-center lg:items-end space-y-8 md:space-y-12">
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
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
