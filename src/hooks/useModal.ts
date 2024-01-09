import { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const globalC = useGlobalContext();

  function show(element: ReactNode) {
    if (globalC && globalC.modalState && globalC.modalState.setModal) {
      globalC.modalState.setModal(element);
    }
  }

  function hide() {
    if (globalC && globalC.modalState && globalC.modalState.setModal) {
      globalC.modalState.setModal(null);
    }
  }

  return { element: globalC?.modalState?.modal, show, hide };
}
