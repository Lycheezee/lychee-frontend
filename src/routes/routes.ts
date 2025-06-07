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
      [ROUTES.FOOD]: 'dashboard/food',
      [ROUTES.FOOD_HISTORY]: 'dashboard/food/history',
      [ROUTES.FOOD_DAY_DETAILS]: 'dashboard/food/day-details',
      [ROUTES.FOOD_COLLECTION]: 'dashboard/food/collection',
      [ROUTES.USER_PROFILE]: 'dashboard/user-profile',
    },
  },
};
