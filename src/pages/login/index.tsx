import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from './types/login.types';
import { styles } from './styles/login.style';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { loginSchema } from './schemas/login.schema';
import authService from '~/services/auth.service';
import { Provider } from 'react-native-paper';
import { clearProgress } from '../register/RegisterFlow';

export default function LoginPage() {
  const navigation = useNavigation();
  const methods = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginData) => {
    try {
      await authService.login(data);
      const user = await authService.getUser();
      if (!user) {
        return setError('User data not found after login');
      }

      if (!user.firstName || !user.lastName) {
        // @ts-ignore
        return navigation.navigate(ROUTES.REGISTER, { step: 2 });
      }

      if (!user.bodyInfo) {
        // @ts-ignore
        return navigation.navigate(ROUTES.REGISTER, { step: 3 });
      }
      // @ts-ignore
      navigation.navigate(ROUTES.DASHBOARD, { screen: ROUTES.HOME });
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
    }
  };

  const handleNavigateToRegister = async () => {
    await clearProgress();
    navigation.navigate(ROUTES.REGISTER as never);
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <InputField name="email" label="Email" />
          <InputField name="password" label="Password" secureTextEntry />
          {error && <Text style={{ color: 'red', marginBottom: 8, fontSize: 12 }}>{error}</Text>}
          <Button onPress={handleSubmit(onSubmit)}>Login</Button>
          <TouchableOpacity onPress={handleNavigateToRegister}>
            <Text style={styles.switchText}>Don&apos;t have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </Provider>
    </FormProvider>
  );
}
