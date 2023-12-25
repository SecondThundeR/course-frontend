export function extractAvatarLetters(firstname: string, lastname?: string | null) {
  return !lastname ? firstname[0] : `${firstname[0]}${lastname[0]}`;
}
