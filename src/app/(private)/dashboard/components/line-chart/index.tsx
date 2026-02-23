"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Skeleton } from "@/src/components/core/skeleton";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { useReducedMotion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  TooltipProps,
  XAxis,
} from "recharts";

interface LineChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  lineType?:
    | "step"
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "bumpX"
    | "bumpY"
    | "bump"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "stepBefore"
    | "stepAfter";
  strokeWidth?: number;
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
  className?: string;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
  pending?: boolean;
}

const LineChart = ({
  data,
  config,
  xAxisKey,
  lineType = "monotone",
  strokeWidth = 2,
  margin = { top: 12, left: 12, right: 12, bottom: 5 },
  className = "",
  tooltip,
  pending,
}: LineChartProps) => {
  const prefersReducedMotion = useReducedMotion();

  const lineKeys = Object.keys(config).filter(
    (key) => key !== xAxisKey && config[key]?.label,
  );

  return (
    <div
      className={cn(
        "w-full h-full max-md:overflow-x-auto max-md:overflow-y-hidden",
        className,
      )}
    >
      <Show
        when={!pending}
        fallback={
          <Column className="w-full h-full gap-4">
            <Row className="relative w-full h-full items-center px-4">
              <Row className="w-full justify-between items-center relative z-10">
                {[40, 60, 45, 90, 65, 30, 80, 55].map((h, i) => (
                  <Column key={i} className="items-center gap-2">
                    <Skeleton
                      className="w-3 h-3 rounded-full"
                      style={{ marginTop: `${100 - h}px` }}
                    />
                  </Column>
                ))}
              </Row>
            </Row>
            <Row className="justify-between border-t pt-4 px-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-16" />
              ))}
            </Row>
          </Column>
        }
      >
        <ChartContainer config={config} className="h-full w-full">
          <RechartsLineChart accessibilityLayer data={data} margin={margin}>
            <CartesianGrid vertical={false} />
            <Show when={xAxisKey}>
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
              />
            </Show>
            <ChartTooltip
              cursor={false}
              content={
                tooltip || (
                  <ChartTooltipContent hideLabel={lineKeys.length === 1} />
                )
              }
            />
            {lineKeys.map((key) => (
              <Line
                key={key}
                dataKey={key}
                type={lineType}
                stroke={config[key]?.color || `var(--color-${key})`}
                strokeWidth={strokeWidth}
                dot={{ r: 4, fill: config[key]?.color }}
                activeDot={{ r: 6 }}
                isAnimationActive={!prefersReducedMotion}
              />
            ))}
          </RechartsLineChart>
        </ChartContainer>
      </Show>
    </div>
  );
};

export default LineChart;
