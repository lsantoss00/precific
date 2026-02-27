import Column from "@/src/components/core/column";

interface CompanySectionBlockProps {
  id?: string;
  icon: React.ReactNode;
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

const CompanySectionBlock = ({
  id,
  icon,
  heading,
  description,
  children,
}: CompanySectionBlockProps) => (
  <Column
    id={id}
    as="header"
    className="w-full space-y-4 sm:space-y-5 md:space-y-6"
  >
    <Column className="gap-2 sm:gap-3">
      <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" aria-hidden="true">
        {icon}
      </span>
    </Column>
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
      {heading}
    </h2>
    {description && (
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    )}
    {children}
  </Column>
);

export default CompanySectionBlock;
