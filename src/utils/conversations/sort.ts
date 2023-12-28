import { type ConversationInfo } from '@/store';

export function sortConversations(
  conversation1: ConversationInfo,
  conversation2: ConversationInfo
) {
  const conversation1Timestamp = conversation1.messages.at(-1)?.createdAt;
  const conversation2Timestamp = conversation2.messages.at(-1)?.createdAt;

  const time1 = conversation1Timestamp ? new Date(conversation1Timestamp).getTime() : 0;
  const time2 = conversation2Timestamp ? new Date(conversation2Timestamp).getTime() : 0;

  return time2 - time1;
}
