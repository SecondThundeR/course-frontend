import { memo } from 'react';

import { Base } from '../Base';

import { type ToProps } from './interfaces';

export const To = memo(function To(props: ToProps) {
  return <Base direction="to" {...props} />;
});
