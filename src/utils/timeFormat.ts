export function timeFormat(time: string | Date) {
  const date = typeof time === 'string' ? new Date(time) : time;
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
