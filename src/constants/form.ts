export const SIGNUP_FORM = {
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  },
  validate: {
    firstname: (value: string) => (value.length < 1 ? 'Имя должно быть больше 1 символа' : null),
    email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
    password: (value: string) => (value.length < 8 ? 'Пароль должен быть больше 8 символов' : null),
  },
};

export const LOGIN_FORM = {
  initialValues: {
    email: '',
    password: '',
  },
  validate: {
    email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
    password: (value: string) => (value.length < 8 ? 'Пароль должен быть больше 8 символов' : null),
  },
};

export const CHAT_CREATE_FORM = {
  initialValues: {
    email: '',
    message: '',
    isLatex: false,
  },
  validate: {
    email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
    message: (value: string) => (value.length > 0 ? null : 'Сообщение не может быть пустым'),
  },
};

export const CHAT_INPUT_FORM = {
  initialValues: {
    message: '',
    isLatex: false,
  },
  validate: {
    message: (value: string) => (value.length > 0 ? null : 'Сообщение не может быть пустым'),
  },
};
