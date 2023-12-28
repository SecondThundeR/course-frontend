export function extractAvatarLetters(firstname: string, lastname?: string | null) {
  return !lastname || !lastname.length ? firstname[0] : `${firstname[0]}${lastname[0]}`;
}
