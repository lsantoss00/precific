"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/src/libs/shadcn-ui/utils";
import Show from "./show";

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
}

function Label({ className, required = false, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "items-center text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 block",
        className,
      )}
      {...props}
    >
      {props.children}
      <Show when={required}>
        <span className="text-red-500 ml-1">*</span>
      </Show>
    </LabelPrimitive.Root>
  );
}

export { Label };
