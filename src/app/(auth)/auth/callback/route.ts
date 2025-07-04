import { fetchUser } from "@/lib/db/fetch-user";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { UserMetadata } from "@/lib/types";
import { redirectToServerError } from "@/lib/utils/redirect";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      redirectToServerError(request, {
        status: 401,
        message: "Login failed",
        action: "sign-in",
      });

      const schoolId = data.user.email?.split("@")[0];

      const exists = await fetchUser(data.user.email as string);

      if (!exists) {
        await prisma.$transaction(async (tx) => {
          const user = await tx.user.upsert({
            where: { email: data.user?.email as string },
            update: { verifiedAt: new Date() },
            create: {
              id: data.user.id,
              email: data.user?.email ?? "",
              name: data.user.user_metadata.full_name,
              role: "STUDENT",
              verifiedAt: new Date(),
            },
          });

          await tx.student.upsert({
            where: { id: user.id },
            update: {
              schoolId: schoolId,
              courseId: null,
              year: null,
            },
            create: {
              id: user.id,
              schoolId: schoolId ?? "",
              year: null,
              courseId: null,
              positionId: null,
            },
          });
        });
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return redirectToServerError(request, {
    status: 500,
    message: "Interval Server Error",
  });
}
