import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from '@mantine/core';
import useChatRedirect from '@/hooks/useChatRedirect';
import useLoginForm from '@/hooks/useLoginForm';
import useLogin from '@/hooks/useLogin';

import classes from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE } from '@/constants/routes';

export function LoginPage() {
  useChatRedirect();
  const form = useLoginForm();
  const [onLogin, { loading, error }] = useLogin();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Рады видеть вас снова!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        У вас нет аккаунта?{' '}
        <Anchor size="sm" component={Link} to={REGISTER_ROUTE}>
          Создать аккаунт
        </Anchor>
      </Text>

      {error && (
        <Alert variant="filled" color="red" mt="md">
          Произошла ошибка!
          <br />
          <strong>{error.message}</strong>
        </Alert>
      )}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => onLogin(values))}>
          <TextInput
            label="Почта"
            placeholder="me@prometheus.org"
            required
            disabled={loading}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            mt="md"
            required
            disabled={loading}
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="lg" disabled={loading}>
            Войти в аккаунт
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
