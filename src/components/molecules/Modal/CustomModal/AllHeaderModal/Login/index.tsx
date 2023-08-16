import { showModal } from "@/store/heroesSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";
import styles from "./login.module.less";
import { Form } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components";
import { SingIn, SingUp } from "./loginFunctions";
import { UnificationForm } from "@/components/molecules/Form/InterfaceForm";

interface Login {
  info: {
    typeModal: string;
    header: string;
  };
};

export const Login = ({ info }: Login) => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(showModal({ visible: info.typeModal }));
  };
  const methods = useForm<UnificationForm>();

  const onSubmit = async (data: any) => {
    switch (info.typeModal) {
      case "signUpModal":
        SingUp(data, methods, closeModal, dispatch);
        break;
      case "signInModal":
        SingIn(data, methods, closeModal, dispatch);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <header>
          {info.header}
          <Button onClick={closeModal} variant={"cancel"} text="x" />
        </header>
        <FormProvider {...methods}>
          <form
            className={styles.modal_form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Form typeForm={info.typeModal} />
            <div className={styles.modal_form_submit}>
              <input
                className={styles.modal_form_submit_input}
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
