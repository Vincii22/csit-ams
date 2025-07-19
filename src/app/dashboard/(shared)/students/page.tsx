import Table from "@/components/table";
import { fetchStudents } from "@/lib/db/fetch-students";

const columns = [
  { label: "ID", key: "schoolId" },
  { label: "Name", key: "name" },
  { label: "Course & Year", key: ["course.abbreviation", "year"] },
];

const searchKeys = ["schoolId", "name", "course.abbreviation+year"];

export default async function StudentsPage() {
  const students = await fetchStudents();

  return (
    <div className="flex flex-col items-center justify-center p-5 h-full w-full">
      <Table
        tableKey="studentTable"
        columns={columns}
        rows={students}
        searchKeys={searchKeys}
      />
    </div>
  );
}
