import { ComponentProps } from "react";
import { TextInput } from "react-native-paper";

export type InputFieldProps = ComponentProps<typeof TextInput> &
  Partial<{
    name: string;
    label: string;
  }>;
