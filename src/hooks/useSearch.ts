import { useCallback, useEffect, type ChangeEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const qVal = event.target.value;
      setSearchParams(qVal ? { q: qVal } : undefined, { replace: true });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = q ?? '';
    }
  }, [q]);

  return { q, inputRef, onChange };
}
