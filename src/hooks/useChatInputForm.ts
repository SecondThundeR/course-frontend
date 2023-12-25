import { useForm } from '@mantine/form';

import { CHAT_INPUT_INITIAL_VALUES, CHAT_INPUT_VALUES_VALIDATOR } from '@/constants/form';

export default function useChatInputForm() {
  const form = useForm({
    initialValues: CHAT_INPUT_INITIAL_VALUES,
    validate: CHAT_INPUT_VALUES_VALIDATOR,
  });

  return form;
}
