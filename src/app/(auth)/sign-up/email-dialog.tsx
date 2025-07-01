"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePopup } from "@/shared/contexts/popup-context";
import { MailCheckIcon } from "lucide-react";
import Link from "next/link";

export function EmailDialog({ email }: { email: string }) {
  const { closePopup } = usePopup();

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
        <p className="text-muted-foreground text-sm">
          Didn't receive the email?{" "}
          <button
            type="button"
            className="text-white underline"
            onClick={() => console.log("Resend email")}
          >
            Request a new link
          </button>
        </p>
        <div className="btn-container">
          <Button variant="ghost" onClick={closePopup}>
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
