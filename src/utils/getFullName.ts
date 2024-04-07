export const getFullName = (firstname: string, lastname?: string | null) =>
  `${firstname}${lastname ? ` ${lastname}` : ''}`;
