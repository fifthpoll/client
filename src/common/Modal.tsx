import useModal from "../hooks/useModal";
import { twMerge } from "tailwind-merge";

export default function Modal() {
  const { element } = useModal();

  return (
    <article
      className={twMerge(
        "z-[1001] bg-black backdrop-blur-sm bg-opacity-10 flex justify-center items-center fixed top-0 left-0 w-full h-full duration-300",
        element ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={twMerge(
          "duration-inherit ease-out",
          !element && " scale-150 translate-y-full opacity-25 blur-md"
        )}
      >
        {element}
      </div>
    </article>
  );
}
