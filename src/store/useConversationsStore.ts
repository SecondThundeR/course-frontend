import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Conversation } from '@/__generated__/graphql';

type ConversationInfo = Omit<Conversation, 'creatorId' | 'title'> & {
  participants: Pick<Conversation['participants'][number], 'id' | 'firstname' | 'lastname'>[];
  messages: (Omit<Conversation['messages'][number], 'conversation' | 'from'> & {
    from?: Pick<NonNullable<Conversation['messages'][number]['from']>, 'id'>;
  })[];
};

type ConversationsStore = {
  conversations: ConversationInfo[];
  setConversations: (conversations: ConversationInfo[]) => void;
  addConversation: (conversation: ConversationInfo) => void;
  removeConversation: (conversationId: ConversationInfo['id']) => void;
  resetConversations: () => void;
};

export const useConversationsStore = create<ConversationsStore>()(
  persist(
    (set) => ({
      conversations: [],
      setConversations: (conversations) => set(() => ({ conversations })),
      addConversation: (conversation) =>
        set((state) => {
          const isAdded =
            state.conversations.findIndex((conv) => conv.id === conversation.id) !== -1;
          return {
            conversations: isAdded ? state.conversations : [...state.conversations, conversation],
          };
        }),
      removeConversation: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.filter(
            (conversation) => conversation.id !== conversationId
          ),
        })),
      resetConversations: () => set(() => ({ conversations: [] })),
    }),
    {
      name: 'conversations-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
