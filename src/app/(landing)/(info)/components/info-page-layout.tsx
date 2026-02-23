import { Container } from "@/src/components/core/container";
import SectionWithBackground from "@/src/components/section-with-background";
import { ReactNode } from "react";

interface InfoPageLayoutProps {
  children: ReactNode;
}

export default function InfoPageLayout({ children }: InfoPageLayoutProps) {
  return (
    <SectionWithBackground as="article">
      <Container variant="section" className="lg:px-20 xl:px-25 z-10">
        {children}
      </Container>
    </SectionWithBackground>
  );
}
