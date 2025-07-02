"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
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
import Loader from "@/components/ui/loader";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { forgotPassword } from "./action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase/client";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!showCountdown) return;

    if (countdown <= 0) {
      setShowCountdown(false);
      setCountdown(60); // reset countdown
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown, countdown]);

  async function resendLink(email: string) {
    if (!email) return;

    setResending(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setShowCountdown(true);
    setResending(false);
  }

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const { error } = await forgotPassword(values);

    if (error) {
      form.setError("root", { message: error.message });
      return;
    }

    setEmail(values.email);
    setSuccess(true);
  }

  return (
    <>
      {success ? (
        <SuccessMessage
          resend={() => resendLink(email!)}
          showCountdown={showCountdown}
          countdown={countdown}
          resending={resending}
        />
      ) : (
        <Form {...form}>
          <form
            className={cn("flex flex-col gap-10", className)}
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
          >
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-3xl font-medium">Forgot password?</h1>
              <p className="text-md text-muted-foreground text-balance">
                It's okay, we'll send you a reset link
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="07307477@dwc-legazpi.edu"
                        {...field}
                      />
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
                {form.formState.isSubmitting ? <Loader /> : "Send reset link"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Nevermind?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Back to sign in
              </Link>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const SuccessMessage = ({
  resend,
  showCountdown,
  countdown,
  resending,
}: {
  resend: () => Promise<void>;
  showCountdown: boolean;
  countdown: number;
  resending: boolean;
}) => {
  return (
    <div className="max-w-sm flex flex-col gap-5 items-center justify-center text-center">
      <CheckCircle className="text-green-600" size={60} />
      <h2 className="text-3xl font-bold">Check your email</h2>
      <p className="text-muted-foreground">
        We've successfully sent you an email to reset your password. The link
        will expire in 10 minutes.
      </p>

      <Separator />

      <Link
        href={"https://mail.google.com/mail/u/0/#inbox"}
        target="_blank" // so we can go back if link doesn't work
        className="w-full"
      >
        <Button size="lg" variant="outline" className="w-full">
          View email
        </Button>
      </Link>

      <p className="text-sm">
        {resending ? (
          <Loader />
        ) : showCountdown ? (
          <span>You can request a new link in {countdown}s.</span>
        ) : (
          <>
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={resend}
              disabled={showCountdown}
              className="text-white underline cursor-pointer"
            >
              Request a new link
            </button>
          </>
        )}
      </p>
    </div>
  );
};
