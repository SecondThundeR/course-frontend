import { useEffect } from 'react';
import { useScrollIntoView } from '@mantine/hooks';

import { type ConversationInfo } from '@/store';

export default function useChatScroll(messages: ConversationInfo['messages']) {
  const { targetRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
    duration: 0,
    offset: 200,
  });

  useEffect(() => {
    console.log('Triggered!');
    scrollIntoView({
      alignment: 'end',
    });
  }, [messages, scrollIntoView]);

  return targetRef;
}
