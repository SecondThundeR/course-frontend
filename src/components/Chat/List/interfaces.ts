import { type User } from '@/store';

export type ListProps = {
  searchValue: string | null;
  userId?: User['id'];
  currentChatId?: string;
  closeNavbar?: () => void;
};
