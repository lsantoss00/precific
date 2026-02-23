"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Skeleton } from "@/src/components/core/skeleton";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { useReducedMotion } from "framer-motion";
import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  yAxisKey?: string;
  barKey?: string;
  barKeys?: string[];
  layout?: "vertical" | "horizontal";
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  barRadius?: number;
  className?: string;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
  pending?: boolean;
}

const BarChart = ({
  data,
  config,
  xAxisKey,
  yAxisKey,
  barKey,
  barKeys,
  layout = "vertical",
  margin,
  barRadius = 8,
  className = "",
  tooltip,
  pending,
}: BarChartProps) => {
  const prefersReducedMotion = useReducedMotion();

  const isHorizontal = layout === "horizontal";
  const skeletonCount = 10;

  const minWidthStyle = {
    minWidth: !isHorizontal
      ? `${Math.max((pending ? skeletonCount : data.length) * 60, 300)}px`
      : "100%",
  };

  const keys =
    barKeys && barKeys.length > 0
      ? barKeys
      : barKey
        ? [barKey]
        : Object.keys(config);

  return (
    <div
      className={cn(
        "w-full h-full",
        !isHorizontal && "max-md:overflow-x-auto max-md:overflow-y-hidden",
        className,
      )}
    >
      <div style={minWidthStyle} className="h-full w-full">
        <Show
          when={!pending}
          fallback={
            <Column className="gap-4 w-full h-full">
              <Flex
                className={cn(
                  "gap-2 w-full h-full",
                  isHorizontal
                    ? "flex-col justify-between"
                    : "items-end justify-between px-2",
                )}
              >
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className={cn(
                      "rounded-sm",
                      isHorizontal ? "h-full w-full" : "w-full",
                    )}
                    style={{
                      maxWidth: !isHorizontal ? "60px" : "100%",
                      [isHorizontal ? "width" : "height"]:
                        `${[100, 90, 80, 70, 60, 50, 40, 30, 20, 10][i]}%`,
                    }}
                  />
                ))}
              </Flex>
              <Row className="border-t pt-4 px-2">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-12" />
                ))}
              </Row>
            </Column>
          }
        >
          <ChartContainer config={config} className="h-full w-full">
            <ReBarChart
              accessibilityLayer
              data={data}
              layout={isHorizontal ? "vertical" : "horizontal"}
              margin={margin}
            >
              {!isHorizontal && <CartesianGrid vertical={false} />}
              {isHorizontal ? (
                <>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey={yAxisKey}
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: any) => String(value).slice(0, 5)}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey={xAxisKey || yAxisKey}
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: any) => String(value).slice(0, 5)}
                  />
                  <YAxis type="number" hide tickLine={false} axisLine={false} />
                </>
              )}
              <ChartTooltip
                cursor={false}
                content={tooltip || <ChartTooltipContent hideLabel />}
              />
              {keys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={config[key]?.color || "var(--color-desktop)"}
                  radius={barRadius}
                  barSize={!isHorizontal ? 60 : undefined}
                  isAnimationActive={!prefersReducedMotion}
                />
              ))}
            </ReBarChart>
          </ChartContainer>
        </Show>
      </div>
    </div>
  );
};

export default BarChart;
