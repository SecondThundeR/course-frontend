import { ListElement } from '@/components/Chat/ListElement';

import { type ConversationInfo } from '@/store';

type ConversationsMapperOptions = {
  searchValue: string | null;
  closeNavbar: () => void;
  currentChatId?: string;
  userId?: string;
};

export function conversationsMapper({
  searchValue,
  closeNavbar,
  currentChatId,
  userId,
}: ConversationsMapperOptions) {
  const lowerCaseSearchValue = searchValue?.toLocaleLowerCase();

  return function (conversation: ConversationInfo) {
    const isShown =
      !lowerCaseSearchValue ||
      conversation.participants.some(
        ({ firstname, lastname }) =>
          firstname.toLocaleLowerCase().includes(lowerCaseSearchValue) ||
          lastname?.toLocaleLowerCase().includes(lowerCaseSearchValue)
      );

    if (isShown)
      return (
        <ListElement
          key={conversation.id}
          userId={userId}
          isActive={conversation.id === currentChatId}
          closeNavbar={closeNavbar}
          {...conversation}
        />
      );
  };
}
