import { loginSchema } from "@/lib/schemas/auth.schema";
import { useAuthStore } from "@/lib/state/auth.store";
import { User } from "@/lib/types";
import { z } from "zod";

const mockUser: User = {
  id: 777,
  fullName: "Caenar Arteta",
  email: "rah@gmail.com",
  password: "123",
  role: "officer",
  course: "BSIT",
  yearLevel: 3,
  schoolId: "0769696",
};

export async function mockSignIn(values: z.infer<typeof loginSchema>) {
  return new Promise<{ success: boolean; error?: string }>((resolve) => {
    setTimeout(() => {
      if (
        values.email === mockUser.email &&
        values.password === mockUser.password
      ) {
        const { setUser, setRemember } = useAuthStore.getState();
        setUser(mockUser);
        setRemember(values.remember);

        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: "Invalid credentials",
        });
      }
    }, 500);
  });
}
