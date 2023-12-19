import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.target.value === '') {
      setSearchParams(undefined, {
        replace: true,
      });
    } else {
      setSearchParams(
        {
          q: event.target.value,
        },
        {
          replace: true,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (document.getElementById('q') === null) return;
    (document.getElementById('q') as HTMLInputElement).value = q ?? '';
  }, [q]);

  return { q, onChange };
}
