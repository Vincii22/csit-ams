import { z } from "zod";

import { Courses, YearLevels } from "../constants";

const YearLevel = z.enum(YearLevels.map(String) as [string, ...string[]], {
  errorMap: () => ({ message: "Year level is required" }),
});

const Course = z.enum(Courses, {
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
    .min(1, "Email is required")
    .regex(/^[0-9]+@dwc-legazpi\.edu$/, "Invalid school email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .regex(/^\D*$/, "Must not contain any digits")
    .regex(/^[a-zA-Z.\s]*$/, "Must not contain special characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[0-9]+@dwc-legazpi\.edu$/, "Invalid school email address"),
  password: z.string().min(1, "Password is required"),
  schoolId: SchoolId,
  yearLevel: YearLevel,
  course: Course,
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[0-9]+@dwc-legazpi\.edu$/, "Invalid school email address"),
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
