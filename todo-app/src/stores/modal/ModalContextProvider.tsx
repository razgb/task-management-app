import React, { useState } from "react";
import { ModalContext, ModalContextType, ModalType } from "./ModalContext";

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>("success");
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = (type: ModalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  const value: ModalContextType = {
    openModal,
    closeModal,
    modalType,
    modalMessage,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
