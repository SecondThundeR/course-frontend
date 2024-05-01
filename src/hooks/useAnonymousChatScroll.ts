import { useCallback, useEffect } from 'react';
import { usePrevious, useScrollIntoView } from '@mantine/hooks';

import { useChatAffix } from '.';

export function useAnonymousChatScroll(
  username?: string,
  lastMessage?: { id: string; fromId: string }
) {
  const { scroll, scrollableHeight } = useChatAffix();
  const previousMessage = usePrevious(lastMessage);
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
    onScroll();
  }, [onScroll]);

  useEffect(() => {
    const isSameMessage = lastMessage?.id === previousMessage?.id;
    if (isSameMessage) return;

    const isScrollThreshold = scroll.y >= scrollableHeight;
    const lastMessageAuthor = lastMessage?.fromId;
    const isMessageFromCurrentUser = lastMessageAuthor === username;

    if (isMessageFromCurrentUser || (!isMessageFromCurrentUser && isScrollThreshold)) {
      onScroll();
    }
  }, [lastMessage, onScroll, previousMessage?.id, scroll.y, scrollableHeight, username]);

  return { targetRef, onScroll };
}
