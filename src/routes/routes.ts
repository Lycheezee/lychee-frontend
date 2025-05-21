import { LinkingOptions } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";

export const linking: LinkingOptions<typeof ROUTES> = {
  prefixes: ["http://localhost:8081"],
  config: {
    screens: {
      [ROUTES.LOGIN]: "login",
      [ROUTES.DASHBOARD]: "dashboard",
    },
    
  },
};
