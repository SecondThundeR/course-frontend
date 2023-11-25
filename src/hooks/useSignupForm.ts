import { useForm } from '@mantine/form';
import { SIGNUP_INITIAL_VALUES, SIGNUP_VALUES_VALIDATOR } from '@/constants/form';

function useSignupForm() {
  const form = useForm({
    initialValues: SIGNUP_INITIAL_VALUES,
    validate: SIGNUP_VALUES_VALIDATOR,
  });

  return form;
}

export default useSignupForm;
