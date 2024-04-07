import { object, string } from 'zod';

export const loginSchema = object({
  email: string({
    required_error: 'Почта не может быть пустой',
    invalid_type_error: 'Почта может быть только строкой',
  }).email('Неверная почта'),
  password: string({
    required_error: 'Пароль не может быть пустой',
    invalid_type_error: 'Пароль может быть только строкой',
  }).min(8, 'Пароль должен быть больше 8 символов'),
});
