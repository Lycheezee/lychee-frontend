import { Controller, useFormContext } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { styles } from "./InputField.style";
import { InputFieldProps } from "./InputField.type";

export const InputField = ({ name = "", label, ...props }: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label={label}
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry
          style={styles.input}
          error={!!errors[name]}
          {...props}
        />
      )}
    />
  );
};
