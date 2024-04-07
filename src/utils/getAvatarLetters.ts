export const getAvatarLetters = (firstname: string, lastname?: string | null) =>
  !lastname || !lastname.length ? firstname[0] : `${firstname[0]}${lastname[0]}`;
