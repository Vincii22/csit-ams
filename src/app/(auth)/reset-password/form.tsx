"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { PasswordInput } from "../password";
import { resetPassword } from "./action";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const { error } = await resetPassword(values);

    if (error) {
      form.setError("root", { message: error.message });
      return;
    }

    setSuccess(true);

    // clear auth session to sign in again with new pass
    await supabase.auth.signOut();
  }

  if (success) {
    return (
      <div className="max-w-sm flex flex-col gap-5 items-center justify-center text-center">
        <CheckCircle className="text-green-600" size={60} />
        <h2 className="text-3xl font-bold">Password updated!</h2>
        <p className="text-muted-foreground">
          You can now use your new password to sign in.
        </p>
        <Link href="/sign-in" className="w-full">
          <Button size="lg" variant="outline" className="w-full">
            Go to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-10", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-medium">Reset your password</h1>
          <p className="text-md text-muted-foreground text-balance">
            Enter your new password below
          </p>
        </div>

        {form.formState.errors.root && (
          <Alert className="text-red-400 bg-red-950">
            <AlertCircle />
            <AlertDescription className="text-red-400">
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          <PasswordInput
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="●●●●●●" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="primary-btn w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Loader /> : "Reset password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
