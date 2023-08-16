import { PropsForm } from "../InterfaceForm";
import { Input } from '@/components';

const enum FormTypes {
  text = "text",
  password = "password",
  checkbox = "checkbox",
  file = "file",
  email = "email",
}

export const FormInput = ({
  placeHolder,
  className,
  label,
  accept,
  name,
  type,
}: PropsForm) => {
  switch (type) {
    case FormTypes.text:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case FormTypes.email:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case FormTypes.password:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          placeHolder={placeHolder}
        />
      );
    case FormTypes.checkbox:
      return (
        <Input type={type} name={name} className={className} label={label} />
      );
    case FormTypes.file:
      return (
        <Input
          type={type}
          name={name}
          className={className}
          label={label}
          accept={accept}
        />
      );

    default:
      return null;
  }
};
