import { ListElement } from '@/components/Chat/ListElement';

import { type User, type ConversationInfo } from '@/store';

type ConversationsMapperOptions = {
  searchValue?: string | null;
  userId?: User['id'];
  currentChatId?: string;
  closeNavbar?: () => void;
};

export function conversationsMapper({
  searchValue,
  userId,
  currentChatId,
  closeNavbar,
}: ConversationsMapperOptions) {
  const lowerCaseSearchValue = searchValue?.toLocaleLowerCase();

  return (conversation: ConversationInfo) => {
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
