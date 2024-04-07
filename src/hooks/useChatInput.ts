import { type FormEvent, useCallback } from 'react';

import { useChatInputForm, useInputFocus } from '.';

type ChatInputOnSubmitCallback = (message: string, isLatex: boolean) => Promise<void>;

export function useChatInput(onSubmit: ChatInputOnSubmitCallback) {
  const form = useChatInputForm();
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
