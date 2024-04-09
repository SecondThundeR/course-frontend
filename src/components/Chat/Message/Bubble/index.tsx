import 'katex/dist/katex.min.css';

import { lazy, memo, Suspense } from 'react';
import { Flex, Text } from '@mantine/core';
import { IconCheck, IconCopy, IconTrash, IconPencil } from '@tabler/icons-react';

import { MessageType } from '@/__generated__/graphql';

import { useContentCopy } from '@/hooks';

import { isMessageCanBeEdited } from '@/utils/isMessageCanBeEdited';
import { isMessageEdited } from '@/utils/isMessageEdited';
import { timeFormat } from '@/utils/timeFormat';

import classes from './Bubble.module.css';
import { type BubbleProps } from './interfaces';

const LazyBlockMath = lazy(() =>
  import('react-katex').then((module) => ({ default: module.BlockMath }))
);

export const Bubble = memo(function Bubble({
  content,
  type,
  direction,
  createdAt,
  updatedAt,
  onEdit,
  onDeleteOpen,
}: BubbleProps) {
  const { copied, onCopy } = useContentCopy(content);

  const CopyIcon = copied ? IconCheck : IconCopy;
  const directionFrom = direction === 'from';
  const isLatex = type === MessageType.Latex;
  const canBeEdited = isMessageCanBeEdited(createdAt);

  return (
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
          {timeFormat(createdAt)} {isMessageEdited(createdAt, updatedAt) && '(ред.)'}
        </Text>
        {isLatex && (
          <CopyIcon className={classes[`copy__icon_${direction}`]} stroke={1.5} onClick={onCopy} />
        )}
        {directionFrom && canBeEdited && (
          <IconPencil className={classes.edit__icon} stroke={1.5} onClick={onEdit} />
        )}
        {directionFrom && (
          <IconTrash className={classes.trash__icon} stroke={1.5} onClick={onDeleteOpen} />
        )}
      </Flex>
    </Flex>
  );
});
