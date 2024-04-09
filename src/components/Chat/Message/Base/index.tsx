import { memo, useCallback, useMemo } from 'react';
import { Flex } from '@mantine/core';

import { Bubble } from '../Bubble';

import { type BaseProps } from './interfaces';

export const Base = memo(function Base({
  id,
  content,
  type,
  createdAt,
  updatedAt,
  direction,
  onEdit,
  onOpen,
}: BaseProps) {
  const onDeleteOpen = useCallback(() => {
    onOpen(id);
  }, [id, onOpen]);

  const onMessageEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  const messageItem = useMemo(
    () => (
      <Bubble
        content={content}
        type={type}
        direction={direction}
        createdAt={createdAt}
        updatedAt={updatedAt}
        onEdit={onMessageEdit}
        onDeleteOpen={onDeleteOpen}
      />
    ),
    [content, type, direction, createdAt, updatedAt, onMessageEdit, onDeleteOpen]
  );

  if (direction === 'from')
    return (
      <Flex w="100%" justify="flex-end">
        {messageItem}
      </Flex>
    );

  return messageItem;
});
