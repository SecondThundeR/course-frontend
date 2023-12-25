import 'katex/dist/katex.min.css';

import { memo } from 'react';

import { Conversation } from './Conversation';
import { Placeholder } from './Placeholder';
import { Shell } from './Shell';

const Base = memo(function Base() {
  throw new Error("Doesn't use this `Chat` component. Export other components via dot notation");
});

export const Chat = Object.assign(Base, {
  Shell: Shell,
  Placeholder: Placeholder,
  Conversation: Conversation,
});
