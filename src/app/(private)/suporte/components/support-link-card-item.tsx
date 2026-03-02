import { SupportLinkItemType } from "@/src/app/(private)/suporte/types/support-link-item-type";
import Column from "@/src/components/core/column";
import { CircleQuestionMark } from "lucide-react";

interface SupportLinkCardItemProps {
  item: SupportLinkItemType;
}

const SupportLinkCardItem = ({ item }: SupportLinkCardItemProps) => {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Link para ${item.title}`}
      className="flex flex-col md:flex-row md:items-center gap-4 transition-colors duration-300 p-2 cursor-pointer rounded-md hover:bg-zinc-50 focus-visible:ring-1 ring-primary!"
    >
      <div
        className={`h-10 w-10 rounded-md flex items-center justify-center shrink-0 ${
          item.backgroundIconColor || "bg-zinc-100"
        }`}
      >
        {item.icon || <CircleQuestionMark className="h-5 w-5 text-zinc-500" />}
      </div>
      <Column>
        <h3 className="font-medium text-sm text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </Column>
    </a>
  );
};

export default SupportLinkCardItem;
