import SupportLinkCardItem from "@/src/app/(private)/suporte/components/support-link-card-item";
import { SupportLinkItemType } from "@/src/app/(private)/suporte/types/support-link-item-type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { CircleQuestionMark } from "lucide-react";

interface SupportLinkCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  backgroundIconColor?: string;
  links: SupportLinkItemType[];
}

const SupportLinkCard = ({
  title,
  description,
  icon,
  backgroundIconColor,
  links,
}: SupportLinkCardProps) => {
  return (
    <Card className="flex flex-col gap-4 rounded-md h-full">
      <CardHeader>
        <Flex className="flex-col md:flex-row md:items-center gap-3">
          <div
            className={`h-12 w-12 rounded-md flex items-center justify-center shrink-0 ${
              backgroundIconColor || "bg-neutral-100"
            }`}
          >
            {icon || (
              <CircleQuestionMark className="h-5 w-5 text-neutral-500" />
            )}
          </div>
          <Column className="gap-0.5">
            <CardTitle className="text-foreground">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </Column>
        </Flex>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-between px-6">
        {links.map((link) => (
          <SupportLinkCardItem key={link.title} item={link} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SupportLinkCard;
