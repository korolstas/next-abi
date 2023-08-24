import { PropsWithChildren } from "react";
import { Header } from "@/components";
import { Modal } from "@/components";
import { useAppSelector } from "@/hooks/redux-hooks";
import { PopUpWindow } from "@/components";
import styles from "./layout.module.less";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { modalType, windowSuccess, windowError } = useAppSelector(
    (state) => state.heroesSlice
  );

  return (
    <>
      {modalType && <Modal modalType={modalType} />}

      <Header />

      {children}

      <div className={styles.window_list}>
        {windowSuccess?.map((item, id) => (
          <PopUpWindow key={id} label={item} variant={"success"} />
        ))}

        {windowError?.map((item, id) => (
          <PopUpWindow key={id} label={item} variant={"error"} />
        ))}
      </div>
    </>
  );
};
