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
        setError('User data not found after login');
        return;
      }

      if (!(user as any).firstName || !(user as any).lastName) {
        // @ts-ignore
        navigation.navigate(ROUTES.REGISTER, { step: 2 });
        return;
      }
      navigation.navigate(ROUTES.DASHBOARD as never);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <InputField name="email" label="Email" />
        <InputField name="password" label="Password" secureTextEntry />
        {error && <Text style={{ color: 'red', marginBottom: 8, fontSize: 12 }}>{error}</Text>}
        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER as never)}>
          <Text style={styles.switchText}>Don&apos;t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}
