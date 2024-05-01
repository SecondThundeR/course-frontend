import { memo } from 'react';

import { Base } from '../Base';

import { type FromProps } from './interfaces';

export const From = memo(function From(props: FromProps) {
  return <Base direction="from" {...props} />;
});
