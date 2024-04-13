import { type Message } from '@/__generated__/graphql';

export type BaseProps = Pick<Message, 'id' | 'content' | 'type'> & {
  isEditActive?: boolean;
  createdAt: string;
  updatedAt: string;
  direction: 'from' | 'to';
  onEdit: (id: string) => void;
  onOpen: (id: string) => void;
};
