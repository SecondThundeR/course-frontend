import { memo, useMemo } from 'react';
import { Text } from '@mantine/core';

import { useConversationsStore } from '@/store';

import { conversationsMapper } from '@/utils/conversations/mapper';
import { sortConversations } from '@/utils/conversations/sort';
import { filterUndefinedData } from '@/utils/filterUndefinedData';

import { type ListProps } from './interfaces';

export const List = memo(function List({
  searchValue,
  userId,
  currentChatId,
  closeNavbar,
}: ListProps) {
  const conversations = useConversationsStore((state) => state.conversations);
  const mapConversations = useMemo(
    () =>
      conversationsMapper({
        searchValue,
        userId,
        closeNavbar,
        currentChatId,
      }),
    [closeNavbar, currentChatId, searchValue, userId]
  );
  const sortedAndMappedConversations = useMemo(() => {
    return conversations.sort(sortConversations).map(mapConversations);
  }, [conversations, mapConversations]);
  const listElements = useMemo(
    () => sortedAndMappedConversations.filter(filterUndefinedData),
    [sortedAndMappedConversations]
  );

  const isListEmpty = listElements.length === 0;

  return (
    <>
      {isListEmpty && (
        <Text ta="center">
          {searchValue ? `Не найдено чатов для запроса "${searchValue}"` : 'Нет чатов'}
        </Text>
      )}
      {listElements}
    </>
  );
});
