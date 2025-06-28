import { User } from "../types";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface UserState {
  user: User | null;
  remember: boolean;
  expiresAt: number | null;
  setUser: (user: User) => void;
  setRemember: (remember: boolean) => void;
  clearUser: () => void;
}

const storage: PersistStorage<UserState> = {
  getItem: (name) => {
    const raw = localStorage.getItem("auth-store");
    const remember = raw ? JSON.parse(raw).state?.remember : false;

    // if remember is true get from local, else use session storage
    const value = remember
      ? localStorage.getItem(name)
      : sessionStorage.getItem(name);

    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    const remember = value.state.remember;

    const serialized = JSON.stringify(value);

    // clear last sessions then set again
    if (remember) {
      sessionStorage.removeItem(name);
      localStorage.setItem(name, serialized);
    } else {
      localStorage.removeItem(name);
      sessionStorage.setItem(name, serialized);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      remember: false,
      expiresAt: null,
      setUser: (user) =>
        set({
          user,
          expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // three days, btw
        }),
      setRemember: (remember) => set({ remember }),
      clearUser: () => set({ user: null, remember: false, expiresAt: null }),
    }),
    {
      name: "auth-store",
      storage,
    },
  ),
);
