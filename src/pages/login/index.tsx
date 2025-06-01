import { View, Text } from 'react-native';
import { Provider } from 'react-native-paper';
import { styles } from './styles/login.style';
import { Logo } from '../../components/Logo';
import { LoginForm } from './components/LoginForm';

export default function LoginPage() {
  return (
    <Provider>
      <View style={styles.container}>
        <Logo size={120} />
        <Text style={styles.title}>Welcome back!</Text>
        <LoginForm />
      </View>
    </Provider>
  );
}
