import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, Text } from 'react-native-paper';
import { styles } from './InputField.style';
import { InputFieldProps } from './InputField.type';
import { COLORS } from '../../constants/colors';

export const InputField = ({ name = '', label, ...props }: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            label={label}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={props.secureTextEntry}
            style={styles.input}
            error={!!errors[name]}
            {...props}
          />{' '}
          {errors[name] && (
            <Text style={{ color: COLORS.ERROR, marginBottom: 8, fontSize: 12 }}>
              {errors[name]?.message as string}
            </Text>
          )}
        </>
      )}
    />
  );
};
