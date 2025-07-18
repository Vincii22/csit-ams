"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Search, Filter, SortAsc } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { IconSizes } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

type ColumnHeader = {
  label: string;
  variable: string | string[];
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
  const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = rows.slice(startIndex, startIndex + itemsPerPage);

  console.log(rows);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-5">Student List</h1>
        <div className="flex justify-between items-center gap-3">
          <div
            className={cn(
              "transition flex items-center gap-3 border-2 border-border py-2 px-4 rounded-lg w-[25rem]",
              isInputSearchFocused && "border-muted-foreground",
            )}
          >
            <Search size={IconSizes.XS} className="text-muted-foreground" />
            <input
              className="!border-transparent !bg-transparent focus:outline-none w-full"
              placeholder="Search"
              onFocus={() => setIsInputSearchFocused(true)}
              onBlur={() => setIsInputSearchFocused(false)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger className="outline-btn">
                <Filter className="size-4.5" />
                Filter
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={7}
                className="!p-2 flex flex-col gap-1"
              >
                <Input className="mb-1.5" placeholder="Filter by..." />

                {columns.map((column) => (
                  <Button
                    key={`filter-${column.variable}-btn`}
                    size="sm"
                    variant="ghost"
                    className="justify-start w-full"
                  >
                    {column.label}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger className="outline-btn">
                <SortAsc className="size-4.5" />
                Sort
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={7}
                className="!p-2 flex flex-col gap-1"
              >
                <Input className="mb-1.5" placeholder="Sort by..." />

                {columns.map((column) => (
                  <Button
                    key={`sort-${column.variable}-btn`}
                    size="sm"
                    variant="ghost"
                    className="justify-start w-full"
                  >
                    {column.label}
                  </Button>
                ))}
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
  console.log(data, column);

  if (Array.isArray(column.variable)) {
    return `${getNestedValue(data, column.variable[0])}-${getNestedValue(data, column.variable[1])}`;
  }

  return getNestedValue(data, column.variable);
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
