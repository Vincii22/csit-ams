"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import z from "zod";

export function AddOfficerForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      schoolId: "",
      yearLevel: undefined,
      course: undefined,
    },
  });

  async function onSubmit() {
  }

  return <Form {...form}></Form>;
}
