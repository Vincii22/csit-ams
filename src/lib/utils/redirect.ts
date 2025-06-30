// NOTE: only redirect if the error is unrecovarable

import { redirect } from "next/navigation";
import { BASE_URL } from "../constants";

type RedirectErrorOptions = {
  status?: number;
  message: string;
  action?: string;
};

export type RedirectErrorAction = {
  action: "sign-in" | "dashboard" | "try-again" | "go-back";
};

// NOTE: use in server environments
export function redirectToServerError(
  request: Request | URL | string,
  {
    status = 500,
    message = "Something went wrong",
    action,
  }: RedirectErrorOptions,
) {
  let base: string;

  if (request instanceof Request) {
    base = request.url;
  } else if (request instanceof URL) {
    base = request.href;
  } else if (typeof request === "string") {
    base = request.startsWith("http") ? request : `${BASE_URL}${request}`;
  } else {
    throw new Error("Invalid request parameter");
  }

  const fullUrl = buildAbsoluteErrorURL(base, status, message, action);
  return Response.redirect(fullUrl);
}

// NOTE: use in app router like layouts/pages
export function redirectToClientError({
  status = 500,
  message = "Something went wrong",
  action,
}: RedirectErrorOptions) {
  const path = buildRelativeErrorPath(status, message, action);
  redirect(path);
}

function buildRelativeErrorPath(
  status: number,
  message: string,
  action?: string,
): string {
  const url = new URL("/error", BASE_URL);
  url.searchParams.set("status", status.toString());
  url.searchParams.set("message", encodeURIComponent(message));
  if (action) url.searchParams.set("action", action);
  return url.pathname + url.search;
}

function buildAbsoluteErrorURL(
  base: string,
  status: number,
  message: string,
  action?: string,
): string {
  const url = new URL("/error", base);
  url.searchParams.set("status", status.toString());
  url.searchParams.set("message", encodeURIComponent(message));
  if (action) url.searchParams.set("action", action);
  return url.toString();
}
