import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async () => {
  await prisma.course.createMany({
    data: [
      {
        course: "Bachelor of Science in Information Technology",
        abbreviation: "BSIT",
      },
      {
        course: "Bachelor of Science in Computer Science",
        abbreviation: "BSCS",
      },
    ],
  });
};
