import { ComponentProps } from 'react';
import { TextInput } from 'react-native-paper';

export type DateFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
} & Omit<ComponentProps<typeof TextInput>, 'value' | 'onChangeText' | 'onBlur'>;
