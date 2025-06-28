"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
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
import { TbBrandGoogle } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/ui/loader";
import { PasswordInput } from "../password";
import { usePopup } from "@/shared/contexts/popup-context";
import { ConfirmActionData } from "@/lib/types";
import { mockSignIn } from "./action";
import { toast } from "sonner";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { openPopup, closePopup, openConfirmPopup } = usePopup();

  const confirmActionData: ConfirmActionData = {
    title: "Restore Duolingo streak?",
    description:
      "Are you sure you want to restore your Duolingo streak? This action is irreversible!",
    confirmLabel: "Restore",
  };

  const openTestPopup = () =>
    openPopup(
      "",
      <div className="grid gap-5">
        <div>
          <h3 className="text-xl font-semibold">Duolingo Streak</h3>
          <p className="text-muted-foreground">Written by Stephanie Arteta</p>
        </div>
        <p>
          There was once a time, where I had a streak of 59 days in Duolingo.
          <br />
          But then, I was too worked up and focused on something else.
          <br />
          I saw it all unfold -- how my Duolingo streak faded before my eyes..
          <br />
          So I swore on that very day, I would never fumble on Duolingo.
        </p>
        <div className="btn-container justify-end">
          <Button variant="ghost" type="button" onClick={() => closePopup()}>
            Close
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => openConfirmPopup(confirmActionData)}
          >
            Restore streak
          </Button>
        </div>
      </div>
    );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await mockSignIn(values);

    try {
      result.success ? router.push("/dashboard") : toast.error(result.error);
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
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
            onClick={() => openTestPopup()}
          >
            <TbBrandGoogle className="text-muted-foreground" />
            Continue with Google
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-white relative z-10 px-2">
              or
            </span>
          </div>
          {/* 
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )} */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="omsimbarabida@gmail.com" {...field} />
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
