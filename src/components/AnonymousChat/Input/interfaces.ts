export type InputProps = {
  isLoading: boolean;
  onSubmit: (message: string, isLatex: boolean) => Promise<void>;
};
