import { FormInput } from "./FormInput";
import {
  inputsSingIn,
  inputsSingUp,
} from "../Modal/CustomModal/AllHeaderModal/inputInfo";
import { modalTypes } from "../Modal/CustomModal/modalTypes";

export const Form = ({ typeForm }: { typeForm: string }) => {
  const FormSwitch = () => {
    switch (typeForm) {
      case modalTypes.BySingIn:
        return inputsSingIn.map((item, id) => {
          return (
            <FormInput
              key={id}
              name={item.name}
              type={item.type}
              className={item.className}
              placeHolder={item.placeHolder}
            />
          );
        });
      case modalTypes.BySingUp:
        return inputsSingUp.map((item, id) => {
          return (
            <FormInput
              key={id}
              name={item.name}
              type={item.type}
              className={item.className}
              placeHolder={item.placeHolder}
              label={item.label}
              accept={item.accept}
            />
          );
        });
      default:
        return null;
    }
  };
  return <>{FormSwitch()}</>;
};
