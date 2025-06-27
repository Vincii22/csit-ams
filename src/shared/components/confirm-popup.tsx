"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePopup } from "@/shared/contexts/popup-context";
import Loader from "@/components/ui/loader";

export default function ConfirmPopup() {
  const { showConfirm, confirmData, closeConfirmPopup, setConfirmData } =
    usePopup();

  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeConfirmPopup();
      }
    };

    if (showConfirm) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showConfirm, closeConfirmPopup]);

  useEffect(() => {
    if (showConfirm) {
      backdropRef.current?.focus();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeConfirmPopup();
    }
  };

  const handleConfirm = async () => {
    if (!confirmData) return;

    setConfirmData((prev) => prev && { ...prev, loading: true });

    try {
      await confirmData.action();
    } finally {
      setConfirmData((prev) => prev && { ...prev, loading: false });
    }
  };

  if (!showConfirm) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={backdropRef}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
          className="w-[350px] rounded-lg border border-background-400 bg-background-100 p-4"
        >
          <h5 className="font-semibold">Confirmation of {confirmData?.type}</h5>
          <div className="line my-4" />
          <p className="opacity-70">
            Are you sure you want to {confirmData?.type} this?
            <br /> This action cannot be undone.
          </p>
          <div className="line my-4" />
          <div className="button-container justify-end">
            <button onClick={closeConfirmPopup} disabled={confirmData?.loading}>
              Cancel
            </button>
            <button
              className="danger-button capitalize"
              onClick={handleConfirm}
              disabled={confirmData?.loading}
            >
              {confirmData?.loading ? <Loader /> : confirmData?.type}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
