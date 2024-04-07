import { type ChangeEvent, useCallback, useState } from 'react';

const DEFAULT_EQUATION = '\\int_0^\\infty x^2 dx';

export function useEquation(initialEquation = DEFAULT_EQUATION) {
  const [equation, setEquation] = useState(initialEquation);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEquation(event.currentTarget.value),
    []
  );

  return { equation, onChange };
}
