import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const COURSE_IDS = {
  IT: "1069203f-af93-4e86-809f-198d6ada5123",
  CS: "76ab4c3b-7250-4b7f-ae75-3313f181545d",
};

const YEAR_LEVELS = [1, 2, 3, 4];

async function seedStudents() {
  const students = Array.from({ length: 15 }, (_, i) => {
    const id = faker.string.uuid();
    const courseId = Math.random() < 0.5 ? COURSE_IDS.IT : COURSE_IDS.CS;

    return {
      user: {
        id,
        name: faker.person.fullName(),
        email: `07310${300 + i}@dwc-legazpi.edu`,
        role: "STUDENT" as Role,
        verifiedAt: new Date(),
      },
      student: {
        id,
        schoolId: `07310${300 + i}`,
        courseId,
        year: faker.helpers.arrayElement(YEAR_LEVELS),
      },
    };
  });

  await prisma.user.createMany({
    data: students.map((s) => s.user),
  });

  await prisma.student.createMany({
    data: students.map((s) => s.student),
  });

  console.log("✅ Seeded 15 students.");
}

seedStudents()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
  })
  .finally(() => prisma.$disconnect());
