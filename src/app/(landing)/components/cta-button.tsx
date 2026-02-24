"use client";

import { Button, buttonVariants } from "@/src/components/core/button";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import { VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface CtaButtonProps {
  text?: string;
  variant?: ButtonVariant;
}

const CtaButton = ({
  text = "Agendar Demonstração",
  variant = "default",
}: CtaButtonProps) => {
  const { scrollToSection } = useScrollToSection();

  return (
    <Button
      className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
      variant={variant}
      onClick={() => scrollToSection("contato")}
    >
      {text}
    </Button>
  );
};

export default CtaButton;
