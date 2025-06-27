"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePopup } from "@/shared/contexts/popup-context";

export default function Popup() {
  const { isOpen, title, content, closePopup } = usePopup();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      backdropRef.current?.focus();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, closePopup]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={backdropRef}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="min-w-[450px] max-w-[1000px] rounded-lg border border-background-400 bg-background-100 p-4"
        >
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="mt-4">{content}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
