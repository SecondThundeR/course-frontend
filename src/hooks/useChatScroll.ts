import { useCallback, useEffect } from 'react';
import { usePrevious, useScrollIntoView } from '@mantine/hooks';

import { type ConversationInfo, useUserStore } from '@/store';

import { useChatAffix } from '.';

export default function useChatScroll(lastMessage?: ConversationInfo['messages'][number]) {
  const { scroll, scrollableHeight } = useChatAffix();
  const previousMessage = usePrevious(lastMessage);
  const userData = useUserStore.use.userData();
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
    const isTheSameMessage = lastMessage?.id === previousMessage?.id;
    if (isTheSameMessage) return;

    const isScrollThreshold = scroll.y >= scrollableHeight;
    const lastMessageAuthor = lastMessage?.from?.id;
    const isMessageFromCurrentUser = lastMessageAuthor === userData?.id;
    const isMessageFromOtherUser = lastMessageAuthor !== userData?.id;

    if (isMessageFromCurrentUser || (isMessageFromOtherUser && isScrollThreshold)) {
      onScroll();
      return;
    }
  }, [lastMessage, onScroll, previousMessage?.id, scroll.y, scrollableHeight, userData?.id]);

  return { targetRef, onScroll };
}
