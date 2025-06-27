"use client";

import { usePopup } from "@/shared/contexts/popup-context";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./ui/loader";

export default function Popup() {
  const {
    isOpen,
    title,
    content,
    closePopup,
    showConfirm,
    confirmData,
    closeConfirmPopup,
    setConfirmData,
  } = usePopup();
  const backdropRef = useRef<HTMLDivElement>(null);
  const backdropRefConfirm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      backdropRef.current?.focus();
      if (showConfirm) {
        backdropRefConfirm.current?.focus();
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showConfirm) {
          closeConfirmPopup();
        } else {
          closePopup();
        }
      }
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, closePopup, closeConfirmPopup]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleBackdropClickConfirm = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeConfirmPopup();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="z-50 h-full w-full fixed flex justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
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
            className="min-w-[450px] max-w-[1000px] bg-background-100 border border-background-400 p-4 rounded-lg"
          >
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="mt-4">{content}</div>
          </motion.div>
          <AnimatePresence>
            {showConfirm && (
              <motion.div
                ref={backdropRefConfirm}
                tabIndex={-1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="z-50 h-full w-full fixed flex justify-center items-center bg-[rgba(0,0,0,0.2)] backdrop-blur-sm"
                onClick={handleBackdropClickConfirm}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  className="fixed w-[350px] bg-background-100 border border-background-400 p-4 rounded-lg"
                >
                  <h5 className="font-semibold">
                    Confirmation of {confirmData.type}
                  </h5>
                  <div className="line my-4"></div>
                  <p className="opacity-70">
                    Are you sure you want to {confirmData.type} this?
                    <br /> This action can not be undone.
                  </p>
                  <div className="line my-4"></div>
                  <div className="button-container justify-end">
                    <button
                      onClick={closeConfirmPopup}
                      disabled={confirmData?.loading}
                    >
                      Cancel
                    </button>
                    <button
                      className="danger-button capitalize"
                      onClick={async () => {
                        if (!confirmData) return;

                        setConfirmData(
                          (prev) => prev && { ...prev, loading: true },
                        );

                        try {
                          await confirmData.action();
                        } finally {
                          setConfirmData(
                            (prev) => prev && { ...prev, loading: false },
                          );
                        }
                      }}
                      disabled={confirmData?.loading}
                    >
                      {confirmData?.loading ? <Loader /> : confirmData?.type}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
