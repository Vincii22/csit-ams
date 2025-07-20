"use server";

import { DataTable } from "@/components/data-table";
import prisma from "@/lib/prisma";
import { columns, StudentDTO } from "./column";
import { Button } from "@/components/ui/button";
import { FilterIcon, SortAscIcon } from "lucide-react";

export default async function RolePage() {
  const students = (await prisma.student
    .findMany({
      include: {
        user: true,
        course: true,
        position: true,
      },
    })
    .then((students) =>
      students.map((student) => ({
        id: student.id,
        name: student.user.name,
        schoolId: student.schoolId,
        course: student.course?.abbreviation,
        position: student.position?.title,
        year: student.year,
        email: student.user.email,
      }))
    )) as StudentDTO[];

  return (
    <div className="p-5">
      <DataTable
        data={students}
        columns={columns}
        searchFilter="name"
        actions={[
          <Button variant={"outline"}>
            <SortAscIcon /> Sort
          </Button>,
        ]}
      />
    </div>
  );
}
