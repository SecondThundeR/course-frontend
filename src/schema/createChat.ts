import { object, string, boolean } from 'zod';

export const createChatSchema = object({
  email: string({
    required_error: 'Почта не может быть пустой',
    invalid_type_error: 'Почта может быть только строкой',
  }).email('Неверная почта'),
  message: string({
    required_error: 'Сообщение не может быть пустым',
    invalid_type_error: 'Сообщение может быть только строкой',
  }),
  isLatex: boolean(),
});
