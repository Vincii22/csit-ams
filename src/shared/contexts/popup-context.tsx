"use client";

import { ConfirmData } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

type PopupContextType = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  openPopup: (title: string, content: ReactNode) => void;
  closePopup: () => void;
  showConfirm: boolean;
  confirmData: ConfirmData;
  openConfirmPopup: (confirmData: ConfirmData) => void;
  closeConfirmPopup: () => void;
  setConfirmData: (confirmData: ConfirmData) => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState<ConfirmData>({
    type: "",
    action: null,
    loading: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);

  const openConfirmPopup = (confirmData: ConfirmData) => {
    setConfirmData(confirmData);
    setShowConfirm(true);
  };

  const closeConfirmPopup = () => {
    setShowConfirm(false);
  };

  const openPopup = (title: string, content: ReactNode) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        title,
        content,
        openPopup,
        closePopup,
        showConfirm,
        confirmData,
        openConfirmPopup,
        closeConfirmPopup,
        setConfirmData,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup() must be used within a PopupProvider");
  }
  return context;
}
