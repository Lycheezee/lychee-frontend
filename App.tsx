import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/login';
import RegisterPage from './src/pages/register';
import { ROUTES } from './src/constants/routes';
import { linking } from './src/routes/routes';
import { Dashboard } from './src/pages/dashboard';
import { ProtectedRoot } from './src/pages/permissionDenied';
import './global.css';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterPage} />
        <Stack.Screen name={ROUTES.DASHBOARD}>
          {() => (
            <ProtectedRoot>
              <Dashboard />
            </ProtectedRoot>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
