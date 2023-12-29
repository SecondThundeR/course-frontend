import { useConversationsStore } from '@/store';

export default function useHasChats() {
  const conversations = useConversationsStore((state) => state.conversations);
  return conversations.length > 0;
}
