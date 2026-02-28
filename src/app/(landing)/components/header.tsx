"use client";

import shortLogoImage from "@/public/images/precific-short-logo-image.webp";
import { Container } from "@/src/components/core/container";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/src/components/core/button";
import MobileMenu from "./mobile-menu";

const navItems = [
  { label: "Descubra", section: "descubra" },
  { label: "Planos", section: "planos" },
  { label: "Converse conosco", section: "contato" },
] as const;

const Header = () => {
  const { scrollToSection, scrollToTop } = useScrollToSection();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-background border-b border-zinc-200">
      <Container
        variant="section"
        className="flex items-center justify-between h-full py-0! 2xl:px-0 m-auto 2xl:max-w-7xl"
      >
        <nav className="flex items-center space-x-4 md:space-x-8">
          <Image
            src={shortLogoImage}
            alt="Precific | Plataforma de Precificação Inteligente"
            width={48}
            height={48}
            sizes="48px"
            className="cursor-pointer hover:scale-[1.05] transition-all"
            onClick={() => scrollToTop()}
          />
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map(({ label, section }) => (
              <li key={label}>
                <Button
                  variant="ghost"
                  onClick={() =>
                    section ? scrollToSection(section) : scrollToTop()
                  }
                  className="text-sm lg:text-base text-zinc-800 hover:text-primary font-medium transition-colors py-2 px-0 h-auto border-b-2 border-transparent hover:border-primary hover:bg-transparent! rounded-none"
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          asChild
          className="hidden md:flex w-fit h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-medium"
        >
          <Link href="/entrar">Acessar Plataforma</Link>
        </Button>
        <MobileMenu />
      </Container>
    </header>
  );
};

export default Header;
