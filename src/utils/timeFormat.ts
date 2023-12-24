export function timeFormat(time: Date | string) {
  if (typeof time === 'string') return timeFormat(new Date(time));

  return `${time.getHours()}:${
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  }`;
}
