import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Menu, TextInput, Text } from 'react-native-paper';
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
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TextInput
                label={label}
                mode="outlined"
                value={value ? options.find((opt) => opt.value === value)?.label || '' : ''}
                placeholder={placeholder}
                onTouchStart={openMenu}
                error={!!errors[name]}
                right={<TextInput.Icon icon="chevron-down" onPress={openMenu} />}
                style={styles.input}
                editable={false}
                pointerEvents="none"
                {...props}
              />
            }>
            {options.map((option) => (
              <View key={option.value}>
                <Menu.Item
                  onPress={() => {
                    onChange(option.value);
                    closeMenu();
                  }}
                  title={option.label}
                />
              </View>
            ))}
          </Menu>
          {errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
      )}
    />
  );
};
