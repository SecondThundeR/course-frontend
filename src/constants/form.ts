export const SIGNUP_INITIAL_VALUES = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

export const SIGNUP_VALUES_VALIDATOR = {
  firstname: (value: string) =>
    value.length < 1 ? 'First name must have at least 1 letter' : null,
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  password: (value: string) => (value.length < 8 ? 'Password must have at least 8 letters' : null),
};

export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const LOGIN_VALUES_VALIDATOR = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  password: (value: string) => (value.length < 8 ? 'Password must have at least 8 letters' : null),
};
