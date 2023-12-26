import { memo } from 'react';
import { Flex, Title, rem } from '@mantine/core';
import { IconMessage2, IconMessage2Plus } from '@tabler/icons-react';

import { useConversationsStore } from '@/store';

import classes from './Placeholder.module.css';

const Placeholder = memo(function Placeholder() {
  const conversations = useConversationsStore((state) => state.conversations);
  const hasChats = conversations.length > 0;
  const iconSettings = {
    style: { width: rem(96), height: rem(96) },
    stroke: 1.5,
    color: 'var(--mantine-color-blue-filled)',
  };

  const icon = hasChats ? (
    <IconMessage2 {...iconSettings} />
  ) : (
    <IconMessage2Plus {...iconSettings} />
  );

  return (
    <Flex
      direction="column"
      gap="md"
      px="md"
      justify="center"
      align="center"
      className={classes.wrapper}
    >
      {icon}
      <Title ta="center">
        {hasChats
          ? 'Выберите чат из списка, чтобы продолжить'
          : 'Похоже тут пусто. Самое время создать новый чат!'}
      </Title>
    </Flex>
  );
});

export default Placeholder;
