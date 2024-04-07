import { object, string, boolean } from 'zod';

export const chatInputSchema = object({
  message: string({
    required_error: 'Сообщение не может быть пустым',
    invalid_type_error: 'Сообщение может быть только строкой',
  }),
  isLatex: boolean(),
});
