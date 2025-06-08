import { StyleSheet } from "react-native";
import { COLORS } from "~/constants/colors";

export const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderColor: COLORS.BORDER_LIGHT,
    backgroundColor: COLORS.CREAM,
    color: COLORS.TEXT_PRIMARY,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
});
