import { useForm } from '@mantine/form';

import { ANONYMOUS_CHAT_INPUT_FORM } from '@/constants/form';

export const useAnonymousChatInputForm = () => useForm(ANONYMOUS_CHAT_INPUT_FORM);
