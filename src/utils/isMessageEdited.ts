export function isMessageEdited(createdAt: string | Date, updatedAt: string | Date) {
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const updatedDate = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;

  return createdDate < updatedDate;
}
