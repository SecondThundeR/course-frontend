import { useCallback } from 'react';
import { useScrollIntoView } from '@mantine/hooks';

export default function useChatScroll() {
  const { targetRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
    duration: 0,
    offset: 200,
  });

  const onScroll = useCallback(() => {
    scrollIntoView({
      alignment: 'end',
    });
  }, [scrollIntoView]);

  return { targetRef, onScroll };
}
