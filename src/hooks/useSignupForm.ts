import { useForm } from '@mantine/form';

import { SIGNUP_FORM } from '@/constants/form';

export default function useSignupForm() {
  const form = useForm(SIGNUP_FORM);

  return form;
}
