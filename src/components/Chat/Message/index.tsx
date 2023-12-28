import { memo } from 'react';

import { From } from './From';
import { To } from './To';
import { DateSeparator } from './DateSeparator';

const PlaceholderBase = memo(function PlaceholderBase() {
  throw new Error(
    'Не используйте этот компонент. Вместо этого, используйте другие, используя нотацию через точку'
  );
});

export const Message = Object.assign(PlaceholderBase, {
  From,
  To,
  DateSeparator,
});
