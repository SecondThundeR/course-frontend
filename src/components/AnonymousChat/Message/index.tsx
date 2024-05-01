import { memo } from 'react';

import { DateSeparator } from '@/components/Chat/Message/DateSeparator';

import { From } from './From';
import { To } from './To';

const PlaceholderBase = memo(function PlaceholderBase() {
  throw new Error(
    'Не используйте компонент "Message" напрямую. Используйте "Message.From", "Message.To" или "Message.DateSeparator"'
  );
});

export const Message = Object.assign(PlaceholderBase, {
  From,
  To,
  DateSeparator,
});
