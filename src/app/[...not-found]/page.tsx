"use client";

import { redirectToClientError } from "@/lib/utils/redirect";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundRedirectPage() {
  const pathname = usePathname();

  useEffect(() => {
    redirectToClientError({
      status: 404,
      message:
        pathname === "/404"
          ? "Congrats, you found the void."
          : `Seriously? '${pathname}'?`,
      action: "go-back",
    });
  }, [pathname]);

  return null;
}
