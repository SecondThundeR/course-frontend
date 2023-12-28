import { type User } from '@/store';

export type ListProps = {
  user: User | null;
  currentChatId?: string;
  closeNavbar: () => void;
  searchValue: string | null;
};
