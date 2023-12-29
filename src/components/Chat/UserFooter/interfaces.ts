import { type User } from '@/store';

export interface UserFooterProps {
  user: User | null;
  onSignout: () => void;
  onChatModalOpen: () => void;
}
