import { memo, useMemo } from 'react';
import { Flex } from '@mantine/core';

import { Bubble } from '../Bubble';

import { type BaseProps } from './interfaces';

export const Base = memo(function Base({
  fromId,
  content,
  type,
  createdAt,
  updatedAt,
  direction,
}: BaseProps) {
  const messageItem = useMemo(
    () => (
      <Bubble
        fromId={fromId}
        content={content}
        type={type}
        direction={direction}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    ),
    [fromId, content, type, direction, createdAt, updatedAt]
  );

  if (direction === 'from')
    return (
      <Flex w="100%" justify="flex-end">
        {messageItem}
      </Flex>
    );

  return messageItem;
});
