import { LinkingOptions } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';

export const linking: LinkingOptions<typeof ROUTES> = {
  prefixes: ['http://localhost:8081'],
  config: {
    screens: {
      [ROUTES.LOGIN]: 'login',
      [ROUTES.REGISTER]: 'register',
      [ROUTES.DASHBOARD]: 'dashboard',
      [ROUTES.HOME]: 'dashboard/home',
      [ROUTES.MEAL_PLANS]: 'dashboard/meal-plans',
      [ROUTES.USER_PROFILE]: 'dashboard/user-profile',
    },
  },
};
