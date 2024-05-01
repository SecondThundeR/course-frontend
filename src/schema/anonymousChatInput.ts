import { object, string, boolean } from 'zod';

export const anonymousChatInputSchema = object({
  fromId: string({
    required_error: 'Сообщение не может быть отправителя',
    invalid_type_error: 'Отправитель сообщения может быть только строкой',
  }),
  message: string({
    required_error: 'Сообщение не может быть пустым',
    invalid_type_error: 'Сообщение может быть только строкой',
  }),
  isLatex: boolean(),
});
