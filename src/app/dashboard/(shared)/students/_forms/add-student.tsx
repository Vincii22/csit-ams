"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PasswordInput } from "@/app/(auth)/password";
import { Separator } from "@/components/ui/separator";

export function AddStudentForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

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

  async function onSubmit(values: z.infer<typeof registerSchema>) {}

  return (
    <Form {...form}>
      <div className="p-5 grid gap-1">
        <h3 className="font-bold text-xl">Add student</h3>
        <p className="text-muted-foreground">
          Fill up the form to add a student
        </p>
      </div>

      <Separator />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("p-5 flex flex-col gap-10", className)}
        {...props}
      >
        {form.formState.errors.root && (
          <Alert className="text-red-400 bg-red-950">
            <AlertCircle />
            <AlertDescription className="text-red-400">
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Manuel II M. Caballero" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="07307477@dwc-legazpi.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School ID</FormLabel>
                <FormControl>
                  <Input placeholder="07307477" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select year level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">First year</SelectItem>
                    <SelectItem value="2">Second year</SelectItem>
                    <SelectItem value="3">Third year</SelectItem>
                    <SelectItem value="4">Fourth year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BSIT">
                    Bachelor of Science Information Technology
                  </SelectItem>
                  <SelectItem value="BSCS">
                    Bachelor of Science in Computer Science
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordInput
          form={form}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <Button
          type="submit"
          size="lg"
          className="primary-btn w-full"
          disabled={form.formState.isSubmitting ? true : false}
        >
          {form.formState.isSubmitting ? <Loader /> : "Create student"}
        </Button>
      </form>
    </Form>
  );
}
