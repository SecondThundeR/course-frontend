export const SIGNUP_INITIAL_VALUES = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

export const SIGNUP_VALUES_VALIDATOR = {
  firstname: (value: string) => (value.length < 1 ? 'Имя должно быть больше 1 символа' : null),
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
  password: (value: string) => (value.length < 8 ? 'Пароль должен быть больше 8 символов' : null),
};

export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const LOGIN_VALUES_VALIDATOR = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
  password: (value: string) => (value.length < 8 ? 'Пароль должен быть больше 8 символов' : null),
};

export const CHAT_CREATE_INITIAL_VALUES = {
  email: '',
  message: '',
  isLatex: false,
};

export const CHAT_CREATE_VALUES_VALIDATOR = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
  message: (value: string) => (value.length > 0 ? null : 'Сообщение не может быть пустым'),
};

export const CHAT_INPUT_INITIAL_VALUES = {
  message: '',
  isLatex: false,
};

export const CHAT_INPUT_VALUES_VALIDATOR = {
  message: (value: string) => (value.length > 0 ? null : 'Сообщение не может быть пустым'),
};
