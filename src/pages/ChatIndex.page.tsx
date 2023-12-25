import { Suspense, lazy, memo } from 'react';

const LazyChatPlaceholder = lazy(() => import('../components/Chat/Placeholder'));

const ChatIndex = memo(() => (
  <Suspense>
    <LazyChatPlaceholder />
  </Suspense>
));

export default ChatIndex;
