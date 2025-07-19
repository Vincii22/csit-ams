/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { FilterIcon, SortAsc, Plus, Ellipsis } from "lucide-react";
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
import { SortItemButton } from "./buttons/sort-item";
import { FilterItemButton } from "./buttons/filter-item";
import { useTable } from "@/shared/hooks/use-table";
import type { Action, ColumnHeader, Filter, Sort } from "@/lib/types";

type TableProps = {
  tableKey: string;
  columns: ColumnHeader[];
  rows: any[];
  searchKeys: string[];
  actions?: Action[];
  popovers?: React.ReactNode[];
  itemsPerPage?: number;
};

export default function Table({
  tableKey,
  columns,
  rows,
  searchKeys,
  actions,
  popovers,
  itemsPerPage = 10,
}: TableProps) {
  const defaultActions: Action[] = [
    { label: "Edit", popover: null },
    { label: "Archive", popover: null },
  ];

  const finalActions = useMemo(() => {
    const base = actions ?? defaultActions;

    return base.map((action, i) => ({
      ...action,
      popover: popovers?.[i] ?? action.popover ?? null,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, popovers]);

  const {
    search,
    setSearch,
    filters,
    addFilter,
    removeFilter,
    updateFilter,
    sort: sortItems,
    setSort,
    addSort,
    removeSort,
    updateSort,
    currentPage,
    setCurrentPage,
  } = useTable(tableKey);

  const { filteredData: searchResults } = useSearch(
    rows,
    searchKeys,
    search,
    setSearch,
    {
      debounce: 300,
    },
  );

  const filteredData = useTableFilter(searchResults, filters);
  const finalSortItems = [...sortItems].sort((a, b) => a.order - b.order);
  const finalData = useTableSort(filteredData, finalSortItems);

  const totalPages = Math.ceil(finalData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = finalData.slice(startIndex, startIndex + itemsPerPage);

  const filterableColumns = columns.flatMap(
    (col) => col.filterable ?? [{ label: col.label, key: col.key }],
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
              addFilter={addFilter}
            />
            <TableActionPopover
              type="Sort"
              columns={filterableColumns}
              sortItems={sortItems}
              addSort={addSort}
            />
            <Button size="sm" className="primary-btn !h-9.5 !rounded-xl">
              <Plus className="size-4" /> Add
            </Button>
          </div>
        </div>
        {(sortItems.length >= 1 || filters.length >= 1) && (
          <div className="flex items-center h-6 gap-3">
            {sortItems.length >= 1 && (
              <>
                <SortItemButton
                  columns={filterableColumns}
                  sortItems={sortItems}
                  setSort={setSort}
                  addSort={addSort}
                  removeSort={removeSort}
                  updateSort={updateSort}
                />
                <Separator orientation="vertical" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              {filters.map((filter, i) => (
                <FilterItemButton
                  key={`filter-${i}-btn`}
                  filters={filters}
                  filter={filter}
                  removeFilter={removeFilter}
                  updateFilter={updateFilter}
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
                      addFilter,
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
            <h4 key={`header-${column.key}`}>{column.label}</h4>
          ))}

          <h4>Actions</h4>
        </div>

        <div className="bg-muted/10">
          {paginatedData.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center gap-1 p-7">
              <TbMoodConfuzed size={92} strokeWidth={1.8} />
              <p className="font-bold text-2xl">No results</p>
              <p className="text-muted-foreground text-sm leading-[1.2] text-center">
                Try the following keys:
                <br />
                {searchKeys.join(", ")}
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
                      <div key={`row-${column.key}`}>
                        <h2 className="font-bold text-lg">{data.name}</h2>
                        <h3 className="text-muted-foreground">{data.email}</h3>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`row-${column.key}`}>
                        <h3>{renderColumnData(column, data)}</h3>
                      </div>
                    );
                  }
                })}
                <div className="flex items-center gap-3">
                  {finalActions.length <= 2 ? (
                    <>
                      {finalActions.map((action, i) => (
                        <Button
                          key={`action-${action.label}-btn`}
                          size="sm"
                          className={cn(i === 0 && "primary-btn")}
                          variant={i === 1 ? "outline" : "default"}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </>
                  ) : (
                    <Button size="sm" variant="ghost">
                      <Ellipsis className="size-5" />
                    </Button>
                  )}
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
  addSort,
  filters,
  addFilter,
}: {
  type: "Filter" | "Sort";
  columns: ColumnHeader[];
  sortItems?: Sort[];
  addSort?: (sort: Sort) => void;
  filters?: Filter[];
  addFilter?: (filter: Filter) => void;
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
            addSort,
            filters,
            addFilter,
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
  addSort?: (sort: Sort) => void,
  filters?: Filter[],
  addFilter?: (filter: Filter) => void,
) {
  const isFilter = type === "filter";

  const createButton = (label: string, key: string) => {
    const isDisabled = isFilter
      ? filters?.some((f) => f.key === key)
      : sortItems?.some((s) => s.key === key);

    const handleClick = () => {
      if (isFilter && addFilter) {
        addFilter({
          label: label.trim(),
          key,
          type: "contains",
          value: "",
        });
      } else if (!isFilter && addSort && sortItems) {
        addSort({
          label: label.trim(),
          key,
          direction: "asc",
          order: sortItems.length,
        });
      }
    };

    return (
      <Button
        key={`${type}-${label}-btn`}
        size="sm"
        variant="ghost"
        className="justify-start w-full text-sm"
        disabled={isDisabled}
        onClick={handleClick}
      >
        {label.trim()}
      </Button>
    );
  };

  if (Array.isArray(column.key) && column.label.includes("&")) {
    const labelParts = column.label.split("&").map((l) => l.trim());

    return (
      <React.Fragment key={`wrapper-${column.label}-btn`}>
        {column.key.map((key, i) => createButton(labelParts[i] ?? key, key))}
      </React.Fragment>
    );
  }

  return createButton(column.label, column.key as string);
}

function renderColumnData(column: ColumnHeader, data: any) {
  if (Array.isArray(column.key)) {
    return `${getValueByPath(data, column.key[0])}-${getValueByPath(data, column.key[1])}`;
  }

  return getValueByPath(data, column.key);
}
