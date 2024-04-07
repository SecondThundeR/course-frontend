import { useForm } from '@mantine/form';

import { CHAT_CREATE_FORM } from '@/constants/form';

export const useCreateForm = () => useForm(CHAT_CREATE_FORM);
