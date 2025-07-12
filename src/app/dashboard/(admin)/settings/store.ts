import { create } from "zustand";

interface SettingStore {
  autoSet: boolean;
  currentAY?: string;
  currentSem?: string;

  setAutoSet: (autoSet: boolean) => void;
  setCurrentAY: (ay: string) => void;
  setCurrentSem: (sem: string) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
  autoSet: localStorage.getItem("autoSet") ? true : false,
  currentAY: undefined,
  currentSem: undefined,

  setAutoSet: (autoSet) => set((_) => ({ autoSet })),
  setCurrentAY: (ay) => set((_) => ({ currentAY: ay })),
  setCurrentSem: (sem) => set((_) => ({ currentSem: sem })),
}));
