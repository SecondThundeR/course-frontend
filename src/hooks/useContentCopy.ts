import { useCallback } from 'react';
import { useClipboard } from '@mantine/hooks';

export default function useContentCopy(content: string) {
  const { copy, copied } = useClipboard({
    timeout: 1500,
  });
  const onCopy = useCallback(() => {
    if (copied) return;
    copy(content);
  }, [content, copied, copy]);

  return { copied, onCopy };
}
