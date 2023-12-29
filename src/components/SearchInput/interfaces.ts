import { type ChangeEventHandler } from 'react';

export type SearchInputProps = {
  value: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
