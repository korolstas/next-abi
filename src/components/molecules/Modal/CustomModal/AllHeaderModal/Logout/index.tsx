import { exit, showModal } from "@/store/heroesSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { Button } from "@/components";
import sad from "@/../public/img/portal.png";
import Image from "next/image";
import styles from "./logout.module.less";
import { useRouter } from "next/router";

interface Logout {
  info: {
    typeModal: string;
    header: string;
  };
};

export const Logout = ({ info }: Logout) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const closeModal = (isExit: boolean) => {
    if (isExit) {
      dispatch(exit());
      router.push("/");
    }
    dispatch(showModal({ visible: info.typeModal }));
  };

  return (
    <div className={styles.modal}>
      <header>{info.header}</header>
      <div className={styles.modal_box}>
        <Image width={250} height={250} src={sad} alt="loading" />
        <div className={styles.modal_box_submit_btns}>
          <Button
            onClick={() => closeModal(false)}
            text="No"
            variant={"submit"}
          />
          <Button
            onClick={() => closeModal(true)}
            text="Yes"
            variant={"submit"}
          />
        </div>
      </div>
    </div>
  );
};
