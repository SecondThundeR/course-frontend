import { type BaseProps } from '../Base/interfaces';

export type BubbleProps = Omit<BaseProps, 'id' | 'onEdit' | 'onOpen'>;
