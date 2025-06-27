"use client";

import { createContext, ReactNode, useContext } from "react";
import { usePopupState } from "../hooks/use-popup";

const PopupContext = createContext<
  ReturnType<typeof usePopupState> | undefined
>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const popup = usePopupState();

  return (
    <PopupContext.Provider value={popup}>{children}</PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup() must be used within a PopupProvider");
  }
  return context;
}
