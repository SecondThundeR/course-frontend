import { useForm } from '@mantine/form';

import { SIGNUP_FORM } from '@/constants/form';

export const useSignupForm = () => useForm(SIGNUP_FORM);
