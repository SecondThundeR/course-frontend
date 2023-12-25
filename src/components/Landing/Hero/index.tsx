import { memo } from 'react';
import { Container, Text, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE } from '@/constants/routes';

import classes from './Hero.module.css';

export const LandingHero = memo(function LandingHero() {
  return (
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
            component={Link}
            to={LOGIN_ROUTE}
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
  );
});
