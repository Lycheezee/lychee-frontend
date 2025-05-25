import { ComponentProps } from 'react';

export type SelectFieldProps = {
  name?: string;
  label?: string;
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
} & ComponentProps<any>;
