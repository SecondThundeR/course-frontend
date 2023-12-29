import { useEffect, useRef } from 'react';

export default function useInputFocus() {
  const ref = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    const inputElement = ref.current;
    if (!inputElement) return;

    inputElement.focus();
  };

  useEffect(() => {
    onFocus();
  }, []);

  return { ref, onFocus };
}
