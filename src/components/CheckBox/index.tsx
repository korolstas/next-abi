import styles from "./checkbox.module.less";
import {
  ControllerRenderProps,
  FieldValues,
  Controller,
} from "react-hook-form";
import cx from "classnames";

type FormFieldType = ControllerRenderProps<FieldValues, string>;

interface Props {
  name: string;
  error?: string;
  label: string;
}

export const CheckBox = ({ name, error, label }: Props) => {
  const renderCheckBox = ({ field }: { field: FormFieldType }) => {
    return (
      <div className={styles.modal_checkbox}>
        <input type="checkbox" className={styles.modal_checkbox} {...field} />
        <label
          className={styles.modal_checkbox}
          style={{ color: `${error ? "red" : "#06ea4e"}` }}
        >
          {label}
        </label>
      </div>
    );
  };

  return <Controller name={name} render={renderCheckBox} />;
};
