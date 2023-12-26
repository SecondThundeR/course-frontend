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

import { LOGIN_ROUTE } from '@/constants/routes';

import { useAuthorizedRedirect, useSignup, useSignupForm } from '@/hooks';

import classes from './RegisterPage.module.css';

const RegisterPage = memo(function RegisterPage() {
  const form = useSignupForm();
  const [onSignup, { loading, error }] = useSignup();

  useAuthorizedRedirect(false);

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Самое время познакомиться!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        У вас уже есть аккаунт?{' '}
        <Anchor size="sm" component={Link} to={LOGIN_ROUTE}>
          Войти в аккаунт
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
        <form onSubmit={form.onSubmit((values) => onSignup(values))}>
          <TextInput
            label="Имя"
            placeholder="Алиса"
            required
            disabled={loading}
            {...form.getInputProps('firstname')}
          />
          <TextInput
            label="Фамилия"
            placeholder="Третьякова"
            mt="md"
            disabled={loading}
            {...form.getInputProps('lastname')}
          />
          <TextInput
            label="Почта"
            placeholder="alice@prometheus.org"
            required
            mt="md"
            disabled={loading}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            mt="md"
            disabled={loading}
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="lg" disabled={loading}>
            Создать аккаунт
          </Button>
        </form>
      </Paper>
    </Container>
  );
});

export default RegisterPage;
