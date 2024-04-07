import { type ConversationsStore } from '../useConversationsStore';

export const chatCreateSelector = (state: ConversationsStore) => ({
  conversations: state.conversations,
  addConversation: state.addConversation,
});
