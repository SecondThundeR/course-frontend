import { useForm } from '@mantine/form';

function useSignupForm() {
  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },

    validate: {
      firstname: (value) => (value.length < 1 ? 'First name must have at least 1 letter' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must have at least 8 letters' : null),
    },
  });

  return form;
}

export default useSignupForm;
