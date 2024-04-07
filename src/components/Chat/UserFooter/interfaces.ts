import { type User } from '@/store';

export interface UserFooterProps extends Partial<Pick<User, 'email' | 'firstname' | 'lastname'>> {
  onSignout: () => void;
  onChatModalOpen: () => void;
}
