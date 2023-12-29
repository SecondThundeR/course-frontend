import { memo, forwardRef } from 'react';
import { TextInput } from '@mantine/core';

import { type SearchInputProps } from './interfaces';

const SearchInput = memo(
  forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput({ value, onChange }, ref) {
    return (
      <TextInput
        ref={ref}
        aria-label="Поиск чатов"
        placeholder="Поиск"
        type="search"
        name="q"
        defaultValue={value ?? ''}
        onChange={onChange}
      />
    );
  })
);

export default SearchInput;
