export function splitByPascalCase(input: string): string[] {
  return input.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
}
