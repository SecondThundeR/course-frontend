import { type FormEvent, useCallback } from 'react';

import { useChatInputForm, useInputFocus } from '.';

export default function useChatInput(
  onSubmit: (message: string, isLatex: boolean) => Promise<void>
) {
  const form = useChatInputForm();
  const { ref, onFocus } = useInputFocus();

  const onFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event;
      const { message, isLatex } = form.values;

      await onSubmit(message, isLatex);
      form.reset();
      onFocus();
    },
    [form, onFocus, onSubmit]
  );

  return { ref, form, onFormSubmit };
}
