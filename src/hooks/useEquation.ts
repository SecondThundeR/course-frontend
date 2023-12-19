import { ChangeEventHandler, useCallback, useState } from 'react';

const DEFAULT_EQUATION = '\\int_0^\\infty x^2 dx';

export default function useEquation(initialEquation?: string) {
  const [equation, setEquation] = useState(initialEquation ?? DEFAULT_EQUATION);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setEquation(event.currentTarget.value),
    []
  );

  return { equation, onChange };
}
