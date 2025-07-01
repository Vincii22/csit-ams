"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { usePopup } from "@/shared/contexts/popup-context";
import { AlertCircle, Loader2Icon, MailCheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function EmailDialog({ email }: { email: string }) {
  const [resending, setResending] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { closePopup } = usePopup();
  const supabase = createClient();

  async function resendLink() {
    setResending(true);

    const { error } = await supabase.auth.resend({
      email,
      type: "signup",
    });

    setResending(false);

    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="grid gap-3 w-xl">
      <div className="flex gap-4 pt-4 px-4">
        <div className="p-3 rounded-full bg-accent w-fit h-fit">
          <MailCheckIcon />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-0.5">
            Email Verification Required
          </h2>
          <p className="text-left text-muted-foreground">
            We've sent a confirmation link to {email}
          </p>
        </div>
      </div>

      <Separator />

      {error && (
        <div className="px-4">
          <Alert variant={"destructive"}>
            <AlertCircle />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="space-y-3 px-4 py-2">
        <p className="text-muted-foreground">
          Please check your inbox and click the verification link to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Complete your account registration</li>
          <li>Ensure you can receive important notifications</li>
          <li>Secure access to all features</li>
        </ul>
      </div>

      <Separator />

      <div className="flex items-center justify-between px-4 pb-4">
        {error ? (
          <div></div>
        ) : (
          <div className="text-muted-foreground text-sm">
            Didn't receive the email?{" "}
            {resending ? (
              <div className="flex items-center gap-1">
                <span>Resending</span>
                <Loader2Icon className="animate-spin" size={16} />
              </div>
            ) : (
              <button
                type="button"
                className="text-white underline cursor-pointer"
                onClick={resendLink}
              >
                Request a new link
              </button>
            )}
          </div>
        )}

        <div className="btn-container">
          <Button variant="outline" onClick={closePopup}>
            Close
          </Button>
          <Button asChild className="primary-btn">
            <Link
              href={"https://mail.google.com/mail/u/0/#inbox"}
              target="_self"
            >
              View email
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
