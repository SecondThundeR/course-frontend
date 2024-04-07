import 'katex/dist/katex.min.css';

import { Suspense, lazy, memo, useCallback } from 'react';
import { Flex, Text } from '@mantine/core';
import { IconCheck, IconCopy, IconTrash } from '@tabler/icons-react';

import { MessageType } from '@/__generated__/graphql';

import { useContentCopy } from '@/hooks';

import { timeFormat } from '@/utils/timeFormat';

import classes from './Base.module.css';
import { type BaseProps } from './interfaces';

const LazyBlockMath = lazy(() =>
  import('react-katex').then((module) => ({ default: module.BlockMath }))
);

export const Base = memo(function Base({
  id,
  content,
  type,
  createdAt,
  direction,
  onOpen,
}: BaseProps) {
  const { copied, onCopy } = useContentCopy(content);
  const onDeleteOpen = useCallback(() => {
    onOpen(id);
  }, [id, onOpen]);

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
      {isLatex ? (
        <div className={directionFrom ? classes.message__from_text : undefined}>
          <Suspense>
            <LazyBlockMath math={content} />
          </Suspense>
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
          <IconTrash className={classes.trash__icon} stroke={1.5} onClick={onDeleteOpen} />
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
