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
import classes from './RegisterPage.module.css';

export function RegisterPage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Самое время познакомиться!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        У вас уже есть аккаунт?{' '}
        <Anchor size="sm" component="button">
          Войти в аккаунт
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Имя" placeholder="Алиса" required />
        <TextInput label="Фамилия" placeholder="Третьякова" mt="md" />
        <TextInput label="Никнейм" placeholder="alice" required mt="md" />
        <TextInput label="Почта" placeholder="alice@prometheus.org" required mt="md" />
        <PasswordInput label="Пароль" placeholder="Ваш пароль" required mt="md" />
        <PasswordInput
          label="Подтверждение пароля"
          placeholder="Повторите ваш лучший пароль"
          required
          mt="md"
        />
        <Button fullWidth mt="lg">
          Создать аккаунт
        </Button>
      </Paper>
    </Container>
  );
}
