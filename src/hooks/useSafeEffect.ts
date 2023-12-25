import { useEffect, useRef } from "react";

export default function useSafeEffect(
  ...args: [...Parameters<typeof useEffect>, condition?: () => boolean]
) {
  const flag = useRef(false);
  const [callback, dependencies, condition] = args;

  useEffect(() => {
    let desctructor: ReturnType<Parameters<typeof useEffect>[0]> = () => {};
    if (!flag.current && (!condition || condition())) {
      flag.current = true;
      desctructor = callback();
    }

    return desctructor;
  }, dependencies);
}
