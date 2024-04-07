import { useConversationsStore } from '@/store';

export default function useHasChats() {
  const conversations = useConversationsStore.use.conversations();
  return conversations.length > 0;
}
