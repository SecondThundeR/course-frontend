import { useDisclosure } from '@mantine/hooks';

export default function useModal() {
  const [modalOpened, { open, close }] = useDisclosure();

  return { modalOpened, onOpen: open, onClose: close };
}
