import { createContext } from "react";

export type ModalType = "success" | "error" | null;

export type ModalContextType = {
  openModal: (type: ModalType, message: string) => void;
  closeModal: () => void;
  modalType: ModalType; // only one open at a time (avoids conflicts)
  modalMessage: string;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
