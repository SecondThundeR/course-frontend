import { type ConversationInfo } from '@/store';

import { findById } from './conversations/findById';
import { findOtherParticipant } from './participants/findOtherParticipant';
import { extractFullName } from './extractFullName';

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
  const findConvresationPredicate = findById(chatId);
  const findParticipantPredicate = findOtherParticipant(userId);

  const currentChatParticipant = conversations
    .find(findConvresationPredicate)
    ?.participants.find(findParticipantPredicate);

  if (!currentChatParticipant) return null;
  return extractFullName(currentChatParticipant.firstname, currentChatParticipant.lastname);
}
