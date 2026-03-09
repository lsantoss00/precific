"use client";

import {
  Bar,
  CartesianGrid,
  BarChart as REBarChart,
  TooltipProps,
  XAxis,
} from "recharts";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

interface StackedBarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  barKeys?: string[];
  stackId?: string;
  barRadius?: number | [number, number, number, number];
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
  className?: string;
  legend?: boolean;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
  pending?: boolean;
}

const StackedBarChart = ({
  data,
  config,
  xAxisKey,
  barKeys,
  stackId,
  barRadius = 4,
  margin,
  className = "",
  legend = false,
  tooltip,
  pending,
}: StackedBarChartProps) => {
  const prefersReducedMotion = useReducedMotion();

  const keys = barKeys && barKeys.length > 0 ? barKeys : Object.keys(config);
  const skeletonCount = 10;

  const minWidthStyle = {
    minWidth: `${Math.max((pending ? skeletonCount : data.length) * 60, 300)}px`,
  };

  return (
    <div
      className={cn(
        "w-full h-full max-md:overflow-x-auto max-md:overflow-y-hidden",
        className,
      )}
    >
      <div style={minWidthStyle} className="h-full w-full">
        <Show
          when={!pending}
          fallback={
            <Column className="gap-4 w-full h-full">
              <Row className="items-end justify-between gap-2 h-full w-full px-2">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <Column
                    key={i}
                    className="w-full max-w-15 h-full justify-end"
                  >
                    <Skeleton
                      className="w-full rounded-t-sm rounded-b-none opacity-50"
                      style={{
                        height: `${[20, 35, 15, 45, 25, 15, 40, 20, 50, 20][i]}%`,
                      }}
                    />
                    <Skeleton
                      className="w-full rounded-t-none"
                      style={{
                        height: `${[35, 40, 25, 45, 40, 25, 35, 40, 40, 35][i]}%`,
                      }}
                    />
                  </Column>
                ))}
              </Row>
              <Row className="justify-between border-t pt-4 px-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-12" />
                ))}
              </Row>
            </Column>
          }
        >
          <ChartContainer config={config} className="h-full w-full">
            <REBarChart accessibilityLayer data={data} margin={margin}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => String(value).slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={tooltip || <ChartTooltipContent hideLabel />}
              />
              <Show when={legend === true}>
                <ChartLegend
                  content={
                    <ChartLegendContent
                      payload={keys.map((key) => ({
                        value: config[key]?.label || key,
                        color: config[key]?.color || "var(--secondary)",
                      }))}
                    />
                  }
                />
              </Show>
              {keys.map((key, idx) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId={stackId}
                  fill={config[key]?.color || "var(--secondary)"}
                  radius={
                    idx === keys.length - 1
                      ? Array.isArray(barRadius)
                        ? barRadius
                        : [barRadius, barRadius, 0, 0]
                      : 0
                  }
                  barSize={60}
                  isAnimationActive={!prefersReducedMotion}
                />
              ))}
            </REBarChart>
          </ChartContainer>
        </Show>
      </div>
    </div>
  );
};

export default StackedBarChart;
