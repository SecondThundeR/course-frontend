import { useForm } from '@mantine/form';

import { LOGIN_FORM } from '@/constants/form';

export const useLoginForm = () => useForm(LOGIN_FORM);
