import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/login';
import RegisterFlow from './src/pages/register/RegisterFlow';
import { ROUTES } from './src/constants/routes';
import { linking } from './src/routes/routes';
import { Dashboard } from './src/pages/dashboard';
import { ProtectedRoot } from './src/pages/permissionDenied';
import { QueryProvider } from './src/providers/QueryProvider';
import './global.css';
import UserProfile from './src/pages/userProfile';
import Food from './src/pages/food';
import FoodHistory from './src/pages/food/FoodHistory';
import FoodCollection from './src/pages/food/FoodCollection';

const Stack = createStackNavigator();

export function DashboardStack() {
  return (
    <ProtectedRoot>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.HOME} component={Dashboard} />
        <Stack.Screen name={ROUTES.FOOD} component={Food} />
        <Stack.Screen name={ROUTES.FOOD_HISTORY} component={FoodHistory} />
        <Stack.Screen name={ROUTES.FOOD_COLLECTION} component={FoodCollection} />
        <Stack.Screen name={ROUTES.USER_PROFILE} component={UserProfile} />
      </Stack.Navigator>
    </ProtectedRoot>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          id={undefined}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
          <Stack.Screen name={ROUTES.REGISTER} component={RegisterFlow} />
          <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryProvider>
  );
}
