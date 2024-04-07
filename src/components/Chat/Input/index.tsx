import { memo } from 'react';
import { ActionIcon, Checkbox, Flex, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { useChatInput } from '@/hooks';

import classes from './Input.module.css';

import { type InputProps } from './interfaces';

export const Input = memo(function Input({ isLoading, onSubmit }: InputProps) {
  const { ref, form, onFormSubmit } = useChatInput(onSubmit);

  return (
    <form onSubmit={onFormSubmit} className={classes.input}>
      <Flex p="md" direction="column" gap="xs">
        <Flex gap="md" align="center">
          <TextInput
            ref={ref}
            w="100%"
            placeholder="Введите сообщение"
            disabled={isLoading}
            {...form.getInputProps('message')}
          />
          <ActionIcon
            type="submit"
            size="36"
            disabled={form.values.message.length === 0}
            loading={isLoading}
          >
            <IconSend className={classes.message__send} />
          </ActionIcon>
        </Flex>
        <Checkbox
          label="Отправить как LaTeX сообщение"
          disabled={isLoading}
          {...form.getInputProps('isLatex', {
            type: 'checkbox',
          })}
        />
      </Flex>
    </form>
  );
});
