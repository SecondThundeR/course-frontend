import { type ConversationInfo } from '@/store';

import { findConversationById } from './conversations';
import { findOtherParticipant } from './participants';
import { getFullName } from './getFullName';

type GetCurrentChatParticipantOptions = {
  conversations: ConversationInfo[];
  chatId?: string;
  userId?: string;
};

export function getCurrentChatParticipantFullName({
  conversations,
  chatId,
  userId,
}: GetCurrentChatParticipantOptions) {
  const findConvresationPredicate = findConversationById(chatId);
  const findParticipantPredicate = findOtherParticipant(userId);

  const currentChatParticipant = conversations
    .find(findConvresationPredicate)
    ?.participants.find(findParticipantPredicate);

  if (!currentChatParticipant) return null;
  return getFullName(currentChatParticipant.firstname, currentChatParticipant.lastname);
}
