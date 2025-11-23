"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CommonModalProps {
  open: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
  className?: {
    overlay?: string;
    container?: string;
  };
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  children,
  handleClose,
  className,
}) => {
  // Animation variants for the modal
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for the overlay
  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Handle outside click
  const onOverlayClick = () => {
    if (handleClose) {
      handleClose();
    }
  };

  // Prevent click propagation when clicking on the modal content
  const onModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="common-modal-title"
        >
          {/* Overlay */}
          <motion.div
            className={`fixed inset-0 bg-black/30 ${className?.overlay || ""}`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onOverlayClick}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-lg max-h-[90vh] rounded-xl overflow-auto no-scrollbar ${
              className?.container || ""
            }`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onModalClick}
          >
            {/* Content area */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render to portal if document is available (client-side)
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  // Fallback for SSR
  return null;
};

export default CommonModal;
