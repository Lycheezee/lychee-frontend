import { ComponentProps } from 'react';

export type DateFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
} & ComponentProps<any>;
