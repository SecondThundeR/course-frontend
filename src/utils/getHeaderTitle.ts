export function getHeaderTitle(opened: boolean, participantFullName: string | null) {
  if (opened || (!opened && !participantFullName)) {
    return 'Чаты';
  }

  if (participantFullName) {
    return `Чат с ${participantFullName}`;
  }

  return null;
}
