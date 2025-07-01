import { create } from "zustand";

type EmailDialogStore = {
  open: boolean;
  email: string;
  setOpen: (open: boolean) => void;
  setEmail: (email: string) => void;
};

export const useEmailDialogStore = create<EmailDialogStore>((set) => ({
  open: false,
  email: "",

  setOpen: (open) => set((_) => ({ open })),
  setEmail: (email) => set((_) => ({ email })),
}));
