"use client";

import { Button } from "@/src/components/core/button";
import Show from "@/src/components/core/show";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { Eye, EyeOff, Search } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isSearchInput?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, isSearchInput, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const isPassword = type === "password";

    const inputType = isPassword && showPassword ? "text" : type;

    const handleFocus = () => {
      setIsFocused(true);
      const input = inputRef.current;
      if (!input) return;

      if (isMobile)
        return setTimeout(() => {
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
    };

    return (
      <div className="relative w-full">
        <Show when={isSearchInput}>
          <Search
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors pointer-events-none",
              isFocused ? "text-primary" : "text-foreground",
            )}
          />
        </Show>
        <input
          ref={ref}
          type={inputType}
          onFocus={handleFocus}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground border w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base! shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1",
            "aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-12 bg-white",
            error && "border-red-500",
            isPassword && "pr-10",
            isSearchInput && "pl-10",
            className,
          )}
          aria-invalid={!!error}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <Show when={isPassword}>
          <Button
            type="button"
            variant="link"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-500 focus:outline-none transition-colors !pr-0"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            tabIndex={-1}
          >
            <Show when={showPassword} fallback={<Eye className="h-5 w-5" />}>
              <EyeOff className="h-5 w-5" />
            </Show>
          </Button>
        </Show>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
