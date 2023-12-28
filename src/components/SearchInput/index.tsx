import { type ChangeEventHandler, memo, forwardRef } from 'react';
import { TextInput } from '@mantine/core';

type SearchInputProps = {
  value: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

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
