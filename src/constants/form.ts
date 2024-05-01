import { zodResolver } from '@mantine/form';

import { anonymousChatInputSchema } from '@/schema/anonymousChatInput';
import { chatInputSchema } from '@/schema/chatInput';
import { createChatSchema } from '@/schema/createChat';
import { loginSchema } from '@/schema/login';
import { signupSchema } from '@/schema/signup';

export const SIGNUP_FORM = {
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  },
  validate: zodResolver(signupSchema),
};

export const LOGIN_FORM = {
  initialValues: {
    email: '',
    password: '',
  },
  validate: zodResolver(loginSchema),
};

export const CHAT_CREATE_FORM = {
  initialValues: {
    email: '',
    message: '',
    isLatex: false,
  },
  validate: zodResolver(createChatSchema),
};

export const CHAT_INPUT_FORM = {
  initialValues: {
    message: '',
    isLatex: false,
  },
  validate: zodResolver(chatInputSchema),
};

export const ANONYMOUS_CHAT_INPUT_FORM = {
  initialValues: {
    message: '',
    fromId: '',
    isLatex: false,
  },
  validate: zodResolver(anonymousChatInputSchema),
};
