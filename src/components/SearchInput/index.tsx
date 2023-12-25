import { memo } from 'react';
import { TextInput } from '@mantine/core';

import { useSearch } from '@/hooks';

const SearchInput = memo(function SearchInput() {
  const { q, onChange } = useSearch();

  return (
    <TextInput
      id="q"
      aria-label="Поиск чатов"
      placeholder="Поиск"
      type="search"
      name="q"
      defaultValue={q ?? ''}
      onChange={onChange}
    />
  );
});

export default SearchInput;
