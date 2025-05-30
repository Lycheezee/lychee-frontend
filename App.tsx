import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/login';
import RegisterFlow from './src/pages/register/RegisterFlow';
import { ROUTES } from './src/constants/routes';
import { linking } from './src/routes/routes';
import { Dashboard } from './src/pages/dashboard';
import { ProtectedRoot } from './src/pages/permissionDenied';
import './global.css';
import MealPlans from './src/pages/mealPlans';
import UserProfile from './src/pages/userProfile';

const Stack = createStackNavigator();

export function DashboardStack() {
  return (
    <ProtectedRoot>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.HOME} component={Dashboard} />
        <Stack.Screen name={ROUTES.MEAL_PLANS} component={MealPlans} />
        <Stack.Screen name={ROUTES.USER_PROFILE} component={UserProfile} />
      </Stack.Navigator>
    </ProtectedRoot>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator id={undefined}>
        <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterFlow} />
        <Stack.Screen
          name={ROUTES.DASHBOARD}
          component={DashboardStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
