import { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const global = useGlobalContext();

  function show(element: ReactNode) {
    console.log("Showing modal with element:", element);
    if (global && global.modalState && global.modalState.setModal) {
      console.log("Showing modal with element: Inside if", element);

      global.modalState.setModal(element);
    }
  }

  function hide() {
    if (global && global.modalState && global.modalState.setModal) {
      console.log("Hiding modal");
      global.modalState.setModal(null);
    }
  }

  return { element: global?.modalState?.modal, show, hide };
}
