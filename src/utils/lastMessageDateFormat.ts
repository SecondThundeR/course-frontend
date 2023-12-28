import { DAYS_MAP } from '@/constants/date';

import { timeFormat } from './timeFormat';

export function lastMessageDateFormat(time?: string | Date) {
  if (!time) return null;

  const date = typeof time === 'string' ? new Date(time) : time;
  const currentDate = new Date();

  /**
   * If there are difference with year, month or subtract of days are bigger
   * than week, show full date
   */
  if (
    date.getFullYear() < currentDate.getFullYear() ||
    date.getMonth() < currentDate.getMonth() ||
    currentDate.getDate() - date.getDate() > 7
  ) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  // If dates aren't equal, show date string
  if (date.getDate() < currentDate.getDate()) {
    return DAYS_MAP[date.getDay()];
  }

  // Otherwise, re-use `timeFormat`
  return timeFormat(date);
}
