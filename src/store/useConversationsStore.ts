import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {
  type MessageUpdatesSubscription,
  type ConversationsDataQuery,
} from '@/__generated__/graphql';

export type ConversationInfo = ConversationsDataQuery['userConversations'][number];

type ConversationsStore = {
  conversations: ConversationInfo[];
  setConversations: (conversations: ConversationInfo[]) => void;
  addConversation: (conversation: ConversationInfo) => void;
  removeConversation: (conversationId: string) => void;
  addMessage: (message: MessageUpdatesSubscription['messageUpdates']['message']) => void;
  removeMessage: (message: MessageUpdatesSubscription['messageUpdates']['message']) => void;
  resetConversations: () => void;
};

export const useConversationsStore = create<ConversationsStore>()(
  persist(
    (set) => ({
      conversations: [],
      setConversations: (conversations) => set({ conversations }),
      addConversation: (conversation) =>
        set((state) => {
          const isAdded =
            state.conversations.findIndex((conv) => conv.id === conversation.id) !== -1;

          return isAdded
            ? state
            : {
                conversations: [...state.conversations, conversation],
              };
        }),
      removeConversation: (conversationId) =>
        set((state) => {
          const newConversations = state.conversations.filter(
            (conversation) => conversation.id !== conversationId
          );
          const isNotRemoved = newConversations.length === state.conversations.length;

          return isNotRemoved
            ? state
            : {
                conversations: newConversations,
              };
        }),
      addMessage: (message) =>
        set((state) => {
          return {
            conversations: state.conversations.map((conversation) => {
              if (conversation.id !== message.conversation?.id) return conversation;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { conversation: _conversation, ...restMessage } = message;
              const { messages, ...restConversation } = conversation;
              return {
                ...restConversation,
                messages: [...messages, restMessage],
              };
            }),
          };
        }),
      removeMessage: (message) =>
        set((state) => {
          return {
            conversations: state.conversations.map((conversation) => {
              if (conversation.id !== message.conversation?.id) return conversation;
              const messageId = message.id;
              const { messages, ...restConversation } = conversation;
              const newMessages = messages.filter((message) => message.id !== messageId);

              return {
                ...restConversation,
                messages: newMessages,
              };
            }),
          };
        }),
      resetConversations: () => set(() => ({ conversations: [] })),
    }),
    {
      name: 'conversations-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
