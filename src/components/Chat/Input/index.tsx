import { memo, useCallback, useEffect, useMemo } from 'react';
import { ActionIcon, Checkbox, Flex, Text, TextInput } from '@mantine/core';
import { IconX, IconSend, IconCheck } from '@tabler/icons-react';
import { usePrevious } from '@mantine/hooks';
import { MessageType } from '@/__generated__/graphql';

import { useChatInput, useChatKeyClose } from '@/hooks';

import classes from './Input.module.css';

import { type InputProps } from './interfaces';

export const Input = memo(function Input({
  messageEdit,
  isLoading,
  onSubmit,
  onEditSubmit,
  onEditMessageRemove,
}: InputProps) {
  const prevMessageEdit = usePrevious(messageEdit);
  const isEditActive = messageEdit !== undefined;

  const onEditSubmitCallback = useCallback(
    async (message: string) => {
      await onEditSubmit(message);
      onEditMessageRemove();
    },
    [onEditMessageRemove, onEditSubmit]
  );

  const { ref, form, onFormSubmit } = useChatInput(isEditActive ? onEditSubmitCallback : onSubmit);

  const SubmitIcon = isEditActive ? IconCheck : IconSend;
  const isLatex = messageEdit?.type === MessageType.Latex;

  const onEditClose = useCallback(() => {
    form.clearErrors();
    form.setValues({
      message: '',
      isLatex: false,
    });
    onEditMessageRemove();
  }, [form, onEditMessageRemove]);

  useChatKeyClose({
    disableDefaultAction: true,
    customAction: onEditClose,
  });

  useEffect(() => {
    if (!messageEdit || prevMessageEdit) return;
    form.clearErrors();
    form.setValues({
      message: messageEdit.content,
      isLatex: messageEdit.type === MessageType.Latex,
    });
  }, [messageEdit, form, prevMessageEdit]);

  const isSendDisabled = useMemo(() => form.getValues().message.length === 0, [form]);

  return (
    <form onSubmit={onFormSubmit} className={classes.input}>
      {isEditActive && (
        <Flex gap="md" align="center" justify="space-between" px="lg" pt="xs">
          <Text fw="bold">Редактирование {isLatex ? 'LaTeX' : ''} сообщения</Text>
          <ActionIcon size="36" variant="transparent" onClick={onEditClose} disabled={isLoading}>
            <IconX className={classes.message__send} />
          </ActionIcon>
        </Flex>
      )}
      <Flex p="md" direction="column" gap="xs">
        <Flex gap="md" align="center">
          <TextInput
            ref={ref}
            w="100%"
            placeholder="Введите сообщение"
            disabled={isLoading}
            {...form.getInputProps('message')}
          />
          <ActionIcon type="submit" size="36" disabled={isSendDisabled} loading={isLoading}>
            <SubmitIcon className={classes.message__send} />
          </ActionIcon>
        </Flex>
        {!isEditActive && (
          <Checkbox
            label="Отправить как LaTeX сообщение"
            disabled={isLoading}
            {...form.getInputProps('isLatex', {
              type: 'checkbox',
            })}
          />
        )}
      </Flex>
    </form>
  );
});
