import { type Message } from '@/__generated__/graphql';

export type BaseProps = Pick<Message, 'id' | 'content' | 'type'> & {
  createdAt: string;
  direction: 'from' | 'to';
  onOpen: (id: string) => void;
};
