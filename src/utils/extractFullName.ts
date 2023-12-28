export function extractFullName(firstname: string, lastname?: string | null) {
  return `${firstname}${lastname ? ` ${lastname}` : ''}`;
}
