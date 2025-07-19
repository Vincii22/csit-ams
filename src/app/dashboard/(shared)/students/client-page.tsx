"use client";

import Table from "@/components/table";
import { AddStudentForm } from "./_forms/add-student";
import { User } from "@/lib/types";

const columns = [
  { label: "ID", key: "schoolId" },
  { label: "Name", key: "name" },
  { label: "Course & Year", key: ["course.abbreviation", "year"] },
];

const searchKeys = ["schoolId", "name", "course.abbreviation+year"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const popovers = [
  { for: "edit", content: () => null },
  { for: "archive", content: () => null },
];

export default function ClientStudentsPage({ students }: { students: User[] }) {
  return (
    <div className="flex flex-col items-center justify-center p-5 h-full w-full">
      <Table
        tableKey="students"
        columns={columns}
        rows={students}
        addActionPopup={() => <AddStudentForm />}
        searchKeys={searchKeys}
      />
    </div>
  );
}
