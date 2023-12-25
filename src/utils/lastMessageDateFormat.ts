import { DAYS_MAP } from '@/constants/date';
import { timeFormat } from './timeFormat';

export function lastMessageDateFormat(time: string | Date) {
  if (typeof time === 'string') return lastMessageDateFormat(new Date(time));

  const currentDate = new Date();

  if (
    time.getFullYear() < currentDate.getFullYear() ||
    time.getMonth() < currentDate.getMonth() ||
    currentDate.getDate() - time.getDate() > 7
  ) {
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  }

  if (time.getDate() < currentDate.getDate()) {
    return DAYS_MAP[time.getDay()];
  }

  return timeFormat(time);
}
