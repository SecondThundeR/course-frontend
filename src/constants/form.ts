import { zodResolver } from '@mantine/form';

import { chatInputSchema } from '@/schema/chatInput';
import { createChatSchema } from '@/schema/createChat';
import { loginSchema } from '@/schema/login';
import { signupSchema } from '@/schema/signup';

export const SIGNUP_FORM = {
  mode: 'uncontrolled',
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  },
  validate: zodResolver(signupSchema),
};

export const LOGIN_FORM = {
  mode: 'uncontrolled',
  initialValues: {
    email: '',
    password: '',
  },
  validate: zodResolver(loginSchema),
};

export const CHAT_CREATE_FORM = {
  mode: 'uncontrolled',
  initialValues: {
    email: '',
    message: '',
    isLatex: false,
  },
  validate: zodResolver(createChatSchema),
};

export const CHAT_INPUT_FORM = {
  mode: 'uncontrolled',
  initialValues: {
    message: '',
    isLatex: false,
  },
  validate: zodResolver(chatInputSchema),
};
