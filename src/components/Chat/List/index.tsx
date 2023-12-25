import { memo } from 'react';

import { type User, useConversationsStore } from '@/store';

import { ListElement } from '../ListElement';

type ListProps = {
  user: User | null;
  currentChatId?: string;
};

export const List = memo(function List({ user, currentChatId }: ListProps) {
  const conversations = useConversationsStore((state) => state.conversations);

  return (
    <>
      {conversations.map((conversation) => (
        <ListElement
          key={conversation.id}
          userId={user?.id}
          isActive={conversation.id === currentChatId}
          {...conversation}
        />
      ))}
    </>
  );
});
