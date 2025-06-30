import { redirectToClientError } from "@/lib/utils/redirect";

export default function NotFoundRedirectPage() {
  redirectToClientError({
    status: 404,
    message: "Looks like your lost",
    action: "go-back",
  });

  return null; // just the fallback
}
