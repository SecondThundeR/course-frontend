import { useForm } from '@mantine/form';

import { LOGIN_FORM } from '@/constants/form';

export default function useLoginForm() {
  const form = useForm(LOGIN_FORM);

  return form;
}
