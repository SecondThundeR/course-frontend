export function formatServiceMessage(date: Date) {
  const currentDate = new Date();
  const isCurrentYear = currentDate.getFullYear() === date.getFullYear();
  const isToday = currentDate.getDate() === date.getDate();
  if (isToday) return 'Сегодня';

  const options = { day: 'numeric', month: 'long' } satisfies Intl.DateTimeFormatOptions;
  const textDate = date.toLocaleDateString('ru-RU', options);
  if (isCurrentYear) return textDate;

  return `${textDate}, ${date.getFullYear()}`;
}
