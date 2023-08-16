import { debounce } from "lodash-es";
import { useEffect } from "react";
import { useLatest } from "react-use";

export const useDebounce = (funct: Function, delay: number) => {
  const latestCb = useLatest(funct);

  const debouncedFn = debounce(latestCb.current, delay);

  useEffect(() => () => debouncedFn.cancel(), [debouncedFn]);

  return debouncedFn;
};
