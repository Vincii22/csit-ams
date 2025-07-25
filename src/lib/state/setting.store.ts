import { create } from "zustand";

interface SettingStore {
  autoSet: boolean;
  currentAY?: string;
  currentSem?: "FIRST_SEMESTER" | "SECOND_SEMESTER";
  startDate?: Date;
  endDate?: Date;

  setAutoSet: (autoSet: boolean) => void;
  setCurrentAY: (ay: string) => void;
  setCurrentSem: (sem: "FIRST_SEMESTER" | "SECOND_SEMESTER") => void;
  setDates: (param: { start: Date; end: Date }) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
  autoSet: false,
  currentAY: undefined,
  currentSem: undefined,
  startDate: undefined,
  endDate: undefined,

  setAutoSet: (autoSet) => set((_) => ({ autoSet })),
  setCurrentAY: (ay) => set((_) => ({ currentAY: ay })),
  setCurrentSem: (sem) => set((_) => ({ currentSem: sem })),
  setDates: ({ start, end }) =>
    set((_) => ({
      startDate: start,
      endDate: end,
    })),
}));
