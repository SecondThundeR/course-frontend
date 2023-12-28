import { useCallback, useEffect, useRef } from 'react';

export default function useDeadLockFocus() {
  const ref = useRef<HTMLInputElement>(null);

  const onFocus = useCallback(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const inputElement = ref.current;
    if (inputElement) {
      const observer = new MutationObserver(() => {
        if (document.activeElement !== inputElement) {
          inputElement.focus();
        }
      });

      observer.observe(document, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { ref, onFocus };
}
