import styles from "./input.module.less";
import {
  ControllerRenderProps,
  FieldValues,
  Controller,
} from "react-hook-form";
import cx from "classnames";

type FormFieldType = ControllerRenderProps<FieldValues, string>;

interface Props {
  error?: string;
  name: string;
  type: string;
  placeHolder?: string;
}

export const Input = ({ name, type, placeHolder, error }: Props) => {
  const spanError = error ? error : null;

  const renderInput = ({ field }: { field: FormFieldType }) => {
    return (
      <>
        <input
          style={{
            border: `2px solid ${error ? "red" : "#06ea4e"}`,
          }}
          type={type}
          className={styles.modal_input}
          placeholder={placeHolder}
          {...field}
        />
        <span className={styles.error}>{spanError}</span>
      </>
    );
  };

  return <Controller name={name} render={renderInput} />;
};

// import { ComponentProps } from "react";
// import { View } from "react-native";

// import { Spacer, TextInput, Typography } from "@components/common";

// import { FormField } from "../FormField";
// import { ErrorText } from "../ErrorText";
// import { FormComponentProps, FormFieldProps } from "../types";
// import { useStyles } from "./styles";

// type Props = FormComponentProps & ComponentProps<typeof TextInput>;

// export function FormTextInput(props: Props) {
//   const { name, label, error, control, containerStyle, ...rest } = props;

//   const styles = useStyles();

//   const renderField = (field: Parameters<FormFieldProps["render"]>[0]) => {
//     const { value, onBlur, onChange } = field;

//     return (
//       <TextInput
//         value={value}
//         onBlur={onBlur}
//         onChangeText={onChange}
//         style={!!error && styles.error}
//         {...rest}
//       />
//     );
//   };

//   return (
//     <View style={containerStyle}>
//       {label && (
//         <>
//           <Typography text={label} error={!!error} />
//           <Spacer vertical={"xs"} />
//         </>
//       )}
//       <FormField name={name} control={control} render={renderField} />
//       <ErrorText error={error} />
//     </View>
//   );
// }
