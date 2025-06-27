import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  form,
  showPassword,
  setShowPassword,
  showForgotLink = false,
}: {
  form: any;
  showPassword: boolean;
  setShowPassword: (prev: any) => void;
  showForgotLink?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          {showForgotLink ? (
            <div className="flex justify-between">
              <FormLabel>Password</FormLabel>
              <Link
                className="text-sm text-muted-foreground"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          ) : (
            <FormLabel>Password</FormLabel>
          )}
          <div className="flex gap-2">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="●●●●●●"
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-full"
              onClick={() => setShowPassword((prev: any) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
