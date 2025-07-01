"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEmailDialogStore } from "@/lib/state/email-dialog.store";
import { MailCheckIcon } from "lucide-react";
import Link from "next/link";

export function EmailDialog() {
  const { open, setOpen, email } = useEmailDialogStore();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-accent w-fit h-fit">
              <MailCheckIcon />
            </div>
            <div className="grid gap-1">
              <DialogTitle>Email Verification Required</DialogTitle>
              <DialogDescription className="text-left">
                We've sent a confirmation link to {email}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="text-sm text-muted-foreground space-y-3">
          <p>Please check your inbox and click the verification link to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Complete your account registration</li>
            <li>Ensure you can receive important notifications</li>
            <li>Secure access to all features</li>
          </ul>
          <p>
            Didn't receive the email?{" "}
            <button
              className="underline hover:text-primary"
              onClick={() => console.log("Resend email")}
            >
              Request a new link
            </button>
          </p>
        </div>

        <DialogFooter className="gap-2 ">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button asChild variant="secondary">
            <Link
              href={"https://mail.google.com/mail/u/0/#inbox"}
              target="_self"
            >
              Open Email
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
