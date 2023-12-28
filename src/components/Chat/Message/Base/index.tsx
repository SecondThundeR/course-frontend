import 'katex/dist/katex.min.css';

import { memo, useCallback } from 'react';
import { BlockMath } from 'react-katex';
import { Flex, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy, IconTrash } from '@tabler/icons-react';

import { MessageType } from '@/__generated__/graphql';

import { useMessageModalDelete } from '@/hooks';

import { timeFormat } from '@/utils/timeFormat';

import { DeleteModal } from '../DeleteModal';

import classes from './Base.module.css';
import { type BaseProps } from './interfaces';

export const Base = memo(function Base({ id, content, type, createdAt, direction }: BaseProps) {
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
      {type === MessageType.Latex ? (
        <div className={directionFrom ? classes.message__from_text : undefined}>
          <BlockMath math={content} />
        </div>
      ) : (
        <Text className={directionFrom ? classes.message__from_text : undefined}>{content}</Text>
      )}
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
      <DeleteModal
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
