import { memo } from 'react';
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
import { Link } from 'react-router-dom';

import { REGISTER_ROUTE } from '@/constants/routes';

import { useAuthorizedRedirect, useLogin, useLoginForm } from '@/hooks';

import classes from './LoginPage.module.css';

const LoginPage = memo(function LoginPage() {
  const form = useLoginForm();
  const [onLogin, { isSessionExpired, isNotLoggedIn, loading, error }] = useLogin();

  useAuthorizedRedirect(false);

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

      {isSessionExpired && (
        <Alert variant="filled" color="red" mt="md">
          Сессия истекла! Войдите снова в систему
        </Alert>
      )}

      {isNotLoggedIn && (
        <Alert variant="filled" color="red" mt="md">
          Войдите, чтобы продолжить
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
});

export default LoginPage;
