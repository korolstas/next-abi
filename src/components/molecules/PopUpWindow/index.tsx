import { useEffect } from "react";
import styles from "./window.module.less";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { deletePopUpInfo } from "@/store/heroesSlice";
import cx from "classnames";

type Variant = "success" | "error";

interface PopWindow {
  label: string;
  variant: Variant;
  className?: string;
}

export const PopUpWindow = ({ label, variant, className }: PopWindow) => {
  const dispatch = useAppDispatch();
  const classNames = cx(styles[variant], className);

  useEffect(() => {
    const hideErrorTimeout = setTimeout(() => {
      dispatch(deletePopUpInfo());
    }, 3000);

    return () => {
      clearTimeout(hideErrorTimeout);
    };
  }, []);

  return (
    <div className={styles.window}>
      <label className={classNames}>{label}</label>
    </div>
  );
};
