import { useConversationsStore } from '@/store';

export const useHasChats = () => useConversationsStore.use.conversations().length > 0;
