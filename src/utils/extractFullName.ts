export function extractFullName(firstname: string, lastname?: string | null) {
  return !lastname ? firstname : `${firstname} ${lastname}`;
}
