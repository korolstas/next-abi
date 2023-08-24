import { showModal } from "@store/heroesSlice";
import { useAppDispatch } from "@hooks/redux-hooks";
import styles from "../login.module.less";
import { Input, Button, CheckBox } from "@components";
import { FormProvider, useForm } from "react-hook-form";
import { bool, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFuction } from "../loginFunctions";

interface SignUp {
  info: {
    typeModal: string;
    header: string;
  };
}

const INITIAL_ERROR = "This field is requared";
const INITIAL_ERROR_EMAIL = "This email isn't correct";

const validatioSchema = object().shape({
  signUpName: string().min(6, INITIAL_ERROR).required(INITIAL_ERROR),
  signUpFile: string().required(INITIAL_ERROR),
  signUpCheck: bool().oneOf([true]),
  signUpEmail: string().email(INITIAL_ERROR_EMAIL).required(INITIAL_ERROR),
  signUpPassword: string()
    .min(6, INITIAL_ERROR)
    .max(32, INITIAL_ERROR)
    .required(INITIAL_ERROR),
});

export const SignUp = ({ info }: SignUp) => {
  const dispatch = useAppDispatch();
  const privicy_text = "Yes, I agree with the Privicy policy";
  const methods = useForm({
    defaultValues: {
      signUpName: "",
      signUpFile: "",
      signUpCheck: false,
      signUpEmail: "",
      signUpPassword: "",
    },
    resolver: yupResolver(validatioSchema),
  });

  const closeModal = () => {
    dispatch(showModal({ visible: info.typeModal }));
  };

  const onSubmit = async (data: any) => {
    SignUpFuction(data, closeModal, dispatch);
  };

  return (
    <div className={styles.modal}>
      <header>
        {info.header}
        <Button onClick={closeModal} variant={"cancel"} text="x" />
      </header>
      <FormProvider {...methods}>
        <form
          className={styles.modal_form}
          onSubmit={methods.handleSubmit(onSubmit, console.log)}
        >
          <Input
            type={"text"}
            name={"signUpName"}
            error={methods.formState.errors.signUpName?.message}
            placeHolder={"Your Name*"}
          />
          <Input
            type={"email"}
            name={"signUpEmail"}
            error={methods.formState.errors.signUpEmail?.message}
            placeHolder={"Email*"}
          />
          <Input
            type={"password"}
            name={"signUpPassword"}
            error={methods.formState.errors.signUpPassword?.message}
            placeHolder={"Password*"}
          />
          <Input
            type={"file"}
            name={"signUpFile"}
            error={methods.formState.errors.signUpFile?.message}
            placeHolder={"File*"}
            
          />
          <CheckBox
            name={"signUpCheck"}
            error={methods.formState.errors.signUpCheck?.message}
            label={privicy_text}
          />
          <div className={styles.modal_form_submit}>
            <Button text={"Submit"} variant={'submit'} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
