import { useForm } from '@mantine/form';

import { CHAT_CREATE_FORM } from '@/constants/form';

export default function useCreateForm() {
  const form = useForm(CHAT_CREATE_FORM);

  return form;
}
