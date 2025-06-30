import courseSeeder from "./seeds/course.seed";

async function main() {
  await courseSeeder();
}

main().catch(console.error);
