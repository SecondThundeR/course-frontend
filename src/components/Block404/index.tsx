import { memo } from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

import { ROOT_ROUTE } from '@/constants/routes';

import { Illustration } from './illustration';
import classes from './Block404.module.css';

export const Block404 = memo(function Block404() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Похоже тут ничего нет</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Вы попытались попасть на страницу, которой нет или адрес страницы, который вы ввели,
            имеет ошибки
          </Text>
          <Group justify="center">
            <Button component={Link} to={ROOT_ROUTE} size="md">
              Вернуться домой
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
});
