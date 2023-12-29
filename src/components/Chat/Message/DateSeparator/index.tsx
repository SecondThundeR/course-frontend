import { memo } from 'react';
import { Paper, Text } from '@mantine/core';

import { formatServiceMessage } from '@/utils/formatServiceMessage';

import { type DateSeparatorProps } from './interfaces';

export const DateSeparator = memo(function DateSeparator({ date }: DateSeparatorProps) {
  if (!date) return null;

  return (
    <Paper px={12} py={4} withBorder radius="xl" w="fit-content" mx="auto">
      <Text>{formatServiceMessage(date)}</Text>
    </Paper>
  );
});
