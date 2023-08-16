import { PropsForm } from "../Form/InterfaceForm";
import styles from "./input.module.less";
import { useFormContext } from "react-hook-form";

export const Input = ({
  placeHolder,
  className,
  type,
  label,
  name,
  accept,
}: PropsForm) => {
  const { register } = useFormContext();
  const classNames = className ? styles[className] : "";

  const input = (required?: boolean) => (
    <input
      required
      {...register(name, { required })}
      type={type}
      className={classNames}
      placeholder={placeHolder}
      accept={accept}
    />
  );

  if (!label) return input();

  return (
    <div className={classNames}>
      {input(true)}
      <label>{label}</label>
    </div>
  );
};
