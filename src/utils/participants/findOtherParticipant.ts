import { type ConversationInfo } from '@/store';

type Participant = ConversationInfo['participants'][number];

export function findOtherParticipant(currentUserId?: string) {
  return function (participant: Participant) {
    return participant.id !== currentUserId;
  };
}
