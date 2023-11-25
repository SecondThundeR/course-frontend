import { useForm } from '@mantine/form';
import { LOGIN_INITIAL_VALUES, LOGIN_VALUES_VALIDATOR } from '@/constants/form';

function useLoginForm() {
  const form = useForm({
    initialValues: LOGIN_INITIAL_VALUES,
    validate: LOGIN_VALUES_VALIDATOR,
  });

  return form;
}

export default useLoginForm;
