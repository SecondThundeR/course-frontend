import { type User, type ConversationInfo } from '@/store';

export type ListElementProps = Omit<ConversationInfo, 'createdAt' | 'updatedAt'> & {
  isActive: boolean;
  userId?: User['id'];
  closeNavbar?: () => void;
};
