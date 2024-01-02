import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalContextType {
  modalState: {
    modal: ReactNode;
    setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  };
  toastState: {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
  };
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactNode | null>();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value: GlobalContextType = {
    modalState: { modal, setModal },
    toastState: { toasts, setToasts },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

type Toast = { color: string; duration: number } & (
  | {
      element: ReactNode;
    }
  | { message: string }
);
