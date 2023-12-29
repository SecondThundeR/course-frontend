import { type ConversationInfo } from '@/store';

export function findById(chatId?: string) {
  return function (convresation: ConversationInfo) {
    return convresation.id === chatId;
  };
}
