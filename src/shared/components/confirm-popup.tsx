"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePopup } from "@/shared/contexts/popup-context";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    if (!confirmData || !confirmData.action) return;

    setConfirmData((prev) => prev && { ...prev, loading: true });

    try {
      await confirmData.action();
    } finally {
      setConfirmData((prev) => prev && { ...prev, loading: false });
    }
  };

  if (!confirmData) return null;

  return (
    <AnimatePresence>
      {showConfirm && (
        <motion.div
          ref={backdropRef}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-xs"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
            className="flex flex-col gap-4 w-[350px] rounded-lg border border-border bg-background p-4"
          >
            <h2 className="text-xl font-semibold">{confirmData.title}</h2>
            <Separator />
            <p className="text-muted-foreground">
              {confirmData.description
                ? confirmData.description
                : " Are you sure you want to do this? This action cannot be undone. "}
            </p>
            <Separator />
            <div className="btn-container justify-end">
              <Button
                variant="ghost"
                onClick={closeConfirmPopup}
                disabled={confirmData.loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={confirmData.loading}
              >
                {confirmData.loading ? (
                  <Loader />
                ) : confirmData.confirmLabel ? (
                  confirmData.confirmLabel
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
