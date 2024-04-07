export const isDaysDifferent = (createdAt1: string | undefined, createdAt2: string) =>
  !createdAt1 ? true : new Date(createdAt1).getDate() !== new Date(createdAt2).getDate();
