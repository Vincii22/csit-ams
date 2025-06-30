type RedirectErrorOptions = {
  status?: number;
  message: string;
};

// NOTE: only redirect if the error is unrecovarable
export function redirectToError(
  request: Request | URL | string,
  { status = 500, message = "Something went wrong" }: RedirectErrorOptions,
) {
  const base = request instanceof Request ? request.url : request;
  const url = new URL("/error", base instanceof URL ? base.href : base);

  url.searchParams.set("status", status.toString());
  url.searchParams.set("message", encodeURIComponent(message));

  return Response.redirect(url);
}
