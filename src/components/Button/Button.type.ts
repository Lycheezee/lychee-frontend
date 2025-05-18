import { ComponentProps } from "react";
import { Button } from "react-native-paper";

export type ButtonProps = ComponentProps<typeof Button> &
  Partial<{
    label: string;
  }>;
