import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { currencyFormatter } from "@/src/helpers/currency-formatter";

type VariantType = "primary" | "secondary" | "neutral" | "success" | "error";

export interface MetricCardProps {
  title: string;
  value: number;
  secondValue?: number;
  variant?: VariantType;
  type?: "percentage" | "currency";
  className?: string;
}

const MetricCard = ({
  title,
  value,
  secondValue,
  variant = "neutral",
  type = "currency",
  className,
}: MetricCardProps) => {
  const formatValue = (value: number) => {
    if (value === undefined) return 0;

    return type === "currency"
      ? currencyFormatter(value * 100)
      : `${value.toFixed(2)}%`;
  };

  return (
    <Column
      className={`${className} ${variantStyles[variant]} space-y-2 rounded-md p-4 h-full justify-center`}
    >
      <span className="text-sm">{title}</span>
      <Column>
        <p className="text-2xl font-semibold">{formatValue(value)}</p>
        <Show when={secondValue}>
          <Row className="items-center bg-primary/10 justify-center min-w-fit w-22 rounded-md px-2 py-1 gap-2">
            <p className="text-sm font-semibold text-center">
              {formatValue(secondValue || 0)}
            </p>
            <CustomTooltip
              message="Este é o valor que o seu produto possui hoje."
              className={`${variantStyles[variant]}`}
            />
          </Row>
        </Show>
      </Column>
    </Column>
  );
};

export default MetricCard;

const variantStyles: Record<VariantType, string> = {
  primary: "bg-primary text-white!",
  secondary: "bg-secondary text-white!",
  neutral: "bg-gray-200 text-black!",
  success: "bg-green-600 text-white!",
  error: "bg-red-600 text-white!",
};
