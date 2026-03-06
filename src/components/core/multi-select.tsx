import { Badge } from "@/src/components/core/badge";
import { Button } from "@/src/components/core/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/core/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/core/popover";
import { Separator } from "@/src/components/core/separator";
import Show from "@/src/components/core/show";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Command, CommandLoading } from "cmdk";
import { CheckIcon, ChevronDown, Loader2, XCircle, XIcon } from "lucide-react";
import * as React from "react";

export interface AnimationConfig {
  popoverAnimation?: "scale" | "slide" | "fade" | "flip" | "none";
  optionHoverAnimation?: "highlight" | "scale" | "glow" | "none";
  duration?: number;
  delay?: number;
}

const multiSelectVariants = cva("m-1 transition-all duration-300 ease-in-out", {
  variants: {
    variant: {
      default: "border-foreground/10 text-white bg-primary",
      secondary: "border-foreground/10 bg-secondary text-foreground",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface MultiSelectProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "animationConfig">,
    VariantProps<typeof multiSelectVariants> {
  options: MultiSelectOption[];
  onValueChange: (value: string[] | undefined) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  animationConfig?: AnimationConfig;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  hideSelectAll?: boolean;
  searchable?: boolean;
  autoSize?: boolean;
  singleLine?: boolean;
  popoverClassName?: string;
  disabled?: boolean;
  responsive?:
    | boolean
    | {
        mobile?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
        tablet?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
        desktop?: {
          maxCount?: number;
          hideIcons?: boolean;
          compactMode?: boolean;
        };
      };
  minWidth?: string;
  maxWidth?: string;
  deduplicateOptions?: boolean;
  resetOnDefaultValueChange?: boolean;
  closeOnSelect?: boolean;
  commandInputPlaceholder?: string;
  onScrollEnd?: () => void;
  isLoadingMore?: boolean;
  onSearch?: (value: string) => void;
  onSearchValue?: string;
  value?: string[];
}

export interface MultiSelectRef {
  reset: () => void;
  getSelectedValues: () => string[];
  setSelectedValues: (values: string[]) => void;
  clear: () => void;
  focus: () => void;
}

export const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Selecione",
      animation = 0,
      animationConfig,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      hideSelectAll = false,
      searchable = true,
      autoSize = false,
      singleLine = false,
      popoverClassName,
      disabled = false,
      responsive,
      minWidth,
      maxWidth,
      deduplicateOptions = false,
      resetOnDefaultValueChange = true,
      closeOnSelect = false,
      commandInputPlaceholder = "Busque opções...",
      onScrollEnd,
      isLoadingMore = false,
      onSearch,
      onSearchValue,
      value,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [internalSearchValue, setInternalSearchValue] = React.useState("");

    const [politeMessage, setPoliteMessage] = React.useState("");
    const [assertiveMessage, setAssertiveMessage] = React.useState("");
    const prevSelectedCount = React.useRef(selectedValues.length);
    const prevIsOpen = React.useRef(isPopoverOpen);
    const prevSearchValue = React.useRef(internalSearchValue);

    const searchValue = onSearch ? onSearchValue : internalSearchValue;

    const announce = React.useCallback(
      (message: string, priority: "polite" | "assertive" = "polite") => {
        if (priority === "assertive") {
          setAssertiveMessage(message);
          setTimeout(() => setAssertiveMessage(""), 100);
        } else {
          setPoliteMessage(message);
          setTimeout(() => setPoliteMessage(""), 100);
        }
      },
      [],
    );

    const multiSelectId = React.useId();
    const listboxId = `${multiSelectId}-listbox`;
    const triggerDescriptionId = `${multiSelectId}-description`;
    const selectedCountId = `${multiSelectId}-count`;

    const prevDefaultValueRef = React.useRef<string[]>(defaultValue);

    const arraysEqual = React.useCallback(
      (a: string[], b: string[]): boolean => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, index) => val === sortedB[index]);
      },
      [],
    );

    const resetToDefault = React.useCallback(() => {
      setSelectedValues(defaultValue);
      setIsPopoverOpen(false);
      onValueChange(defaultValue.length > 0 ? defaultValue : undefined);
    }, [defaultValue, onValueChange]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        reset: resetToDefault,
        getSelectedValues: () => selectedValues,
        setSelectedValues: (values: string[]) => {
          setSelectedValues(values);
          onValueChange(values.length > 0 ? values : undefined);
        },
        clear: () => {
          setSelectedValues([]);
          onValueChange(undefined);
        },
        focus: () => {
          if (buttonRef.current) {
            buttonRef.current.focus();
            const originalOutline = buttonRef.current.style.outline;
            const originalOutlineOffset = buttonRef.current.style.outlineOffset;
            buttonRef.current.style.outline = "2px solid hsl(var(--ring))";
            buttonRef.current.style.outlineOffset = "2px";
            setTimeout(() => {
              if (buttonRef.current) {
                buttonRef.current.style.outline = originalOutline;
                buttonRef.current.style.outlineOffset = originalOutlineOffset;
              }
            }, 1000);
          }
        },
      }),
      [resetToDefault, selectedValues, onValueChange],
    );

    const isMobile = useMediaQuery("(max-width: 639px)");
    const isTablet = useMediaQuery(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    const screenSize = React.useMemo(() => {
      if (isMobile) return "mobile";
      if (isTablet) return "tablet";
      return "desktop";
    }, [isMobile, isTablet]);

    const getResponsiveSettings = () => {
      if (!responsive) {
        return {
          maxCount: maxCount,
          hideIcons: false,
          compactMode: false,
        };
      }
      if (responsive === true) {
        const defaultResponsive = {
          mobile: { maxCount: 2, hideIcons: false, compactMode: true },
          tablet: { maxCount: 4, hideIcons: false, compactMode: false },
          desktop: { maxCount: 6, hideIcons: false, compactMode: false },
        };
        const currentSettings = defaultResponsive[screenSize];
        return {
          maxCount: currentSettings?.maxCount ?? maxCount,
          hideIcons: currentSettings?.hideIcons ?? false,
          compactMode: currentSettings?.compactMode ?? false,
        };
      }
      const currentSettings = responsive[screenSize];
      return {
        maxCount: currentSettings?.maxCount ?? maxCount,
        hideIcons: currentSettings?.hideIcons ?? false,
        compactMode: currentSettings?.compactMode ?? false,
      };
    };

    const responsiveSettings = getResponsiveSettings();

    const getPopoverAnimationClass = () => {
      if (animationConfig?.popoverAnimation) {
        switch (animationConfig.popoverAnimation) {
          case "scale":
            return "animate-scaleIn";
          case "slide":
            return "animate-slideInDown";
          case "fade":
            return "animate-fadeIn";
          case "flip":
            return "animate-flipIn";
          case "none":
            return "";
          default:
            return "";
        }
      }
      return "";
    };

    const getAllOptions = React.useCallback((): MultiSelectOption[] => {
      if (options.length === 0) return [];

      const valueSet = new Set<string>();
      const duplicates: string[] = [];
      const uniqueOptions: MultiSelectOption[] = [];

      options.forEach((option) => {
        if (valueSet.has(option.value)) {
          duplicates.push(option.value);
          if (!deduplicateOptions) {
            uniqueOptions.push(option);
          }
        } else {
          valueSet.add(option.value);
          uniqueOptions.push(option);
        }
      });

      if (process.env.NODE_ENV === "development" && duplicates.length > 0) {
        const action = deduplicateOptions
          ? "automatically removed"
          : "detected";
        console.warn(
          `MultiSelect: Duplicate option values ${action}: ${duplicates.join(
            ", ",
          )}. ` +
            `${
              deduplicateOptions
                ? "Duplicates have been removed automatically."
                : "This may cause unexpected behavior. Consider setting 'deduplicateOptions={true}' or ensure all option values are unique."
            }`,
        );
      }

      return deduplicateOptions ? uniqueOptions : options;
    }, [options, deduplicateOptions]);

    const getOptionByValue = React.useCallback(
      (value: string): MultiSelectOption | undefined => {
        const option = getAllOptions().find((option) => option.value === value);
        if (!option && process.env.NODE_ENV === "development") {
          console.warn(
            `MultiSelect: Option with value "${value}" not found in options list`,
          );
        }
        return option;
      },
      [getAllOptions],
    );

    const filteredOptions = getAllOptions().filter((option) =>
      option.label.toLowerCase().includes((searchValue || "").toLowerCase()),
    );

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(
          newSelectedValues.length > 0 ? newSelectedValues : undefined,
        );
      }
    };

    const toggleOption = (optionValue: string) => {
      if (disabled) return;
      const option = getOptionByValue(optionValue);
      if (option?.disabled) return;

      if (
        !selectedValues.includes(optionValue) &&
        selectedValues.length >= 10
      ) {
        announce(
          "Limite máximo de 10 itens selecionados atingido.",
          "assertive",
        );
        return;
      }

      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newSelectedValues);
      onValueChange(
        newSelectedValues.length > 0 ? newSelectedValues : undefined,
      );
      if (closeOnSelect) {
        setIsPopoverOpen(false);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      setSelectedValues([]);
      onValueChange(undefined);
    };

    const handleTogglePopover = () => {
      if (disabled) return;
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      if (disabled) return;
      const newSelectedValues = selectedValues.slice(
        0,
        responsiveSettings.maxCount,
      );
      setSelectedValues(newSelectedValues);
      onValueChange(
        newSelectedValues.length > 0 ? newSelectedValues : undefined,
      );
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (!onScrollEnd || isLoadingMore) return;

      const target = e.currentTarget;
      const isAtBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 50;

      if (isAtBottom) {
        onScrollEnd();
      }
    };

    const handleSearchValueChange = (value: string) => {
      if (onSearch) {
        return onSearch?.(value);
      }
      return setInternalSearchValue(value);
    };

    React.useEffect(() => {
      if (!resetOnDefaultValueChange) return;
      const prevDefaultValue = prevDefaultValueRef.current;
      if (!arraysEqual(prevDefaultValue, defaultValue)) {
        if (!arraysEqual(selectedValues, defaultValue)) {
          setSelectedValues(defaultValue);
        }
        prevDefaultValueRef.current = [...defaultValue];
      }
    }, [defaultValue, selectedValues, arraysEqual, resetOnDefaultValueChange]);

    const getWidthConstraints = () => {
      const defaultMinWidth = screenSize === "mobile" ? "0px" : "200px";
      const effectiveMinWidth = minWidth || defaultMinWidth;
      const effectiveMaxWidth = maxWidth || "100%";
      return {
        minWidth: effectiveMinWidth,
        maxWidth: effectiveMaxWidth,
        width: autoSize ? "auto" : "100%",
      };
    };

    const widthConstraints = getWidthConstraints();

    React.useEffect(() => {
      if (!isPopoverOpen) {
        setInternalSearchValue("");
        onSearch?.("");
      }
    }, [isPopoverOpen, onSearch]);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(value);
      }
    }, [value]);

    React.useEffect(() => {
      const selectedCount = selectedValues.length;
      const allOptions = getAllOptions();
      const totalOptions = allOptions.filter((opt) => !opt.disabled).length;
      if (selectedCount !== prevSelectedCount.current) {
        const diff = selectedCount - prevSelectedCount.current;
        if (diff > 0) {
          const addedItems = selectedValues.slice(-diff);
          const addedLabels = addedItems
            .map(
              (value) => allOptions.find((opt) => opt.value === value)?.label,
            )
            .filter(Boolean);

          if (addedLabels.length === 1) {
            announce(
              `${addedLabels[0]} selecionado. ${selectedCount} de ${totalOptions} opções selecionadas.`,
            );
          } else {
            announce(
              `${addedLabels.length} opções selecionadas. ${selectedCount} de ${totalOptions} total selecionadas.`,
            );
          }
        } else if (diff < 0) {
          announce(
            `Opção removida. ${selectedCount} de ${totalOptions} opções selecionadas.`,
          );
        }
        prevSelectedCount.current = selectedCount;
      }

      if (isPopoverOpen !== prevIsOpen.current) {
        if (isPopoverOpen) {
          announce(
            `Menu aberto. ${totalOptions} opções disponíveis. Use as setas para navegar.`,
          );
        } else {
          announce("Menu fechado.");
        }
        prevIsOpen.current = isPopoverOpen;
      }

      if (
        searchValue !== prevSearchValue.current &&
        searchValue !== undefined
      ) {
        if (searchValue && isPopoverOpen) {
          const filteredCount = allOptions.filter(
            (opt) =>
              opt.label.toLowerCase().includes(searchValue.toLowerCase()) ||
              opt.value.toLowerCase().includes(searchValue.toLowerCase()),
          ).length;

          announce(
            `${filteredCount} opç${
              filteredCount === 1 ? "ão encontrada" : "ões encontradas"
            } para "${searchValue}"`,
          );
        }
        prevSearchValue.current = searchValue;
      }
    }, [selectedValues, isPopoverOpen, searchValue, announce, getAllOptions]);

    return (
      <>
        <div className="sr-only">
          <div aria-live="polite" aria-atomic="true" role="status">
            {politeMessage}
          </div>
          <div aria-live="assertive" aria-atomic="true" role="alert">
            {assertiveMessage}
          </div>
        </div>

        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <div id={triggerDescriptionId} className="sr-only">
            Menu de seleção múltipla. Use as setas para navegar, Enter para
            selecionar e Escape para fechar.
          </div>
          <div id={selectedCountId} className="sr-only" aria-live="polite">
            {selectedValues.length === 0
              ? "Nenhuma opção selecionada"
              : `${selectedValues.length} opç${
                  selectedValues.length === 1
                    ? "ão selecionada"
                    : "ões selecionadas"
                }: ${selectedValues
                  .map((value) => getOptionByValue(value)?.label)
                  .filter(Boolean)
                  .join(", ")}`}
          </div>

          <PopoverTrigger asChild>
            <Button
              ref={buttonRef}
              {...props}
              onClick={handleTogglePopover}
              disabled={disabled}
              role="combobox"
              aria-expanded={isPopoverOpen}
              aria-haspopup="listbox"
              aria-controls={isPopoverOpen ? listboxId : undefined}
              aria-describedby={`${triggerDescriptionId} ${selectedCountId}`}
              aria-label={`Seleção múltipla: ${selectedValues.length} de ${
                getAllOptions().length
              } opções selecionadas. ${placeholder}`}
              className={cn(
                "flex p-1 rounded-md border min-h-12 h-auto items-center justify-between bg-white! [&_svg]:pointer-events-auto shadow-sm",
                autoSize ? "w-auto" : "w-full",
                responsiveSettings.compactMode && "min-h-8 text-sm",
                screenSize === "mobile" && "min-h-12 text-base",
                disabled && "opacity-50 cursor-not-allowed",
                className,
              )}
              style={{
                ...widthConstraints,
                maxWidth: `min(${widthConstraints.maxWidth}, 100%)`,
              }}
            >
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div
                    className={cn(
                      "flex items-center flex-nowrap!",
                      singleLine
                        ? "overflow-x-auto multiselect-singleline-scroll"
                        : "flex-wrap",
                      responsiveSettings.compactMode && "gap-0.5",
                    )}
                    style={
                      singleLine
                        ? {
                            paddingBottom: "4px",
                          }
                        : {}
                    }
                  >
                    {selectedValues
                      .slice(0, responsiveSettings.maxCount)
                      .map((value) => {
                        const option = getOptionByValue(value);
                        if (!option) {
                          return null;
                        }
                        const badgeStyle: React.CSSProperties = {
                          animationDuration: `${animation}s`,
                        };
                        return (
                          <Badge
                            key={value}
                            className={cn(
                              "text-sm w-full max-w-24 2xl:max-w-20",
                              multiSelectVariants({ variant }),
                              responsiveSettings.compactMode &&
                                "text-xs py-0.5",
                              singleLine && "shrink-0 whitespace-nowrap",
                              "[&>svg]:pointer-events-auto",
                            )}
                            style={{
                              ...badgeStyle,
                              animationDuration: `${
                                animationConfig?.duration || animation
                              }s`,
                              animationDelay: `${animationConfig?.delay || 0}s`,
                            }}
                          >
                            <span className="truncate">{option.label}</span>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  toggleOption(value);
                                }
                              }}
                              aria-label={`Remover ${option.label} da seleção`}
                              className="ml-2 h-4 w-4 cursor-pointer hover:bg-white/20 rounded-full focus:outline-none focus:ring-1 focus:ring-white/50"
                            >
                              <XCircle
                                className={cn(
                                  "h-3 w-3",
                                  responsiveSettings.compactMode &&
                                    "h-2.5 w-2.5",
                                )}
                              />
                            </div>
                          </Badge>
                        );
                      })
                      .filter(Boolean)}
                    {selectedValues.length > responsiveSettings.maxCount && (
                      <Badge
                        className={cn(
                          "text-sm",
                          multiSelectVariants({ variant }),
                          responsiveSettings.compactMode &&
                            "text-xs px-1.5 py-0.5",
                          singleLine && "shrink-0 whitespace-nowrap",
                          "[&>svg]:pointer-events-auto",
                        )}
                        style={{
                          animationDuration: `${
                            animationConfig?.duration || animation
                          }s`,
                          animationDelay: `${animationConfig?.delay || 0}s`,
                        }}
                      >
                        {`+ ${
                          selectedValues.length - responsiveSettings.maxCount
                        }`}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              clearExtraOptions();
                            }
                          }}
                          aria-label={`Remover opções extras da seleção`}
                          className="ml-2 h-4 w-4 cursor-pointer hover:bg-white/20 rounded-full focus:outline-none focus:ring-1 focus:ring-white/50"
                        >
                          <XCircle
                            className={cn(
                              "h-3 w-3",
                              responsiveSettings.compactMode && "h-2.5 w-2.5",
                            )}
                          />
                        </div>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          handleClear();
                        }
                      }}
                      aria-label={`Limpar todas as ${selectedValues.length} opções selecionadas`}
                      className="flex items-center justify-center h-4 w-4 mx-2 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm"
                    >
                      <XIcon className="h-4 w-4" />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="flex min-h-6 h-full"
                    />
                    <ChevronDown
                      className="h-4 mx-2 cursor-pointer text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span
                    className="text-muted-foreground mx-3"
                    style={{ fontSize: "16px" }}
                  >
                    {placeholder}
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Opções disponíveis"
            className={cn(
              "w-full p-0",
              getPopoverAnimationClass(),
              popoverClassName,
            )}
            style={{
              width: "var(--radix-popover-trigger-width)",
              animationDuration: `${animationConfig?.duration || animation}s`,
              animationDelay: `${animationConfig?.delay || 0}s`,
              maxHeight: screenSize === "mobile" ? "70vh" : "60vh",
              touchAction: "manipulation",
            }}
            align="start"
            side="bottom"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command shouldFilter={!onSearch}>
              {searchable && (
                <CommandInput
                  placeholder={commandInputPlaceholder}
                  onKeyDown={handleInputKeyDown}
                  value={searchValue}
                  onValueChange={handleSearchValueChange}
                  aria-label="Buscar entre as opções disponíveis"
                  aria-describedby={`${multiSelectId}-search-help`}
                />
              )}
              {searchable && (
                <div id={`${multiSelectId}-search-help`} className="sr-only">
                  Digite para filtrar opções. Use as setas para navegar pelos
                  resultados.
                </div>
              )}
              <CommandList
                onScroll={handleScroll}
                className={cn(
                  "max-h-[40vh] overflow-y-auto multiselect-scrollbar",
                  screenSize === "mobile" && "max-h-[50vh]",
                  "overscroll-behavior-y-contain",
                )}
              >
                <CommandGroup>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        aria-label={`${option.label}${
                          isSelected ? ", selecionado" : ", não selecionado"
                        }${option.disabled ? ", desabilitado" : ""}`}
                        className={cn(
                          "cursor-pointer h-12 hover:bg-primary! hover:text-white! group",
                          option.disabled && "opacity-50 cursor-not-allowed",
                        )}
                        disabled={option.disabled}
                      >
                        <span className="flex-1 truncate max-w-[90%]">
                          {option.label}
                        </span>
                        {isSelected && (
                          <CheckIcon className="h-4 w-4 text-primary ml-auto group-hover:text-white" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <Show when={isLoadingMore}>
                  <CommandLoading>
                    <Loader2 className="text-primary animate-spin m-auto mb-2" />
                  </CommandLoading>
                </Show>
                <Show when={!isLoadingMore && filteredOptions.length === 0}>
                  <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                </Show>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
export type { MultiSelectOption, MultiSelectProps };
