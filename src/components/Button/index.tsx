import cx from "classnames";
import styles from "./styles.module.less";

type Variant = "cancel" | "green" | "submit";

interface Button {
  text?: string;
  variant: Variant;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ text, className, onClick, variant }: Button) => {
  const classNames = cx(styles[variant], className, "");

  return (
    <button onClick={onClick} className={classNames}>
      <span>{text}</span>
    </button>
  );
};
