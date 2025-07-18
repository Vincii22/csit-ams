import Table from "@/components/table";
import { fetchStudents } from "@/lib/db/fetch-students";

const columns = [
  { label: "ID", variable: "schoolId" },
  { label: "Name", variable: "name" },
  { label: "Course & Year", variable: ["course.abbreviation", "year"] },
];

export default async function StudentsPage() {
  const students = await fetchStudents();

  return (
    <div className="flex flex-col items-center justify-center p-5 h-full w-full">
      <Table columns={columns} rows={students} />
    </div>
  );
}
