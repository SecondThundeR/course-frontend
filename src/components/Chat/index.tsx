import 'katex/dist/katex.min.css';

import { memo } from 'react';

import { Conversation } from './Conversation';
import { Placeholder } from './Placeholder';
import { Shell } from './Shell';

const Base = memo(function Base() {
  throw new Error(
    'Не используйте этот компонент. Вместо этого, используйте другие, используя нотацию через точку'
  );
});

export const Chat = Object.assign(Base, {
  Shell: Shell,
  Placeholder: Placeholder,
  Conversation: Conversation,
});
