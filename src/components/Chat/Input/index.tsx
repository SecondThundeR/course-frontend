import { memo } from 'react';
import { ActionIcon, Checkbox, Flex, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { useChatInputForm } from '@/hooks';

import classes from './Input.module.css';

type InputProps = { onSubmit: (message: string, isLatex: boolean) => void };

export const Input = memo(function Input({ onSubmit }: InputProps) {
  const form = useChatInputForm();

  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values.message, values.isLatex))}
      className={classes.input}
    >
      <Flex p="md" direction="column" gap="xs">
        <Flex gap="md" align="center">
          <TextInput w="100%" placeholder="Введите сообщение" {...form.getInputProps('message')} />
          <ActionIcon type="submit" size="36" disabled={form.values.message.length === 0}>
            <IconSend className={classes.message__send} />
          </ActionIcon>
        </Flex>
        <Checkbox label="Отправить как LaTeX сообщение" {...form.getInputProps('isLatex')} />
      </Flex>
    </form>
  );
});
