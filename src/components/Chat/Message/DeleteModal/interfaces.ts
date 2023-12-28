export type DeleteModalProps = {
  opened: boolean;
  loading: boolean;
  error?: Error;
  onClose: () => void;
  onDelete: () => void;
};
