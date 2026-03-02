import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Card } from "@/src/components/core/card";
import { ReactNode } from "react";

interface ReasonCardProps {
  reason: {
    icon: ReactNode;
    title: string;
    description: string;
  };
  delay?: number;
}

const ReasonCard = ({ reason, delay = 0 }: ReasonCardProps) => {
  return (
    <FadeInOnScroll direction="up" delay={delay} offset={16}>
      <Card
        as="article"
        className="bg-white w-full h-full p-8 space-y-3 md:space-y-4 hover:scale-[1.02]  duration-300 hover:ring-2 ring-primary"
      >
        <span
          className="[&>svg]:w-10 [&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12 text-primary"
          aria-hidden="true"
        >
          {reason?.icon}
        </span>
        <h3 className="text-xl md:text-2xl font-medium">{reason?.title}</h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {reason?.description}
        </p>
      </Card>
    </FadeInOnScroll>
  );
};

export default ReasonCard;
