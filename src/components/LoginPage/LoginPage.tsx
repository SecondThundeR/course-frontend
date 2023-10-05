import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import classes from './LoginPage.module.css';

export function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Рады видеть вас снова!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        У вас нет аккаунта?{' '}
        <Anchor size="sm" component="button">
          Создать аккаунт
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Почта" placeholder="me@prometheus.org" required />
        <PasswordInput label="Пароль" placeholder="Ваш пароль" required mt="md" />
        <Button fullWidth mt="lg">
          Войти в аккаунт
        </Button>
      </Paper>
    </Container>
  );
}
