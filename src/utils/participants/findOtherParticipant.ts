import { type ConversationInfo } from '@/store';

type Participant = ConversationInfo['participants'][number];

export const findOtherParticipant =
  (currentUserId?: string) =>
  ({ id }: Participant) =>
    id !== currentUserId;
