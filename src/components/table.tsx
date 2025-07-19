/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { FilterIcon, SortAsc, Plus } from "lucide-react";
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
import { Separator } from "./ui/separator";
import SearchBar from "@/shared/components/search-bar";
import { useSearch } from "@/shared/hooks/use-search";
import { TbMoodConfuzed } from "react-icons/tb";
import { getValueByPath } from "@/lib/utils/get-value-by-path";
import { useTableFilter } from "@/shared/hooks/use-table-filter";
import { useTableSort } from "@/shared/hooks/use-table-sort";
import { ColumnHeader, Filter, Sort } from "@/lib/types";
import { SortItemButton } from "./buttons/sort-item";
import { FilterItemButton } from "./buttons/filter-item";

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
          <FilterIcon className="size-4" />
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

export function renderPopoverLabel(
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
