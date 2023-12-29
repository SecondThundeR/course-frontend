export type DeleteMessageModalProps = {
  opened: boolean;
  loading: boolean;
  error?: Error;
  onClose: () => void;
  onDelete: () => void;
};
