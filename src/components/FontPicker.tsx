import React, { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const fonts = [
    {
      value: "Arial",
      label: "Arial",
    },
    {
      value: "Times New Roman",
      label: "Times New Roman",
    },
    {
      value: "Roboto",
      label: "Roboto",
    },
    {
      value: "Verdana",
      label: "Verdana",
    }
  ]

export function FontPicker({ value, onSelect }: { value: string, onSelect: (v: string) => void }) {
    const [open, setOpen] = useState(false)
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? fonts.find((font) => font.value === value)?.label
              : "Select font..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search font..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {fonts.map((font) => (
                  <CommandItem
                    key={font.value}
                    value={font.value}
                    onSelect={(currentValue) => {
                      onSelect(currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === font.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {font.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }