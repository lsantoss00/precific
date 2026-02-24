import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import { cn } from "@/src/libs/shadcn-ui/utils";
import Image from "next/image";
import { ComponentProps, ReactNode } from "react";

type SectionWithBackgroundProps = ComponentProps<"div"> & {
  as?: React.ElementType;
  children: ReactNode;
  imagePriority?: boolean;
};

const SectionWithBackground = ({
  children,
  className,
  as: Component = "section",
  imagePriority = false,
  ...props
}: SectionWithBackgroundProps) => {
  return (
    <Component
      className={cn("relative bg-primary flex flex-col", className)}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgroundSectionImage}
          alt=""
          fill
          priority={imagePriority}
          fetchPriority={imagePriority ? "high" : "low"}
          loading={imagePriority ? "eager" : "lazy"}
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      {children}
    </Component>
  );
};

export default SectionWithBackground;
