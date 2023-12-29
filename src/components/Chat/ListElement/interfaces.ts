import { type ConversationInfo } from '@/store';

export type ListElementProps = Omit<ConversationInfo, 'createdAt' | 'updatedAt'> & {
  userId?: string;
  isActive: boolean;
  closeNavbar: () => void;
};
