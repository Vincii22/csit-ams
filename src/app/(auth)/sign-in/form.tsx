"use client";

import { z } from "zod";
import { handleLogout } from "@/lib/auth/handle-logout";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/lib/auth/oauth";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { signIn } from "./action";
import Link from "next/link";

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
import { TbBrandGoogle } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "../password";
import Loader from "@/components/ui/loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, TriangleAlert } from "lucide-react";

type SignInFormProps = React.ComponentProps<"form"> & {
  redirectedFrom?: string | null;
};

export function SignInForm({
  redirectedFrom,
  className,
  ...props
}: SignInFormProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function checkSession() {
    const { data } = await supabase.auth.getUser();
    data.user && setLoggedIn(true);
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function handleClickLogout() {
    await handleLogout();
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { error } = await signIn(values);

    if (error) {
      form.setError("root", { message: error.message });
    }
  }

  return loggedIn ? (
    <LoggedInContainer handleClickLogout={handleClickLogout} />
  ) : (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-10", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-medium">Welcome back</h1>
          <p className="text-md text-muted-foreground text-balance">
            Sign in to your account
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

          <AlertContainer type={redirectedFrom ?? ""} />

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="07310316@dwc-legazpi.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInput
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showForgotLink={true}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Remember me (only for 3 days)</FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="primary-btn w-full"
            disabled={form.formState.isSubmitting ? true : false}
          >
            {form.formState.isSubmitting ? <Loader /> : "Sign in"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}

function LoggedInContainer({
  handleClickLogout,
}: {
  handleClickLogout: () => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-balance">
        Looks like you're still logged in
      </h1>
      <div className="grid gap-4">
        <Link href="/dashboard">
          <Button type="button" size="lg" className="primary-btn w-full">
            Proceed to dashboard
          </Button>
        </Link>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-white relative z-10 px-2">
            or
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full"
          onClick={handleClickLogout}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

function AlertContainer({ type }: { type: string }) {
  switch (type) {
    case "/dashboard":
      return (
        <Alert className="text-yellow-400 bg-yellow-950">
          <TriangleAlert />
          <AlertDescription className="text-yellow-400">
            Sign in to continue to the dashboard
          </AlertDescription>
        </Alert>
      );
    default:
      return null;
  }
}
