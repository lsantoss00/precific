"use client";

import { dateFormatter } from "@/src/helpers/date-formatter";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { pt } from "react-day-picker/locale";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Show from "./show";

interface DatePickerProps {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
}

function DatePicker({ value, onValueChange }: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const transactionDateFormatted = value && value?.toISOString();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          className="w-full h-12 justify-between font-normal text-muted-foreground text-base bg-white! border border-foreground/10!"
        >
          <Show
            when={value}
            fallback={<span className="text-muted-foreground">Selecione</span>}
          >
            <span className="text-foreground">
              {dateFormatter(transactionDateFormatted!)}
            </span>
          </Show>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden p-0 w-fit">
        <Calendar
          locale={pt}
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
