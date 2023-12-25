import 'katex/dist/katex.min.css';

import { memo, useCallback } from 'react';
import { Alert, Button, Flex, Modal, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy, IconTrash } from '@tabler/icons-react';
import { BlockMath } from 'react-katex';

import { MessageType, type Message as Msg } from '@/__generated__/graphql';

import { useMessageModalDelete } from '@/hooks';

import { timeFormat } from '@/utils/timeFormat';

import classes from './Message.module.css';

type MessageProps = Pick<Msg, 'id' | 'content' | 'type'> & {
  createdAt: string;
};

type MessageBaseProps = MessageProps & {
  direction: 'from' | 'to';
};

type MessageModalProps = {
  opened: boolean;
  loading: boolean;
  error?: Error;
  onClose: () => void;
  onDelete: () => void;
};

const MessageModal = memo(function MessageModal({
  opened,
  loading,
  error,
  onClose,
  onDelete,
}: MessageModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Удалить сообщение" centered>
      {error && (
        <Alert variant="filled" color="red" mb="md">
          {error.message}
        </Alert>
      )}
      <Text pb="md">Вы действительно хотите удалить сообщение?</Text>
      <Flex gap="md">
        <Button fullWidth variant="outline" onClick={onClose} disabled={loading}>
          Отменить
        </Button>
        <Button fullWidth bg="red" variant="filled" onClick={onDelete} loading={loading}>
          Удалить
        </Button>
      </Flex>
    </Modal>
  );
});

const MessageBase = memo(function MessageBase({
  id,
  content,
  type,
  createdAt,
  direction,
}: MessageBaseProps) {
  const {
    modalOpened,
    loading,
    error,
    handlers: { onClose, onOpen, onDelete },
  } = useMessageModalDelete(id);
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
          <IconTrash className={classes.trash__icon} stroke={1.5} onClick={onOpen} />
        )}
      </Flex>
    </Flex>
  );

  return (
    <>
      <MessageModal
        opened={modalOpened}
        loading={loading}
        error={error}
        onClose={onClose}
        onDelete={onDelete}
      />
      {directionFrom ? (
        <Flex w="100%" justify="flex-end">
          {message}
        </Flex>
      ) : (
        message
      )}
    </>
  );
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
