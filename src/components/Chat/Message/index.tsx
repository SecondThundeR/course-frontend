import 'katex/dist/katex.min.css';

import { memo, useCallback } from 'react';
import { Flex, Text } from '@mantine/core';
import { BlockMath } from 'react-katex';

import { MessageType, type Message as Msg } from '@/__generated__/graphql';

import { timeFormat } from '@/utils/timeFormat';

import classes from './Message.module.css';
import { IconCheck, IconCopy, IconTrash } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

type MessageProps = Pick<Msg, 'content' | 'type'> & {
  onDelete?: () => void;
  createdAt: string;
};

type MessageBaseProps = MessageProps & {
  direction: 'from' | 'to';
};

const MessageBase = memo(function MessageBase({
  content,
  type,
  createdAt,
  direction,
  onDelete,
}: MessageBaseProps) {
  const { copy, copied } = useClipboard({
    timeout: 1500,
  });
  const onCopy = useCallback(() => {
    if (!copied) copy(content);
  }, [content, copied, copy]);
  const CopyIcon = copied ? IconCheck : IconCopy;
  const isLatex = type === MessageType.Latex;
  const directionFrom = direction === 'from';
  const message = (
    <Flex
      w="fit-content"
      direction="column"
      align={directionFrom ? 'flex-end' : 'flex-start'}
      p="md"
      className={classes[`message__${direction}`]}
    >
      <Text className={directionFrom ? classes.message__from_text : undefined}>
        {type === MessageType.Latex ? <BlockMath math={content} /> : content}
      </Text>
      <Flex align="center" gap="xs" direction="row-reverse">
        <Text
          c={direction === 'to' ? 'dimmed' : undefined}
          className={directionFrom ? classes.message__from_time : undefined}
        >
          {timeFormat(createdAt)}
        </Text>
        {isLatex && (
          <CopyIcon className={classes[`copy__icon_${direction}`]} stroke={1.5} onClick={onCopy} />
        )}
        {directionFrom && (
          <IconTrash className={classes.trash__icon} stroke={1.5} onClick={onDelete} />
        )}
      </Flex>
    </Flex>
  );

  if (directionFrom)
    return (
      <Flex w="100%" justify="flex-end">
        {message}
      </Flex>
    );
  return message;
});

const MessageFrom = memo(function MessageFrom(props: MessageProps) {
  return <MessageBase direction="from" {...props} />;
});

const MessageTo = memo(function MessageTo(props: MessageProps) {
  return <MessageBase direction="to" {...props} />;
});

const Base = memo(function Base() {
  throw new Error(
    'Не используйте этот компонент. Вместо этого, используйте другие, используя нотацию через точку'
  );
});

export const Message = Object.assign(Base, {
  From: MessageFrom,
  To: MessageTo,
});
