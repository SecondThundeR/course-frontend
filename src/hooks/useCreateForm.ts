import { useForm } from '@mantine/form';

import { CHAT_CREATE_INITIAL_VALUES, CHAT_CREATE_VALUES_VALIDATOR } from '@/constants/form';

export default function useCreateForm() {
  const form = useForm({
    initialValues: CHAT_CREATE_INITIAL_VALUES,
    validate: CHAT_CREATE_VALUES_VALIDATOR,
  });

  return form;
}
