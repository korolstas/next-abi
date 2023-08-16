import { HeroModal } from "./CustomModal/HeroInfo";
import styles from "./modal.module.less";
import { modalTypes } from "./CustomModal/modalTypes";
import { infoLogin } from "./CustomModal/AllHeaderModal/infoModal";
import { Login } from "./CustomModal/AllHeaderModal/Login";
import { Logout } from "./CustomModal/AllHeaderModal/Logout";

export const Modal = ({ modalType }: { modalType: string }) => {
  const modal = () => {
    switch (modalType) {
      case modalTypes.ByHero:
        return <HeroModal />;
      case modalTypes.BySingUp:
        return <Login info={infoLogin.infoSingUp} />;
      case modalTypes.BySingIn:
        return <Login info={infoLogin.infoSingIn} />;
      case modalTypes.ByLogout:
        return <Logout info={infoLogin.infoLogout} />;
      default:
        return null;
    }
  };
  return <div className={styles.modal}>{modal()}</div>;
};
