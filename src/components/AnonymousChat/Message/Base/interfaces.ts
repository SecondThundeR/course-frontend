import { type AnonymousMessage } from '@/__generated__/graphql';

export type BaseProps = Pick<AnonymousMessage, 'content' | 'type'> & {
  fromId?: string;
  createdAt: string;
  updatedAt: string;
  direction: 'from' | 'to';
};
