export type ConfirmData = {
  type: string;
  action: () => Promise<void>;
  loading?: boolean;
};
