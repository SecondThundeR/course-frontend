import { memo, useMemo } from 'react';
import { Text } from '@mantine/core';

import { type User, useConversationsStore } from '@/store';

import { ListElement } from '../ListElement';

type ListProps = {
  user: User | null;
  currentChatId?: string;
  closeNavbar: () => void;
  searchValue: string | null;
};

export const List = memo(function List({
  user,
  currentChatId,
  closeNavbar,
  searchValue,
}: ListProps) {
  const conversations = useConversationsStore((state) => state.conversations);
  const listElements = useMemo(
    () =>
      conversations
        .map((conversation) => {
          const isShown =
            !searchValue?.toLocaleLowerCase() ||
            conversation.participants.filter(
              ({ firstname, lastname }) =>
                firstname.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()) ||
                lastname?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase())
            ).length > 0;

          if (isShown)
            return (
              <ListElement
                key={conversation.id}
                userId={user?.id}
                isActive={conversation.id === currentChatId}
                closeNavbar={closeNavbar}
                {...conversation}
              />
            );
        })
        .filter((item) => item),
    [closeNavbar, conversations, currentChatId, searchValue, user?.id]
  );

  return (
    <>
      {listElements.length === 0 && (
        <Text ta="center">Не найдено чатов для запроса "{searchValue}"</Text>
      )}
      {listElements}
    </>
  );
});
