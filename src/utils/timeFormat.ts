export function timeFormat(time: string | Date) {
  if (typeof time === 'string') return timeFormat(new Date(time));

  const hours = time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${hours}:${minutes}`;
}
