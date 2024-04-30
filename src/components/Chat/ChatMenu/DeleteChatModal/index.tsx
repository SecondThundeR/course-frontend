import { memo } from 'react';
import { Modal, Alert, Text, Flex, Button } from '@mantine/core';

import { useChatDelete } from '@/hooks';

import { type DeleteChatModalProps } from './interfaces';

export const DeleteChatModal = memo(function DeleteChatModal({
  chatId,
  opened,
  onClose,
}: DeleteChatModalProps) {
  const { onDelete, error, loading } = useChatDelete(chatId, onClose);

  return (
    <Modal opened={opened} onClose={onClose} title="Удалить чат" centered>
      {error && (
        <Alert variant="filled" title="Не удалось удалить чат" color="red" mb="md">
          {error.message}
        </Alert>
      )}
      <Text pb="md">Вы действительно хотите удалить этот чат?</Text>
      <Flex gap="md">
        <Button fullWidth variant="outline" onClick={onClose} disabled={loading}>
          Отменить
        </Button>
        <Button fullWidth bg="red" variant="filled" onClick={onDelete} loading={loading}>
          Удалить
        </Button>
      </Flex>
    </Modal>
  );
});
