"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Filter,
  SortAsc,
  Plus,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
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

type ColumnHeader = {
  label: string;
  variable: string | string[];
  icon?: string;
};

type Sort = {
  label: string;
  direction: "asc" | "desc";
};

type Filter = {
  label: string;
  type:
    | "is"
    | "isNot"
    | "contains"
    | "doesNotContain"
    | "startsWith"
    | "endsWith"
    | "isEmpty"
    | "isNotEmpty";
};

type TableProps = {
  columns: ColumnHeader[];
  rows: any[];
  itemsPerPage?: number;
};

export default function Table({
  columns,
  rows,
  itemsPerPage = 10,
}: TableProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sorts, setSorts] = useState<Sort[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchVariables = ["schoolId", "name", "course.abbreviation+year"];

  const { search, setSearch, filteredData } = useSearch(rows, searchVariables, {
    debounce: 300,
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-5">Student List</h1>
        <div className="flex justify-between items-center gap-3 mb-5">
          <SearchBar
            value={search}
            onChangeAction={setSearch}
            placeholder="Search students..."
          />

          <div className="flex items-center gap-2">
            <TableActionPopover type="Filter" columns={columns} />
            <TableActionPopover type="Sort" columns={columns} />
          </div>
        </div>
        <div className="flex items-center h-8 gap-3">
          <SortItemButton
            columns={columns}
            sortItems={[
              { label: "Name", direction: "asc" },
              { label: "Course", direction: "desc" },
              { label: "Year", direction: "asc" },
            ]}
          />

          <Separator orientation="vertical" />

          <div className="flex items-center gap-1.5">
            <FilterItemButton filter="Name" />

            <Popover>
              <PopoverTrigger className="ghost-btn !pl-1 text-muted-foreground">
                <Plus className="size-4" /> Filter
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={7}
                className="!p-3 flex flex-col gap-1 w-fit"
              >
                <Input className="mb-2" placeholder="Filter by..." />

                {columns.map((column) => renderPopoverLabel(column))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
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

function renderColumnData(column: ColumnHeader, data: any) {
  if (Array.isArray(column.variable)) {
    return `${getNestedValue(data, column.variable[0])}-${getNestedValue(data, column.variable[1])}`;
  }

  return getNestedValue(data, column.variable);
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function renderPopoverLabel(column: ColumnHeader) {
  if (column.label.includes("&")) {
    const labels = column.label.split("&");

    return (
      <React.Fragment key={`wrapper-${column.label}-btn`}>
        <Button
          key={`filter-${labels[0]}-btn`}
          size="sm"
          variant="ghost"
          className="justify-start w-full"
        >
          {labels[0]}
        </Button>
        <Button
          key={`filter-${labels[1]}-btn`}
          size="sm"
          variant="ghost"
          className="justify-start w-full"
        >
          {labels[1]}
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Button
      key={`filter-${column.variable}-btn`}
      size="sm"
      variant="ghost"
      className="justify-start w-full"
    >
      {column.label}
    </Button>
  );
}

function SortItemButton({
  columns,
  sortItems,
}: {
  columns: ColumnHeader[];
  sortItems: Sort[];
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

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer h-9 flex items-center bg-blue-950/40 text-blue-400 gap-1.5 px-3 rounded-lg">
        {icon}
        {label}
        <ChevronDown className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="!p-3 flex flex-col gap-1 w-fit"
      >
        {sortItems.length > 1 ? (
          sortItems.map((sort, i) => (
            <SelectSortItemButton
              key={`select-sortItem-${i}`}
              columns={columns}
              sortItem={sort}
            />
          ))
        ) : (
          <SelectSortItemButton columns={columns} sortItem={sortItems[0]} />
        )}
      </PopoverContent>
    </Popover>
  );
}

function FilterItemButton({ filter }: { filter: string }) {
  return (
    <Popover key={`filter-${filter}-btn`}>
      <PopoverTrigger className="outline-btn !h-9 !rounded-lg">
        {filter}
        <ChevronDown className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="!p-3 flex flex-col gap-1"
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="text-muted-foreground">{filter}</span>
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm h-6 px-2 rounded-lg hover:bg-muted/30">
              contains
              <ChevronDown className="size-3.5" />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={7}
              className="!p-2 flex flex-col gap-1 !w-fit"
            >
              <Button size="sm" variant="ghost" className="justify-start">
                Is
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Is not
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Contains
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Does not contain
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Starts with
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Ends with
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Is empty
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Is not empty
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <Input placeholder="Type a value" />
      </PopoverContent>
    </Popover>
  );
}

function SelectSortItemButton({
  columns,
  sortItem,
}: {
  columns: ColumnHeader[];
  sortItem: Sort;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Select defaultValue={sortItem.label.toLowerCase()}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select column" />
        </SelectTrigger>
        <SelectContent>
          {columns.map((col, i) => {
            if (col.label.includes("&")) {
              const selectLabels = col.label.split("&").map((l) => l.trim());

              return (
                <React.Fragment key={`wrapper-${i}-btn`}>
                  <SelectItem
                    key={`select-${selectLabels[0]}-sort`}
                    value={selectLabels[0].toLowerCase()}
                  >
                    {selectLabels[0]}
                  </SelectItem>
                  <SelectItem
                    key={`select-${selectLabels[1]}-sort`}
                    value={selectLabels[1].toLowerCase()}
                  >
                    {selectLabels[1]}
                  </SelectItem>
                </React.Fragment>
              );
            } else {
              return (
                <SelectItem
                  key={`select-${col.label}-sort`}
                  value={typeof col.variable === "string" ? col.variable : "r"}
                >
                  {col.label}
                </SelectItem>
              );
            }
          })}
        </SelectContent>
      </Select>
      <Select defaultValue={sortItem.direction}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
      <X className="size-4 cursor-pointer text-muted-foreground hover:text-destructive transition" />
    </div>
  );
}

function TableActionPopover({
  type,
  columns,
}: {
  type: string;
  columns: ColumnHeader[];
}) {
  return (
    <Popover>
      <PopoverTrigger className="outline-btn">
        {type.toLowerCase() === "filter" ? (
          <Filter className="size-4.5" />
        ) : (
          <SortAsc className="size-4.5" />
        )}
        {type}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={7}
        className="!p-3 flex flex-col gap-1 w-fit"
      >
        <Input className="mb-2" placeholder="Filter by..." />

        {columns.map((column) => renderPopoverLabel(column))}
      </PopoverContent>
    </Popover>
  );
}
