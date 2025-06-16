import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginData } from '../types/login.types';
import { styles } from '../styles/login.style';
import { InputField } from '../../../components/InputField';
import { Button } from '../../../components/Button';
import { loginSchema } from '../schemas/login.schema';
import authService from '~/services/auth.service';
import { ROUTES } from '../../../constants/routes';
import { clearProgress } from '../../register/RegisterFlow';

export function LoginForm() {
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'linh150600@gmail.com',
      password: 'linhlinh',
    },
  });

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
      if (!user.mealPlanDays) {
        // @ts-ignore
        return navigation.navigate(ROUTES.REGISTER, { step: 4 });
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
      <View style={styles.formContainer}>
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={styles.switchText}>
            Don&apos;t have an account?{' '}
            <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}
