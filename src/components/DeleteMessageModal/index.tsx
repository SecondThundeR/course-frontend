import { memo } from 'react';
import { Modal, Alert, Text, Flex, Button } from '@mantine/core';

import { type DeleteMessageModalProps } from './interfaces';

export const DeleteMessageModal = memo(function DeleteMessageModal({
  opened,
  loading,
  error,
  onClose,
  onDelete,
}: DeleteMessageModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Удалить сообщение" centered>
      {error && (
        <Alert variant="filled" color="red" title="Не удалось удалить сообщение" mb="md">
          {error.message}
        </Alert>
      )}
      <Text pb="md">Вы действительно хотите удалить сообщение?</Text>
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
