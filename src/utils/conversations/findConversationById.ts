import { type ConversationInfo } from '@/store';

export const findConversationById =
  (chatId?: string) =>
  ({ id }: ConversationInfo) =>
    id === chatId;
