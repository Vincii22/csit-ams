import prisma from "@/lib/prisma";

const updates = [
  { title: "President", abbreviation: "PRES" },
  { title: "Internal Vice President", abbreviation: "IVP" },
  { title: "External Vice President", abbreviation: "EVP" },
  { title: "Secretary General", abbreviation: "SEC_GEN" },
  { title: "Assistant Secretary", abbreviation: "SEC_ASS" },
  { title: "Treasurer", abbreviation: "TREAS" },
  { title: "Assistant Treasurer", abbreviation: "TREAS_ASS" },
  { title: "Auditor", abbreviation: "AUDITOR" },
  { title: "Business Manager", abbreviation: "BS_MAN" },
  { title: "Public Relations Officer", abbreviation: "PRO" },
  { title: "Public Information Officer", abbreviation: "PIO" },
  { title: "IT Representative", abbreviation: "IT_REP" },
  { title: "CS Representative", abbreviation: "CS_REP" },
];

async function main() {
  for (const { title, abbreviation } of updates) {
    await prisma.position.update({
      where: { title },
      data: { abbreviation },
    });
  }

  console.log("Positions updated with abbreviations ✅");
}

main().catch(console.error);
