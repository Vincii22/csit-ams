import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbBrandGoogle } from "react-icons/tb";
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
import { PasswordInput } from "../password";
import { signUp } from "./action";
import { useAuth } from "@/shared/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { EmailDialog } from "./email-dialog";
import { usePopup } from "@/shared/contexts/popup-context";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signInWithGoogle } = useAuth();
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

  const { openPopup } = usePopup();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { success, message, email } = await signUp(values);

    if (success) {
      openPopup("", <EmailDialog email={email as string} />);
    } else {
      form.setError("root", { message });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-10", className)}
        {...props}
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-medium">Get started</h1>
          <p className="text-md text-muted-foreground text-balance">
            Create a new account
          </p>
        </div>
        <div className="grid gap-6">
          <Button
            variant="outline"
            type="button"
            size="lg"
            className="w-full"
            onClick={() => signInWithGoogle()}
          >
            <TbBrandGoogle className="text-muted-foreground" />
            Continue with Google
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-white relative z-10 px-2">
              or
            </span>
          </div>

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            {form.formState.isSubmitting ? <Loader /> : "Sign up"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
