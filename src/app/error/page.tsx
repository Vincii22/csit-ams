"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HTTP_STATUS } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { TbMoodPuzzled } from "react-icons/tb";

export default function ErrorPage() {
  const router = useRouter();
  const params = useSearchParams();

  const status = parseInt(params.get("status") ?? "777", 10);
  const message = decodeURIComponent(
    params.get("message") ?? "Di ko rin alam eh",
  );

  const errorInfo = HTTP_STATUS[status as keyof typeof HTTP_STATUS] ?? {
    title: "UNKNOWN_ERROR",
    description: "An unknown error has occurred",
  };

  const action = params.get("action"); // optional

  const handleAction = () => {
    switch (action) {
      case "sign-in":
        window.location.href = "/sign-in";
        break;
      case "dashboard":
        window.location.href = "/dashboard";
        break;
      case "try-again":
        window.location.reload();
        break;
      case "go-back":
        router.back();
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-svh w-full flex flex-col justify-center items-center bg-card">
      <div className="bg-card w-lg border border-border rounded-md">
        <div className="p-5">
          <div className="flex items-start justify-between text-muted-foreground">
            <p className="mb-2.5">kumsociety says:</p>
            <TbMoodPuzzled
              size={24}
              className="mb-1 hover:text-white transition"
            />
          </div>
          <h1 className="font-bold text-3xl text-balance">‶{message}″</h1>
        </div>
        <Separator />
        <div className="p-5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold font-sans">{status}: </span>
            <p>`{errorInfo.title}`</p>
          </div>
          <p className="text-muted-foreground">{errorInfo.description}</p>
        </div>
      </div>
      {action && (
        <Button
          size="lg"
          variant="outline"
          className="mt-4 w-lg"
          onClick={handleAction}
        >
          {action === "go-back"
            ? "Go back"
            : action === "sign-in"
              ? "Sign in"
              : action === "dashboard"
                ? "Back to dashboard"
                : "Try again"}
        </Button>
      )}
    </div>
  );
}
