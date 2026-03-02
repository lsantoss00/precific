import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import { ReactNode } from "react";

interface InfoPageLayoutProps {
  children: ReactNode;
}

export default function InfoPageLayout({ children }: InfoPageLayoutProps) {
  return (
    <Container
      as="article"
      variant="section"
      className="z-10 bg-white 2xl:px-0!"
    >
      <Column className="max-w-7xl m-auto">{children}</Column>
    </Container>
  );
}
