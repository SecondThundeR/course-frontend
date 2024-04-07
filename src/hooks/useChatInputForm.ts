import { useForm } from '@mantine/form';

import { CHAT_INPUT_FORM } from '@/constants/form';

export const useChatInputForm = () => useForm(CHAT_INPUT_FORM);
