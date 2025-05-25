import { Controller, useFormContext } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Menu, Button as PaperButton, Provider } from 'react-native-paper';
import { useState } from 'react';
import { styles } from './SelectField.style';
import { SelectFieldProps } from './SelectField.type';

export const SelectField = ({
  name = '',
  label,
  options,
  placeholder,
  ...props
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.dropdown}>
          <>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <PaperButton
                  mode="outlined"
                  onPress={openMenu}
                  contentStyle={{ justifyContent: 'flex-start' }}
                  style={{ marginBottom: 8 }}>
                  {value
                    ? options.find((opt) => opt.value === value)?.label || placeholder || label
                    : placeholder || label}
                </PaperButton>
              }>
              {options.map((option) => (
                <Menu.Item
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    closeMenu();
                  }}
                  title={option.label}
                />
              ))}
            </Menu>
          </>
          {errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
      )}
    />
  );
};
