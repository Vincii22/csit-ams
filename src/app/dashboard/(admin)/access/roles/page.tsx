import { fetchStudents } from "@/lib/db/fetch-students";
import ClientRolePage from "./client-page";

export default async function RolePage() {
  const students = await fetchStudents(true);

  return <ClientRolePage students={students} />;
}
