import { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const globalC = useGlobalContext();

  function show(element: ReactNode) {
    console.log("Showing modal with element:", element);
    console.log(globalC);
    console.log(globalC.modalState);
    console.log(globalC.modalState.setModal);
    if (globalC && globalC.modalState && globalC.modalState.setModal) {
      console.log("Showing modal with element: Inside if", element);
      globalC.modalState.setModal(element);
    }
  }

  function hide() {
    if (globalC && globalC.modalState && globalC.modalState.setModal) {
      console.log("Hiding modal");
      globalC.modalState.setModal(null);
    }
  }

  return { element: globalC?.modalState?.modal, show, hide };
}
