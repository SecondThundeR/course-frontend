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
import { IconClockExclamation, IconLogin, IconAlertTriangle } from '@tabler/icons-react';

import { REGISTER_ROUTE } from '@/constants/routes';

import { useLogin, useLoginForm } from '@/hooks';

import classes from './LoginPage.module.css';

const LoginPage = memo(function LoginPage() {
  const form = useLoginForm();
  const { onLogin, isSessionExpired, isNotLoggedIn, loading, error } = useLogin();

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
        <Alert
          title="Произошла ошибка!"
          variant="filled"
          color="red"
          mt="md"
          icon={<IconAlertTriangle />}
        >
          Убедитесь, что данные верны и попробуйте ещё раз. В противном случае, ошибка может быть на
          стороне сервера
        </Alert>
      )}
      {isSessionExpired && (
        <Alert
          title="Сессия истекла! Войдите снова в систему"
          variant="filled"
          color="red"
          mt="md"
          icon={<IconClockExclamation />}
        />
      )}
      {isNotLoggedIn && (
        <Alert
          title="Войдите, чтобы продолжить"
          variant="filled"
          color="red"
          mt="md"
          icon={<IconLogin />}
        />
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
