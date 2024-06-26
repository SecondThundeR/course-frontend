import { memo } from 'react';
import { Modal, Alert, TextInput, Checkbox, Button } from '@mantine/core';
import { IconCircleX } from '@tabler/icons-react';

import { useChatCreate } from '@/hooks';

import { type CreateModalProps } from './interfaces';

export const CreateModal = memo(function CreateModal({ opened, onClose }: CreateModalProps) {
  const { form, onSubmit, loading, error } = useChatCreate(onClose);

  return (
    <Modal opened={opened} onClose={onClose} title="Создать чат" centered>
      <form onSubmit={onSubmit}>
        {error && (
          <Alert
            mb="md"
            variant="filled"
            color="red"
            title="Не удалось создать чат"
            icon={<IconCircleX />}
          >
            {error.message}
          </Alert>
        )}
        <TextInput
          withAsterisk
          type="email"
          label="Почта собеседника"
          placeholder="Введите почту"
          disabled={loading}
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          mt="md"
          label="Сообщение"
          placeholder="Введите сообщение"
          disabled={loading}
          {...form.getInputProps('message')}
        />
        <Checkbox
          mt="md"
          labelPosition="left"
          label="Отправить как LaTeX сообщение"
          disabled={loading}
          {...form.getInputProps('isLatex', {
            type: 'checkbox',
          })}
        />
        <Button mt="md" type="submit" fullWidth loading={loading}>
          Создать
        </Button>
      </form>
    </Modal>
  );
});
