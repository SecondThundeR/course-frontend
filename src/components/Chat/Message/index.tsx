import { memo } from 'react';
import { Flex, Text } from '@mantine/core';
import { BlockMath } from 'react-katex';

import { MessageType, type Message as Msg } from '@/__generated__/graphql';

import { timeFormat } from '@/utils/timeFormat';

import classes from './Message.module.css';

type MessageProps = Pick<Msg, 'content' | 'type'> & {
  createdAt: string;
};

const MessageFrom = memo(function MessageFrom({ content, type, createdAt }: MessageProps) {
  return (
    <Flex w="100%" justify="flex-end">
      <Flex
        w="fit-content"
        direction="column"
        align="flex-end"
        p="md"
        className={classes.message__from}
      >
        <Text className={classes.message__from_text}>
          {type === MessageType.Latex ? <BlockMath math={content} /> : content}
        </Text>
        <Text className={classes.message__from_time}>{timeFormat(createdAt)}</Text>
      </Flex>
    </Flex>
  );
});

const MessageTo = memo(function MessageTo({ content, type, createdAt }: MessageProps) {
  return (
    <Flex
      w="fit-content"
      direction="column"
      align="flex-start"
      p="md"
      className={classes.message__to}
    >
      <Text>{type === MessageType.Latex ? <BlockMath math={content} /> : content}</Text>
      <Text c="dimmed">{timeFormat(createdAt)}</Text>
    </Flex>
  );
});

const Base = memo(function Base() {
  throw new Error("Doesn't use this `Message` component. Export other components via dot notation");
});

export const Message = Object.assign(Base, {
  From: MessageFrom,
  To: MessageTo,
});
