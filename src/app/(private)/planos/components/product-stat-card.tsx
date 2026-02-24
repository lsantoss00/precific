import Column from "@/src/components/core/column";

interface ProducStatCardProps {
  label: string;
  value: number;
  color: string;
}

const ProducStatCard = ({ label, value, color }: ProducStatCardProps) => {
  return (
    <Column className="items-center p-3 rounded-md h-20 bg-zinc-100 hover:bg-zinc-200 transition-colors">
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
        {label}
      </span>
    </Column>
  );
};

export default ProducStatCard;
