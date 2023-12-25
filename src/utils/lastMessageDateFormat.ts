import { DAYS_MAP } from '@/constants/date';
import { timeFormat } from './timeFormat';

export function lastMessageDateFormat(time: string | Date) {
  if (typeof time === 'string') return lastMessageDateFormat(new Date(time));

  const currentDate = new Date();

  /**
   * If there are difference with year, month or subtract of days are bigger
   * than week, show full date
   */
  if (
    time.getFullYear() < currentDate.getFullYear() ||
    time.getMonth() < currentDate.getMonth() ||
    currentDate.getDate() - time.getDate() > 7
  ) {
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  }

  // If dates aren't equal, show date string
  if (time.getDate() < currentDate.getDate()) {
    return DAYS_MAP[time.getDay()];
  }

  // Otherwise, re-use `timeFormat`
  return timeFormat(time);
}
