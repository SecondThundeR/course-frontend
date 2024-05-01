import { type FormEvent, useCallback } from 'react';

import { useAnonymousChatInputForm, useInputFocus } from '.';

type ChatInputOnSubmitCallback = (message: string, isLatex: boolean) => Promise<void>;

export function useAnonymousChatInput(onSubmit: ChatInputOnSubmitCallback) {
  const form = useAnonymousChatInputForm();
  const { ref, onFocus } = useInputFocus();

  const onFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { message, isLatex } = form.values;

      await onSubmit(message, isLatex);
      form.reset();
      onFocus();
    },
    [form, onFocus, onSubmit]
  );

  return { ref, form, onFormSubmit };
}
