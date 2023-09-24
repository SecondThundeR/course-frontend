import { memo } from 'react';
import { Container, Text, Button, Group } from '@mantine/core';

import classes from './LandingHero.module.css';

export const LandingHero = memo(() => (
  <div className={classes.wrapper}>
    <Container size={700} className={classes.inner}>
      <h1 className={classes.title}>
        Мессенджер{' '}
        <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
          с поддержкой LaTeX
        </Text>{' '}
        Без компромиссов!
      </h1>

      <Text className={classes.description} c="dimmed">
        Мы создали универсальный инструмент для общения и передачи документов в формате LaTeX,
        которым удобно пользоваться и приятно работать
      </Text>

      <Group className={classes.controls}>
        <Button
          size="xl"
          className={classes.control}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Начать работу
        </Button>
      </Group>
    </Container>
  </div>
));
