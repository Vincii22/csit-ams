"use client";

import Table from "@/components/table";
import { User } from "@/lib/types";
import { AddOfficerForm } from "./form";
import { useEffect } from "react";

const columns = [
  { label: "Name", key: "name" },
  { label: "Position", key: "position.title" },
];

const searchKeys = ["schoolId", "name", "course.abbreviation+year"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const popovers = [
  { for: "edit", content: () => null },
  { for: "archive", content: () => null },
];

export default function ClientRolePage({ students }: { students: User[] }) {
  useEffect(() => {
    console.log(students);
  });
  return (
    <div className="flex flex-col items-center justify-center p-5 h-full w-full">
      <Table
        tableKey="roles"
        title="Manage Roles"
        columns={columns}
        rows={students}
        addActionPopup={() => <AddOfficerForm />}
        searchKeys={searchKeys}
        canFilter={false}
        canSort={false}
      />
    </div>
  );
}
