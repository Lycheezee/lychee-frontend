import { Button as ReactNativeButton } from "react-native-paper";
import { ButtonProps } from "./Button.type";
import { buttonStyle } from "./Button.style";

export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <ReactNativeButton mode="contained" style={buttonStyle.button} {...props}>
      {props.children}
    </ReactNativeButton>
  );
};
