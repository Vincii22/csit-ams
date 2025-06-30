import { z } from "zod";
import { useState } from "react";
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
import { CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SuccessMessage = () => {
  return (
    <div className="max-w-sm flex flex-col gap-5 items-center justify-center text-center">
      <CheckCircle className="text-green-600" size={60} />
      <h2 className="text-3xl font-bold">Check your email</h2>
      <p className="text-muted-foreground">
        We've successfully sent you an email to reset your password. The link
        will expire in 10 minutes.
      </p>
      <Separator />
      <Link href="/sign-in" className="w-full">
        <Button size="lg" variant="outline" className="w-full">
          Back to Sign in
        </Button>
      </Link>
    </div>
  );
};

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    await new Promise(() => {
      setTimeout(() => {
        setIsSuccess(true);
        // best of both worlds??
        toast.success("Successfully sent reset link");
      }, 1000);
    });
  }

  return (
    <>
      {isSuccess ? (
        <SuccessMessage />
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
                It's okay, we'll send you a link to reset it
              </p>
            </div>
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
                disabled={form.formState.isSubmitting ? true : false}
              >
                {form.formState.isSubmitting ? <Loader /> : "Send reset link"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Nevermind? Back to{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
