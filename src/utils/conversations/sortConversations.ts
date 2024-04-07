import { type ConversationInfo } from '@/store';

export function sortConversations(
  { messages: messages1 }: ConversationInfo,
  { messages: messages2 }: ConversationInfo
) {
  const conversation1Timestamp = messages1.at(-1)?.createdAt;
  const conversation2Timestamp = messages2.at(-1)?.createdAt;

  const time1 = conversation1Timestamp ? new Date(conversation1Timestamp).getTime() : 0;
  const time2 = conversation2Timestamp ? new Date(conversation2Timestamp).getTime() : 0;

  return time2 - time1;
}
