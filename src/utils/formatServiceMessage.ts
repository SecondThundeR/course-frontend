import { FULL_MONTH_MAP } from '@/constants/date';

export function formatServiceMessage(date: Date) {
  const currentDate = new Date();
  const isCurrentYear = currentDate.getFullYear() === date.getFullYear();
  const isToday = currentDate.getDate() === date.getDate();

  if (isToday) return 'Сегодня';
  const textDate = `${date.getDate()} ${FULL_MONTH_MAP[date.getMonth()]}`;

  if (isCurrentYear) return textDate;
  return `${textDate}, ${date.getFullYear()}`;
}
