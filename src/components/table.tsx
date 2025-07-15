"use client";

import { Filter, Search, SortAsc } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { IconSizes } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TableProps = {};

const MockData = () => {
  return (
    <div
      className="grid text-start items-center py-3 px-4"
      style={{ gridTemplateColumns: "10% repeat(2, 1fr) 15%" }}
    >
      <div>
        <h3>1</h3>
      </div>
      {/* data row */}
      <div>
        <h2 className="font-bold text-lg">Caenar Arteta</h2>
        <h3 className="text-muted-foreground">07310316@dwc-legazpi.edu</h3>
      </div>
      <div>
        <h3>BSIT - 3</h3>
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
  );
};
export default function Table() {
  const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);

  return (
    <>
      <div className="mb-5">
        <h1 className="font-bold text-3xl mb-5">Student List</h1>
        {/* tools */}
        <div className="flex justify-between items-center gap-3">
          <div
            className={cn(
              "transition flex items-center gap-3 border-2 border-border py-2 px-4 rounded-lg w-[25rem]",
              isInputSearchFocused && "border-muted-foreground border-2"
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
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={IconSizes.XS} />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SortAsc size={IconSizes.XS} />
              Sort
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-lg">
        {/* header */}
        <div
          className="grid text-start font-bold uppercase py-2 px-4 border-b border-border"
          style={{ gridTemplateColumns: "10% repeat(2, 1fr) 15%" }}
        >
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Course & Year</h4>
          <h4>Actions</h4>
        </div>
        {/* data container */}
        <div>
          {Array.from({ length: 8 }, (_, i) => (
            <>
              <MockData key={`haha-${i}`} />
              {i < 7 && <Separator />}
            </>
          ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
