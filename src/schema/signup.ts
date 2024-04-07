import { object, string } from 'zod';

export const signupSchema = object({
  firstname: string({
    required_error: 'Имя не может быть пустым',
    invalid_type_error: 'Имя может быть только строкой',
  }),
  lastname: string({
    invalid_type_error: 'Фамилия может быть только строкой',
  }).optional(),
  email: string({
    required_error: 'Почта не может быть пустой',
    invalid_type_error: 'Почта может быть только строкой',
  }).email('Неверная почта'),
  password: string({
    required_error: 'Пароль не может быть пустой',
    invalid_type_error: 'Пароль может быть только строкой',
  }).min(8, 'Пароль должен быть больше 8 символов'),
});
