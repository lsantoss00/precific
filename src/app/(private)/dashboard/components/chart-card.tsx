import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/core/card";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerContent?: ReactNode;
  footerClassName?: string;
  headerAction?: ReactNode;
  pending?: boolean;
  fetching?: boolean;
}

const ChartCard = ({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  footerContent,
  footerClassName,
  headerAction,
  fetching,
}: ChartCardProps) => {
  return (
    <Card className={cn("rounded-md shadow-sm h-full w-full", className)}>
      <CardHeader className={cn("mb-4", headerClassName)}>
        <CardTitle>{title}</CardTitle>
        <Row className="items-center justify-between">
          <Show when={Boolean(description)}>
            <CardDescription
              className={`${Boolean(headerAction) && "max-w-44"} sm:max-w-none`}
            >
              {description}
            </CardDescription>
            {headerAction}
          </Show>
        </Row>
      </CardHeader>
      <CardContent className={contentClassName}>
        <div
          className={cn(
            "h-full w-full transition-all duration-300 ease-in-out",
            fetching
              ? "opacity-40 blur-[1px] pointer-events-none"
              : "opacity-100 blur-0",
          )}
        >
          {children}
        </div>
      </CardContent>
      <Show when={Boolean(footerContent)}>
        <CardFooter className={footerClassName}>{footerContent}</CardFooter>
      </Show>
    </Card>
  );
};

export default ChartCard;
