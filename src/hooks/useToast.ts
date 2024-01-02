import React, { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const global = useGlobalContext();

  function clear(element: ReactNode) {
    global.toastState.setToasts([]);
  }

  function add(config: {
    color?: string;
    duration?: number;
    element?: ReactNode;
    message?: string;
  }) {
    const toastBase = {
      color: config.color || 'theme("colors.primary")',
      duration: config.duration || 60 * 1000,
    } as const;
    let newToast = config.message
      ? { ...toastBase, message: config.message }
      : config.element
      ? { ...toastBase, element: config.element }
      : null;

    if (newToast == null) throw new Error("Invalid toast description");

    global.toastState.setToasts((p) => [
      ...p,
      newToast as NonNullable<typeof newToast>,
    ]);
  }

  function close(index: number) {
    global.toastState.setToasts([
      ...global.toastState.toasts.slice(0, index),
      ...global.toastState.toasts.slice(index + 1),
    ]);
  }

  return { clear, add, close };
}
