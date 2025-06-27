import { z } from "zod";

const YearLevel = z.enum(["1", "2", "3", "4"], {
  errorMap: () => ({ message: "Year level is required" }),
});

const Course = z.enum(["BSIT", "BSCS"], {
  errorMap: () => ({ message: "Course is required" }),
});

const SchoolId = z
  .string()
  .min(1, "School ID is required")
  .max(8, "Must not exceed 8 characters")
  .regex(/^0/, "Must start with zero")
  .regex(/^\d+$/, "Must not contain letters");

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  schoolId: SchoolId,
  yearLevel: YearLevel,
  course: Course,
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
