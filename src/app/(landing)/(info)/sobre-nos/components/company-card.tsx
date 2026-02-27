import { CompanyInfoType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-info-type";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface CompanyCardProps {
  company: CompanyInfoType;
  isLast?: boolean;
}

const CompanyCard = ({ company, isLast = false }: CompanyCardProps) => {
  return (
    <Row className="gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      <Column className="items-center pt-2 shrink-0">
        <div className="bg-primary text-primary-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-xs md:text-sm font-semibold whitespace-nowrap z-10">
          {company.foundedYear}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-border mt-2 min-h-16 sm:min-h-20" />
        )}
      </Column>
      <a
        href={company.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group block flex-1 min-w-0"
      >
        <Card className="relative overflow-hidden p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:scale-[1.02] shadow-lg">
          <Flex className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <ExternalLink className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
            </div>
            <Card className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 shrink-0 items-center justify-center overflow-hidden p-2 sm:p-3 md:p-4 transition-all duration-300">
              <Image
                src={company.image}
                alt={company.name}
                width={112}
                height={112}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 112px"
                loading="lazy"
                className="object-contain w-full h-full md:grayscale transition-all duration-500 ease-out md:group-hover:grayscale-0"
              />
            </Card>
            <Column className="gap-2 sm:gap-2.5 md:gap-3 flex-1 min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                {company.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {company.description}
              </p>
            </Column>
          </Flex>
        </Card>
      </a>
    </Row>
  );
};

export default CompanyCard;
