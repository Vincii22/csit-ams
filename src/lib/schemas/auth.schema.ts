import { z } from "zod";

const YearLevel = {
  None: "",
  First: "1",
  Second: "2",
  Third: "3",
  Fourth: "4",
} as const;

const years = z.nativeEnum(YearLevel);

const courses = z.enum(["", "BSIT", "BSCS"]);

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  schoolId: z.string().min(1, "School ID is required"),
  yearLevel: years,
  course: courses,
});
