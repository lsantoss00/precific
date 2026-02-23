import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { Skeleton } from "@/src/components/core/skeleton";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  pending: boolean;
}

const InfoCard = ({ title, value, icon, pending }: InfoCardProps) => {
  return (
    <Card className="p-6 flex flex-row justify-between items-center w-full rounded-md shadow-sm">
      <Column className="h-full">
        <Show when={!pending} fallback={<Skeleton className="h-8 w-20 mb-1" />}>
          <p className="text-3xl font-semibold">{value}</p>
        </Show>
        <span className="text-sm max-w-20 2xl:max-w-none text-muted-foreground">
          {title}
        </span>
      </Column>
      {icon}
    </Card>
  );
};

export default InfoCard;
