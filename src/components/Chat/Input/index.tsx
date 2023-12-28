import { memo } from 'react';
import { ActionIcon, Checkbox, Flex, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { useChatInputForm, useDeadLockFocus } from '@/hooks';

import classes from './Input.module.css';

type InputProps = {
  isLoading: boolean;
  onSubmit: (message: string, isLatex: boolean) => Promise<void>;
};

export const Input = memo(function Input({ isLoading, onSubmit }: InputProps) {
  const ref = useDeadLockFocus();
  const form = useChatInputForm();

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await onSubmit(values.message, values.isLatex);
        form.reset();
      })}
      className={classes.input}
    >
      <Flex p="md" direction="column" gap="xs">
        <Flex gap="md" align="center">
          <TextInput
            ref={ref}
            w="100%"
            placeholder="Введите сообщение"
            {...form.getInputProps('message')}
            disabled={isLoading}
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
          {...form.getInputProps('isLatex', {
            type: 'checkbox',
          })}
          disabled={isLoading}
        />
      </Flex>
    </form>
  );
});
