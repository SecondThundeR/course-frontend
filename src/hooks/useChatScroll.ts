import { useCallback, useEffect } from 'react';
import { useScrollIntoView } from '@mantine/hooks';

import { type ConversationInfo } from '@/store';

export default function useChatScroll(messages?: ConversationInfo['messages']) {
  const { targetRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
    duration: 0,
    offset: 200,
  });

  const onScroll = useCallback(() => {
    scrollIntoView({
      alignment: 'end',
    });
  }, [scrollIntoView]);

  useEffect(() => {
    if (!messages) return;
    onScroll();
  }, [messages, onScroll]);

  return { targetRef, onScroll };
}
