"use server";

import prisma from "../prisma";
import { User } from "../types";
import { normalizeUser } from "../utils/normalize-user";

export async function fetchUser(email: string): Promise<User | null> {
  const raw = await prisma.user.findUnique({
    where: { email },
    include: {
      student: true,
    },
  });

  if (!raw) return null;

  return normalizeUser(raw);
}
