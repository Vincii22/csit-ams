import { ChevronDown, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { splitByPascalCase } from "@/lib/utils/split-by-pascalcase";
import { Input } from "../ui/input";
import { Filter, FilterType, filterTypes } from "@/lib/types";

export function FilterItemButton({
  filters,
  filter,
  removeFilter,
  updateFilter,
}: {
  filters: Filter[];
  filter: Filter;
  removeFilter: (key: string) => void;
  updateFilter: (filterKey: string, updater: (prev: Filter) => Filter) => void;
}) {
  return (
    <Popover key={`filter-${filter}-popover`}>
      <PopoverTrigger className="outline-btn !h-8 text-sm !rounded-lg">
        {filter.label}
        <ChevronDown className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="!p-3 flex flex-col gap-1"
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="text-muted-foreground text-sm uppercase">
            {filter.label}
          </span>
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm h-6 px-2 rounded-lg hover:bg-muted/30">
              {filter.type}
              <ChevronDown className="size-3.5" />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={7}
              className="!p-2 flex flex-col !w-fit"
            >
              {filterTypes.map((type: FilterType) => (
                <Button
                  key={`filter-${type}-btn`}
                  size="sm"
                  variant="ghost"
                  className="justify-start lowercase text-sm"
                  disabled={filters.some((f) => f.type === type)}
                  onClick={() =>
                    updateFilter(filter.key, (prev: Filter) => ({
                      ...prev,
                      type,
                    }))
                  }
                >
                  {splitByPascalCase(type).join(" ")}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <Input
          className="!h-8 mb-1"
          placeholder="Type a value"
          value={filter.value ?? "rah"}
          onChange={(e) =>
            updateFilter(filter.key, (prev: Filter) => ({
              ...prev,
              value: e.target.value,
            }))
          }
        />

        <Button
          size="sm"
          variant="ghost"
          className="!text-sm !text-red-400 justify-start w-full"
          onClick={() => removeFilter(filter.key)}
        >
          <Trash className="size-4" /> Remove filter
        </Button>
      </PopoverContent>
    </Popover>
  );
}
