interface BySingIn  {
  singInEmail: string;
  singInPassword: string;
};

interface BySingUp {
  singUpName: string;
  singUpEmail: string;
  singUpPassword: string;
  singUpCheckbox: boolean;
};

export interface PropsForm {
  type: string;
  name: string;
  className: string;
  placeHolder?: string;
  label?: string;
  accept?: string;
}

export type UnificationForm = BySingIn | BySingUp;
