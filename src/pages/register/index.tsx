import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../login/styles/login.style';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { UserRegisterReq } from '../../types/user';
import authService from '~/services/auth.service';
import { registerSchema } from './schemas';

export default function RegisterPage({ onNext }: { onNext?: () => void }) {
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);
  const methods = useForm<UserRegisterReq>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: UserRegisterReq) => {
    setError(null);
    try {
      await authService.register(data);
      if (onNext) {
        onNext();
      } else {
        navigation.navigate(ROUTES.LOGIN as never);
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <InputField name="email" label="Email" />
        <InputField name="password" label="Password" secureTextEntry />
        <InputField name="confirmPassword" label="Confirm Password" secureTextEntry />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button onPress={handleSubmit(onSubmit)}>Register</Button>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN as never)}>
          <Text style={styles.switchText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}
