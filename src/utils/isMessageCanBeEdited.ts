const ONE_DAY = 24 * 60 * 60 * 1000;

export function isMessageCanBeEdited(createdAt: string | Date) {
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - createdDate.getTime();

  return timeDifference < ONE_DAY;
}
