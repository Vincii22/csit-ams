"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
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

const mockStudents = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@dwc-legazpi.edu`,
  courseYear: `BSIT - ${Math.floor(i % 4) + 1}`,
}));

type TableProps = {
  columns: string[];
  rows: any[];
  itemsPerPage?: number;
};

export default function Table({ itemsPerPage = 10 }: TableProps) {
  const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = mockStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
              <PopoverTrigger>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="size-4.5" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={7}
                className="!p-2 flex flex-col gap-1"
              >
                <Input className="mb-1.5" placeholder="Filter by..." />

                <Button
                  size="sm"
                  variant="ghost"
                  className="justify-start w-full"
                >
                  ID
                </Button>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortAsc className="size-4.5" />
                  Sort
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={7}
                className="!p-2 flex flex-col gap-1"
              >
                <Input className="mb-1.5" placeholder="Sort by..." />

                <Button
                  size="sm"
                  variant="ghost"
                  className="justify-start w-full"
                >
                  ID
                </Button>
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
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Course & Year</h4>
          <h4>Actions</h4>
        </div>

        <div className="bg-muted/10">
          {paginatedData.map((student, i) => (
            <div key={student.id}>
              <div
                className={cn(
                  "grid text-start items-center py-3 px-4",
                  i < paginatedData.length - 1 && "border-b border-border",
                )}
                style={{ gridTemplateColumns: "10% repeat(2, 1fr) 15%" }}
              >
                <div>
                  <h3>{student.id}</h3>
                </div>
                <div>
                  <h2 className="font-bold text-lg">{student.name}</h2>
                  <h3 className="text-muted-foreground">{student.email}</h3>
                </div>
                <div>
                  <h3>{student.courseYear}</h3>
                </div>
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
