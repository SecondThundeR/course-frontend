import { type ChangeEventHandler, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const qVal = event.target.value;
      if (!qVal) {
        setSearchParams(undefined, { replace: true });
        return;
      }
      setSearchParams({ q: qVal }, { replace: true });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (document.getElementById('q') === null) return;
    (document.getElementById('q') as HTMLInputElement).value = q ?? '';
  }, [q]);

  return { q, onChange };
}
