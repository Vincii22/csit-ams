"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface StudentDTO {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  course: string;
  position: string | null;
  year: number | null;
}

export const columns: ColumnDef<StudentDTO>[] = [
  {
    accessorKey: "schoolId",
    header: () => <h1 className="pl-4">ID</h1>,
    cell: ({ row }) => <div className="pl-4">{row.getValue("schoolId")}</div>,
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const raw = row.original;
      return (
        <div className="grid gap-2 ">
          <h2 className="font-bold">{raw.name}</h2>
          <h3 className="text-muted-foreground text-sm">{raw.email}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => <h3>{row.getValue("course")}</h3>,
  },
  {
    id: "action",
    cell: () => (
      <div className="flex pr-4 items-center gap-3 justify-end">
        <Button size="sm">Edit</Button>
        <Button size="sm" variant="outline">
          Archive
        </Button>
      </div>
    ),
  },
];
