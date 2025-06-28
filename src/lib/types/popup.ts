export type ConfirmActionData = {
  title: string;
  description?: string;
  action?: () => Promise<void>;
  confirmLabel?: string;
  loading?: boolean;
};
