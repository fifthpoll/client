import React, { createContext, useContext } from "react";

interface ProtocolContextType {}

const ProtocolContext = createContext<ProtocolContextType>(
  {} as ProtocolContextType
);

export function ProtocolProvider({ children }: { children: React.ReactNode }) {
  const value = {};

  return (
    <ProtocolContext.Provider value={value}>
      {children}
    </ProtocolContext.Provider>
  );
}

export default function useProtocol() {
  return useContext(ProtocolContext);
}
