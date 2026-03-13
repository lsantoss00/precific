import Column from "@/src/components/core/column";

interface CompanyTopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CompanyTopicCard = ({
  icon,
  title,
  description,
}: CompanyTopicCardProps) => (
  <Column className="relative w-full space-y-4 sm:space-y-5 md:space-y-6 rounded-md bg-white shadow-lg px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-6 xl:flex-row xl:space-y-0 xl:px-0 xl:py-0 transition-all duration-300 hover:ring-2 ring-primary hover:-translate-y-1 cursor-default">
    <Column className="w-full xl:w-auto">
      <span className="h-fit w-fit rounded-full bg-primary p-3 sm:p-4 md:p-5 text-white xl:absolute xl:-left-10 xl:top-1/2 xl:-translate-y-1/2 xl:p-6 flex [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 xl:[&>svg]:w-7 xl:[&>svg]:h-7">
        {icon}
      </span>
    </Column>
    <Column className="space-y-3 sm:space-y-4 xl:py-12 xl:pl-12 xl:pl-16 xl:pr-8 w-full xl:text-left">
      <h4 className="text-lg sm:text-xl md:text-xl xl:text-2xl font-bold">
        {title}
      </h4>
      <span className="text-sm sm:text-base md:text-base xl:text-lg text-muted-foreground leading-relaxed">
        {description}
      </span>
    </Column>
  </Column>
);

export default CompanyTopicCard;
