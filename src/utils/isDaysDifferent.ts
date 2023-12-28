export function isDaysDifferent(createdAt1: string | undefined, createdAt2: string) {
  if (!createdAt1) return true;

  const createdAtFirst = new Date(createdAt1);
  const createdAtSecond = new Date(createdAt2);

  return createdAtFirst.getDate() !== createdAtSecond.getDate();
}
