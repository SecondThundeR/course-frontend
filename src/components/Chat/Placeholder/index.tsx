import { memo } from 'react';
import { Flex, Title } from '@mantine/core';
import { IconMessage2, IconMessage2Plus } from '@tabler/icons-react';

import { CHAT_PLACEHOLDER_ICON_DEFAULTS } from '@/constants/defaultOptions';

import { useHasChats } from '@/hooks';

import classes from './Placeholder.module.css';

const Placeholder = memo(function Placeholder() {
  const hasChats = useHasChats();

  const Icon = hasChats ? IconMessage2 : IconMessage2Plus;

  return (
    <Flex
      direction="column"
      gap="md"
      px="md"
      justify="center"
      align="center"
      className={classes.wrapper}
    >
      <Icon {...CHAT_PLACEHOLDER_ICON_DEFAULTS} />
      <Title ta="center">
        {hasChats
          ? 'Выберите чат из списка, чтобы продолжить'
          : 'Похоже тут пусто. Самое время создать новый чат!'}
      </Title>
    </Flex>
  );
});

export default Placeholder;
