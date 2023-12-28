import { useForm } from '@mantine/form';

import { CHAT_INPUT_FORM } from '@/constants/form';

export default function useChatInputForm() {
  const form = useForm(CHAT_INPUT_FORM);

  return form;
}
