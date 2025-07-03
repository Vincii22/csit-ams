import prisma from "@/lib/prisma";

async function main() {
  const email = "admin@dwc-legazpi.edu";

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    console.log("admin already exists");
    return;
  }

  await prisma.user.create({
    data: {
      id: "3ae62c66-9678-4a45-8a86-73aba3fd2845 ",
      email,
      name: "Admin",
      role: "ADMIN",
      verifiedAt: new Date(),
    },
  });

  console.log("created admin account");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
