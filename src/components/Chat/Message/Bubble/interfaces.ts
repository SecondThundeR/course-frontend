import { type BaseProps } from '../Base/interfaces';

export type BubbleProps = Pick<
  BaseProps,
  'content' | 'type' | 'direction' | 'createdAt' | 'updatedAt'
> & {
  onEdit: () => void;
  onDeleteOpen: () => void;
};
