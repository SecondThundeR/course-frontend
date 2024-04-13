import { type ConversationInfo } from '@/store';

export type InputProps = {
  isLoading: boolean;
  messageEdit?: ConversationInfo['messages'][number];
  onSubmit: (message: string, isLatex: boolean) => Promise<void>;
  onEditSubmit: (message: string) => Promise<void>;
  onEditMessageRemove: () => void;
};
