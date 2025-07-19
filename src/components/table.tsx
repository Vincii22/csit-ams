/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Filter,
  Trash,
  SortAsc,
  Plus,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
  Grip,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import SearchBar from "@/shared/components/search-bar";
import { useSearch } from "@/shared/hooks/use-search";
import { TbMoodConfuzed } from "react-icons/tb";
import { splitByPascalCase } from "@/lib/utils/split-by-pascalcase";
import { getValueByPath } from "@/lib/utils/get-value-by-path";
import { useTableFilter } from "@/shared/hooks/use-table-filter";
import { useTableSort } from "@/shared/hooks/use-table-sort";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type ColumnHeader = {
  label: string;
  variable: string | string[];
  icon?: string;

  // for concatenated headers
  filterable?: { label: string; variable: string }[];
  sortable?: { label: string; variable: string }[];
};

export type Sort = {
  label: string;
  variable: string;
  direction: "asc" | "desc";
  order: number;
};

export const filterTypes = [
  "is",
  "isNot",
  "contains",
  "doesNotContain",
  "startsWith",
  "endsWith",
  "isEmpty",
  "isNotEmpty",
] as const;

export type FilterType = (typeof filterTypes)[number];

export type Filter = {
  variable: string;
  label: string;
  value?: string;
  type: FilterType;
};

type TableProps = {
  tableKey: string;
  columns: ColumnHeader[];
  rows: any[];
  itemsPerPage?: number;
};

export default function Table({
  tableKey,
  columns,
  rows,
  itemsPerPage = 10,
}: TableProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sortItems, setSort] = useState<Sort[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchVariables = ["schoolId", "name", "course.abbreviation+year"];

  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(rows, searchVariables, { debounce: 300 });

  const filteredData = useTableFilter(searchResults, filters);

  const finalSortItems = [...sortItems].sort((a, b) => a.order - b.order);
  const finalData = useTableSort(filteredData, finalSortItems);

  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = finalData.slice(startIndex, startIndex + itemsPerPage);

  const filterableColumns = columns.flatMap(
    (col) => col.filterable ?? [{ label: col.label, variable: col.variable }],
  );

  useEffect(() => {
    console.log(sortItems);
  }, [sortItems]);

  return (
    <div id={tableKey} className="flex flex-col h-full w-full">
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-5">Student List</h1>
        <div
          className={cn(
            "flex justify-between items-center gap-3",
            (sortItems.length >= 1 || filters.length >= 1) && "mb-5",
          )}
        >
          <SearchBar
            value={search}
            onChangeAction={setSearch}
            placeholder="Search students..."
          />

          <div className="flex items-center gap-2">
            <TableActionPopover
              type="Filter"
              columns={filterableColumns}
              filters={filters}
              setFilters={setFilters}
            />
            <TableActionPopover
              type="Sort"
              columns={filterableColumns}
              sortItems={sortItems}
              setSort={setSort}
            />
          </div>
        </div>
        {(sortItems.length >= 1 || filters.length >= 1) && (
          <div className="flex items-center h-6 gap-3">
            {sortItems.length >= 1 && (
              <>
                <SortItemButton
                  setSort={setSort}
                  columns={filterableColumns}
                  sortItems={sortItems}
                />
                <Separator orientation="vertical" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              {filters.map((filter, i) => (
                <FilterItemButton
                  key={`filter-${i}-btn`}
                  filters={filters}
                  setFilters={setFilters}
                  filter={filter}
                />
              ))}

              <Popover>
                <PopoverTrigger className="ghost-btn !pl-1 text-muted-foreground text-sm">
                  <Plus className="size-4" /> Filter
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={7}
                  className="!p-3 flex flex-col w-[10rem]"
                >
                  <span className="text-muted-foreground text-sm uppercase mb-2.5">
                    Filter by
                  </span>
                  {filterableColumns.map((column) =>
                    renderPopoverLabel(
                      "filter",
                      column,
                      undefined,
                      undefined,
                      filters,
                      setFilters,
                    ),
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>

      <div className="border border-border rounded-lg">
        <div
          className="grid text-start font-bold uppercase py-2 px-4 border-b border-border bg-muted/25"
          style={{ gridTemplateColumns: "10% repeat(2, 1fr) 15%" }}
        >
          {columns.map((column) => (
            <h4 key={`header-${column.variable}`}>{column.label}</h4>
          ))}

          <h4>Actions</h4>
        </div>

        <div className="bg-muted/10">
          {paginatedData.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center gap-1 p-7">
              <TbMoodConfuzed size={92} strokeWidth={1.8} />
              <p className="font-bold text-2xl">No results</p>
              <p className="text-muted-foreground text-sm leading-[1.2] text-center">
                Try the following variables:
                <br />
                {searchVariables.join(", ")}
              </p>
            </div>
          )}
          {paginatedData.map((data, i) => (
            <div key={data.id}>
              <div
                className={cn(
                  "grid text-start items-center py-3 px-4",
                  i < paginatedData.length - 1 && "border-b border-border",
                )}
                style={{ gridTemplateColumns: "10% repeat(2, 1fr) 15%" }}
              >
                {columns.map((column) => {
                  if (column.label.toLowerCase().trim() === "name") {
                    return (
                      <div key={`row-${column.variable}`}>
                        <h2 className="font-bold text-lg">{data.name}</h2>
                        <h3 className="text-muted-foreground">{data.email}</h3>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`row-${column.variable}`}>
                        <h3>{renderColumnData(column, data)}</h3>
                      </div>
                    );
                  }
                })}
                <div className="flex items-center gap-3">
                  <Button size="sm" className="primary-btn">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function SortItemButton({
  sortItems,
  setSort,
  columns,
}: {
  sortItems: Sort[];
  setSort: React.Dispatch<React.SetStateAction<Sort[]>>;
  columns: ColumnHeader[];
}) {
  const hasMultiple = sortItems.length > 1;

  const label = hasMultiple
    ? `${sortItems.length} sorts`
    : (sortItems[0]?.label ?? "Sort");

  const icon = hasMultiple ? (
    <ArrowUpDown className="size-4" />
  ) : sortItems[0]?.direction === "asc" ? (
    <ArrowUp className="size-4" />
  ) : (
    <ArrowDown className="size-4" />
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortItems.findIndex((s) => s.variable === active.id);
    const newIndex = sortItems.findIndex((s) => s.variable === over.id);

    const newSorted = arrayMove(sortItems, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));

    setSort(newSorted);
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer h-8 flex text-sm items-center bg-blue-950/40 text-blue-400 gap-1.5 px-3 rounded-lg">
        {icon}
        {label}
        <ChevronDown className="size-4" />
      </PopoverTrigger>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <PopoverContent
          key={JSON.stringify(sortItems.map((s) => s.variable))}
          align="start"
          sideOffset={7}
          className="!p-3 flex flex-col w-fit"
        >
          <SortableContext
            items={[...sortItems]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((s) => s.variable)}
            strategy={verticalListSortingStrategy}
          >
            {[...sortItems]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((sort, i) => (
                <SelectSortItemButton
                  key={`select-sortItem-${i}`}
                  sortItems={sortItems}
                  setSort={setSort}
                  columns={columns}
                  sort={sort}
                />
              ))}
          </SortableContext>
          <Popover>
            <PopoverTrigger className="ghost-btn !text-sm !text-muted-foreground justify-start w-full">
              <Plus className="size-4" /> Sort
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={7}
              className="!p-3 flex flex-col w-[10rem]"
            >
              <span className="text-muted-foreground text-sm uppercase mb-2.5">
                Sort by
              </span>
              {columns.map((column) =>
                renderPopoverLabel("sort", column, sortItems, setSort),
              )}
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            variant="ghost"
            className="!text-sm !text-red-400 justify-start w-full"
            onClick={() => setSort([])}
          >
            <Trash className="size-4" /> Clear all
          </Button>
        </PopoverContent>
      </DndContext>
    </Popover>
  );
}

function SelectSortItemButton({
  setSort,
  columns,
  sort,
}: {
  sortItems: Sort[];
  setSort: React.Dispatch<React.SetStateAction<Sort[]>>;
  columns: ColumnHeader[];
  sort: Sort;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sort.variable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateSort = (updater: (prev: Sort) => Sort) => {
    setSort((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((s) => s.variable === sort.variable);
      if (index !== -1) {
        updated[index] = updater(updated[index]);
      }
      return updated;
    });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-2 cursor-grab bg-popover"
        {...attributes}
        {...listeners}
      >
        <Grip className="size-4 text-muted-foreground" />
        <Select
          defaultValue={sort.variable}
          onValueChange={(val) => {
            const matchedColumn = columns.find((col) => {
              if (Array.isArray(col.variable)) {
                return col.variable.includes(val);
              }
              return col.variable === val;
            });

            const label = matchedColumn?.label.includes("&")
              ? matchedColumn.label
                  .split("&")
                  [matchedColumn.variable.indexOf(val)]?.trim()
              : matchedColumn?.label;

            updateSort((prev) => ({
              ...prev,
              variable: val,
              label: label ?? val,
            }));
          }}
        >
          <SelectTrigger className="w-[130px] !h-8">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((col, i) => {
              if (Array.isArray(col.variable) && col.label.includes("&")) {
                const selectLabels = col.label.split("&").map((l) => l.trim());
                return (
                  <React.Fragment key={`wrapper-${i}-btn`}>
                    {col.variable.map((v, j) => (
                      <SelectItem key={v} value={v}>
                        {selectLabels[j] ?? v}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                );
              }

              return (
                <SelectItem
                  key={col.variable as string}
                  value={col.variable as string}
                >
                  {col.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select
          defaultValue={sort.direction}
          onValueChange={(val) =>
            updateSort((prev) => ({
              ...prev,
              direction: val as "asc" | "desc",
            }))
          }
        >
          <SelectTrigger className="w-[130px] !h-8">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <X
        className="size-4 cursor-pointer text-muted-foreground hover:text-red-400 transition"
        onClick={() =>
          setSort((prev) => prev.filter((s) => s.variable !== sort.variable))
        }
      />
    </div>
  );
}

function FilterItemButton({
  filters,
  setFilters,
  filter,
}: {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  filter: Filter;
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
                  onClick={() => {
                    setFilters((prev) => {
                      const updated = [...prev];
                      const existingIndex = updated.findIndex(
                        (f) => f.variable === filter.variable,
                      );

                      if (existingIndex !== -1) {
                        updated[existingIndex].type = type;
                      }

                      return updated;
                    });
                  }}
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
          value={
            filters.find((f) => f.variable === filter.variable)?.value ?? ""
          }
          onChange={(e) => {
            const inputValue = e.target.value;

            setFilters((prev) => {
              const updated = [...prev];
              const existingIndex = updated.findIndex(
                (f) => f.variable === filter.variable,
              );

              if (existingIndex !== -1) {
                updated[existingIndex].value = inputValue;
              } else {
                updated.push({
                  label: filter.label,
                  variable: filter.variable,
                  type: filter.type,
                  value: inputValue,
                });
              }

              return updated;
            });
          }}
        />

        <Button
          size="sm"
          variant="ghost"
          className="!text-sm !text-red-400 justify-start w-full"
          onClick={() => {
            setFilters((prev) =>
              prev.filter((f) => f.variable !== filter.variable),
            );
          }}
        >
          <Trash className="size-4" /> Remove filter
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function TableActionPopover({
  type,
  columns,
  sortItems,
  setSort,
  filters,
  setFilters,
}: {
  type: "Filter" | "Sort";
  columns: ColumnHeader[];
  sortItems?: Sort[];
  setSort?: React.Dispatch<React.SetStateAction<Sort[]>>;
  filters?: Filter[];
  setFilters?: React.Dispatch<React.SetStateAction<Filter[]>>;
}) {
  return (
    <Popover>
      <PopoverTrigger className="outline-btn">
        {type === "Filter" ? (
          <Filter className="size-4" />
        ) : (
          <SortAsc className="size-4" />
        )}
        {type}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={7}
        className="!p-3 flex flex-col w-[10rem]"
      >
        <span className="text-muted-foreground text-sm uppercase mb-2.5">
          {type === "Filter" ? "Filter by" : "Sort by"}
        </span>

        {columns.map((column) =>
          renderPopoverLabel(
            type.toLowerCase(),
            column,
            sortItems,
            setSort,
            filters,
            setFilters,
          ),
        )}
      </PopoverContent>
    </Popover>
  );
}

function renderPopoverLabel(
  type: string,
  column: ColumnHeader,
  sortItems?: Sort[],
  setSort?: React.Dispatch<React.SetStateAction<Sort[]>>,
  filters?: Filter[],
  setFilters?: React.Dispatch<React.SetStateAction<Filter[]>>,
) {
  const createButton = (label: string, variable: string) => {
    const isFilter = type === "filter";

    const isDisabled = isFilter
      ? filters?.some((f) => f.variable === variable)
      : sortItems?.some((s) => s.variable === variable);

    const handleClick = () => {
      if (isFilter && setFilters) {
        setFilters((prev) => {
          const exists = prev.find((f) => f.variable === variable);
          if (exists) return prev;

          return [
            ...prev,
            {
              label: label.trim(),
              variable,
              type: "contains",
              value: "",
            },
          ];
        });
      } else if (!isFilter && setSort) {
        setSort((prev) => {
          const exists = prev.find((s) => s.variable === variable);
          if (exists) return prev;

          return [
            ...prev,
            {
              label: label.trim(),
              variable,
              direction: "asc",
              order: prev.length,
            },
          ];
        });
      }
    };

    return (
      <Button
        key={`${type}-${label}-btn`}
        size="sm"
        variant="ghost"
        className="justify-start w-full text-sm"
        disabled={!!isDisabled}
        onClick={handleClick}
      >
        {label.trim()}
      </Button>
    );
  };

  if (Array.isArray(column.variable) && column.label.includes("&")) {
    const labelParts = column.label.split("&").map((l) => l.trim());

    return (
      <React.Fragment key={`wrapper-${column.label}-btn`}>
        {column.variable.map((variable, i) =>
          createButton(labelParts[i] ?? variable, variable),
        )}
      </React.Fragment>
    );
  }

  return createButton(column.label, column.variable as string);
}

function renderColumnData(column: ColumnHeader, data: any) {
  if (Array.isArray(column.variable)) {
    return `${getValueByPath(data, column.variable[0])}-${getValueByPath(data, column.variable[1])}`;
  }

  return getValueByPath(data, column.variable);
}
