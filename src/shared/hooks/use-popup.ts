import { ConfirmData } from "@/lib/types";
import { ReactNode, useState } from "react";

export function usePopupState() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState<ConfirmData | null>(null);

  const openPopup = (title: string, content: ReactNode) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const openConfirmPopup = (confirmData: ConfirmData) => {
    setConfirmData(confirmData);
    setShowConfirm(true);
  };

  const closePopup = () => setIsOpen(false);
  const closeConfirmPopup = () => setShowConfirm(false);

  return {
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
  };
}
