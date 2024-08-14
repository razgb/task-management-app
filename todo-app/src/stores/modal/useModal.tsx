import { useContext } from "react";
import { ModalContext } from "./ModalContext";

/**
 * Type safe hook to access the success & error modal context.
 */
export default function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return modalContext;
}
