import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/core/select";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface SelectInputProps {
  options: {
    value: string | number;
    label: string;
  }[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  triggerProps?: Omit<
    ComponentProps<typeof SelectTrigger>,
    "children" | "className"
  >;
}

const SelectInput = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  triggerProps,
}: SelectInputProps) => {
  const handleChange = (newValue: string) => {
    const originalOption = options.find(
      (opt) => String(opt.value) === newValue,
    );
    if (originalOption) {
      onChange(originalOption.value);
    }
  };

  const normalizedValue =
    value === undefined || value === null || value === ""
      ? undefined
      : String(value);

  return (
    <Select value={normalizedValue} onValueChange={handleChange}>
      <SelectTrigger
        {...triggerProps}
        className={twMerge("w-full text-base", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
