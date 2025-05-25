import { ComponentProps } from 'react';
import { TextInput } from 'react-native-paper';

export type NumberInputFieldProps = ComponentProps<typeof TextInput> &
  Partial<{
    name: string;
    label: string;
    min: number;
    max: number;
    allowDecimals: boolean;
    decimalPlaces: number;
  }>;
