export function getAcademicYears(): string[] {
  let current_year: number = new Date().getFullYear();
  const academic_years: string[] = [];

  for (let i = 0; i < 5; i++) {
    academic_years.push(`S.Y. ${current_year} - ${current_year + 1}`);
    current_year += 1;
  }

  return academic_years;
}
