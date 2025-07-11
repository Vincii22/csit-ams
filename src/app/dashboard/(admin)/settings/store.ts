import { create } from "zustand";

interface SettingStore {
  autoSet: boolean;
  setAutoSet: (autoSet: boolean) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
  autoSet: localStorage.getItem("autoSet") ? true : false,

  setAutoSet: (autoSet) => set((_) => ({ autoSet })),
}));
