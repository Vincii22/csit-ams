"use client";

import Table from "@/components/table";
import { fetchStudents } from "@/lib/db/fetch-students";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    fetchStudents().then(setStudents).catch(console.error);
  }, []);

  const columns = ["Name", "Email", "Course & Year"];

  return (
    <div className="flex flex-col items-center justify-center p-5 h-full w-full">
      <Table columns={columns} rows={students} />
    </div>
  );
}
