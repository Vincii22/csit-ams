import { fetchStudents } from "@/lib/db/fetch-students";
import ClientStudentsPage from "./client-page";

export default async function StudentsPage() {
  const students = await fetchStudents();

  return <ClientStudentsPage students={students} />;
}
