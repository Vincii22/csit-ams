import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { redirectToServerError } from "@/lib/utils/redirect";
import { NextResponse, type NextRequest } from "next/server";
import { UserMetadata } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const session = data?.session;
    const user = session?.user;

    if (error || !session || !user?.email) {
      await supabase.auth.signOut();
      return redirectToServerError(request, {
        status: 401,
        message: error?.message ?? "Login failed",
        action: "sign-in",
      });
    }

    const metadata = user.user_metadata as Partial<UserMetadata>;

    const requiredFields: (keyof UserMetadata)[] = [
      "name",
      "schoolId",
      "year",
      "role",
      "course",
    ];

    const hasMissingField = requiredFields.some(
      (key) => metadata[key] === undefined || metadata[key] === null,
    );

    if (hasMissingField) {
      await supabase.auth.signOut();
      return redirectToServerError(request, {
        status: 400,
        message: "Missing user metadata",
        action: "sign-in",
      });
    }

    const course = await prisma.course.findUnique({
      where: { abbreviation: metadata.course! },
    });

    if (!course) {
      await supabase.auth.signOut();
      return redirectToServerError(request, {
        status: 404,
        message: "No course found",
        action: "sign-in",
      });
    }

    await prisma.$transaction(async (tx) => {
      const userRecord = await tx.user.upsert({
        where: { email: user.email },
        update: { verifiedAt: new Date() },
        create: {
          id: user.id,
          email: user.email ?? "",
          name: metadata.name!,
          role: metadata.role === "admin" ? "ADMIN" : "STUDENT",
          verifiedAt: new Date(),
        },
      });

      if (metadata.role !== "admin") {
        await tx.student.upsert({
          where: { id: userRecord.id },
          update: {
            schoolId: metadata.schoolId!,
            year: metadata.year!,
            courseId: course.id,
          },
          create: {
            id: userRecord.id,
            schoolId: metadata.schoolId!,
            year: metadata.year!,
            courseId: course.id,
            positionId: null,
          },
        });
      }
    });

    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocal = process.env.NODE_ENV === "development";

    const redirectUrl = isLocal
      ? `${origin}${next}`
      : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("OAuth sign-in error:", err);
    await supabase.auth.signOut();

    return redirectToServerError(request, {
      status: 500,
      message: "Unexpected server error during sign-in",
      action: "sign-in",
    });
  }
}
