import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { UserMetadata } from "@/lib/types";
import { redirectToError } from "@/lib/utils/redirect";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = await createClient();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (!token_hash || !type) {
    return redirectToError(request, {
      status: 401,
      message: "Missing token or type",
    });
  }

  try {
    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    // failed OTP verification
    if (error) {
      return redirectToError(request, {
        status: error.status,
        message: error.message,
      });
    }

    if (!data?.user) {
      return redirectToError(request, {
        status: 401,
        message: "No user data",
      });
    }

    const user_metadata = data.user.user_metadata as UserMetadata;

    if (
      !user_metadata?.name ||
      !user_metadata?.schoolId ||
      !user_metadata?.year ||
      !user_metadata?.role
    ) {
      return redirectToError(request, {
        status: 400,
        message: "Missing user metadata",
      });
    }

    const course = await prisma.course.findUnique({
      where: { abbreviation: user_metadata.course },
    });

    if (!course) {
      return redirectToError(request, {
        status: 404,
        message: "No course found",
      });
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: data.user?.email as string },
        update: { verifiedAt: new Date() },
        create: {
          id: data.user?.id as string,
          email: data.user?.email as string,
          name: user_metadata.name,
          role: "STUDENT",
          verifiedAt: new Date(),
        },
      });

      await tx.student.upsert({
        where: { id: user.id },
        update: {
          schoolId: user_metadata.schoolId,
          year: user_metadata.year,
          courseId: course.id,
        },
        create: {
          id: user.id,
          schoolId: user_metadata.schoolId,
          year: user_metadata.year,
          courseId: course.id,
          positionId: null,
        },
      });
    });

    return Response.redirect(new URL(next, request.url));
  } catch (error) {
    console.error("Error in auth confirmation:", error);

    const message = error instanceof Error ? error.message : "Unknown_error";

    return redirectToError(request, {
      status: 777,
      message,
    });
  }
}
