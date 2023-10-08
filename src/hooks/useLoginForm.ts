import { useForm } from '@mantine/form';

function useLoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must have at least 8 letters' : null),
    },
  });

  return form;
}

export default useLoginForm;
