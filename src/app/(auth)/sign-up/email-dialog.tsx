"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { usePopup } from "@/shared/contexts/popup-context";
import { AlertCircle, MailCheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function EmailDialog({ email }: { email: string }) {
  const [resending, setResending] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { closePopup } = usePopup();
  const supabase = createClient();

  async function resendLink() {
    setResending(true);

    await supabase.auth.resend({
      email,
      type: "signup",
    });

    setShowCountdown(true);
    setResending(false);
  }

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

      {showCountdown && (
        <div className="px-4 pt-3">
          <Alert className="bg-yellow-950 text-yellow-400">
            <AlertCircle />
            <AlertDescription className="text-yello-400">
              For security purposes, you can request another link after{" "}
              {countdown} seconds.
            </AlertDescription>
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
        <div className="text-muted-foreground text-sm">
          {resending && <Loader />}
          {!resending && showCountdown && (
            <span>Please wait for the request limit to finish</span>
          )}
          {!resending && !showCountdown && (
            <>
              Didn't receive the email?{" "}
              <button
                type="button"
                onClick={resendLink}
                disabled={showCountdown}
                className="text-white underline cursor-pointer"
              >
                Request a new link
              </button>
            </>
          )}
        </div>
        <div className="btn-container">
          <Button variant="outline" onClick={closePopup}>
            Close
          </Button>
          <a
            href={"https://mail.google.com/mail/u/0/#inbox"}
            target="_blank" // so we can go back if link doesn't work
          >
            <Button asChild className="primary-btn">
              View email
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
