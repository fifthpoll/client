import { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const global = useGlobalContext();

  function show(element: ReactNode) {
    if (global && global.modalState && global.modalState.setModal) {
      global.modalState.setModal(element);
    }
  }

  function hide() {
    if (global && global.modalState && global.modalState.setModal) {
      global.modalState.setModal(null);
    }
  }

  return { element: global?.modalState?.modal, show, hide };
}
