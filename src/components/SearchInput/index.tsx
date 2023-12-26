import { type ChangeEventHandler, memo } from 'react';
import { TextInput } from '@mantine/core';

type SearchInputProps = {
  value: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchInput = memo(function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <TextInput
      id="q"
      aria-label="Поиск чатов"
      placeholder="Поиск"
      type="search"
      name="q"
      defaultValue={value ?? ''}
      onChange={onChange}
    />
  );
});

export default SearchInput;
